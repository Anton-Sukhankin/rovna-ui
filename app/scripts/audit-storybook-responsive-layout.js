const fs = require('fs');
const http = require('http');
const path = require('path');
const { chromium } = require('playwright');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const staticRoot = path.join(appRoot, 'storybook-static');
const screenshotRoot = path.join(repoRoot, 'tmp', 'q06-responsive-screenshots');
const failureRoot = path.join(repoRoot, 'tmp', 'q06-responsive-failures');
const reportPath = path.join(repoRoot, 'tmp', 'q06-responsive-report.json');

const viewports = {
  mobileCompact: { width: 360, height: 800 },
  mobileWide: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
  wideDesktop: { width: 1920, height: 1080 },
};
const tier1 = [
  'rovna-ui-primitives-button--primary',
  'rovna-ui-primitives-input--play',
  'rovna-ui-main-primitives-select--large',
  'rovna-ui-main-primitives-modal--keyboard-accessibility',
  'rovna-ui-form-form--keyboard-accessibility',
  'rovna-ui-table-table--keyboard-accessibility',
  'rovna-ui-filters-filters--keyboard-accessibility',
  'rovna-ui-tree-tree--keyboard-accessibility',
  'rovna-ui-upload-uploadarea--keyboard-accessibility',
  'rovna-ui-header-samoletheader--not-authenticated',
];
const stressTargets = [
  {
    id: 'rovna-ui-main-primitives-modal--keyboard-accessibility',
    profile: 'mobileCompact',
    action: 'open-overlay',
    state: 'mobile-modal',
  },
  {
    id: 'rovna-ui-filters-filters--keyboard-accessibility',
    profile: 'mobileCompact',
    action: 'open-overlay',
    state: 'mobile-drawer',
  },
  {
    id: 'rovna-ui-primitives-drawer--full-screen',
    profile: 'mobileWide',
    action: 'open-overlay',
    state: 'mobile-fullscreen-drawer',
  },
  {
    id: 'rovna-ui-main-primitives-select--large',
    profile: 'mobileCompact',
    action: 'open-select',
    state: 'mobile-select-portal',
  },
  {
    id: 'rovna-ui-main-primitives-popover--keyboard-focus',
    profile: 'mobileCompact',
    action: 'open-popover',
    state: 'mobile-popover-portal',
  },
  {
    id: 'rovna-ui-table-table--keyboard-accessibility',
    profile: 'mobileCompact',
    state: 'narrow-table-toolbar',
  },
  {
    id: 'rovna-ui-primitives-button--primary',
    profile: 'mobileCompact',
    stress: 'long-russian',
    state: 'long-russian-action',
  },
  {
    id: 'rovna-ui-primitives-button--primary',
    profile: 'mobileCompact',
    stress: 'unbroken-id',
    state: 'unbroken-action-id',
  },
  {
    id: 'rovna-ui-filters-filters--keyboard-accessibility',
    viewport: { width: 360, height: 480 },
    action: 'open-overlay',
    state: 'reduced-mobile-height',
  },
];
const r05Targets = [
  { id: 'rovna-ui-grid-row--long-text', profile: 'mobileCompact', state: 'r01-row-long-text' },
  { id: 'rovna-ui-grid-col--responsive', profile: 'mobileCompact', state: 'r01-col-responsive' },
  { id: 'rovna-ui-grid-col--long-text', profile: 'mobileWide', state: 'r01-col-long-text' },
  { id: 'rovna-ui-main-typography-typography--long-text', profile: 'mobileCompact', state: 'r01-typography-long-text' },
  { id: 'rovna-ui-main-ui-erroroverlay--constrained', profile: 'mobileCompact', state: 'r01-error-constrained' },
  { id: 'rovna-ui-main-ui-emptyoverlay--constrained', profile: 'mobileCompact', state: 'r01-empty-constrained' },
  { id: 'rovna-ui-main-components-componentpicker--select', profile: 'mobileCompact', action: 'open-select', state: 'r01-component-picker-select' },
  { id: 'rovna-ui-main-components-componentpicker--range-picker', profile: 'mobileWide', state: 'r01-component-picker-range' },
  { id: 'rovna-ui-main-components-asynccheckbox--api-error', profile: 'mobileCompact', state: 'r03-async-error' },
  { id: 'rovna-ui-main-components-asyncselect--api-retry', profile: 'mobileWide', state: 'r03-async-recovery' },
  { id: 'rovna-ui-main-components-asyncselect--api-loading', profile: 'mobileWide', state: 'r03-async-loading' },
  { id: 'rovna-ui-table-table--empty', profile: 'mobileCompact', state: 'empty-table' },
  { id: 'rovna-ui-table-table--loading', profile: 'mobileCompact', state: 'loading-table' },
  { id: 'rovna-ui-upload-uploadarea--limit', profile: 'mobileWide', state: 'upload-limit' },
  { id: 'rovna-ui-header-samoletheader--mobile', profile: 'mobileWide', state: 'mobile-header' },
  { id: 'rovna-ui-main-primitives-toast--error', profile: 'mobileCompact', state: 'error-toast' },
];

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
  const options = { state: null };
  for (const argument of argv) {
    if (argument.startsWith('--state=')) options.state = argument.slice(8);
    else throw new Error(`Unknown responsive-audit argument: ${argument}`);
  }
  return options;
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

const listen = server =>
  new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () =>
      resolve(`http://127.0.0.1:${server.address().port}`),
    );
  });

const close = server => new Promise(resolve => server.close(resolve));

async function prepare(page, target) {
  if (target.action === 'open-overlay') {
    const dialog = page.getByRole('dialog').first();
    if (!(await dialog.isVisible().catch(() => false))) {
      await page.getByRole('button', { name: 'Открыть' }).click();
      await dialog.waitFor({ state: 'visible' });
    }
  } else if (target.action === 'open-select') {
    const combobox = page.getByRole('combobox').first();
    await combobox.focus();
    await page.keyboard.press('ArrowDown');
    await page.locator('[class*="-select-dropdown"]:visible').first().waitFor({
      state: 'visible',
    });
  } else if (target.action === 'open-popover') {
    await page.getByRole('button', { name: 'Открыть подсказку' }).click();
    await page.getByText('Содержимое подсказки').waitFor({ state: 'visible' });
  }

  if (target.stress === 'long-russian') {
    await page.getByRole('button').first().evaluate(element => {
      element.textContent =
        'Сохранить подробные параметры выбранного объекта и продолжить обработку';
    });
  } else if (target.stress === 'unbroken-id') {
    await page.getByRole('button').first().evaluate(element => {
      element.textContent =
        'OBJECT-2026-08-08-VERY-LONG-UNBROKEN-IDENTIFIER-1234567890';
    });
  }
}

async function inspect(page) {
  return page.evaluate(() => {
    const documentWidth = Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
    );
    const horizontalOverflow = documentWidth - document.documentElement.clientWidth;
    const visible = element => {
      if (element.closest('[aria-hidden="true"]')) return false;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const rendered = (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        Number(style.opacity) !== 0 &&
        rect.width > 0 &&
        rect.height > 0
      );
      if (!rendered) return false;
      const x = Math.min(innerWidth - 1, Math.max(0, rect.left + rect.width / 2));
      const y = Math.min(innerHeight - 1, Math.max(0, rect.top + rect.height / 2));
      const hit = document.elementFromPoint(x, y);
      return !hit || element.contains(hit) || hit.contains(element);
    };
    const interactive = [
      ...document.querySelectorAll(
        'button, input, select, textarea, a[href], [role="button"], [role="menuitem"], [role="option"], [tabindex]:not([tabindex="-1"])',
      ),
    ].filter(visible);
    const unreachableFixedActions = interactive
      .filter(element => {
        const style = getComputedStyle(element);
        if (!['fixed', 'sticky'].includes(style.position)) return false;
        const rect = element.getBoundingClientRect();
        return (
          rect.right < 0 ||
          rect.left > innerWidth ||
          rect.bottom < 0 ||
          rect.top > innerHeight
        );
      })
      .map(element => ({
        name: element.getAttribute('aria-label') || element.textContent?.trim() || '',
        tag: element.tagName.toLowerCase(),
      }));
    const dialogs = [...document.querySelectorAll('[role="dialog"]')]
      .filter(visible)
      .map(element => {
        const rect = element.getBoundingClientRect();
        return {
          bottom: rect.bottom,
          height: rect.height,
          left: rect.left,
          right: rect.right,
          top: rect.top,
          width: rect.width,
        };
      });
    const clippedDialogs = dialogs.filter(
      rect => rect.left < -2 || rect.right > innerWidth + 2 || rect.width < 1,
    );
    const portalOverlays = [
      ...document.querySelectorAll(
        '[role="listbox"], [role="menu"], [role="tooltip"], .rovna-ui-select-dropdown, .rovna-ui-dropdown',
      ),
    ]
      .filter(visible)
      .map(element => {
        const rect = element.getBoundingClientRect();
        return {
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right,
          role: element.getAttribute('role') || '',
          top: rect.top,
          width: rect.width,
        };
      });
    const clippedPortalOverlays = portalOverlays.filter(
      rect => rect.left < -2 || rect.right > innerWidth + 2 || rect.width > innerWidth + 2,
    );
    const overlappingActions = [];
    for (let first = 0; first < interactive.length; first += 1) {
      for (let second = first + 1; second < interactive.length; second += 1) {
        const a = interactive[first];
        const b = interactive[second];
        if (a.contains(b) || b.contains(a)) continue;
        const ar = a.getBoundingClientRect();
        const br = b.getBoundingClientRect();
        const width = Math.max(0, Math.min(ar.right, br.right) - Math.max(ar.left, br.left));
        const height = Math.max(0, Math.min(ar.bottom, br.bottom) - Math.max(ar.top, br.top));
        const intersection = width * height;
        const smaller = Math.min(ar.width * ar.height, br.width * br.height);
        if (smaller > 0 && intersection / smaller > 0.8) {
          overlappingActions.push({
            first: a.getAttribute('aria-label') || a.textContent?.trim().slice(0, 80) || a.tagName,
            second: b.getAttribute('aria-label') || b.textContent?.trim().slice(0, 80) || b.tagName,
          });
        }
      }
    }
    const intentionalEllipsis = [...document.querySelectorAll('body *')]
      .filter(element => {
        if (!visible(element)) return false;
        const style = getComputedStyle(element);
        return (
          element.scrollWidth > element.clientWidth + 2 &&
          style.textOverflow === 'ellipsis'
        );
      })
      .length;
    const crampedHotFilters = [
      ...document.querySelectorAll('.rovna-ui-hot-filters-filter'),
    ]
      .filter(visible)
      .map(element => {
        const rect = element.getBoundingClientRect();
        return {
          height: rect.height,
          text: element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 120) || '',
          width: rect.width,
        };
      })
      .filter(item => item.text.length > 3 && item.width < 48);
    return {
      clippedDialogs,
      clippedPortalOverlays,
      crampedHotFilters,
      dialogCount: dialogs.length,
      documentWidth,
      horizontalOverflow,
      intentionalEllipsis,
      interactiveCount: interactive.length,
      overlappingActions,
      portalOverlayCount: portalOverlays.length,
      storybookError: [
        'The component failed to render properly',
        'Failed to fetch dynamically imported module',
        'We detected that you use an implicit action arg',
      ].find(message => document.body.innerText.includes(message)) || null,
      unreachableFixedActions,
      viewport: { height: innerHeight, width: innerWidth },
    };
  });
}

async function runTarget(page, baseUrl, entry, target) {
  const viewport = target.viewport || viewports[target.profile];
  const pageErrors = [];
  const failedResponses = [];
  page.on('pageerror', error => {
    if (error.message !== 'The user aborted a request.') {
      pageErrors.push(error.message);
    }
  });
  page.on('response', response => {
    if (response.status() >= 400) {
      failedResponses.push({ status: response.status(), url: response.url() });
    }
  });
  await page.setViewportSize(viewport);
  const storyUrl = new URL('/iframe.html', baseUrl);
  storyUrl.searchParams.set('id', entry.id);
  storyUrl.searchParams.set('viewMode', 'story');
  if (target.globals) storyUrl.searchParams.set('globals', target.globals);
  await page.goto(storyUrl.href, { timeout: 20_000, waitUntil: 'domcontentloaded' });
  try {
    await page.waitForFunction(
      () => (document.querySelector('#storybook-root')?.childElementCount || 0) > 0,
      null,
      { timeout: 10_000 },
    );
  } catch {
    await page.reload({ timeout: 20_000, waitUntil: 'domcontentloaded' });
    await page.waitForFunction(
      () => (document.querySelector('#storybook-root')?.childElementCount || 0) > 0,
      null,
      { timeout: 20_000 },
    );
  }
  await page.waitForLoadState('networkidle', { timeout: 5_000 }).catch(() => {});
  await page.evaluate(() => document.fonts?.ready);
  await page.addStyleTag({
    content:
      '*,*::before,*::after{animation-delay:0s!important;animation-duration:0s!important;transition-delay:0s!important;transition-duration:0s!important}',
  });
  if (target.zoom === 2) {
    await page.evaluate(() => {
      document.documentElement.style.zoom = '2';
    });
  }
  await prepare(page, target);
  await page.waitForTimeout(400);
  await page.evaluate(
    () =>
      new Promise(resolve =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
  const layout = await inspect(page);
  const issues = [];
  if (layout.horizontalOverflow > 2) {
    issues.push(`body-horizontal-overflow:${layout.horizontalOverflow}`);
  }
  if (layout.clippedDialogs.length) issues.push('dialog-clipped-horizontally');
  if (layout.clippedPortalOverlays.length) issues.push('portal-clipped-horizontally');
  if (layout.crampedHotFilters.length) issues.push('hot-filter-content-cramped');
  if (layout.unreachableFixedActions.length) issues.push('fixed-action-unreachable');
  if (layout.overlappingActions.length) issues.push('interactive-actions-overlap');
  if (layout.storybookError) issues.push(`storybook-error:${layout.storybookError}`);
  if (pageErrors.length) issues.push(`page-errors:${pageErrors.length}`);
  if (failedResponses.length) issues.push(`failed-responses:${failedResponses.length}`);
  const profile = target.profile || `${viewport.width}x${viewport.height}`;
  const state = target.state || (target.zoom === 2 ? 'zoom-200' : 'default');
  const fileName = `${entry.id}--${profile}--${state}.png`;
  const screenshotPath = path.join(screenshotRoot, fileName);
  await page.screenshot({ fullPage: true, path: screenshotPath });
  if (issues.length) fs.copyFileSync(screenshotPath, path.join(failureRoot, fileName));

  return {
    id: entry.id,
    failedResponses,
    issues,
    layout,
    pageErrors,
    profile,
    screenshotPath,
    state,
    status: issues.length ? 'failed' : 'passed',
    viewport,
    zoom: target.zoom || 1,
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  fs.rmSync(screenshotRoot, { force: true, recursive: true });
  fs.rmSync(failureRoot, { force: true, recursive: true });
  fs.mkdirSync(screenshotRoot, { recursive: true });
  fs.mkdirSync(failureRoot, { recursive: true });
  const index = JSON.parse(
    fs.readFileSync(path.join(staticRoot, 'index.json'), 'utf8'),
  );
  const entries = new Map(
    Object.values(index.entries || {}).map(entry => [entry.id, entry]),
  );
  let targets = [
    ...tier1.flatMap(id =>
      Object.keys(viewports).map(profile => ({ id, profile, state: 'viewport' })),
    ),
    ...tier1.map(id => ({
      id,
      viewport: { width: 720, height: 1600 },
      zoom: 2,
      state: 'zoom-200',
    })),
    ...stressTargets,
    ...r05Targets,
  ];
  if (options.state) {
    targets = targets.filter(target => target.state === options.state);
  }
  if (!targets.length) {
    throw new Error('No responsive targets matched the supplied state filter.');
  }
  const missing = [...new Set(targets.map(target => target.id))].filter(
    id => !entries.has(id),
  );
  if (missing.length) throw new Error(`Responsive stories are missing: ${missing.join(', ')}`);

  const server = createServer();
  const baseUrl = await listen(server);
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const browserVersion = browser.version();
  const context = await browser.newContext({ locale: 'ru-RU' });
  const localOrigin = new URL(baseUrl).origin;
  await context.route('**/*', route => {
    const url = route.request().url();
    if (url.startsWith(localOrigin) || url.startsWith('data:') || url.startsWith('blob:')) {
      return route.continue();
    }
    return route.abort('blockedbyclient');
  });
  const results = [];
  const startedAt = Date.now();
  try {
    for (const target of targets) {
      const page = await context.newPage();
      try {
        results.push(await runTarget(page, baseUrl, entries.get(target.id), target));
      } finally {
        await page.close();
      }
    }
  } finally {
    await context.close();
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
    externalNetwork: 'blocked',
    checks: results.length,
    passed: results.length - failures.length,
    failed: failures.length,
    viewportChecks: results.filter(result => result.state === 'viewport').length,
    zoomChecks: results.filter(result => result.state === 'zoom-200').length,
    stressChecks: results.filter(
      result => result.state !== 'viewport' && result.state !== 'zoom-200',
    ).length,
    portalChecks: results.filter(result => result.layout.portalOverlayCount > 0).length,
    overlapFindings: results.filter(result => result.layout.overlappingActions.length > 0).length,
    clippedPortalFindings: results.filter(result => result.layout.clippedPortalOverlays.length > 0).length,
    failures,
    results,
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Responsive audit: ${report.status}`);
  console.log(
    `Checks: ${report.checks}; passed: ${report.passed}; failed: ${report.failed}`,
  );
  console.log(`Report: ${reportPath}`);
  if (failures.length) process.exitCode = 1;
}

main().catch(error => {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
});
