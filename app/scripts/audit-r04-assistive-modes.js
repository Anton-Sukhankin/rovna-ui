const fs = require('fs');
const http = require('http');
const path = require('path');
const { chromium } = require('playwright');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const staticRoot = path.join(appRoot, 'storybook-static');
const reportPath = path.join(repoRoot, 'docs', 'r04-assistive-modes-report.json');

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
      response.writeHead(404, { 'cache-control': 'no-store' });
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

const listen = server =>
  new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () =>
      resolve(`http://127.0.0.1:${server.address().port}`),
    );
  });
const close = server => new Promise(resolve => server.close(resolve));

async function openStory(page, baseUrl, storyId) {
  await page.goto(
    `${baseUrl}/iframe.html?id=${encodeURIComponent(storyId)}&viewMode=story`,
    { waitUntil: 'domcontentloaded', timeout: 30_000 },
  );
  await page.waitForFunction(
    () => (document.querySelector('#storybook-root')?.childElementCount || 0) > 0,
    null,
    { timeout: 20_000 },
  );
  await page.waitForFunction(
    () => {
      const phase = window.__STORYBOOK_PREVIEW__?.currentRender?.phase;
      return ['finished', 'aborted', 'errored'].includes(phase);
    },
    null,
    { timeout: 30_000 },
  );
  const phase = await page.evaluate(
    () => window.__STORYBOOK_PREVIEW__?.currentRender?.phase,
  );
  assert(phase === 'finished', `Story play phase is ${phase} in ${storyId}`);
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(250);
  const bodyText = await page.locator('body').innerText();
  assert(
    !/Failed to fetch dynamically imported module|The component failed to render properly|The component failed to render/i.test(
      bodyText,
    ),
    `Storybook error screen in ${storyId}`,
  );
}

async function unresolvedAriaReferences(page, scopeSelector = 'body') {
  return page.evaluate(selector => {
    const scope = document.querySelector(selector);
    if (!scope) return [{ attribute: 'scope', ids: [selector], element: 'missing' }];
    const attributes = [
      'aria-activedescendant',
      'aria-controls',
      'aria-describedby',
      'aria-labelledby',
      'aria-owns',
    ];
    return [...scope.querySelectorAll(attributes.map(name => `[${name}]`).join(','))]
      .flatMap(element =>
        attributes.flatMap(attribute => {
          const value = element.getAttribute(attribute);
          if (!value) return [];
          const missing = value
            .split(/\s+/)
            .filter(Boolean)
            .filter(id => !document.getElementById(id));
          if (!missing.length) return [];
          return [
            {
              attribute,
              ids: missing,
              element: `${element.tagName.toLowerCase()}#${element.id || ''}.${element.className || ''}`.slice(
                0,
                240,
              ),
            },
          ];
        }),
      );
  }, scopeSelector);
}

async function assertFocusContained(page, dialog, presses = 10) {
  for (let index = 0; index < presses; index += 1) {
    await page.keyboard.press('Tab');
    const contained = await dialog.evaluate(element => {
      const active = document.activeElement;
      if (!(active instanceof HTMLElement) || active === document.body) return false;
      if (element.contains(active)) return true;
      const portal = element.parentElement?.parentElement;
      return Boolean(portal?.contains(active));
    });
    assert(contained, `Focus escaped the dialog after ${index + 1} Tab presses`);
  }
}

const isFocused = locator =>
  locator.evaluate(element => element === document.activeElement);

async function inspectZoomLayout(page) {
  return page.evaluate(() => {
    const visible = element => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        Number(style.opacity) !== 0 &&
        rect.width > 0 &&
        rect.height > 0
      );
    };
    const dialogs = [...document.querySelectorAll('[role="dialog"]')]
      .filter(visible)
      .map(element => element.getBoundingClientRect())
      .map(rect => ({ left: rect.left, right: rect.right, width: rect.width }));
    const width = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
    return {
      viewportWidth: document.documentElement.clientWidth,
      documentWidth: width,
      horizontalOverflow: width - document.documentElement.clientWidth,
      clippedDialogs: dialogs.filter(
        rect => rect.left < -2 || rect.right > innerWidth + 2 || rect.width < 1,
      ),
      visibleInteractive: [
        ...document.querySelectorAll(
          'button,input,select,textarea,a[href],[role="button"],[role="treeitem"],[tabindex]:not([tabindex="-1"])',
        ),
      ].filter(visible).length,
    };
  });
}

const scenarios = [
  {
    id: 'semantics-select-aria-references',
    storyId: 'rovna-ui-main-primitives-select--medium',
    async run(page, baseUrl) {
      await openStory(page, baseUrl, this.storyId);
      const combobox = page.getByRole('combobox', { name: /.+/ }).first();
      await page.getByTestId('rovna-ui-select').click();
      await page.locator('[role="listbox"]').first().waitFor({ state: 'attached' });
      assert(
        (await combobox.getAttribute('aria-expanded')) === 'true',
        'Select does not expose its open state',
      );
      assert(
        (await unresolvedAriaReferences(page)).length === 0,
        'Select exposes unresolved ARIA references while open',
      );
      await page.keyboard.press('Escape');
      await page.waitForTimeout(100);
      assert(await isFocused(combobox), 'Select did not retain focus after Escape');
      assert(
        (await unresolvedAriaReferences(page)).length === 0,
        'Select exposes unresolved ARIA references while closed',
      );
    },
  },
  {
    id: 'semantics-table-region-and-headers',
    storyId: 'rovna-ui-table-table--keyboard-accessibility',
    async run(page, baseUrl) {
      await openStory(page, baseUrl, this.storyId);
      assert((await page.getByRole('table').count()) > 0, 'Table role is missing');
      assert(
        (await page.getByRole('columnheader').count()) > 0,
        'Table column headers are missing',
      );
      assert(
        (await page.getByRole('region', { name: /Прокручиваемая таблица/ }).count()) === 1,
        'Scrollable table region has no accessible name',
      );
      assert(
        (await unresolvedAriaReferences(page)).length === 0,
        'Table story exposes unresolved ARIA references',
      );
    },
  },
  {
    id: 'semantics-virtual-table',
    storyId: 'rovna-ui-main-primitives-table--virtual',
    async run(page, baseUrl) {
      await openStory(page, baseUrl, this.storyId);
      assert((await page.getByRole('table').count()) > 0, 'Virtual table role is missing');
      assert(
        (await page.getByRole('columnheader').count()) > 0,
        'Virtual table column headers are missing',
      );
      const virtualBody = page.locator('.rovna-ui-table-tbody-virtual');
      assert((await virtualBody.count()) === 1, 'Virtual table body is missing');
      assert((await virtualBody.innerText()).trim().length > 0, 'Virtual table data is missing');
    },
  },
  {
    id: 'semantics-tree-structure',
    storyId: 'rovna-ui-tree-tree--keyboard-accessibility',
    async run(page, baseUrl) {
      await openStory(page, baseUrl, this.storyId);
      const tree = page.getByRole('tree', { name: 'Дерево' });
      assert((await tree.count()) === 1, 'Tree has no accessible name');
      const items = tree.getByRole('treeitem');
      assert((await items.count()) >= 2, 'Tree items are missing');
      const invalid = await items.evaluateAll(elements =>
        elements
          .filter(element => !element.getAttribute('aria-label') || !element.hasAttribute('aria-level'))
          .map(element => element.outerHTML.slice(0, 240)),
      );
      assert(invalid.length === 0, 'Tree items have missing names or levels');
    },
  },
  {
    id: 'semantics-live-regions',
    storyId: 'rovna-ui-primitives-counter--error',
    async run(page, baseUrl) {
      await openStory(page, baseUrl, this.storyId);
      const status = page.getByRole('status');
      assert((await status.count()) === 1, 'Counter status live region is missing');
      assert((await status.getAttribute('aria-live')) === 'polite', 'Counter live region is not polite');
      assert((await status.textContent())?.trim() === '10', 'Counter status has no value');
    },
  },
  {
    id: 'keyboard-modal-focus-trap-return',
    storyId: 'rovna-ui-main-primitives-modal--keyboard-accessibility',
    async run(page, baseUrl) {
      await openStory(page, baseUrl, this.storyId);
      const trigger = page.getByRole('button', { name: 'Открыть' });
      await trigger.focus();
      await page.keyboard.press('Enter');
      const dialog = page.getByRole('dialog', { name: 'Проверка клавиатуры' });
      await dialog.waitFor();
      await assertFocusContained(page, dialog, 10);
      await page.keyboard.press('Escape');
      await dialog.waitFor({ state: 'hidden' });
      assert(await isFocused(trigger), 'Modal did not return focus to its trigger');
    },
  },
  {
    id: 'keyboard-drawer-focus-trap-return',
    storyId: 'rovna-ui-primitives-drawer--default',
    async run(page, baseUrl) {
      await openStory(page, baseUrl, this.storyId);
      const trigger = page.getByRole('button', { name: 'Открыть' });
      await trigger.focus();
      await page.keyboard.press('Enter');
      const dialog = page.getByRole('dialog', { name: 'Заголовок' });
      await dialog.waitFor();
      await assertFocusContained(page, dialog, 8);
      await page.keyboard.press('Escape');
      await dialog.waitFor({ state: 'hidden' });
      assert(await isFocused(trigger), 'Drawer did not return focus to its trigger');
    },
  },
  {
    id: 'keyboard-filters-focus-trap-return',
    storyId: 'rovna-ui-filters-filters--keyboard-accessibility',
    async run(page, baseUrl) {
      await openStory(page, baseUrl, this.storyId);
      const trigger = page.getByRole('button', { name: 'Открыть' });
      await trigger.focus();
      await page.keyboard.press('Enter');
      const dialog = page.getByRole('dialog', { name: 'Фильтрация таблицы' });
      await dialog.waitFor();
      await assertFocusContained(page, dialog, 10);
      await page.keyboard.press('Escape');
      await dialog.waitFor({ state: 'hidden' });
      assert(await isFocused(trigger), 'Filters did not return focus to its trigger');
    },
  },
  {
    id: 'keyboard-popover-open-close-return',
    storyId: 'rovna-ui-main-primitives-popover--keyboard-focus',
    async run(page, baseUrl) {
      await openStory(page, baseUrl, this.storyId);
      const trigger = page.getByRole('button', { name: 'Открыть подсказку' });
      await trigger.focus();
      await page.keyboard.press('Enter');
      await page.getByText('Содержимое подсказки').filter({ visible: true }).first().waitFor();
      await page.keyboard.press('Escape');
      assert(await isFocused(trigger), 'Popover did not return focus to its trigger');
    },
  },
  {
    id: 'keyboard-upload-activation',
    storyId: 'rovna-ui-upload-uploadarea--keyboard-accessibility',
    async run(page, baseUrl) {
      await openStory(page, baseUrl, this.storyId);
      await page.evaluate(() => {
        window.__R04_UPLOAD_CLICKS__ = 0;
        document.querySelector('input[type="file"]')?.addEventListener(
          'click',
          event => {
            window.__R04_UPLOAD_CLICKS__ += 1;
            event.preventDefault();
          },
          true,
        );
      });
      const trigger = page.getByRole('button', { name: /Перетащите файл/i });
      await trigger.focus();
      await page.keyboard.press('Enter');
      await page.keyboard.press('Space');
      const clicks = await page.evaluate(() => window.__R04_UPLOAD_CLICKS__);
      assert(clicks === 2, `Upload keyboard activation count is ${clicks}, expected 2`);
    },
  },
  {
    id: 'assistive-reduced-motion',
    storyId: 'rovna-ui-primitives-spinner--large',
    contextOptions: { reducedMotion: 'reduce' },
    async run(page, baseUrl) {
      await openStory(page, baseUrl, this.storyId);
      const result = await page.evaluate(() => {
        const toMilliseconds = value => {
          const number = Number.parseFloat(value);
          if (!Number.isFinite(number)) return 0;
          return value.trim().endsWith('ms') ? number : number * 1000;
        };
        const values = [...document.querySelectorAll('#storybook-root *, #storybook-root')].map(
          element => {
            const style = getComputedStyle(element);
            return {
              animation: Math.max(...style.animationDuration.split(',').map(toMilliseconds)),
              iterations: Math.max(
                ...style.animationIterationCount.split(',').map(value =>
                  value.trim() === 'infinite' ? Infinity : Number.parseFloat(value) || 0,
                ),
              ),
              transition: Math.max(...style.transitionDuration.split(',').map(toMilliseconds)),
            };
          },
        );
        return {
          mediaMatches: matchMedia('(prefers-reduced-motion: reduce)').matches,
          maxAnimationMs: Math.max(...values.map(value => value.animation)),
          maxIterations: Math.max(...values.map(value => value.iterations)),
          maxTransitionMs: Math.max(...values.map(value => value.transition)),
        };
      });
      assert(result.mediaMatches, 'Reduced-motion media query does not match');
      assert(result.maxAnimationMs <= 0.02, `Animation is ${result.maxAnimationMs}ms`);
      assert(result.maxTransitionMs <= 0.02, `Transition is ${result.maxTransitionMs}ms`);
      assert(result.maxIterations <= 1, `Animation iteration count is ${result.maxIterations}`);
    },
  },
  {
    id: 'assistive-forced-colors-focus',
    storyId: 'rovna-ui-primitives-button--primary',
    contextOptions: { forcedColors: 'active' },
    async run(page, baseUrl) {
      await openStory(page, baseUrl, this.storyId);
      const button = page.getByRole('button').first();
      await button.focus();
      const result = await button.evaluate(element => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return {
          mediaMatches: matchMedia('(forced-colors: active)').matches,
          outlineStyle: style.outlineStyle,
          outlineWidth: Number.parseFloat(style.outlineWidth),
          visible: rect.width > 0 && rect.height > 0,
        };
      });
      assert(result.mediaMatches, 'Forced-colors media query does not match');
      assert(result.visible, 'Focused button is not visible in forced colors');
      assert(
        result.outlineStyle !== 'none' && result.outlineWidth >= 2,
        `Forced-colors focus outline is ${result.outlineWidth}px ${result.outlineStyle}`,
      );
    },
  },
  ...[2, 4].flatMap(zoom => [
    {
      id: `zoom-${zoom * 100}-table-reflow`,
      storyId: 'rovna-ui-table-table--keyboard-accessibility',
      viewport: { width: 360 * zoom, height: 900 * zoom },
      async run(page, baseUrl) {
        await openStory(page, baseUrl, this.storyId);
        await page.evaluate(value => {
          document.documentElement.style.zoom = String(value);
        }, zoom);
        await page.waitForTimeout(200);
        const layout = await inspectZoomLayout(page);
        assert(layout.horizontalOverflow <= 4, `Body overflow is ${layout.horizontalOverflow}px`);
        assert(layout.visibleInteractive > 0, 'No visible controls remain after zoom');
      },
    },
    {
      id: `zoom-${zoom * 100}-modal-reflow`,
      storyId: 'rovna-ui-main-primitives-modal--keyboard-accessibility',
      viewport: { width: 360 * zoom, height: 900 * zoom },
      async run(page, baseUrl) {
        await openStory(page, baseUrl, this.storyId);
        await page.evaluate(value => {
          document.documentElement.style.zoom = String(value);
        }, zoom);
        const trigger = page.getByRole('button', { name: 'Открыть' });
        await trigger.click();
        await page.getByRole('dialog', { name: 'Проверка клавиатуры' }).waitFor();
        const layout = await inspectZoomLayout(page);
        assert(layout.horizontalOverflow <= 4, `Body overflow is ${layout.horizontalOverflow}px`);
        assert(layout.clippedDialogs.length === 0, 'Modal is clipped after zoom');
      },
    },
  ]),
];

async function runScenario(browser, baseUrl, localOrigin, scenario) {
  const startedAt = Date.now();
  const pageErrors = [];
  const blockedExternalRequests = [];
  const context = await browser.newContext({
    locale: 'ru-RU',
    viewport: scenario.viewport || { width: 1440, height: 900 },
    ...scenario.contextOptions,
  });
  await context.route('**/*', route => {
    const url = route.request().url();
    if (url.startsWith(localOrigin) || url.startsWith('data:') || url.startsWith('blob:')) {
      return route.continue();
    }
    blockedExternalRequests.push(url);
    return route.abort('blockedbyclient');
  });
  const page = await context.newPage();
  page.on('pageerror', error => pageErrors.push(error.message));
  try {
    await scenario.run(page, baseUrl);
    assert(pageErrors.length === 0, `Page errors: ${pageErrors.join('; ')}`);
    return {
      id: scenario.id,
      storyId: scenario.storyId,
      status: 'passed',
      durationMs: Date.now() - startedAt,
      pageErrors,
      blockedExternalRequests,
    };
  } catch (error) {
    return {
      id: scenario.id,
      storyId: scenario.storyId,
      status: 'failed',
      durationMs: Date.now() - startedAt,
      errors: [error instanceof Error ? error.message : String(error)],
      pageErrors,
      blockedExternalRequests,
    };
  } finally {
    await context.close();
  }
}

async function main() {
  if (!fs.existsSync(path.join(staticRoot, 'index.json'))) {
    throw new Error('Storybook static build is missing. Run storybook:local:build first.');
  }
  const index = JSON.parse(fs.readFileSync(path.join(staticRoot, 'index.json'), 'utf8'));
  const storyIds = new Set(
    Object.values(index.entries || {})
      .filter(entry => entry.type === 'story')
      .map(entry => entry.id),
  );
  const missing = scenarios
    .map(scenario => scenario.storyId)
    .filter((id, indexValue, all) => !storyIds.has(id) && all.indexOf(id) === indexValue);
  if (missing.length) throw new Error(`R-04 stories are missing: ${missing.join(', ')}`);

  const startedAt = Date.now();
  const server = createServer();
  const baseUrl = await listen(server);
  const localOrigin = new URL(baseUrl).origin;
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const browserVersion = browser.version();
  const results = [];
  try {
    for (const scenario of scenarios) {
      const result = await runScenario(browser, baseUrl, localOrigin, scenario);
      results.push(result);
      console.log(`${result.status === 'passed' ? 'PASS' : 'FAIL'} ${scenario.id}`);
    }
  } finally {
    await browser.close();
    await close(server);
  }

  const failures = results.filter(result => result.status === 'failed');
  const report = {
    status: failures.length ? 'failed' : 'passed',
    generatedAt: new Date().toISOString(),
    durationMs: Date.now() - startedAt,
    browser: `installed Chrome ${browserVersion}`,
    locale: 'ru-RU',
    externalNetwork: 'blocked; attempted external requests are recorded but never sent',
    checks: results.length,
    passed: results.length - failures.length,
    failed: failures.length,
    coverage: {
      semantics: scenarios.filter(scenario => scenario.id.startsWith('semantics-')).length,
      keyboardAndFocus: scenarios.filter(scenario => scenario.id.startsWith('keyboard-')).length,
      assistiveMedia: scenarios.filter(scenario => scenario.id.startsWith('assistive-')).length,
      zoom: scenarios.filter(scenario => scenario.id.startsWith('zoom-')).length,
    },
    failures,
    results,
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(
    `R-04 assistive audit: ${report.status} (${report.passed}/${report.checks} passed)`,
  );
  console.log(`Report: ${reportPath}`);
  if (failures.length) process.exitCode = 1;
}

main().catch(error => {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
});
