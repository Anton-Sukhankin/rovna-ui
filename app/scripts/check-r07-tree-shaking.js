const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const webpack = require('webpack');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const outputRoot = path.join(repoRoot, 'tmp', 'r07-tree-shaking');
const entriesRoot = path.join(outputRoot, 'entries');
const reportPath = path.join(repoRoot, 'docs', 'r07-tree-shaking.json');
const budgetPath = path.join(appRoot, 'tree-shaking-budgets.json');
const reactReportPath = path.join(repoRoot, 'docs', 'react-compatibility.json');
const boundaryPath = path.join(appRoot, 'release-boundary.json');
const update = process.argv.includes('--update');

const scenarios = [
  {
    id: 'button-root',
    source: `import React from 'react';\nimport { Button } from '@rovna-ui/components';\nglobalThis.__R07_RESULT__ = React.createElement(Button, { variant: 'primary' }, 'button');\n`,
  },
  {
    id: 'button-subpath',
    source: `import React from 'react';\nimport { Button } from '@rovna-ui/components/primitives/Button';\nglobalThis.__R07_RESULT__ = React.createElement(Button, { variant: 'primary' }, 'button');\n`,
  },
  {
    id: 'breadcrumbs-root',
    source: `import React from 'react';\nimport { Breadcrumbs } from '@rovna-ui/components';\nconst items = [{ key: 'home', label: 'Главная', href: '/' }, { key: 'current', label: 'Текущая страница' }];\nglobalThis.__R07_RESULT__ = React.createElement(Breadcrumbs, { items });\n`,
  },
  {
    id: 'breadcrumbs-subpath',
    source: `import React from 'react';\nimport { Breadcrumbs } from '@rovna-ui/components/primitives/Breadcrumbs';\nconst items = [{ key: 'home', label: 'Главная', href: '/' }, { key: 'current', label: 'Текущая страница' }];\nglobalThis.__R07_RESULT__ = React.createElement(Breadcrumbs, { items });\n`,
  },
  {
    id: 'icon-root',
    source: `import React from 'react';\nimport { Add } from '@rovna-ui/icons';\nglobalThis.__R07_RESULT__ = React.createElement(Add, { size: 24 });\n`,
  },
  {
    id: 'icon-subpath',
    source: `import React from 'react';\nimport { Add } from '@rovna-ui/icons/Add';\nglobalThis.__R07_RESULT__ = React.createElement(Add, { size: 24 });\n`,
  },
  {
    id: 'logo-root',
    source: `import React from 'react';\nimport { SMaterials } from '@rovna-ui/logos';\nglobalThis.__R07_RESULT__ = React.createElement(SMaterials, { size: 24 });\n`,
  },
  {
    id: 'logo-subpath',
    source: `import React from 'react';\nimport { SMaterials } from '@rovna-ui/logos/SMaterials';\nglobalThis.__R07_RESULT__ = React.createElement(SMaterials, { size: 24 });\n`,
  },
  {
    id: 'utils-root',
    source: `import { isBoolean } from '@rovna-ui/utils';\nglobalThis.__R07_RESULT__ = isBoolean(true);\n`,
  },
  {
    id: 'utils-subpath',
    source: `import { isBoolean } from '@rovna-ui/utils/isBoolean';\nglobalThis.__R07_RESULT__ = isBoolean(true);\n`,
  },
  {
    id: 'full-consumer',
    entry: path.join(repoRoot, 'examples', 'consumer-webpack', 'src', 'main.js'),
  },
];

const pairs = [
  ['button-root', 'button-subpath'],
  ['breadcrumbs-root', 'breadcrumbs-subpath'],
  ['icon-root', 'icon-subpath'],
  ['logo-root', 'logo-subpath'],
  ['utils-root', 'utils-subpath'],
];
const singletonPackages = ['react', 'styled-components', '@rovna-ui/icons', '@rovna-ui/utils'];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
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

function measureVite(consumerRoot) {
  const distRoot = path.join(consumerRoot, 'dist');
  if (!fs.existsSync(distRoot)) return null;
  const chunks = listFiles(distRoot).filter(filePath => filePath.endsWith('.js'));
  const measurements = chunks.map(filePath => {
    const source = fs.readFileSync(filePath);
    return {
      file: path.relative(distRoot, filePath).replace(/\\/g, '/'),
      bytes: source.length,
      gzipBytes: zlib.gzipSync(source, { level: 9 }).length,
    };
  });
  return {
    chunks: measurements.length,
    bytes: measurements.reduce((total, row) => total + row.bytes, 0),
    gzipBytes: measurements.reduce((total, row) => total + row.gzipBytes, 0),
    largestChunkBytes: Math.max(0, ...measurements.map(row => row.bytes)),
    files: measurements,
  };
}

function flattenModules(modules, output = []) {
  for (const module of modules || []) {
    output.push(module);
    flattenModules(module.modules, output);
  }
  return output;
}

function packageRoots(modules, packageName) {
  const token = `/node_modules/${packageName}/`;
  const roots = new Set();
  for (const module of modules) {
    const identifier = String(module.identifier || module.nameForCondition || module.name || '')
      .replace(/\\/g, '/');
    const index = identifier.lastIndexOf(token);
    if (index >= 0) roots.add(identifier.slice(0, index + token.length - 1));
  }
  return [...roots].sort();
}

function moduleCount(modules, packageName) {
  const token = `/node_modules/${packageName}/`;
  return modules.filter(module =>
    String(module.identifier || module.nameForCondition || module.name || '')
      .replace(/\\/g, '/')
      .includes(token),
  ).length;
}

function buildScenario(scenario, consumerRoot) {
  return new Promise(resolve => {
    const scenarioRoot = path.join(outputRoot, scenario.id);
    const entryPath = scenario.entry || path.join(entriesRoot, `${scenario.id}.js`);
    fs.rmSync(scenarioRoot, { force: true, recursive: true });
    fs.mkdirSync(scenarioRoot, { recursive: true });
    if (scenario.source) fs.writeFileSync(entryPath, scenario.source);
    const startedAt = Date.now();

    webpack(
      {
        mode: 'production',
        context: repoRoot,
        entry: entryPath,
        output: { path: scenarioRoot, filename: 'bundle.js', clean: true },
        resolve: {
          extensions: ['.js', '.json'],
          modules: [path.join(consumerRoot, 'node_modules'), path.join(appRoot, 'node_modules')],
        },
        optimization: {
          usedExports: true,
          concatenateModules: true,
          minimize: true,
        },
        performance: false,
        devtool: false,
        target: 'web',
      },
      (error, stats) => {
        const statsJson = stats?.toJson({
          all: false,
          errors: true,
          warnings: true,
          modules: true,
          nestedModules: true,
        });
        const bundlePath = path.join(scenarioRoot, 'bundle.js');
        const modules = flattenModules(statsJson?.modules || []);
        const failed = Boolean(error || stats?.hasErrors() || !fs.existsSync(bundlePath));
        const bundle = failed ? Buffer.alloc(0) : fs.readFileSync(bundlePath);
        resolve({
          id: scenario.id,
          status: failed ? 'failed' : 'passed',
          bundleBytes: bundle.length,
          gzipBytes: bundle.length ? zlib.gzipSync(bundle, { level: 9 }).length : 0,
          modules: modules.length,
          packageModuleCounts: Object.fromEntries(
            singletonPackages.map(packageName => [packageName, moduleCount(modules, packageName)]),
          ),
          packageRoots: Object.fromEntries(
            singletonPackages.map(packageName => [packageName, packageRoots(modules, packageName)]),
          ),
          warnings: statsJson?.warnings?.length || 0,
          errors: [error?.message, ...(statsJson?.errors || []).map(item => item.message || String(item))]
            .filter(Boolean),
          durationMs: Date.now() - startedAt,
        });
      },
    );
  });
}

function roundBudget(value) {
  return Math.ceil((value * 1.1) / 4096) * 4096;
}

function createBudgets(rows, vite) {
  return {
    formatVersion: 1,
    updatedAt: new Date().toISOString(),
    policy: 'R-07 production Webpack baseline with 10% rounded headroom.',
    maxRootOverheadRatio: 1.12,
    maxRootOverheadBytes: 4096,
    scenarios: Object.fromEntries(
      rows.map(row => [
        row.id,
        {
          baselineBytes: row.bundleBytes,
          baselineGzipBytes: row.gzipBytes,
          maxBytes: roundBudget(row.bundleBytes),
          maxGzipBytes: roundBudget(row.gzipBytes),
        },
      ]),
    ),
    vite: {
      baselineBytes: vite.bytes,
      baselineGzipBytes: vite.gzipBytes,
      baselineLargestChunkBytes: vite.largestChunkBytes,
      maxBytes: roundBudget(vite.bytes),
      maxGzipBytes: roundBudget(vite.gzipBytes),
      maxLargestChunkBytes: roundBudget(vite.largestChunkBytes),
    },
  };
}

function main() {
  return (async () => {
    const startedAt = Date.now();
    if (!fs.existsSync(reactReportPath)) {
      throw new Error('React compatibility report is missing. Run compatibility:react first.');
    }
    const reactReport = readJson(reactReportPath);
    const react17 = reactReport.rows?.find(row => row.react === '17.0.2');
    if (!react17?.logs) throw new Error('React 17 consumer path is missing.');
    const consumerRoot = path.join(repoRoot, react17.logs);
    const installedRoot = path.join(consumerRoot, 'node_modules');
    if (!fs.existsSync(installedRoot)) throw new Error('React 17 tarball consumer is missing.');
    const vite = measureVite(consumerRoot);
    if (!vite?.chunks) throw new Error('Fresh React 17 Vite build is missing.');

    fs.mkdirSync(entriesRoot, { recursive: true });
    const rows = [];
    for (const scenario of scenarios) {
      const row = await buildScenario(scenario, consumerRoot);
      rows.push(row);
      console.log(`${scenario.id}: ${row.status} (${row.bundleBytes} bytes)`);
    }

    const errors = [];
    for (const row of rows) {
      if (row.status !== 'passed') errors.push(`${row.id}: webpack build failed`);
      for (const packageName of singletonPackages) {
        if ((row.packageRoots[packageName] || []).length > 1) {
          errors.push(`${row.id}: duplicate ${packageName} roots`);
        }
      }
    }

    const boundary = readJson(boundaryPath);
    const sideEffects = [];
    for (const packageName of boundary.publicReleasePackages) {
      const manifestPath = path.join(installedRoot, ...packageName.split('/'), 'package.json');
      if (!fs.existsSync(manifestPath)) {
        sideEffects.push({ package: packageName, status: 'n/a', reason: 'not in root consumer dependency closure' });
        continue;
      }
      const manifest = readJson(manifestPath);
      const passed =
        Array.isArray(manifest?.sideEffects) && manifest.sideEffects.includes('**/*.css');
      sideEffects.push({ package: packageName, status: passed ? 'passed' : 'failed' });
      if (!passed) errors.push(`${packageName}: installed sideEffects metadata is missing`);
    }

    const pairRows = pairs.map(([rootId, subpathId]) => {
      const root = rows.find(row => row.id === rootId);
      const subpath = rows.find(row => row.id === subpathId);
      const allowed = subpath.bundleBytes * 1.12 + 4096;
      const status = root.bundleBytes <= allowed ? 'passed' : 'failed';
      if (status !== 'passed') {
        errors.push(`${rootId}: ${root.bundleBytes} exceeds subpath allowance ${Math.round(allowed)}`);
      }
      return {
        root: rootId,
        subpath: subpathId,
        rootBytes: root.bundleBytes,
        subpathBytes: subpath.bundleBytes,
        overheadBytes: root.bundleBytes - subpath.bundleBytes,
        ratio: subpath.bundleBytes ? root.bundleBytes / subpath.bundleBytes : null,
        status,
      };
    });

    let budgets = fs.existsSync(budgetPath) ? readJson(budgetPath) : null;
    if (update && errors.length === 0) {
      budgets = createBudgets(rows, vite);
      fs.writeFileSync(budgetPath, `${JSON.stringify(budgets, null, 2)}\n`);
    }
    const budgetViolations = [];
    if (!update) {
      for (const row of rows) {
        const budget = budgets?.scenarios?.[row.id];
        if (!budget) {
          budgetViolations.push(`${row.id}: budget is missing`);
        } else {
          if (row.bundleBytes > budget.maxBytes) {
            budgetViolations.push(`${row.id}: bundle ${row.bundleBytes} exceeds ${budget.maxBytes}`);
          }
          if (row.gzipBytes > budget.maxGzipBytes) {
            budgetViolations.push(`${row.id}: gzip ${row.gzipBytes} exceeds ${budget.maxGzipBytes}`);
          }
        }
      }
      const viteBudget = budgets?.vite;
      if (!viteBudget) {
        budgetViolations.push('vite: budget is missing');
      } else {
        for (const [metric, maximum] of [
          ['bytes', viteBudget.maxBytes],
          ['gzipBytes', viteBudget.maxGzipBytes],
          ['largestChunkBytes', viteBudget.maxLargestChunkBytes],
        ]) {
          if (vite[metric] > maximum) {
            budgetViolations.push(`vite: ${metric} ${vite[metric]} exceeds ${maximum}`);
          }
        }
      }
    }
    errors.push(...budgetViolations);

    const full = rows.find(row => row.id === 'full-consumer');
    const report = {
      status: errors.length ? 'failed' : 'passed',
      mode: update ? 'update' : 'check',
      checkedAt: new Date().toISOString(),
      networkInstallAllowed: false,
      consumerRoot: path.relative(repoRoot, consumerRoot).replace(/\\/g, '/'),
      summary: {
        scenarios: rows.length,
        passed: rows.filter(row => row.status === 'passed').length,
        pairChecks: pairRows.length,
        sideEffectsPackages: sideEffects.filter(row => row.status === 'passed').length,
        sideEffectsApplicable: sideEffects.filter(row => row.status !== 'n/a').length,
        sideEffectsNotInstalled: sideEffects.filter(row => row.status === 'n/a').length,
        sideEffectsFailures: sideEffects.filter(row => row.status === 'failed').length,
        duplicatePackageRoots: rows.reduce(
          (total, row) =>
            total +
            singletonPackages.filter(name => (row.packageRoots[name] || []).length > 1).length,
          0,
        ),
        budgetViolations: budgetViolations.length,
        fullConsumerBytes: full?.bundleBytes || 0,
        fullConsumerGzipBytes: full?.gzipBytes || 0,
      },
      budget: path.relative(repoRoot, budgetPath).replace(/\\/g, '/'),
      vite,
      pairs: pairRows,
      sideEffects,
      errors,
      rows,
      durationMs: Date.now() - startedAt,
    };
    fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
    console.log(`R-07 tree-shaking gate: ${report.status}`);
    console.log(
      `Pairs: ${pairRows.filter(row => row.status === 'passed').length}/${pairRows.length}; duplicates: ${report.summary.duplicatePackageRoots}`,
    );
    console.log(`Report: ${reportPath}`);
    if (errors.length) {
      for (const error of errors) console.error(error);
      process.exitCode = 1;
    }
  })();
}

main().catch(error => {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
});
