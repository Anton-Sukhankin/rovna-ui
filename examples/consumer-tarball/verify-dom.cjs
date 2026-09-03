const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const assetsRoot = path.join(__dirname, 'dist', 'assets');
const bundlePath = fs
  .readdirSync(assetsRoot)
  .filter(filename => filename.endsWith('.js'))
  .map(filename => path.join(assetsRoot, filename))
  .sort((left, right) => fs.statSync(right).size - fs.statSync(left).size)[0];

if (!bundlePath) {
  throw new Error('Vite JavaScript bundle was not found');
}

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  runScripts: 'dangerously',
  url: 'http://127.0.0.1/',
  pretendToBeVisual: true,
});

dom.window.matchMedia = () => ({
  matches: false,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
  dispatchEvent() {
    return false;
  },
});
dom.window.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
dom.window.scrollTo = () => {};

dom.window.eval(fs.readFileSync(bundlePath, 'utf8'));

setTimeout(() => {
  const button = dom.window.document.querySelector('button');
  const root = dom.window.document.querySelector('[data-testid="f13-tarball-consumer"]');
  const breadcrumbs = dom.window.document.querySelector(
    'nav[aria-label="Хлебные крошки"]',
  );
  const breadcrumbLinks = breadcrumbs?.querySelectorAll('a');
  const currentPage = breadcrumbs?.querySelector('[aria-current="page"]');

  if (
    !root ||
    !button ||
    button.textContent.trim() !== 'F-14 Tarball Button' ||
    !breadcrumbs ||
    breadcrumbLinks?.length !== 2 ||
    currentPage?.textContent.trim() !== 'Карточка проекта'
  ) {
    throw new Error('F-14 packaged consumer DOM smoke check failed');
  }

  console.log(
    'F-14 DOM smoke passed: provider, Button and Breadcrumbs rendered from @rovna-ui/components.',
  );
}, 100);
