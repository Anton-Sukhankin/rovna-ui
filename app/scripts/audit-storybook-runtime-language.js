const fs = require('fs');
const http = require('http');
const path = require('path');
const { chromium } = require('playwright');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const staticRoot = path.join(appRoot, 'storybook-static');
const reportPath = path.join(repoRoot, 'docs', 'q08-runtime-language-report.json');
const allowlistPath = path.join(repoRoot, 'docs', 'storybook-language-allowlist.json');
const allowlist = JSON.parse(fs.readFileSync(allowlistPath, 'utf8'));
const runtimeI18nStories = new Set(
  allowlist.runtimeI18nStories.map(entry => entry.id),
);
const concurrency = Number(process.env.Q_LANGUAGE_CONCURRENCY || 6);
const timeout = Number(process.env.Q_LANGUAGE_TIMEOUT || 15_000);

const englishUiTerms = [
  'add',
  'apply',
  'back',
  'cancel',
  'clear',
  'close',
  'confirm',
  'delete',
  'download',
  'edit',
  'error',
  'loading',
  'next',
  'previous',
  'remove',
  'reset',
  'save',
  'search',
  'select',
  'submit',
  'success',
  'upload',
];
const technicalAllowlist = new Set([
  'api',
  'css',
  'html',
  'http',
  'https',
  'id',
  'json',
  'react',
  'storybook',
  'tend',
  'ui',
  'url',
]);

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

function createServer() {
  return http.createServer((request, response) => {
    const pathname = decodeURIComponent(
      new URL(request.url, 'http://127.0.0.1').pathname,
    );
    const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
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
        mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
    });
    fs.createReadStream(filePath).pipe(response);
  });
}

function listen(server) {
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () =>
      resolve(`http://127.0.0.1:${server.address().port}`),
    );
  });
}

function close(server) {
  return new Promise(resolve => server.close(resolve));
}

function hasLikelyMojibake(text) {
  if (/[\uFFFD\u00C2\u00D0\u00D1]/u.test(text)) return true;
  const cyrillic = text.match(/[\u0400-\u04FF]/gu) || [];
  if (cyrillic.length < 12) return false;
  const suspicious = cyrillic.filter(character => character === 'Р' || character === 'С');
  return suspicious.length / cyrillic.length > 0.28;
}

function findEnglishUiTerms(text) {
  const normalized = text.toLowerCase();
  return englishUiTerms.filter(term => {
    if (technicalAllowlist.has(term)) return false;
    return new RegExp(`\\b${term}\\b`, 'i').test(normalized);
  });
}

async function auditStory(page, baseUrl, entry) {
  const startedAt = Date.now();
  const errors = [];
  const onPageError = error => errors.push(error.message);
  page.on('pageerror', onPageError);
  try {
    await page.goto(
      `${baseUrl}/iframe.html?id=${encodeURIComponent(entry.id)}&viewMode=story`,
      { timeout, waitUntil: 'domcontentloaded' },
    );
    await page.waitForFunction(
      () => (document.querySelector('#storybook-root')?.childElementCount || 0) > 0,
      null,
      { timeout },
    );
    await page.waitForTimeout(600);
    const text = await page.evaluate(() => document.body.innerText.replace(/\s+/g, ' ').trim());
    const mojibake = hasLikelyMojibake(text);
    const detectedEnglishTerms = findEnglishUiTerms(text);
    const allowlistedEnglish = runtimeI18nStories.has(entry.id);
    const englishTerms = allowlistedEnglish ? [] : detectedEnglishTerms;
    const relevantErrors = errors.filter(error => !/The user aborted a request\.?/i.test(error));
    return {
      id: entry.id,
      title: entry.title,
      name: entry.name,
      status:
        mojibake || englishTerms.length
          ? 'language-finding'
          : relevantErrors.length
            ? 'runtime-warning'
            : 'passed',
      mojibake,
      englishTerms,
      allowlistedEnglish,
      allowlistedEnglishTerms: allowlistedEnglish ? detectedEnglishTerms : [],
      errors: relevantErrors,
      sample: text.slice(0, 500),
      durationMs: Date.now() - startedAt,
    };
  } catch (error) {
    return {
      id: entry.id,
      title: entry.title,
      name: entry.name,
      status: 'failed',
      mojibake: false,
      englishTerms: [],
      errors: [error instanceof Error ? error.message : String(error)],
      sample: '',
      durationMs: Date.now() - startedAt,
    };
  } finally {
    page.off('pageerror', onPageError);
  }
}

async function main() {
  const startedAt = Date.now();
  const index = JSON.parse(fs.readFileSync(path.join(staticRoot, 'index.json'), 'utf8'));
  const entries = Object.values(index.entries || {}).filter(entry => entry.type === 'story');
  const server = createServer();
  const baseUrl = await listen(server);
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = new Array(entries.length);
  let cursor = 0;

  try {
    await Promise.all(
      Array.from({ length: Math.min(concurrency, entries.length) }, async () => {
        const context = await browser.newContext({ locale: 'ru-RU' });
        await context.route('**/*', route => {
          const url = new URL(route.request().url());
          if (url.hostname === '127.0.0.1') return route.continue();
          return route.abort('blockedbyclient');
        });
        const page = await context.newPage();
        while (cursor < entries.length) {
          const indexValue = cursor++;
          results[indexValue] = await auditStory(page, baseUrl, entries[indexValue]);
          if ((indexValue + 1) % 100 === 0) {
            console.log(`Runtime language progress: ${indexValue + 1}/${entries.length}`);
          }
        }
        await context.close();
      }),
    );
  } finally {
    await browser.close();
    await close(server);
  }

  const failures = results.filter(result => result.status === 'failed');
  const runtimeWarnings = results.filter(result => result.status === 'runtime-warning');
  const mojibake = results.filter(result => result.mojibake);
  const english = results.filter(result => result.englishTerms.length);
  const report = {
    status: failures.length || mojibake.length || english.length ? 'findings' : 'passed',
    generatedAt: new Date().toISOString(),
    durationMs: Date.now() - startedAt,
    locale: 'ru-RU',
    stories: entries.length,
    audited: results.length,
    failures: failures.length,
    runtimeWarnings: runtimeWarnings.length,
    mojibakeFindings: mojibake.length,
    englishUiFindings: english.length,
    rules: {
      primaryLanguage: 'ru',
      externalRequests: 'blocked',
      englishTerms: englishUiTerms,
      allowlist: path.relative(repoRoot, allowlistPath).replace(/\\/g, '/'),
      explicitI18nStories: runtimeI18nStories.size,
      builtInStoryInteractions: 'executed by Storybook before the 600 ms settled DOM capture',
      faker: 'not used in story files; fixed deterministic fixtures are required',
      dayjs: "preview explicitly calls dayjs.locale('ru')",
    },
    findings: results.filter(result => result.status !== 'passed'),
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Runtime language audit: ${report.status}`);
  console.log(`Stories: ${report.audited}/${report.stories}`);
  console.log(
    `Failures: ${report.failures}; mojibake: ${report.mojibakeFindings}; English UI: ${report.englishUiFindings}`,
  );
  console.log(`Report: ${reportPath}`);
  if (failures.length || mojibake.length) process.exitCode = 1;
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
