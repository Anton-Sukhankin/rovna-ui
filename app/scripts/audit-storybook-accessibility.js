const fs = require('fs');
const http = require('http');
const path = require('path');
const { chromium } = require('playwright');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const staticRoot = path.join(appRoot, 'storybook-static');
const reportPath = path.join(repoRoot, 'docs', 'accessibility-full-report.json');
const axeSource = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const concurrency = Number(process.env.Q_A11Y_CONCURRENCY || 8);
const timeout = Number(process.env.Q_A11Y_TIMEOUT || 20_000);

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
  const options = { limit: null, retryFailed: false, storyId: null };
  for (const argument of argv) {
    if (argument.startsWith('--limit=')) options.limit = Number(argument.slice(8));
    else if (argument.startsWith('--story=')) options.storyId = argument.slice(8);
    else if (argument === '--retry-failed') options.retryFailed = true;
    else throw new Error(`Unknown accessibility-audit argument: ${argument}`);
  }
  return options;
}

function createServer() {
  return http.createServer((request, response) => {
    const requestUrl = new URL(request.url, 'http://127.0.0.1');
    const relativePath =
      requestUrl.pathname === '/'
        ? 'index.html'
        : decodeURIComponent(requestUrl.pathname).replace(/^\/+/, '');
    const filePath = path.resolve(staticRoot, relativePath);
    if (
      !filePath.startsWith(`${staticRoot}${path.sep}`) ||
      !fs.existsSync(filePath) ||
      fs.statSync(filePath).isDirectory()
    ) {
      response.writeHead(404);
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
      resolve(`http://127.0.0.1:${server.address().port}`);
    });
  });
}

function close(server) {
  return new Promise(resolve => server.close(resolve));
}

function compactResult(result) {
  return {
    id: result.id,
    impact: result.impact || 'unknown',
    description: result.description,
    help: result.help,
    helpUrl: result.helpUrl,
    tags: result.tags,
    nodes: result.nodes.map(node => ({
      impact: node.impact || 'unknown',
      target: node.target,
      html: node.html.slice(0, 1000),
      failureSummary: node.failureSummary,
    })),
  };
}

async function waitForStableStory(page) {
  await page.waitForFunction(
    () => (document.querySelector('#storybook-root')?.childElementCount || 0) > 0,
    { timeout: 8_000 },
  );
  await page.waitForFunction(
    () => {
      const render = window.__STORYBOOK_PREVIEW__?.currentRender;
      return !render || ['finished', 'aborted', 'errored'].includes(render.phase);
    },
    { timeout: 12_000 },
  );
  const renderPhase = await page.evaluate(
    () => window.__STORYBOOK_PREVIEW__?.currentRender?.phase ?? 'finished',
  );
  if (renderPhase !== 'finished') {
    throw new Error(`Storybook interaction ended in phase: ${renderPhase}`);
  }
  await page.evaluate(
    ({ quietMs, maximumMs }) =>
      new Promise(resolve => {
        const root = document.querySelector('#storybook-root');
        if (!root) {
          resolve();
          return;
        }

        let quietTimer;
        const observer = new MutationObserver(() => {
          clearTimeout(quietTimer);
          quietTimer = setTimeout(finish, quietMs);
        });
        const maximumTimer = setTimeout(finish, maximumMs);

        function finish() {
          clearTimeout(quietTimer);
          clearTimeout(maximumTimer);
          observer.disconnect();
          resolve();
        }

        observer.observe(root, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true,
        });
        quietTimer = setTimeout(finish, quietMs);
      }),
    { quietMs: 200, maximumMs: 1_000 },
  );
}

async function auditStory(page, baseUrl, entry) {
  const startedAt = Date.now();
  const externalRequests = [];
  const pageErrors = [];
  const interactionErrors = [];
  const origin = new URL(baseUrl).origin;
  const onPageError = error => pageErrors.push(error.message);
  const onConsole = message => {
    const value = message.text();
    if (message.type() === 'error' && /expect\(|received element is not/i.test(value)) {
      interactionErrors.push(value.slice(0, 2_000));
    }
  };
  page.on('pageerror', onPageError);
  page.on('console', onConsole);
  await page.route('**/*', async route => {
    const url = route.request().url();
    if (
      url.startsWith(origin) ||
      url.startsWith('data:') ||
      url.startsWith('blob:')
    ) {
      await route.continue();
    } else {
      externalRequests.push(url);
      await route.abort('blockedbyclient');
    }
  });

  try {
    await page.goto(
      `${baseUrl}/iframe.html?id=${encodeURIComponent(entry.id)}&viewMode=story`,
      { timeout, waitUntil: 'domcontentloaded' },
    );
    await page.waitForSelector('#storybook-root', {
      state: 'attached',
      timeout: 8_000,
    });
    await waitForStableStory(page);
    if (interactionErrors.length) {
      throw new Error(`Storybook interaction failed: ${interactionErrors[0]}`);
    }
    await page.evaluate(() => document.fonts?.ready);
    await page.addScriptTag({ content: axeSource });
    let axeResult = null;
    for (let attempt = 1; attempt <= 8; attempt += 1) {
      try {
        axeResult = await page.evaluate(async () => {
          return window.axe.run('#storybook-root', {
            resultTypes: ['violations', 'passes', 'incomplete'],
            runOnly: {
              type: 'tag',
              values: [
                'wcag2a',
                'wcag2aa',
                'wcag21a',
                'wcag21aa',
                'best-practice',
              ],
            },
          });
        });
        break;
      } catch (error) {
        if (!error.message.includes('Axe is already running') || attempt === 8) {
          throw error;
        }
        await page.waitForTimeout(250);
      }
    }
    return {
      id: entry.id,
      title: entry.title,
      name: entry.name,
      importPath: entry.importPath,
      status: 'passed',
      durationMs: Date.now() - startedAt,
      violations: axeResult.violations.map(compactResult),
      passes: axeResult.passes.length,
      incomplete: axeResult.incomplete.map(compactResult),
      externalRequests: [...new Set(externalRequests)],
      pageErrors: [...new Set(pageErrors)],
      interactionErrors: [...new Set(interactionErrors)],
    };
  } catch (error) {
    return {
      id: entry.id,
      title: entry.title,
      name: entry.name,
      importPath: entry.importPath,
      status: 'failed',
      durationMs: Date.now() - startedAt,
      error: error.message,
      violations: [],
      passes: 0,
      incomplete: [],
      externalRequests: [...new Set(externalRequests)],
      pageErrors: [...new Set(pageErrors)],
      interactionErrors: [...new Set(interactionErrors)],
    };
  } finally {
    await page.unroute('**/*');
    page.off('pageerror', onPageError);
    page.off('console', onConsole);
  }
}

function summarize(results) {
  const rules = new Map();
  const impacts = {};
  let violationCount = 0;
  let violationNodeCount = 0;

  for (const result of results) {
    for (const violation of result.violations) {
      violationCount += 1;
      violationNodeCount += violation.nodes.length;
      impacts[violation.impact] = (impacts[violation.impact] || 0) + 1;
      const current = rules.get(violation.id) || {
        id: violation.id,
        impact: violation.impact,
        stories: 0,
        nodes: 0,
        help: violation.help,
        helpUrl: violation.helpUrl,
      };
      current.stories += 1;
      current.nodes += violation.nodes.length;
      rules.set(violation.id, current);
    }
  }

  return {
    stories: results.length,
    passedAudits: results.filter(result => result.status === 'passed').length,
    failedAudits: results.filter(result => result.status === 'failed').length,
    storiesWithViolations: results.filter(result => result.violations.length).length,
    storiesWithCriticalOrSerious: results.filter(result =>
      result.violations.some(violation =>
        ['critical', 'serious'].includes(violation.impact),
      ),
    ).length,
    violationCount,
    violationNodeCount,
    impacts,
    rules: [...rules.values()].sort(
      (first, second) => second.stories - first.stories,
    ),
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const index = JSON.parse(
    fs.readFileSync(path.join(staticRoot, 'index.json'), 'utf8'),
  );
  let entries = Object.values(index.entries || {}).filter(
    entry => entry.type === 'story',
  );
  const previousReport =
    options.retryFailed && fs.existsSync(reportPath)
      ? JSON.parse(fs.readFileSync(reportPath, 'utf8'))
      : null;
  if (options.retryFailed) {
    const failedIds = new Set(
      (previousReport?.results || [])
        .filter(result => result.status === 'failed')
        .map(result => result.id),
    );
    entries = entries.filter(entry => failedIds.has(entry.id));
  }
  if (options.storyId) entries = entries.filter(entry => entry.id === options.storyId);
  if (options.limit) entries = entries.slice(0, options.limit);

  const server = createServer();
  const baseUrl = await listen(server);
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({
    locale: 'ru-RU',
    viewport: { height: 900, width: 1440 },
  });
  const queue = [...entries];
  const results = [];
  const startedAt = Date.now();

  try {
    const worker = async () => {
      const page = await context.newPage();
      while (queue.length) {
        results.push(await auditStory(page, baseUrl, queue.shift()));
      }
      await page.close();
    };
    await Promise.all(
      Array.from({ length: Math.min(concurrency, entries.length) }, worker),
    );
  } finally {
    await context.close();
    await browser.close();
    await close(server);
  }

  if (previousReport) {
    const refreshedIds = new Set(results.map(result => result.id));
    results.push(
      ...previousReport.results.filter(result => !refreshedIds.has(result.id)),
    );
  }
  results.sort((first, second) => first.id.localeCompare(second.id));
  const summary = summarize(results);
  const report = {
    status:
      summary.failedAudits === 0 && summary.storiesWithViolations === 0
        ? 'passed'
        : 'failed',
    generatedAt: new Date().toISOString(),
    tool: `axe-core ${require('axe-core/package.json').version}`,
    browser: 'installed Chrome',
    viewport: { height: 900, width: 1440 },
    scope: 'initial rendered state of every Storybook story',
    durationMs: Date.now() - startedAt,
    summary,
    failedStories: results.filter(result => result.status === 'failed'),
    criticalOrSeriousStories: results
      .filter(result =>
        result.violations.some(violation =>
          ['critical', 'serious'].includes(violation.impact),
        ),
      )
      .map(result => ({
        id: result.id,
        title: result.title,
        name: result.name,
        rules: result.violations
          .filter(violation => ['critical', 'serious'].includes(violation.impact))
          .map(violation => violation.id),
      })),
    results,
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Storybook accessibility audit: ${report.status}`);
  console.log(
    `Stories: ${summary.stories}; audited: ${summary.passedAudits}; failed: ${summary.failedAudits}`,
  );
  console.log(
    `Stories with violations: ${summary.storiesWithViolations}; critical/serious: ${summary.storiesWithCriticalOrSerious}`,
  );
  console.log(`Violation nodes: ${summary.violationNodeCount}`);
  console.log(`Report: ${reportPath}`);
  if (summary.failedAudits || summary.storiesWithViolations) process.exitCode = 1;
}

main().catch(error => {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
});
