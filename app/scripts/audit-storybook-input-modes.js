const fs = require('fs');
const http = require('http');
const path = require('path');
const { chromium, firefox, webkit } = require('playwright');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const staticRoot = path.join(appRoot, 'storybook-static');
const reportPath = path.join(repoRoot, 'docs', 'q07-input-modes-report.json');

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function isKnownFirefoxDiagnostic(message, blockedRequests) {
  if (/downloadable font: (?:kern: Unsupported table version|Table discarded).*Museo Sans Cyrl/i.test(message)) {
    return true;
  }
  if (/^The operation was aborted\.\s*$/i.test(message)) {
    return true;
  }
  return blockedRequests.length > 0 && /(?:NS_BINDING_ABORTED|blockedbyclient)/i.test(message);
}

function createServer() {
  return http.createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    const filePath = path.resolve(staticRoot, relativePath);
    if (
      !filePath.startsWith(`${staticRoot}${path.sep}`) ||
      !fs.existsSync(filePath) ||
      fs.statSync(filePath).isDirectory()
    ) {
      response.writeHead(404, { 'cache-control': 'no-store' });
      response.end('Not found');
      return;
    }
    response.writeHead(200, {
      'cache-control': 'no-store',
      'content-type': mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
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

async function openStory(page, baseUrl, storyId) {
  await page.goto(`${baseUrl}/iframe.html?id=${encodeURIComponent(storyId)}&viewMode=story`, {
    waitUntil: 'domcontentloaded',
    timeout: 20_000,
  });
  await page.waitForFunction(
    () => (document.querySelector('#storybook-root')?.childElementCount || 0) > 0,
    null,
    { timeout: 20_000 },
  );
  await page.waitForTimeout(1200);
  const errorText = await page.locator('body').innerText();
  assert(!/Failed to fetch dynamically imported module|The component failed to render|The component failed to render properly/i.test(errorText), `Storybook error screen in ${storyId}`);
}

async function waitForVisibleExactText(page, text) {
  await page.waitForFunction(
    expected =>
      [...document.querySelectorAll('body *')].some(element => {
        if (element.textContent?.trim() !== expected) return false;
        if ('checkVisibility' in element) {
          return element.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
        }
        const style = getComputedStyle(element);
        return style.display !== 'none' && style.visibility !== 'hidden' && element.getClientRects().length > 0;
      }),
    text,
    { timeout: 10_000 },
  );
}

async function runScenario(browser, baseUrl, definition) {
  let context;
  const errors = [];
  const diagnostics = [];
  const blockedRequests = [];
  const startedAt = Date.now();
  try {
    context = await browser.newContext({
      locale: 'ru-RU',
      viewport: definition.viewport || { width: 1440, height: 900 },
      hasTouch: definition.hasTouch || false,
    });
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.hostname === '127.0.0.1') return route.continue();
      blockedRequests.push(route.request().url());
      return route.abort('blockedbyclient');
    });
    const page = await context.newPage();
    page.on('pageerror', error => {
      if (definition.browser === 'firefox' && isKnownFirefoxDiagnostic(error.message, blockedRequests)) {
        diagnostics.push(error.message);
      } else {
        errors.push(error.stack || error.message);
      }
    });
    page.on('console', message => {
      if (message.type() === 'error' && !/The user aborted a request/.test(message.text())) {
        if (definition.browser === 'firefox' && isKnownFirefoxDiagnostic(message.text(), blockedRequests)) {
          diagnostics.push(message.text());
        } else {
          errors.push(message.text());
        }
      }
    });
    await definition.run(page, baseUrl);
    assert(errors.length === 0, errors.join('\n'));
    return {
      id: definition.id,
      browser: definition.browser,
      input: definition.input,
      storyId: definition.storyId,
      status: 'passed',
      durationMs: Date.now() - startedAt,
      errors: [],
      diagnostics: [...new Set(diagnostics)],
      blockedRequests: [...new Set(blockedRequests)],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const environmentBlocked =
      definition.browser === 'firefox' &&
      /browserContext\.newPage: Cannot read properties of undefined \(reading '_page'\)/.test(message);
    return {
      id: definition.id,
      browser: definition.browser,
      input: definition.input,
      storyId: definition.storyId,
      status: environmentBlocked ? 'blocked-environment' : 'failed',
      durationMs: Date.now() - startedAt,
      errors: [...new Set(message === errors.join('\n') ? errors : [...errors, message])],
      diagnostics: [...new Set(diagnostics)],
      blockedRequests: [...new Set(blockedRequests)],
    };
  } finally {
    if (context) await context.close();
  }
}

const scenarios = [
  {
    id: 'mouse-hover-click',
    browser: 'chromium',
    input: 'mouse',
    storyId: 'rovna-ui-primitives-button--secondary',
    async run(page, baseUrl) {
      await openStory(page, baseUrl, this.storyId);
      const button = page.getByRole('button', { name: 'Кнопка' });
      await button.hover();
      assert(await button.evaluate(element => element.matches(':hover')), 'Button hover state was not activated');
      await button.click();
    },
  },
  {
    id: 'mouse-context-menu',
    browser: 'chromium',
    input: 'mouse',
    storyId: 'rovna-ui-table-contextmenu--default',
    async run(page, baseUrl) {
      await openStory(page, baseUrl, this.storyId);
      await page.getByRole('button', { name: 'Открыть меню столбца' }).click();
      await waitForVisibleExactText(page, 'Закрепить');
      await waitForVisibleExactText(page, 'Скрыть');
    },
  },
  {
    id: 'pointer-tree-dnd',
    browser: 'chromium',
    input: 'mouse-drag',
    storyId: 'rovna-ui-tree-tree--can-drop-node',
    async run(page, baseUrl) {
      await openStory(page, baseUrl, this.storyId);
      const item = page.getByRole('treeitem').first();
      const box = await item.boundingBox();
      assert(box, 'Tree drag source has no bounding box');
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height + 24, { steps: 8 });
      await page.waitForTimeout(150);
      const opacity = Number(await item.evaluate(element => getComputedStyle(element).opacity));
      assert(opacity < 1, 'Tree PointerSensor did not enter dragging state');
      await page.mouse.up();
    },
  },
  {
    id: 'touch-drawer',
    browser: 'chromium',
    input: 'touch',
    storyId: 'rovna-ui-primitives-drawer--full-screen',
    hasTouch: true,
    viewport: { width: 390, height: 844 },
    async run(page, baseUrl) {
      await openStory(page, baseUrl, this.storyId);
      await page.getByRole('button', { name: 'Открыть' }).tap();
      await page.getByRole('heading', { name: 'Заголовок' }).waitFor({ state: 'visible' });
      await page.getByRole('button', { name: 'Закрыть' }).tap();
    },
  },
  {
    id: 'touch-menu',
    browser: 'chromium',
    input: 'touch',
    storyId: 'rovna-ui-header-samoletheader--mobile',
    hasTouch: true,
    viewport: { width: 390, height: 844 },
    async run(page, baseUrl) {
      await openStory(page, baseUrl, this.storyId);
      await page.getByRole('button', { name: 'Открыть меню' }).tap();
      const closeButton = page
        .locator('#storybook-root')
        .getByRole('button', { name: 'Закрыть меню' });
      await closeButton.waitFor({ state: 'visible' });
      assert((await closeButton.getAttribute('aria-expanded')) === 'true', 'Mobile menu did not enter the open state');
    },
  },
  {
    id: 'touch-select',
    browser: 'chromium',
    input: 'touch',
    storyId: 'rovna-ui-main-primitives-select--medium',
    hasTouch: true,
    viewport: { width: 390, height: 844 },
    async run(page, baseUrl) {
      await openStory(page, baseUrl, this.storyId);
      await page.getByRole('combobox').tap();
      await page.getByTitle('Вариант 1').filter({ visible: true }).first().tap();
      await waitForVisibleExactText(page, 'Вариант 1');
    },
  },
  {
    id: 'touch-upload-filechooser',
    browser: 'chromium',
    input: 'touch-filechooser',
    storyId: 'rovna-ui-upload-uploadarea--description',
    hasTouch: true,
    viewport: { width: 390, height: 844 },
    async run(page, baseUrl) {
      await openStory(page, baseUrl, this.storyId);
      const chooserPromise = page.waitForEvent('filechooser');
      await page.getByRole('button', { name: /Перетащите файл/i }).tap();
      const chooser = await chooserPromise;
      await chooser.setFiles({ name: 'сенсорная-проверка.txt', mimeType: 'text/plain', buffer: Buffer.from('ok') });
      await page
        .getByText('сенсорная-проверка Hello World.txt', { exact: false })
        .waitFor({ state: 'visible' });
    },
  },
  ...[
    'rovna-ui-primitives-button--primary',
    'rovna-ui-primitives-drawer--default',
    'rovna-ui-main-primitives-select--large',
    'rovna-ui-main-primitives-modal--keyboard-accessibility',
    'rovna-ui-filters-filters--keyboard-accessibility',
    'rovna-ui-table-table--keyboard-accessibility',
    'rovna-ui-table-contextmenu--default',
    'rovna-ui-columns-settings-drawercolumnssettings--default',
    'rovna-ui-tree-tree--draggable',
    'rovna-ui-upload-uploadarea--keyboard-accessibility',
    'rovna-ui-header-samoletheader--not-authenticated',
  ].map(storyId => ({
    id: `firefox-risk-${storyId}`,
    browser: 'firefox',
    input: 'render-and-built-in-play',
    storyId,
    async run(page, baseUrl) {
      await openStory(page, baseUrl, this.storyId);
    },
  })),
  ...['firefox', 'webkit'].map(browserName => ({
    id: `file-input-${browserName}`,
    browser: browserName,
    input: 'file-input',
    storyId: 'rovna-ui-upload-uploadarea--description',
    async run(page, baseUrl) {
      await openStory(page, baseUrl, this.storyId);
      const fileName = `проверка-${browserName}.txt`;
      await page.locator('input[type=file]').setInputFiles({
        name: fileName,
        mimeType: 'text/plain',
        buffer: Buffer.from('ok'),
      });
      const uploadedFileName = fileName.replace('.txt', ' Hello World.txt');
      await page
        .getByText(uploadedFileName, { exact: false })
        .waitFor({ state: 'visible' });
    },
  })),
];

async function main() {
  const startedAt = Date.now();
  const server = createServer();
  const baseUrl = await listen(server);
  const launchers = { chromium, firefox, webkit };
  const browsers = {};
  const browserVersions = {};
  const browserLaunchErrors = {};
  const environmentBlockers = {};
  const results = [];
  try {
    for (const browserName of [...new Set(scenarios.map(scenario => scenario.browser))]) {
      try {
        const launchOptions = browserName === 'chromium'
          ? { channel: 'chrome', headless: true }
          : browserName === 'firefox'
            ? {
                headless: true,
                env: {
                  ...process.env,
                  MOZ_DISABLE_CONTENT_SANDBOX: '1',
                  MOZ_DISABLE_GMP_SANDBOX: '1',
                  MOZ_DISABLE_RDD_SANDBOX: '1',
                },
              }
            : { headless: true };
        browsers[browserName] = await launchers[browserName].launch(
          launchOptions,
        );
        browserVersions[browserName] = browsers[browserName].version();
      } catch (error) {
        browserLaunchErrors[browserName] = error instanceof Error ? error.message : String(error);
      }
    }
    for (const scenario of scenarios) {
      let result;
      if (!browsers[scenario.browser]) {
        result = {
          id: scenario.id,
          browser: scenario.browser,
          input: scenario.input,
          storyId: scenario.storyId,
          status: 'blocked-environment',
          durationMs: 0,
          errors: [browserLaunchErrors[scenario.browser]],
        };
      } else if (environmentBlockers[scenario.browser]) {
        result = {
          id: scenario.id,
          browser: scenario.browser,
          input: scenario.input,
          storyId: scenario.storyId,
          status: 'blocked-environment',
          durationMs: 0,
          errors: [environmentBlockers[scenario.browser]],
        };
      } else {
        result = await runScenario(browsers[scenario.browser], baseUrl, scenario);
        if (result.status === 'blocked-environment') {
          environmentBlockers[scenario.browser] = result.errors.at(-1);
        }
      }
      results.push(result);
      const label = result.status === 'passed' ? 'PASS' : result.status === 'failed' ? 'FAIL' : 'BLOCKED';
      console.log(`${label} ${result.id}`);
    }
  } finally {
    await Promise.all(Object.values(browsers).map(browser => browser.close().catch(() => undefined)));
    await close(server);
  }
  const failures = results.filter(result => result.status === 'failed');
  const blocked = results.filter(result => result.status === 'blocked-environment');
  const report = {
    status: failures.length ? 'failed' : blocked.length ? 'passed-with-environment-blocker' : 'passed',
    generatedAt: new Date().toISOString(),
    durationMs: Date.now() - startedAt,
    externalNetwork: 'blocked',
    browserVersions,
    browserLaunchErrors,
    environmentBlockers,
    checks: results.length,
    passed: results.length - failures.length - blocked.length,
    failed: failures.length,
    blocked: blocked.length,
    results,
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Input mode audit: ${report.status} (${report.passed} passed, ${report.blocked} blocked, ${report.failed} failed)`);
  console.log(`Report: ${reportPath}`);
  if (failures.length) process.exitCode = 1;
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
