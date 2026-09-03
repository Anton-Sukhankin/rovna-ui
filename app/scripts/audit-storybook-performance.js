const fs = require('fs');
const http = require('http');
const path = require('path');
const { chromium } = require('playwright');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const staticRoot = path.join(appRoot, 'storybook-static');
const reportPath = path.join(repoRoot, 'docs', 'q12-performance-report.json');

const renderTargets = [
  { id: 'rovna-ui-main-primitives-table--virtual', declaredItems: 5000 },
  { id: 'rovna-ui-table-table--default', declaredItems: 50 },
  { id: 'rovna-ui-tree-tree--default', declaredItems: 'fixture tree' },
  { id: 'rovna-ui-main-primitives-select--large', declaredItems: 'interactive options' },
  { id: 'rovna-ui-main-components-checkboxgroupsearch--virtual', declaredItems: 1000 },
  { id: 'rovna-ui-main-components-radiogroupsearch--virtual', declaredItems: 1000 },
  { id: 'rovna-ui-filters-filters--default', declaredItems: 'composed filters' },
  { id: 'rovna-ui-upload-uploadarea--default', declaredItems: 'upload surface' },
];

const interactionTargets = [
  {
    id: 'rovna-ui-main-components-checkboxgroupsearch--virtual',
    operation: 'search 1000 checkbox options',
    selector: 'input',
    action: 'fill',
    value: '\u0430',
  },
  {
    id: 'rovna-ui-main-components-radiogroupsearch--virtual',
    operation: 'search 1000 radio options',
    selector: 'input',
    action: 'fill',
    value: '\u0430',
  },
  {
    id: 'rovna-ui-main-primitives-table--sorting',
    operation: 'sort table rows',
    selector: 'thead th.rovna-ui-table-column-has-sorters:visible',
    action: 'click',
  },
  {
    id: 'rovna-ui-tree-tree--filtering-algorithm',
    operation: 'filter tree nodes',
    selector: 'input',
    action: 'fill',
    value: '\u043f\u0440\u043e',
  },
];

const lifecycleTargets = [
  'rovna-ui-main-primitives-table--virtual',
  'rovna-ui-tree-tree--default',
  'rovna-ui-main-primitives-select--large',
  'rovna-ui-main-primitives-modal--large',
];

const observerTargets = [
  { id: 'rovna-ui-main-primitives-select--large', trigger: 'combobox' },
  { id: 'rovna-ui-main-primitives-modal--large' },
  { id: 'rovna-ui-primitives-drawer--default' },
];

const partialDataTargets = [
  {
    id: 'rovna-ui-main-primitives-table--default',
    updatedArgs: { dataSource: [{ key: 'partial-row', name: null }] },
  },
  {
    id: 'rovna-ui-tree-tree--default',
    updatedArgs: { defaultNodes: [{ key: 'partial-node', children: [] }] },
  },
  {
    id: 'rovna-ui-main-primitives-select--large',
    updatedArgs: { options: [{ value: 'partial-option' }, { label: 'Partial label' }] },
  },
];

const fallbackTargets = [
  {
    id: 'rovna-ui-table-table--empty',
    expected: /\u043d\u0435\u0442 \u0434\u0430\u043d\u043d\u044b\u0445|\u043d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e/i,
  },
  {
    id: 'rovna-ui-main-primitives-table--empty',
    expected: /\u043d\u0435\u0442 \u0434\u0430\u043d\u043d\u044b\u0445|\u043d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e/i,
  },
  {
    id: 'rovna-ui-main-components-checkboxgroupsearch--error',
    expected: /\u043e\u0448\u0438\u0431|\u043d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c|\u043f\u043e\u0432\u0442\u043e\u0440/i,
  },
  {
    id: 'rovna-ui-main-components-asynccheckbox--api-error',
    expected: /\u043e\u0448\u0438\u0431|\u043d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c|\u043f\u043e\u0432\u0442\u043e\u0440/i,
  },
  {
    id: 'rovna-ui-main-components-asynccheckbox--api-empty',
    expected: /\u043d\u0435\u0442 \u0434\u0430\u043d\u043d\u044b\u0445|\u043d\u0438\u0447\u0435\u0433\u043e|\u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d/i,
  },
  {
    id: 'rovna-ui-main-components-asyncselect--api-error',
    expected: /\u043e\u0448\u0438\u0431|\u043d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c|\u043f\u043e\u0432\u0442\u043e\u0440/i,
    trigger: 'combobox',
  },
  {
    id: 'rovna-ui-main-components-asyncselect--api-empty',
    expected: /\u043d\u0435\u0442 \u0434\u0430\u043d\u043d\u044b\u0445|\u043d\u0438\u0447\u0435\u0433\u043e|\u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d/i,
    trigger: 'combobox',
  },
];

const budgets = {
  renderMs: 4000,
  domNodes: 15000,
  cumulativeLayoutShift: 0.25,
  longTaskTotalMs: 1200,
  longTaskMaxMs: 600,
  interactionMs: 1500,
  eventLoopDelayMs: 500,
  listenerGrowthAfterFiveRemounts: 10,
  timerGrowthAfterFiveRemounts: 1,
  observedNodeGrowthAfterFiveRemounts: 2,
};

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
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
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
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
      'content-type': mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
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

function diagnosticsFor(page) {
  const diagnostics = { consoleErrors: [], consoleWarnings: [], pageErrors: [] };
  page.on('console', message => {
    if (message.type() === 'error') diagnostics.consoleErrors.push(message.text());
    if (message.type() === 'warning' || message.type() === 'warn') {
      diagnostics.consoleWarnings.push(message.text());
    }
  });
  page.on('pageerror', error => diagnostics.pageErrors.push(error.message));
  return diagnostics;
}

async function newPage(browser, { instrumentResources = false } = {}) {
  const context = await browser.newContext({
    locale: 'ru-RU',
    viewport: { width: 1440, height: 900 },
  });
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.hostname === '127.0.0.1') return route.continue();
    return route.abort('blockedbyclient');
  });
  const page = await context.newPage();
  if (instrumentResources) {
    await page.addInitScript(() => {
      const nativeSetTimeout = window.setTimeout.bind(window);
      const nativeClearTimeout = window.clearTimeout.bind(window);
      const nativeSetInterval = window.setInterval.bind(window);
      const nativeClearInterval = window.clearInterval.bind(window);
      const timeouts = new Map();
      const intervals = new Set();
      window.setTimeout = (callback, delay, ...args) => {
        let handle;
        const wrapped = (...callbackArgs) => {
          timeouts.delete(handle);
          if (typeof callback === 'function') return callback(...callbackArgs);
          return undefined;
        };
        handle = nativeSetTimeout(wrapped, delay, ...args);
        timeouts.set(handle, {
          delay: Number(delay) || 0,
          stack: new Error().stack?.split('\n').slice(2, 7).join('\n') || '',
        });
        return handle;
      };
      window.clearTimeout = handle => {
        timeouts.delete(handle);
        return nativeClearTimeout(handle);
      };
      window.setInterval = (callback, delay, ...args) => {
        const handle = nativeSetInterval(callback, delay, ...args);
        intervals.add(handle);
        return handle;
      };
      window.clearInterval = handle => {
        intervals.delete(handle);
        return nativeClearInterval(handle);
      };

      const listenerRecords = new WeakMap();
      let activeListeners = 0;
      const nativeAdd = EventTarget.prototype.addEventListener;
      const nativeRemove = EventTarget.prototype.removeEventListener;
      const isGlobalTarget = target =>
        target === window ||
        target === document ||
        target === document.documentElement ||
        target === document.body;
      const captureValue = options =>
        typeof options === 'boolean' ? options : Boolean(options && options.capture);
      EventTarget.prototype.addEventListener = function add(type, listener, options) {
        const once = typeof options === 'object' && Boolean(options && options.once);
        if (listener && !once && isGlobalTarget(this)) {
          const records = listenerRecords.get(this) || [];
          const capture = captureValue(options);
          if (!records.some(item => item.type === type && item.listener === listener && item.capture === capture)) {
            records.push({ type, listener, capture });
            listenerRecords.set(this, records);
            activeListeners += 1;
          }
        }
        return nativeAdd.call(this, type, listener, options);
      };
      EventTarget.prototype.removeEventListener = function remove(type, listener, options) {
        if (!isGlobalTarget(this)) return nativeRemove.call(this, type, listener, options);
        const records = listenerRecords.get(this) || [];
        const capture = captureValue(options);
        const index = records.findIndex(
          item => item.type === type && item.listener === listener && item.capture === capture,
        );
        if (index >= 0) {
          records.splice(index, 1);
          activeListeners -= 1;
        }
        return nativeRemove.call(this, type, listener, options);
      };

      let observedNodes = 0;
      const NativeResizeObserver = window.ResizeObserver;
      if (NativeResizeObserver) {
        window.ResizeObserver = class InstrumentedResizeObserver extends NativeResizeObserver {
          constructor(callback) {
            super(callback);
            this.__qObserved = new Set();
          }
          observe(target, options) {
            if (!this.__qObserved.has(target)) {
              this.__qObserved.add(target);
              observedNodes += 1;
            }
            return super.observe(target, options);
          }
          unobserve(target) {
            if (this.__qObserved.delete(target)) observedNodes -= 1;
            return super.unobserve(target);
          }
          disconnect() {
            observedNodes -= this.__qObserved.size;
            this.__qObserved.clear();
            return super.disconnect();
          }
        };
      }
      window.__qResources = {
        snapshot: () => ({
          activeTimeouts: timeouts.size,
          activeIntervals: intervals.size,
          activeTimers: timeouts.size + intervals.size,
          activeListeners,
          observedNodes,
          pendingTimeouts: [...timeouts.values()]
            .sort((left, right) => right.delay - left.delay)
            .slice(0, 10),
        }),
      };
    });
  }
  return { context, page, diagnostics: diagnosticsFor(page) };
}

async function waitForStory(page, baseUrl, id) {
  await page.goto(`${baseUrl}/iframe.html?id=${encodeURIComponent(id)}&viewMode=story`, {
    timeout: 20_000,
    waitUntil: 'domcontentloaded',
  });
  await page.waitForFunction(
    () => (document.querySelector('#storybook-root')?.childElementCount || 0) > 0,
    null,
    { timeout: 15_000 },
  );
  await page.waitForLoadState('networkidle', { timeout: 3_000 }).catch(() => {});
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(150);
}

function hasRenderFailure(diagnostics, state) {
  const actionablePageErrors = diagnostics.pageErrors.filter(
    message => message !== 'The user aborted a request.',
  );
  return (
    diagnostics.consoleErrors.length > 0 ||
    actionablePageErrors.length > 0 ||
    state.errorBoundary ||
    state.rootChildren === 0
  );
}

async function pageState(page) {
  return page.evaluate(() => ({
    rootChildren: document.querySelector('#storybook-root')?.childElementCount || 0,
    bodyText: document.body.innerText || '',
    errorBoundary: [...document.querySelectorAll('.sb-errordisplay, [data-testid="story-errored"]')]
      .some(node => {
        const style = getComputedStyle(node);
        const rect = node.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
      }),
  }));
}

async function measureRender(page, baseUrl, id) {
  await page.addInitScript(() => {
    window.__qMetrics = { cls: 0, longTasks: [] };
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__qMetrics.cls += entry.value;
      }
    }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) window.__qMetrics.longTasks.push(entry.duration);
    }).observe({ type: 'longtask', buffered: true });
  });
  const startedAt = Date.now();
  await waitForStory(page, baseUrl, id);
  return page.evaluate(renderMs => {
    const longTasks = window.__qMetrics?.longTasks || [];
    return {
      renderMs,
      domNodes: document.querySelectorAll('*').length,
      cumulativeLayoutShift: window.__qMetrics?.cls || 0,
      longTasks: longTasks.length,
      longTaskTotalMs: longTasks.reduce((sum, duration) => sum + duration, 0),
      longTaskMaxMs: longTasks.length ? Math.max(...longTasks) : 0,
      rootHeight: document.querySelector('#storybook-root')?.getBoundingClientRect().height || 0,
    };
  }, Date.now() - startedAt);
}

async function auditRenderBudgets(browser, baseUrl, index) {
  const results = [];
  for (const target of renderTargets) {
    const runs = [];
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const { context, page } = await newPage(browser);
      runs.push(await measureRender(page, baseUrl, target.id));
      await context.close();
    }
    const ordered = [...runs].sort((first, second) => first.renderMs - second.renderMs);
    const median = ordered[Math.floor(ordered.length / 2)];
    const violations = ['renderMs', 'domNodes', 'cumulativeLayoutShift', 'longTaskTotalMs', 'longTaskMaxMs']
      .filter(key => median[key] > budgets[key])
      .map(key => ({ metric: key, actual: median[key], budget: budgets[key] }));
    results.push({
      ...target,
      title: index.entries[target.id].title,
      name: index.entries[target.id].name,
      status: violations.length ? 'budget-exceeded' : 'passed',
      median,
      runs,
      violations,
    });
    console.log(`${target.id}: ${median.renderMs} ms, ${median.domNodes} nodes`);
  }
  return results;
}

async function auditInteractions(browser, baseUrl) {
  const results = [];
  for (const target of interactionTargets) {
    const { context, page, diagnostics } = await newPage(browser);
    try {
      await waitForStory(page, baseUrl, target.id);
      const locator = page.locator(target.selector).first();
      const locatorFound = (await locator.count()) > 0 && (await locator.isVisible());
      let interactionMs = null;
      let eventLoopDelayMs = null;
      let actionError = null;
      if (locatorFound) {
        try {
          const startedAt = Date.now();
          if (target.action === 'fill') await locator.fill(target.value, { timeout: 5000 });
          else await locator.click({ timeout: 5000 });
          eventLoopDelayMs = await page.evaluate(
            () => new Promise(resolve => {
              const started = performance.now();
              setTimeout(() => resolve(performance.now() - started), 0);
            }),
          );
          await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
          interactionMs = Date.now() - startedAt;
        } catch (error) {
          actionError = error.message;
        }
      }
      const state = await pageState(page);
      const violations = [];
      if (!locatorFound) violations.push({ metric: 'target', actual: 'missing', budget: 'present' });
      if (actionError) violations.push({ metric: 'action', actual: actionError, budget: 'no error' });
      if (interactionMs > budgets.interactionMs) {
        violations.push({ metric: 'interactionMs', actual: interactionMs, budget: budgets.interactionMs });
      }
      if (eventLoopDelayMs > budgets.eventLoopDelayMs) {
        violations.push({ metric: 'eventLoopDelayMs', actual: eventLoopDelayMs, budget: budgets.eventLoopDelayMs });
      }
      if (hasRenderFailure(diagnostics, state)) {
        violations.push({ metric: 'runtime', actual: 'error', budget: 'no errors' });
      }
      results.push({ ...target, status: violations.length ? 'finding' : 'passed', interactionMs, eventLoopDelayMs, actionError, diagnostics, violations });
    } finally {
      await context.close();
    }
  }
  return results;
}

async function auditLifecycle(browser, baseUrl) {
  const results = [];
  for (const id of lifecycleTargets) {
    const { context, page, diagnostics } = await newPage(browser, { instrumentResources: true });
    try {
      await waitForStory(page, baseUrl, id);
      await page.waitForTimeout(1500);
      const baseline = await page.evaluate(() => window.__qResources.snapshot());
      let remountError = null;
      try {
        await page.evaluate(async () => {
          for (let index = 0; index < 5; index += 1) {
            const channel = window.__STORYBOOK_ADDONS_CHANNEL__;
            const rendered = new Promise(resolve => channel.once('storyRendered', resolve));
            await window.__STORYBOOK_PREVIEW__.currentRender.remount();
            let timeoutHandle;
            const timeout = new Promise((_, reject) => {
              timeoutHandle = setTimeout(() => reject(new Error('Remount timeout')), 5000);
            });
            try {
              await Promise.race([rendered, timeout]);
            } finally {
              clearTimeout(timeoutHandle);
            }
            await new Promise(resolve => setTimeout(resolve, 250));
          }
        });
      } catch (error) {
        remountError = error.message;
      }
      await page.waitForTimeout(5500);
      const after = await page.evaluate(() => window.__qResources.snapshot());
      const growth = {
        activeListeners: after.activeListeners - baseline.activeListeners,
        activeTimers: after.activeTimers - baseline.activeTimers,
        observedNodes: after.observedNodes - baseline.observedNodes,
      };
      const violations = [];
      if (remountError) violations.push({ metric: 'remount', actual: remountError, budget: 'no error' });
      if (growth.activeListeners > budgets.listenerGrowthAfterFiveRemounts) {
        violations.push({ metric: 'listenerGrowth', actual: growth.activeListeners, budget: budgets.listenerGrowthAfterFiveRemounts });
      }
      if (growth.activeTimers > budgets.timerGrowthAfterFiveRemounts) {
        violations.push({ metric: 'timerGrowth', actual: growth.activeTimers, budget: budgets.timerGrowthAfterFiveRemounts });
      }
      if (growth.observedNodes > budgets.observedNodeGrowthAfterFiveRemounts) {
        violations.push({ metric: 'observedNodeGrowth', actual: growth.observedNodes, budget: budgets.observedNodeGrowthAfterFiveRemounts });
      }
      const state = await pageState(page);
      if (hasRenderFailure(diagnostics, state)) violations.push({ metric: 'runtime', actual: 'error', budget: 'no errors' });
      results.push({ id, status: violations.length ? 'finding' : 'passed', remounts: 5, baseline, after, growth, diagnostics, violations });
    } finally {
      await context.close();
    }
  }
  return results;
}

async function triggerIfNeeded(page, trigger) {
  if (!trigger) return;
  const locator = trigger === 'combobox'
    ? page.locator('[role="combobox"]:visible, .rovna-ui-select-selector:visible').first()
    : page.locator(trigger).first();
  if ((await locator.count()) > 0 && (await locator.isVisible())) {
    await locator.click({ timeout: 5000 }).catch(() => {});
  }
  await page.waitForTimeout(500);
}

async function auditObservers(browser, baseUrl) {
  const results = [];
  for (const target of observerTargets) {
    const { context, page, diagnostics } = await newPage(browser, { instrumentResources: true });
    try {
      await waitForStory(page, baseUrl, target.id);
      await triggerIfNeeded(page, target.trigger);
      const resources = await page.evaluate(() => window.__qResources.snapshot());
      const observerWarnings = diagnostics.consoleWarnings.filter(message => /ResizeObserver|portal|measure/i.test(message));
      const state = await pageState(page);
      const status = hasRenderFailure(diagnostics, state) || observerWarnings.length ? 'finding' : 'passed';
      results.push({ ...target, status, resources, observerWarnings, diagnostics });
    } finally {
      await context.close();
    }
  }
  return results;
}

async function auditPartialData(browser, baseUrl) {
  const results = [];
  for (const target of partialDataTargets) {
    const { context, page, diagnostics } = await newPage(browser);
    try {
      await waitForStory(page, baseUrl, target.id);
      await page.evaluate(updatedArgs => {
        const preview = window.__STORYBOOK_PREVIEW__;
        window.__STORYBOOK_ADDONS_CHANNEL__.emit('updateStoryArgs', {
          storyId: preview.currentSelection.storyId,
          updatedArgs,
        });
      }, target.updatedArgs);
      await page.waitForTimeout(500);
      const state = await pageState(page);
      const status = hasRenderFailure(diagnostics, state) ? 'finding' : 'passed';
      results.push({ id: target.id, status, state: { rootChildren: state.rootChildren, bodyTextLength: state.bodyText.length, errorBoundary: state.errorBoundary }, diagnostics });
    } finally {
      await context.close();
    }
  }
  return results;
}

async function auditFallbacks(browser, baseUrl) {
  const results = [];
  for (const target of fallbackTargets) {
    const { context, page, diagnostics } = await newPage(browser);
    try {
      await waitForStory(page, baseUrl, target.id);
      await triggerIfNeeded(page, target.trigger);
      await page.waitForTimeout(target.id.includes('async') ? 3000 : 700);
      const state = await pageState(page);
      const fallbackVisible = target.expected.test(state.bodyText);
      const status = !fallbackVisible || hasRenderFailure(diagnostics, state) ? 'finding' : 'passed';
      results.push({ id: target.id, status, fallbackVisible, bodyTextSample: state.bodyText.slice(0, 300), diagnostics });
    } finally {
      await context.close();
    }
  }
  return results;
}

function findings(rows) {
  return rows.filter(row => row.status !== 'passed');
}

async function main() {
  const startedAt = Date.now();
  const index = JSON.parse(fs.readFileSync(path.join(staticRoot, 'index.json'), 'utf8'));
  const allTargets = [
    ...renderTargets.map(target => target.id),
    ...interactionTargets.map(target => target.id),
    ...lifecycleTargets,
    ...observerTargets.map(target => target.id),
    ...partialDataTargets.map(target => target.id),
    ...fallbackTargets.map(target => target.id),
  ];
  const missing = [...new Set(allTargets)].filter(id => !index.entries[id]);
  if (missing.length) throw new Error(`Performance targets missing: ${missing.join(', ')}`);

  const server = createServer();
  const baseUrl = await listen(server);
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const renderResults = await auditRenderBudgets(browser, baseUrl, index);
    const interactionResults = await auditInteractions(browser, baseUrl);
    const lifecycleResults = await auditLifecycle(browser, baseUrl);
    const observerResults = await auditObservers(browser, baseUrl);
    const partialDataResults = await auditPartialData(browser, baseUrl);
    const fallbackResults = await auditFallbacks(browser, baseUrl);
    const sections = {
      render: { results: renderResults, findings: findings(renderResults).length },
      interactions: { results: interactionResults, findings: findings(interactionResults).length },
      lifecycle: { results: lifecycleResults, findings: findings(lifecycleResults).length },
      observers: { results: observerResults, findings: findings(observerResults).length },
      partialData: { results: partialDataResults, findings: findings(partialDataResults).length },
      fallbacks: { results: fallbackResults, findings: findings(fallbackResults).length },
    };
    const findingCount = Object.values(sections).reduce((sum, section) => sum + section.findings, 0);
    const report = {
      formatVersion: 2,
      status: findingCount ? 'findings' : 'passed',
      generatedAt: new Date().toISOString(),
      durationMs: Date.now() - startedAt,
      browser: 'Chromium',
      externalRequests: 'blocked',
      enforcement: 'diagnostic; no hard microbenchmark CI threshold',
      repetitions: 3,
      aggregation: 'median render duration run',
      budgets,
      scaleEvidence: [
        { storyId: 'rovna-ui-main-primitives-table--virtual', declaredItems: 5000, source: 'story args' },
        { storyId: 'rovna-ui-main-components-checkboxgroupsearch--virtual', declaredItems: 1000, source: 'story args' },
        { storyId: 'rovna-ui-main-components-radiogroupsearch--virtual', declaredItems: 1000, source: 'story args' },
      ],
      findingCount,
      sections,
    };
    fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
    console.log(`Performance and resilience audit: ${report.status}`);
    console.log(`Findings: ${findingCount}`);
    console.log(`Report: ${reportPath}`);
  } finally {
    await browser.close();
    await close(server);
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
