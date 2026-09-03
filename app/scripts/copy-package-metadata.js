const fs = require('fs');
const path = require('path');

const packageRoot = process.cwd();
const sourcePath = path.join(packageRoot, 'package.json');
const outputRoot = path.join(packageRoot, 'dist');
const outputPath = path.join(outputRoot, 'package.json');
const repositoryLicensePath = path.resolve(packageRoot, '..', '..', '..', 'LICENSE');
const repositoryTrademarkPath = path.resolve(packageRoot, '..', '..', '..', 'TRADEMARKS.md');

function withDotSlash(target) {
  return target.startsWith('./') ? target : `./${target}`;
}

function sourceTargetToBase(target) {
  const normalized = target.replace(/^\.\//, '');
  const sourceRelative = normalized.startsWith('src/')
    ? normalized.slice('src/'.length)
    : normalized;
  const sourcePath = path.join(packageRoot, normalized);
  const targetWithIndex =
    !path.extname(sourceRelative) && fs.existsSync(sourcePath) && fs.statSync(sourcePath).isDirectory()
      ? path.join(sourceRelative, 'index.ts')
      : sourceRelative;

  return targetWithIndex.replace(/\\/g, '/').replace(/\.(?:tsx?|jsx?|mjs|cjs)$/, '');
}

function listFiles(root) {
  const files = [];
  const queue = [root];

  while (queue.length) {
    const current = queue.shift();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) queue.push(absolute);
      else files.push(absolute);
    }
  }

  return files;
}

function isTypeOnlyRuntimeStub(filePath) {
  const source = fs.readFileSync(filePath, 'utf8').replace(/\s+/g, ' ').trim();
  return (
    source === 'export {};' ||
    source === '"use strict"; Object.defineProperty(exports, "__esModule", { value: true });'
  );
}

function ensureTypeOnlyRuntimeStubSourceMaps() {
  for (const filePath of listFiles(outputRoot)) {
    if (!filePath.endsWith('.js') || !isTypeOnlyRuntimeStub(filePath)) continue;
    const declarationPath = filePath.replace(/\.js$/, '.d.ts');
    if (!fs.existsSync(declarationPath)) continue;

    const outputRelative = path.relative(outputRoot, filePath).replace(/\\/g, '/');
    const sourceRelative = outputRelative.replace(/^cjs\//, '').replace(/\.js$/, '.ts');
    const sourcePath = path.join(packageRoot, 'src', sourceRelative);
    const sources = fs.existsSync(sourcePath)
      ? [path.relative(path.dirname(filePath), sourcePath).replace(/\\/g, '/')]
      : [];
    const mapPath = `${filePath}.map`;
    const map = {
      version: 3,
      file: path.basename(filePath),
      sources,
      sourcesContent: null,
      names: [],
      mappings: '',
    };
    fs.writeFileSync(mapPath, `${JSON.stringify(map)}\n`);

    const source = fs.readFileSync(filePath, 'utf8').replace(/\s*$/, '');
    fs.writeFileSync(filePath, `${source}\n//# sourceMappingURL=${path.basename(mapPath)}\n`);
  }
}

function builtTargetExists(target) {
  const relative = target.replace(/^\.\//, '').replace(/\//g, path.sep);
  if (!relative.includes('*')) return fs.existsSync(path.join(outputRoot, relative));

  const normalizedPattern = relative.replace(/\\/g, '/');
  const [prefix, suffix] = normalizedPattern.split('*');
  return listFiles(outputRoot).some(filePath => {
    const candidate = path.relative(outputRoot, filePath).replace(/\\/g, '/');
    return candidate.startsWith(prefix) && candidate.endsWith(suffix);
  });
}

function createConditionalExport(target) {
  const base = sourceTargetToBase(target);
  const candidates = {
    types: `./${base}.d.ts`,
    import: `./${base}.js`,
    require: `./cjs/${base}.js`,
  };

  return Object.fromEntries(
    Object.entries(candidates).filter(([, builtTarget]) => builtTargetExists(builtTarget)),
  );
}

function expandWildcardExport(subpath, target) {
  const base = sourceTargetToBase(target);
  const typePattern = `${base}.d.ts`;
  const escapedPattern = typePattern
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace('*', '(.*)');
  const matcher = new RegExp(`^${escapedPattern}$`);
  const entries = {};

  for (const filePath of listFiles(outputRoot)) {
    const relative = path.relative(outputRoot, filePath).replace(/\\/g, '/');
    if (relative.startsWith('cjs/')) continue;
    const match = relative.match(matcher);
    if (!match) continue;
    const replacement = match[1];
    const conditions = createConditionalExport(target.replace('*', replacement));
    if (!conditions.types) continue;
    if (Boolean(conditions.import) !== Boolean(conditions.require)) {
      delete conditions.import;
      delete conditions.require;
    }
    entries[subpath.replace('*', replacement)] = conditions;
  }

  return entries;
}

function createBuiltExports(manifest) {
  const builtExports = {};

  if (manifest.types && manifest.module && manifest.main) {
    builtExports['.'] = {
      types: withDotSlash(manifest.types),
      import: withDotSlash(manifest.module),
      require: withDotSlash(manifest.main),
    };
  }

  for (const [subpath, target] of Object.entries(manifest.exports || {})) {
    if (typeof target === 'string') {
      if (subpath.includes('*') && target.includes('*')) {
        Object.assign(builtExports, expandWildcardExport(subpath, target));
      } else {
        builtExports[subpath] = createConditionalExport(target);
      }
    } else if (target && typeof target === 'object') {
      builtExports[subpath] = target;
    }
  }

  return builtExports;
}

if (!fs.existsSync(sourcePath)) {
  throw new Error(`Package manifest not found: ${sourcePath}`);
}
if (!fs.existsSync(outputRoot)) {
  throw new Error(`Package dist directory not found: ${outputRoot}`);
}

const manifest = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
ensureTypeOnlyRuntimeStubSourceMaps();
const builtExports = createBuiltExports(manifest);

if (manifest.scripts) {
  delete manifest.scripts.prepare;
}
if (manifest.sideEffects === undefined) {
  manifest.sideEffects = ['**/*.css'];
}
manifest.exports = builtExports;

fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
if (!fs.existsSync(repositoryLicensePath)) {
  throw new Error(`Repository license not found: ${repositoryLicensePath}`);
}
fs.copyFileSync(repositoryLicensePath, path.join(outputRoot, 'LICENSE'));
if (fs.existsSync(repositoryTrademarkPath)) {
  fs.copyFileSync(repositoryTrademarkPath, path.join(outputRoot, 'TRADEMARKS.md'));
}
console.log(`Copied package metadata: ${manifest.name} -> ${outputPath}`);
