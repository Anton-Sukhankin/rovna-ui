const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const staticRoot = path.join(appRoot, 'storybook-static');
const reportPath = path.join(repoRoot, 'tmp', 'storybook-static-asset-audit.json');

const textExtensions = new Set(['.css', '.html', '.js', '.mjs']);
const assetExtensions = new Set([
  '.css',
  '.gif',
  '.html',
  '.ico',
  '.jpeg',
  '.jpg',
  '.js',
  '.json',
  '.map',
  '.mjs',
  '.png',
  '.svg',
  '.ttf',
  '.webp',
  '.woff',
  '.woff2',
]);

function walk(root) {
  const files = [];
  const queue = [root];

  while (queue.length) {
    const directory = queue.pop();
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) queue.push(absolute);
      else if (entry.isFile()) files.push(absolute);
    }
  }

  return files;
}

function normalizeReference(reference) {
  const value = reference.trim().replace(/^['"]|['"]$/g, '');
  if (!value || /^(?:data:|https?:|#|javascript:)/i.test(value)) return null;
  const pathname = value.split(/[?#]/, 1)[0];
  if (!pathname || !assetExtensions.has(path.extname(pathname).toLowerCase())) return null;
  try {
    return decodeURIComponent(pathname);
  } catch {
    return pathname;
  }
}

function extractReferences(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (!textExtensions.has(extension)) return [];

  const source = fs.readFileSync(filePath, 'utf8');
  const references = [];
  const patterns = [];

  if (extension === '.html') {
    patterns.push(/\b(?:href|src)\s*=\s*["']([^"']+)["']/gi);
  }
  if (extension === '.css') {
    patterns.push(/\burl\(\s*["']?([^"')]+)["']?\s*\)/gi);
  }
  if (extension === '.js' || extension === '.mjs') {
    const sourceFile = ts.createSourceFile(
      filePath,
      source,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.JS,
    );
    const visit = node => {
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier &&
        ts.isStringLiteral(node.moduleSpecifier)
      ) {
        references.push(node.moduleSpecifier.text);
      }
      if (
        ts.isCallExpression(node) &&
        node.expression.kind === ts.SyntaxKind.ImportKeyword &&
        node.arguments.length === 1 &&
        ts.isStringLiteral(node.arguments[0])
      ) {
        references.push(node.arguments[0].text);
      }
      if (
        ts.isNewExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === 'URL' &&
        node.arguments?.length === 2 &&
        ts.isStringLiteral(node.arguments[0]) &&
        node.arguments[1].getText(sourceFile) === 'import.meta.url'
      ) {
        references.push(node.arguments[0].text);
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile);
    patterns.push(/\/\/[#@]\s*sourceMappingURL=([^\s]+)/g);
  }

  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      const reference = normalizeReference(match[1]);
      if (reference) references.push(reference);
    }
  }

  return [...new Set(references.map(normalizeReference).filter(Boolean))];
}

function resolveReference(fromFile, reference) {
  const absolute = reference.startsWith('/')
    ? path.resolve(staticRoot, reference.replace(/^\/+/, ''))
    : path.resolve(path.dirname(fromFile), reference);
  const root = path.resolve(staticRoot);
  if (absolute !== root && !absolute.startsWith(`${root}${path.sep}`)) return null;
  return absolute;
}

function main() {
  if (!fs.existsSync(path.join(staticRoot, 'index.json'))) {
    throw new Error('Static Storybook is missing. Run storybook:local:build first.');
  }

  const index = JSON.parse(fs.readFileSync(path.join(staticRoot, 'index.json'), 'utf8'));
  const entries = Object.values(index.entries || {});
  const files = walk(staticRoot);
  const entryFiles = ['index.html', 'iframe.html']
    .map(file => path.join(staticRoot, file))
    .filter(file => fs.existsSync(file));
  const references = new Map();
  const missing = [];
  const escaped = [];
  const reachable = new Set();
  const queue = [...entryFiles];

  while (queue.length) {
    const file = queue.pop();
    if (reachable.has(file)) continue;
    reachable.add(file);
    for (const reference of extractReferences(file)) {
      const resolved = resolveReference(file, reference);
      const key = `${path.relative(staticRoot, file)} -> ${reference}`;
      if (!resolved) {
        escaped.push(key);
        continue;
      }
      references.set(key, path.relative(staticRoot, resolved));
      if (!fs.existsSync(resolved) || fs.statSync(resolved).isDirectory()) {
        missing.push(key);
      } else if (textExtensions.has(path.extname(resolved).toLowerCase())) {
        queue.push(resolved);
      }
    }
  }

  const duplicateIds = entries
    .map(entry => entry.id)
    .filter((id, indexOfId, ids) => ids.indexOf(id) !== indexOfId);
  const invalidEntries = entries
    .filter(entry => !entry.id || !entry.title || !entry.type || !entry.importPath)
    .map(entry => entry.id || '<missing-id>');
  const storyCount = entries.filter(entry => entry.type === 'story').length;
  const docsCount = entries.filter(entry => entry.type === 'docs').length;
  const status =
    missing.length === 0 &&
    escaped.length === 0 &&
    duplicateIds.length === 0 &&
    invalidEntries.length === 0
      ? 'passed'
      : 'failed';
  const report = {
    status,
    staticRoot,
    entries: entries.length,
    stories: storyCount,
    docs: docsCount,
    files: files.length,
    reachableFiles: reachable.size,
    localReferences: references.size,
    missing,
    escaped,
    duplicateIds,
    invalidEntries,
  };

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Storybook static asset audit: ${status}`);
  console.log(`Entries: ${entries.length}; stories: ${storyCount}; docs: ${docsCount}`);
  console.log(
    `Files: ${files.length}; reachable files: ${reachable.size}; local references: ${references.size}`,
  );
  console.log(`Missing: ${missing.length}; invalid entries: ${invalidEntries.length}`);
  console.log(`Report: ${reportPath}`);

  if (status !== 'passed') process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
