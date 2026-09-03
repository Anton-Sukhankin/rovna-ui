const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { appRoot, createContract, readJson } = require('./public-api-contract');

const repoRoot = path.resolve(appRoot, '..');
const baselinePath = path.join(appRoot, 'public-api-baseline.json');
const reportPath = path.join(repoRoot, 'docs', 'r06-public-api-audit.json');
const update = process.argv.includes('--update');

function sha256(value) {
  return crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

function mapPackages(snapshot) {
  return new Map((snapshot?.packages || []).map(entry => [entry.name, entry]));
}

function compareSnapshots(baseline, current) {
  const previousPackages = mapPackages(baseline);
  const currentPackages = mapPackages(current);
  const addedPackages = [...currentPackages.keys()].filter(name => !previousPackages.has(name));
  const removedPackages = [...previousPackages.keys()].filter(name => !currentPackages.has(name));
  const changedPackages = [];
  for (const [name, currentPackage] of currentPackages) {
    const previousPackage = previousPackages.get(name);
    if (!previousPackage) continue;
    if (JSON.stringify(previousPackage) !== JSON.stringify(currentPackage)) {
      const previousSubpaths = new Map(previousPackage.entrypoints.map(entry => [entry.subpath, entry]));
      const currentSubpaths = new Map(currentPackage.entrypoints.map(entry => [entry.subpath, entry]));
      changedPackages.push({
        name,
        addedSubpaths: [...currentSubpaths.keys()].filter(subpath => !previousSubpaths.has(subpath)),
        removedSubpaths: [...previousSubpaths.keys()].filter(subpath => !currentSubpaths.has(subpath)),
        changedSubpaths: [...currentSubpaths.keys()].filter(subpath =>
          previousSubpaths.has(subpath) &&
          JSON.stringify(previousSubpaths.get(subpath)) !== JSON.stringify(currentSubpaths.get(subpath))),
        peerDependenciesChanged:
          JSON.stringify(previousPackage.peerDependencies) !== JSON.stringify(currentPackage.peerDependencies),
        versionChanged: previousPackage.version !== currentPackage.version,
      });
    }
  }
  return { addedPackages, removedPackages, changedPackages };
}

function main() {
  const startedAt = Date.now();
  const { errors, snapshot, summary } = createContract();
  const baseline = fs.existsSync(baselinePath) ? readJson(baselinePath) : null;
  const drift = compareSnapshots(baseline, snapshot);
  const currentSha256 = sha256(snapshot);
  const previousSha256 = baseline ? sha256(baseline) : null;

  if (update && !errors.length) {
    fs.writeFileSync(baselinePath, `${JSON.stringify(snapshot, null, 2)}\n`);
  }
  const driftFound = !baseline || currentSha256 !== previousSha256;
  const status = errors.length
    ? 'failed'
    : update
      ? 'baseline-updated'
      : driftFound
        ? 'failed-api-drift'
        : 'passed';
  const report = {
    status,
    mode: update ? 'update' : 'check',
    checkedAt: new Date().toISOString(),
    baseline: path.relative(repoRoot, baselinePath).replace(/\\/g, '/'),
    currentSha256,
    baselineSha256: update ? currentSha256 : previousSha256,
    summary,
    validationErrors: errors,
    drift,
    durationMs: Date.now() - startedAt,
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`R-06 public API audit: ${status}`);
  console.log(`Packages: ${summary.packages}; subpaths: ${summary.publicSubpaths}; symbol bindings: ${summary.exportedSymbols}`);
  console.log(`SHA-256: ${currentSha256}`);
  console.log(`Report: ${reportPath}`);
  if (errors.length || (!update && driftFound)) process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
}
