const fs = require('fs');
const http = require('http');
const path = require('path');
const crypto = require('crypto');
const { PNG } = require('pngjs');
const { chromium } = require('playwright');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const staticRoot = path.join(appRoot, 'storybook-static');
const baselineBaseRoot = path.join(appRoot, '.q-visual-baseline');
const baselinePlatform = process.platform === 'win32' ? 'windows' : process.platform;
const baselineRoot =
  baselinePlatform === 'windows'
    ? baselineBaseRoot
    : path.join(baselineBaseRoot, baselinePlatform);
const actualRoot = path.join(repoRoot, 'tmp', 'q05-visual-actual');
const failureRoot = path.join(repoRoot, 'tmp', 'q05-visual-failures');
const reportPath = path.join(repoRoot, 'tmp', 'q05-visual-responsive-report.json');
const manifestPath = path.join(repoRoot, 'docs', 'q05-visual-baseline-manifest.json');

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
  'rovna-ui-main-primitives-modal--medium',
  'rovna-ui-form-form--default',
  'rovna-ui-table-table--default',
  'rovna-ui-filters-filters--default',
  'rovna-ui-tree-tree--default',
  'rovna-ui-upload-uploadarea--default',
  'rovna-ui-header-samoletheader--not-authenticated',
];
const representative = [
  'rovna-ui-main-primitives-dropdown--default',
  'rovna-ui-primitives-drawer--default',
  'rovna-ui-main-primitives-checkbox--default',
  'rovna-ui-main-primitives-radio--default',
  'rovna-ui-main-primitives-toggle--default',
  'rovna-ui-primitives-tooltip--default',
];
const visualStates = [
  {
    id: 'rovna-ui-primitives-button--primary',
    state: 'hover',
    action: 'hover-first-button',
  },
  {
    id: 'rovna-ui-primitives-button--primary',
    state: 'focus',
    action: 'focus-first-button',
  },
  {
    id: 'rovna-ui-primitives-input--play',
    state: 'focus',
    action: 'focus-first-input',
  },
  {
    id: 'rovna-ui-primitives-input--validation',
    state: 'validation',
  },
  {
    id: 'rovna-ui-main-primitives-select--large',
    state: 'open',
    action: 'open-select',
  },
  {
    id: 'rovna-ui-main-primitives-modal--keyboard-accessibility',
    state: 'open',
    action: 'open-overlay',
  },
  {
    id: 'rovna-ui-table-table--keyboard-accessibility',
    state: 'filters-open',
    action: 'open-filters',
  },
  {
    id: 'rovna-ui-filters-filters--keyboard-accessibility',
    state: 'open',
    action: 'open-overlay',
  },
  {
    id: 'rovna-ui-tree-tree--keyboard-accessibility',
    state: 'checked-expanded',
  },
  {
    id: 'rovna-ui-upload-uploadarea--message',
    state: 'error',
  },
  {
    id: 'rovna-ui-main-primitives-popover--keyboard-focus',
    state: 'open',
    action: 'open-popover',
  },
  {
    id: 'rovna-ui-primitives-drawer--full-screen',
    state: 'open',
    action: 'open-overlay',
  },
];
const r05CoverageTargets = [
  { id: 'rovna-ui-grid-row--long-text', profile: 'mobileCompact', state: 'r01-long-text' },
  { id: 'rovna-ui-grid-col--responsive', profile: 'mobileWide', state: 'r01-responsive' },
  { id: 'rovna-ui-grid-col--long-text', profile: 'desktop', state: 'r01-long-text' },
  { id: 'rovna-ui-main-typography-typography--long-text', profile: 'mobileCompact', state: 'r01-long-text' },
  { id: 'rovna-ui-main-ui-erroroverlay--constrained', profile: 'mobileCompact', state: 'r01-constrained' },
  { id: 'rovna-ui-main-ui-emptyoverlay--constrained', profile: 'mobileCompact', state: 'r01-constrained' },
  { id: 'rovna-ui-main-components-componentpicker--select', profile: 'desktop', state: 'r01-select' },
  { id: 'rovna-ui-main-components-componentpicker--range-picker', profile: 'mobileWide', state: 'r01-range-picker' },
  { id: 'rovna-ui-main-components-asynccheckbox--api-error', profile: 'desktop', state: 'r03-error' },
  { id: 'rovna-ui-main-components-asyncselect--api-retry', profile: 'desktop', state: 'r03-recovery' },
  { id: 'rovna-ui-main-components-asyncselect--api-loading', profile: 'mobileWide', state: 'r03-loading' },
  { id: 'rovna-ui-table-table--empty', profile: 'desktop', state: 'empty' },
  { id: 'rovna-ui-table-table--loading', profile: 'desktop', state: 'loading' },
  { id: 'rovna-ui-upload-uploadarea--limit', profile: 'mobileWide', state: 'limit' },
  { id: 'rovna-ui-header-samoletheader--mobile', profile: 'mobileWide', state: 'mobile' },
];
const themeTargets = [
  { id: 'rovna-ui-primitives-button--primary', profile: 'desktop', state: 'theme-global', globals: 'theme:global;locale:ru' },
  { id: 'rovna-ui-primitives-input--play', profile: 'desktop', state: 'theme-global', globals: 'theme:global;locale:ru' },
  { id: 'rovna-ui-main-primitives-select--large', profile: 'desktop', state: 'theme-global-open', action: 'open-select', globals: 'theme:global;locale:ru' },
  { id: 'rovna-ui-main-primitives-modal--keyboard-accessibility', profile: 'desktop', state: 'theme-global-open', action: 'open-overlay', globals: 'theme:global;locale:ru' },
  { id: 'rovna-ui-table-table--default', profile: 'desktop', state: 'theme-global', globals: 'theme:global;locale:ru' },
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
  const options = {
    profile: null,
    state: null,
    statesOnly: false,
    storyId: null,
    update: false,
  };
  for (const argument of argv) {
    if (argument === '--update') options.update = true;
    else if (argument === '--states-only') options.statesOnly = true;
    else if (argument.startsWith('--profile=')) options.profile = argument.slice(10);
    else if (argument.startsWith('--state=')) options.state = argument.slice(8);
    else if (argument.startsWith('--story=')) options.storyId = argument.slice(8);
    else throw new Error(`Unknown visual-audit argument: ${argument}`);
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

function comparePng(expectedPath, actualPath, diffPath) {
  const expected = PNG.sync.read(fs.readFileSync(expectedPath));
  const actual = PNG.sync.read(fs.readFileSync(actualPath));
  if (expected.width !== actual.width || expected.height !== actual.height) {
    fs.copyFileSync(actualPath, diffPath);
    return {
      changedPixels: expected.width * expected.height,
      dimensionsMatch: false,
      ratio: 1,
    };
  }
  let changedPixels = 0;
  const diff = new PNG({ width: expected.width, height: expected.height });
  for (let index = 0; index < expected.data.length; index += 4) {
    const delta =
      Math.abs(expected.data[index] - actual.data[index]) +
      Math.abs(expected.data[index + 1] - actual.data[index + 1]) +
      Math.abs(expected.data[index + 2] - actual.data[index + 2]) +
      Math.abs(expected.data[index + 3] - actual.data[index + 3]);
    const changed = delta > 16;
    if (changed) changedPixels += 1;
    diff.data[index] = changed ? 255 : expected.data[index];
    diff.data[index + 1] = changed ? 0 : expected.data[index + 1];
    diff.data[index + 2] = changed ? 0 : expected.data[index + 2];
    diff.data[index + 3] = changed ? 255 : 48;
  }
  if (changedPixels > 0) fs.writeFileSync(diffPath, PNG.sync.write(diff));
  return {
    changedPixels,
    dimensionsMatch: true,
    ratio: changedPixels / (expected.width * expected.height),
  };
}

async function prepareState(page, action) {
  if (!action) return;

  if (action === 'hover-first-button') {
    await page.getByRole('button').first().hover();
  } else if (action === 'focus-first-button') {
    await page.getByRole('button').first().focus();
  } else if (action === 'focus-first-input') {
    await page.locator('input').first().focus();
  } else if (action === 'open-select') {
    const combobox = page.getByRole('combobox').first();
    await combobox.focus();
    await page.keyboard.press('ArrowDown');
    await page.locator('[class*="-select-dropdown"]:visible').first().waitFor({
      state: 'visible',
    });
  } else if (action === 'open-overlay') {
    const dialog = page.getByRole('dialog').first();
    if (!(await dialog.isVisible().catch(() => false))) {
      await page.getByRole('button', { name: 'Открыть' }).click();
      await dialog.waitFor({ state: 'visible' });
    }
  } else if (action === 'open-filters') {
    const dialog = page
      .getByRole('dialog', { name: 'Фильтрация таблицы' })
      .first();
    if (!(await dialog.isVisible().catch(() => false))) {
      await page.getByRole('button', { name: 'Фильтры' }).click();
      await dialog.waitFor({ state: 'visible' });
    }
  } else if (action === 'open-popover') {
    await page.getByRole('button', { name: 'Открыть подсказку' }).click();
    await page.getByText('Содержимое подсказки').waitFor({ state: 'visible' });
  } else {
    throw new Error(`Unknown visual state action: ${action}`);
  }
}

async function inspectLayout(page) {
  return page.evaluate(() => {
    const root = document.querySelector('#storybook-root');
    const documentElement = document.documentElement;
    const body = document.body;
    const horizontalOverflow =
      Math.max(body.scrollWidth, documentElement.scrollWidth) -
      documentElement.clientWidth;
    const interactive = [
      ...document.querySelectorAll(
        'button, input, select, textarea, a[href], [role="button"], [role="menuitem"], [tabindex]',
      ),
    ]
      .filter(element => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return (
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          Number(style.opacity) !== 0 &&
          rect.width > 0 &&
          rect.height > 0
        );
      })
      .map(element => {
        const rect = element.getBoundingClientRect();
        return {
          name:
            element.getAttribute('aria-label') ||
            element.textContent?.trim().slice(0, 120) ||
            element.tagName,
          rect: {
            bottom: rect.bottom,
            left: rect.left,
            right: rect.right,
            top: rect.top,
          },
        };
      });
    const offscreenActions = interactive.filter(
      item =>
        item.rect.right < 0 ||
        item.rect.left > innerWidth ||
        item.rect.bottom < 0 ||
        item.rect.top > innerHeight,
    );
    const overflowingElements = [...document.querySelectorAll('body *')]
      .map(element => {
        const rect = element.getBoundingClientRect();
        return {
          className:
            typeof element.className === 'string'
              ? element.className.slice(0, 240)
              : '',
          tag: element.tagName.toLowerCase(),
          text: element.textContent?.trim().replace(/\s+/g, ' ').slice(0, 120) || '',
          left: rect.left,
          right: rect.right,
          width: rect.width,
        };
      })
      .filter(
        item =>
          item.width > 0 &&
          item.right > innerWidth + 2 &&
          item.left < innerWidth,
      )
      .sort((first, second) => second.right - first.right)
      .slice(0, 20);
    return {
      horizontalOverflow,
      interactiveCount: interactive.length,
      offscreenActions,
      overflowingElements,
      treeitemCount: document.querySelectorAll('[role="treeitem"]').length,
      rootHeight: root?.getBoundingClientRect().height || 0,
      rootWidth: root?.getBoundingClientRect().width || 0,
    };
  });
}

async function capture(page, baseUrl, target, update) {
  const { entry, profile, viewport, state = 'default', action, globals, coverage } = target;
  const pageErrors = [];
  const failedResponses = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  page.on('response', response => {
    if (response.status() >= 400) {
      failedResponses.push({ status: response.status(), url: response.url() });
    }
  });
  await page.setViewportSize(viewport);
  const storyUrl = new URL('/iframe.html', baseUrl);
  storyUrl.searchParams.set('id', entry.id);
  storyUrl.searchParams.set('viewMode', 'story');
  if (globals) storyUrl.searchParams.set('globals', globals);
  await page.goto(storyUrl.href, { timeout: 20_000, waitUntil: 'domcontentloaded' });
  await page.waitForFunction(
    () => {
      const root = document.querySelector('#storybook-root');
      return (root?.childElementCount || 0) > 0;
    },
    null,
    { timeout: 10_000 },
  );
  await page.waitForLoadState('networkidle', { timeout: 5_000 }).catch(() => {});
  await page.evaluate(() => document.fonts?.ready);
  await page.addStyleTag({
    content:
      '*,*::before,*::after{animation-delay:0s!important;animation-duration:0s!important;transition-delay:0s!important;transition-duration:0s!important;caret-color:transparent!important}',
  });
  await page.evaluate(
    () =>
      new Promise(resolve =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
  if (action) await page.waitForTimeout(1_200);
  await prepareState(page, action);
  await page.waitForTimeout(400);
  if (entry.id === 'rovna-ui-tree-tree--default') {
    await page.waitForTimeout(1_200);
  }
  await page.evaluate(
    () =>
      new Promise(resolve =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
  const layout = await inspectLayout(page);
  const stateSuffix = state === 'default' ? '' : `--state-${state}`;
  const fileName = `${entry.id}--${profile}${stateSuffix}.png`;
  const actualPath = path.join(actualRoot, fileName);
  const baselinePath = path.join(baselineRoot, fileName);
  const failureActualPath = path.join(failureRoot, `actual--${fileName}`);
  const failureExpectedPath = path.join(failureRoot, `expected--${fileName}`);
  const failureDiffPath = path.join(failureRoot, `diff--${fileName}`);
  await page.screenshot({ fullPage: true, path: actualPath });

  let comparison = null;
  let status = 'passed';
  if (update) {
    fs.copyFileSync(actualPath, baselinePath);
  } else if (!fs.existsSync(baselinePath)) {
    status = 'missing-baseline';
  } else {
    comparison = comparePng(baselinePath, actualPath, failureDiffPath);
    if (comparison.ratio > 0.0005) status = 'visual-diff';
  }
  if (layout.horizontalOverflow > 2 && status === 'passed') status = 'overflow';
  if (!update && status !== 'passed') {
    fs.copyFileSync(actualPath, failureActualPath);
    if (fs.existsSync(baselinePath)) {
      fs.copyFileSync(baselinePath, failureExpectedPath);
    }
  }

  return {
    id: entry.id,
    title: entry.title,
    name: entry.name,
    tier: tier1.includes(entry.id) ? 'tier-1' : 'representative',
    coverage: coverage || null,
    globals: globals || null,
    state,
    profile,
    viewport,
    status,
    layout,
    pageErrors,
    failedResponses,
    comparison,
    baselinePath,
    actualPath,
    failureArtifacts:
      !update && status !== 'passed'
        ? {
            actualPath: failureActualPath,
            expectedPath: fs.existsSync(failureExpectedPath)
              ? failureExpectedPath
              : null,
            diffPath: fs.existsSync(failureDiffPath) ? failureDiffPath : null,
          }
        : null,
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  fs.mkdirSync(baselineRoot, { recursive: true });
  fs.mkdirSync(actualRoot, { recursive: true });
  fs.rmSync(failureRoot, { force: true, recursive: true });
  fs.mkdirSync(failureRoot, { recursive: true });
  const indexSource = fs.readFileSync(path.join(staticRoot, 'index.json'));
  const storybookIndexSha256 = crypto.createHash('sha256').update(indexSource).digest('hex');
  const index = JSON.parse(indexSource.toString('utf8'));
  const entriesById = new Map(
    Object.values(index.entries || {}).map(entry => [entry.id, entry]),
  );
  const missingStories = [...tier1, ...representative].filter(
    id => !entriesById.has(id),
  );
  missingStories.push(
    ...visualStates
      .map(target => target.id)
      .filter(id => !entriesById.has(id)),
    ...r05CoverageTargets
      .map(target => target.id)
      .filter(id => !entriesById.has(id)),
    ...themeTargets
      .map(target => target.id)
      .filter(id => !entriesById.has(id)),
  );
  if (missingStories.length) {
    throw new Error(`Visual target stories are missing: ${missingStories.join(', ')}`);
  }

  let targets = [
    ...tier1.flatMap(id =>
      Object.entries(viewports).map(([profile, viewport]) => ({
        entry: entriesById.get(id),
        profile,
        viewport,
      })),
    ),
    ...representative.map(id => ({
      entry: entriesById.get(id),
      profile: 'desktop',
      viewport: viewports.desktop,
    })),
    ...visualStates.map(({ id, state, action }) => ({
      entry: entriesById.get(id),
      profile: 'desktop',
      viewport: viewports.desktop,
      state,
      action,
    })),
    ...r05CoverageTargets.map(target => ({
      ...target,
      entry: entriesById.get(target.id),
      viewport: viewports[target.profile],
      coverage: target.state.startsWith('r01-') ? 'R-01' : 'R-03/R-05',
    })),
    ...themeTargets.map(target => ({
      ...target,
      entry: entriesById.get(target.id),
      viewport: viewports[target.profile],
      coverage: 'R-05 theme variant',
    })),
  ];
  if (options.storyId) {
    targets = targets.filter(target => target.entry.id === options.storyId);
  }
  if (options.statesOnly) {
    targets = targets.filter(target => target.state);
  }
  if (options.profile) {
    targets = targets.filter(target => target.profile === options.profile);
  }
  if (options.state) {
    targets = targets.filter(target => (target.state ?? 'default') === options.state);
  }
  if (!targets.length) {
    throw new Error('No visual targets matched the supplied story/profile filters.');
  }
  const server = createServer();
  const baseUrl = await listen(server);
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const browserVersion = browser.version();
  const context = await browser.newContext({ locale: 'ru-RU' });
  const localOrigin = new URL(baseUrl).origin;
  await context.route('**/*', route => {
    const url = route.request().url();
    if (
      url.startsWith(localOrigin) ||
      url.startsWith('data:') ||
      url.startsWith('blob:')
    ) {
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
        results.push(
          await capture(page, baseUrl, target, options.update),
        );
      } finally {
        await page.close();
      }
    }
  } finally {
    await context.close();
    await browser.close();
    await close(server);
  }

  const failures = results.filter(result => result.status !== 'passed');
  const fullMatrix = !options.storyId && !options.statesOnly && !options.profile && !options.state;
  const expectedBaselines = new Set(results.map(result => path.basename(result.baselinePath)));
  const baselineFiles = fs.readdirSync(baselineRoot).filter(file => file.endsWith('.png'));
  const baselineSets = {
    windows: fs
      .readdirSync(baselineBaseRoot, { withFileTypes: true })
      .filter(entry => entry.isFile() && entry.name.endsWith('.png')).length,
    linux: fs.existsSync(path.join(baselineBaseRoot, 'linux'))
      ? fs
          .readdirSync(path.join(baselineBaseRoot, 'linux'), { withFileTypes: true })
          .filter(entry => entry.isFile() && entry.name.endsWith('.png')).length
      : 0,
  };
  const staleBaselines = fullMatrix
    ? baselineFiles.filter(file => !expectedBaselines.has(file))
    : [];
  const manifest = {
    generatedAt: new Date().toISOString(),
    browser: `installed Chrome ${browserVersion}`,
    baselinePlatform,
    baselineRoot: path.relative(repoRoot, baselineRoot).replace(/\\/g, '/'),
    baselineSets,
    dpr: 1,
    animationPolicy: 'disabled through test-only injected CSS',
    fontPolicy: 'await document.fonts.ready',
    approvalPolicy:
      'Run --update only after intentional visual review; CI/check mode never updates baselines.',
    tier1,
    representative,
    visualStates: visualStates.map(({ id, state, action }) => ({ id, state, action })),
    r05CoverageTargets,
    themeTargets,
    viewports,
    storybookIndexSha256,
    targetCount: results.length,
    baselineCount: baselineFiles.length,
    staleBaselines,
  };
  const report = {
    status: failures.length || staleBaselines.length
      ? (options.update ? 'baseline-update-incomplete' : 'failed')
      : options.update
        ? 'baseline-updated'
        : 'passed',
    mode: options.update ? 'update' : 'check',
    storybookIndexSha256,
    durationMs: Date.now() - startedAt,
    checks: results.length,
    passed: results.length - failures.length,
    failed: failures.length,
    visualDiffs: results.filter(result => result.status === 'visual-diff').length,
    missingBaselines: results.filter(result => result.status === 'missing-baseline')
      .length,
    overflowFindings: results.filter(result => result.status === 'overflow').length,
    staleBaselines,
    failures,
    results,
  };
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Visual/responsive audit: ${report.status}`);
  console.log(
    `Checks: ${report.checks}; passed: ${report.passed}; failed: ${report.failed}`,
  );
  console.log(
    `Diffs: ${report.visualDiffs}; missing: ${report.missingBaselines}; overflow: ${report.overflowFindings}`,
  );
  console.log(`Report: ${reportPath}`);
  if (!options.update && failures.length) process.exitCode = 1;
}

main().catch(error => {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
});
