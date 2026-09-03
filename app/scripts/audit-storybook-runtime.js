const fs = require('fs');
const http = require('http');
const path = require('path');
const { chromium } = require('playwright');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const staticRoot = path.join(appRoot, 'storybook-static');
const reportPath = path.join(repoRoot, 'tmp', 'q02-story-render-report.json');
const legacyReportPath = path.join(repoRoot, 'tmp', 'q02-story-runtime-report.json');
const screenshotRoot = path.join(repoRoot, 'tmp', 'q02-story-render-failures');
const traceRoot = path.join(screenshotRoot, 'traces');
const concurrency = Number(process.env.Q_RUNTIME_CONCURRENCY || 4);
const entryTimeout = Number(process.env.Q_RUNTIME_ENTRY_TIMEOUT || 15_000);
const settleMs = Number(process.env.Q_RUNTIME_SETTLE_MS || 250);

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function parseArgs(argv) {
  const options = { kinds: new Set(['story', 'docs']), limit: null };
  for (const argument of argv) {
    if (argument.startsWith('--kind=')) {
      options.kinds = new Set(argument.slice(7).split(','));
    } else if (argument.startsWith('--limit=')) {
      options.limit = Number(argument.slice(8));
    } else {
      throw new Error(`Unknown runtime-audit argument: ${argument}`);
    }
  }
  return options;
}

function createStaticServer() {
  return http.createServer((request, response) => {
    const requestUrl = new URL(request.url, 'http://127.0.0.1');
    const relativePath =
      requestUrl.pathname === '/'
        ? 'index.html'
        : decodeURIComponent(requestUrl.pathname).replace(/^\/+/, '');
    const filePath = path.resolve(staticRoot, relativePath);

    if (
      filePath !== staticRoot &&
      !filePath.startsWith(`${staticRoot}${path.sep}`)
    ) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      response.writeHead(404, {
        'cache-control': 'no-store',
        'content-type': 'text/plain; charset=utf-8',
      });
      response.end('Not found');
      return;
    }
    response.writeHead(200, {
      'cache-control': 'no-store',
      'content-type':
        mimeTypes[path.extname(filePath).toLowerCase()] ||
        'application/octet-stream',
    });
    fs.createReadStream(filePath).pipe(response);
  });
}

function listen(server) {
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      resolve(`http://127.0.0.1:${address.port}`);
    });
  });
}

function close(server) {
  return new Promise(resolve => server.close(resolve));
}

function normalizeMessage(value) {
  return String(value).replace(/\s+/g, ' ').trim().slice(0, 2000);
}

async function inspectEntry(page, baseUrl, entry, attempt) {
  const startedAt = Date.now();
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  const httpErrors = [];
  const externalRequests = [];
  const localOrigin = new URL(baseUrl).origin;

  const onConsole = message => {
    if (message.type() === 'error') consoleErrors.push(normalizeMessage(message.text()));
  };
  const onPageError = error => pageErrors.push(normalizeMessage(error.message));
  const onRequestFailed = request => {
    const url = request.url();
    if (url.startsWith(localOrigin)) {
      failedRequests.push(`${request.failure()?.errorText || 'failed'} ${url}`);
    }
  };
  const onResponse = response => {
    if (response.status() >= 400) {
      httpErrors.push(`${response.status()} ${response.url()}`);
    }
  };
  page.on('console', onConsole);
  page.on('pageerror', onPageError);
  page.on('requestfailed', onRequestFailed);
  page.on('response', onResponse);

  await page.route('**/*', async route => {
    const url = route.request().url();
    if (
      url.startsWith(localOrigin) ||
      url.startsWith('data:') ||
      url.startsWith('blob:')
    ) {
      await route.continue();
    } else {
      externalRequests.push(url);
      await route.abort('blockedbyclient');
    }
  });

  let responseStatus = null;
  let renderState = null;
  let bodyError = null;
  let rootChildCount = 0;
  let rootTextLength = 0;
  let screenshot = null;
  let navigationError = null;
  const viewMode = entry.type === 'docs' ? 'docs' : 'story';
  const url = `${baseUrl}/iframe.html?id=${encodeURIComponent(
    entry.id,
  )}&viewMode=${viewMode}`;

  try {
    const response = await page.goto(url, {
      timeout: entryTimeout,
      waitUntil: 'domcontentloaded',
    });
    responseStatus = response?.status() ?? null;
    await page.waitForTimeout(settleMs);
    await page
      .waitForFunction(
        type => {
          const root =
            type === 'docs'
              ? document.querySelector('#storybook-docs')
              : document.querySelector('#storybook-root');
          const bodyText = document.body?.innerText || '';
          return (
            (root?.childElementCount || 0) > 0 ||
            bodyText.includes('The component failed to render properly') ||
            bodyText.includes('Error rendering story')
          );
        },
        entry.type,
        { timeout: 5_000 },
      )
      .catch(() => {});
    const state = await page.evaluate(type => {
      const root =
        type === 'docs'
          ? document.querySelector('#storybook-docs')
          : document.querySelector('#storybook-root');
      const bodyText = document.body?.innerText || '';
      const errorPatterns = [
        'Failed to fetch dynamically imported module',
        'The component failed to render properly',
        'Error rendering story',
        'Unable to find story',
      ];
      return {
        bodyError: errorPatterns.find(pattern => bodyText.includes(pattern)) || null,
        bodyText: bodyText.slice(0, 3000),
        rootChildCount: root?.childElementCount || 0,
        rootTextLength: (root?.textContent || '').trim().length,
        rootHasVisual:
          Boolean(root?.querySelector('svg, img, canvas, input, button, table, [role]')) ||
          (root?.childElementCount || 0) > 0,
      };
    }, entry.type);
    bodyError = state.bodyError;
    rootChildCount = state.rootChildCount;
    rootTextLength = state.rootTextLength;
    renderState =
      responseStatus === 200 &&
      !bodyError &&
      pageErrors.length === 0 &&
      consoleErrors.length === 0 &&
      failedRequests.length === 0 &&
      httpErrors.length === 0 &&
      state.rootHasVisual
        ? 'passed'
        : 'failed';
  } catch (error) {
    navigationError = normalizeMessage(error.message);
    renderState = 'failed';
  } finally {
    await page.unroute('**/*');
    page.off('console', onConsole);
    page.off('pageerror', onPageError);
    page.off('requestfailed', onRequestFailed);
    page.off('response', onResponse);
  }

  if (renderState === 'failed') {
    fs.mkdirSync(screenshotRoot, { recursive: true });
    screenshot = path.join(
      screenshotRoot,
      `${entry.id.replace(/[^a-z0-9_-]+/gi, '_')}-attempt-${attempt}.png`,
    );
    await page.screenshot({ fullPage: true, path: screenshot }).catch(() => {
      screenshot = null;
    });
  }

  return {
    id: entry.id,
    title: entry.title,
    name: entry.name,
    type: entry.type,
    importPath: entry.importPath,
    attempt,
    status: renderState,
    durationMs: Date.now() - startedAt,
    responseStatus,
    rootChildCount,
    rootTextLength,
    bodyError,
    navigationError,
    consoleErrors: [...new Set(consoleErrors)],
    pageErrors: [...new Set(pageErrors)],
    failedRequests: [...new Set(failedRequests)],
    httpErrors: [...new Set(httpErrors)],
    externalRequests: [...new Set(externalRequests)],
    screenshot,
  };
}

async function runEntries(browser, baseUrl, entries) {
  const context = await browser.newContext({
    locale: 'ru-RU',
    viewport: { height: 900, width: 1440 },
  });
  const queue = [...entries];
  const results = [];

  async function worker() {
    const page = await context.newPage();
    while (queue.length) {
      const entry = queue.shift();
      results.push(await inspectEntry(page, baseUrl, entry, 1));
    }
    await page.close();
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, entries.length) }, worker),
  );
  await context.close();
  return { results, traces: [] };
}

async function retryFailures(browser, baseUrl, results, entriesById) {
  const failures = results.filter(result => result.status === 'failed');
  if (!failures.length) return { results: [], traces: [] };
  const retries = [];
  const traces = [];
  for (const failure of failures) {
    const context = await browser.newContext({
      locale: 'ru-RU',
      viewport: { height: 900, width: 1440 },
    });
    await context.tracing.start({ screenshots: true, snapshots: true, sources: false });
    const page = await context.newPage();
    const retry = await inspectEntry(page, baseUrl, entriesById.get(failure.id), 2);
    retries.push(retry);
    fs.mkdirSync(traceRoot, { recursive: true });
    const trace = path.join(
      traceRoot,
      `${failure.id.replace(/[^a-z0-9_-]+/gi, '_')}-retry.zip`,
    );
    await context.tracing.stop({ path: trace });
    traces.push(trace);
    await context.close();
  }
  return { results: retries, traces };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const indexPath = path.join(staticRoot, 'index.json');
  if (!fs.existsSync(indexPath)) {
    throw new Error('Static Storybook is missing. Run storybook:local:build first.');
  }
  const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  let entries = Object.values(index.entries || {}).filter(entry =>
    options.kinds.has(entry.type),
  );
  if (options.limit) entries = entries.slice(0, options.limit);
  const entriesById = new Map(entries.map(entry => [entry.id, entry]));
  const server = createStaticServer();
  const baseUrl = await listen(server);
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const startedAt = Date.now();

  try {
    fs.rmSync(screenshotRoot, { force: true, recursive: true });
    const firstPassRun = await runEntries(browser, baseUrl, entries);
    const firstPass = firstPassRun.results;
    const retryRun = await retryFailures(browser, baseUrl, firstPass, entriesById);
    const retries = retryRun.results;
    const retriesById = new Map(retries.map(result => [result.id, result]));
    const finalResults = firstPass.map(result => retriesById.get(result.id) || result);
    const failures = finalResults.filter(result => result.status === 'failed');
    const report = {
      status: failures.length ? 'failed' : 'passed',
      generatedAt: new Date().toISOString(),
      baseUrl,
      browser: 'installed Chrome',
      viewport: { height: 900, width: 1440 },
      networkPolicy: 'localhost/data/blob allowed; all external requests blocked',
      entries: finalResults.length,
      stories: finalResults.filter(result => result.type === 'story').length,
      docs: finalResults.filter(result => result.type === 'docs').length,
      passed: finalResults.length - failures.length,
      failed: failures.length,
      retried: retries.length,
      traces: [...firstPassRun.traces, ...retryRun.traces],
      initialFailures: firstPass.filter(result => result.status === 'failed'),
      durationMs: Date.now() - startedAt,
      consoleErrorEntries: finalResults.filter(result => result.consoleErrors.length)
        .length,
      pageErrorEntries: finalResults.filter(result => result.pageErrors.length).length,
      externalRequestEntries: finalResults.filter(
        result => result.externalRequests.length,
      ).length,
      failures,
      results: finalResults,
    };
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
    fs.writeFileSync(legacyReportPath, `${JSON.stringify(report, null, 2)}\n`);
    console.log(`Storybook runtime audit: ${report.status}`);
    console.log(
      `Entries: ${report.entries}; stories: ${report.stories}; docs: ${report.docs}`,
    );
    console.log(
      `Passed: ${report.passed}; failed: ${report.failed}; retried: ${report.retried}`,
    );
    console.log(`Report: ${reportPath}`);
    if (report.status !== 'passed') process.exitCode = 1;
  } finally {
    await browser.close();
    await close(server);
  }
}

main().catch(error => {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
});
