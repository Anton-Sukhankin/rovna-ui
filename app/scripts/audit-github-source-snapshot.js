const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const policyPath = path.join(repoRoot, 'github-snapshot-policy.json');
const internalReferenceAllowlistPath = path.join(
  repoRoot,
  'github-internal-reference-allowlist.json',
);
const reportPath = path.join(repoRoot, 'tmp', 'f17-github-snapshot-audit.json');
const requireReady = process.argv.includes('--require-ready');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function runGit(args, allowFailure = false) {
  const result = spawnSync('git', ['-c', `safe.directory=${repoRoot}`, ...args], {
    cwd: repoRoot,
    encoding: 'utf8',
    stdio: 'pipe',
  });

  if (!allowFailure && result.status !== 0) {
    throw new Error(`git ${args.join(' ')} failed: ${result.stderr || result.stdout}`);
  }

  return result;
}

function gitPathList(args) {
  const output = runGit([...args, '-z']).stdout;
  return output.split('\0').filter(Boolean).map(filePath => filePath.replace(/\\/g, '/'));
}

function isCandidateRoot(filePath, candidateRoots) {
  return candidateRoots.some(root =>
    root.endsWith('/') ? filePath.startsWith(root) : filePath === root,
  );
}

function isBinary(buffer) {
  const sampleLength = Math.min(buffer.length, 8192);

  for (let index = 0; index < sampleLength; index += 1) {
    if (buffer[index] === 0) {
      return true;
    }
  }

  return false;
}

function isActiveSource(filePath) {
  if (!filePath.startsWith('app/')) {
    return false;
  }

  if (
    /(?:\.stories\.|\.test\.|\.spec\.|\/__code__\/|\/__snapshots__\/)/i.test(filePath) ||
    /(?:CHANGELOG\.md|\.mdx?)$/i.test(filePath)
  ) {
    return false;
  }

  return /\.(?:js|jsx|ts|tsx|mjs|cjs)$/i.test(filePath);
}

function scanTextFile(filePath, text, internalReferenceRegex) {
  const secretFindings = [];
  const patterns = [
    ['private-key', /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/],
    ['aws-access-key', /\bAKIA[0-9A-Z]{16}\b/],
    ['github-token', /\b(?:github_pat_[A-Za-z0-9_]{20,}|gh[pousr]_[A-Za-z0-9]{20,})\b/],
    ['npm-token', /\bnpm_[A-Za-z0-9]{20,}\b/],
    ['slack-token', /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/],
  ];

  patterns.forEach(([kind, pattern]) => {
    const match = pattern.exec(text);

    if (match) {
      secretFindings.push({ file: filePath, kind, line: text.slice(0, match.index).split(/\r?\n/).length });
    }
  });

  text.split(/\r?\n/).forEach((line, index) => {
    if (line.length > 10000 || line.includes('/_authToken')) {
      return;
    }

    const tokenAssignment = line.match(/_authToken\s*=\s*(\S+)/i);

    if (tokenAssignment && !/^\$\{[A-Z0-9_]+\}$/.test(tokenAssignment[1])) {
      secretFindings.push({ file: filePath, kind: 'npm-auth-token', line: index + 1 });
    }

    const genericAssignment = line.match(
      /\b(password|passwd|client_secret|api[_-]?key|access[_-]?token)\b\s*[:=]\s*["']([^"']{8,})["']/i,
    );

    if (
      genericAssignment &&
      !/^\$\{|^<|example|placeholder|not-required|environment/i.test(genericAssignment[2])
    ) {
      secretFindings.push({ file: filePath, kind: 'credential-assignment', line: index + 1 });
    }
  });

  const internalLines = [];
  text.split(/\r?\n/).forEach((line, index) => {
    if (internalReferenceRegex.test(line)) {
      internalLines.push(index + 1);
    }
    internalReferenceRegex.lastIndex = 0;
  });

  return { secretFindings, internalLines };
}

function main() {
  const policy = readJson(policyPath);
  const internalReferenceAllowlist = readJson(internalReferenceAllowlistPath);
  const reviewedReferenceFiles = new Map(
    internalReferenceAllowlist.groups.flatMap(group =>
      group.files.map(filePath => [filePath, { category: group.category, reason: group.reason }]),
    ),
  );
  const tracked = gitPathList(['ls-files']);
  const untracked = gitPathList(['ls-files', '--others', '--exclude-standard']);
  const candidates = [...new Set([...tracked, ...untracked])].sort();
  const staged = gitPathList(['diff', '--cached', '--name-only']);
  const unexpectedCandidates = candidates.filter(
    filePath => !isCandidateRoot(filePath, policy.candidateRoots),
  );
  const localOnlyLeaks = candidates.filter(filePath =>
    policy.localOnlyRoots.some(root => filePath.startsWith(root)),
  );
  const internalReferenceRegex = new RegExp(policy.internalReferencePattern, 'i');
  const secretFindings = [];
  const internalReferences = [];
  const oversizedFiles = [];
  const largestFiles = [];
  let totalBytes = 0;

  for (const filePath of candidates) {
    const absolutePath = path.join(repoRoot, ...filePath.split('/'));

    if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
      continue;
    }

    const stat = fs.statSync(absolutePath);
    totalBytes += stat.size;
    largestFiles.push({ file: filePath, bytes: stat.size });

    if (stat.size > policy.maximumFileBytes) {
      oversizedFiles.push({ file: filePath, bytes: stat.size });
    }

    const buffer = fs.readFileSync(absolutePath);

    if (isBinary(buffer)) {
      continue;
    }

    const text = buffer.toString('utf8');
    const scan = scanTextFile(filePath, text, internalReferenceRegex);
    secretFindings.push(...scan.secretFindings);

    if (scan.internalLines.length > 0) {
      internalReferences.push({
        file: filePath,
        lines: scan.internalLines.slice(0, 20),
        activeSource: isActiveSource(filePath),
      });
    }
  }

  largestFiles.sort((left, right) => right.bytes - left.bytes);
  const rootLicense = candidates.find(filePath => /^LICEN[CS]E(?:\.|$)/i.test(filePath));
  const activeInternalReferences = internalReferences.filter(entry => entry.activeSource);
  const referenceOnlyInternalReferences = internalReferences.filter(entry => !entry.activeSource);
  const reviewedReferenceOnlyInternalReferences = referenceOnlyInternalReferences
    .filter(entry => reviewedReferenceFiles.has(entry.file))
    .map(entry => ({ ...entry, review: reviewedReferenceFiles.get(entry.file) }));
  const unreviewedReferenceOnlyInternalReferences = referenceOnlyInternalReferences.filter(
    entry => !reviewedReferenceFiles.has(entry.file),
  );
  const currentReferenceFiles = new Set(referenceOnlyInternalReferences.map(entry => entry.file));
  const staleReviewedReferenceFiles = [...reviewedReferenceFiles.keys()].filter(
    filePath => !currentReferenceFiles.has(filePath),
  );
  const originResult = runGit(['remote', 'get-url', 'origin'], true);
  const originConfigured = originResult.status === 0 && Boolean(originResult.stdout.trim());
  const blockers = [];

  if (unexpectedCandidates.length > 0) blockers.push('unexpected-candidate-roots');
  if (localOnlyLeaks.length > 0) blockers.push('local-only-files-in-candidate-set');
  if (oversizedFiles.length > 0) blockers.push('files-over-size-policy');
  if (secretFindings.length > 0) blockers.push('high-confidence-secret-findings');
  if (activeInternalReferences.length > 0) blockers.push('active-internal-corporate-references');
  if (unreviewedReferenceOnlyInternalReferences.length > 0) {
    blockers.push('unreviewed-internal-reference-files');
  }
  if (staleReviewedReferenceFiles.length > 0) {
    blockers.push('stale-reviewed-reference-files');
  }
  if (policy.publicReadiness.requireRootLicense && !rootLicense) blockers.push('root-license-missing');
  if (policy.publicReadiness.requireEmptyGitIndex && staged.length > 0) blockers.push('git-index-not-empty');

  const report = {
    status: blockers.length === 0 ? 'ready' : 'blocked',
    mode: 'local-github-source-snapshot-audit',
    candidateFiles: candidates.length,
    trackedFiles: tracked.length,
    untrackedFiles: untracked.length,
    totalBytes,
    largestFiles: largestFiles.slice(0, 20),
    maximumFileBytes: policy.maximumFileBytes,
    oversizedFiles,
    stagedFiles: staged,
    originConfigured,
    rootLicense: rootLicense || null,
    unexpectedCandidates,
    localOnlyLeaks,
    secretFindings,
    internalReferences: {
      totalFiles: internalReferences.length,
      activeSourceFiles: activeInternalReferences,
      referenceOnlyFiles: referenceOnlyInternalReferences,
      reviewedReferenceOnlyFiles: reviewedReferenceOnlyInternalReferences,
      unreviewedReferenceOnlyFiles: unreviewedReferenceOnlyInternalReferences,
      staleReviewedReferenceFiles,
    },
    blockers,
    publicationActionPerformed: false,
    gitMutationPerformed: false,
  };

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

  console.log('GitHub source snapshot audit completed.');
  console.log(`Candidate files: ${report.candidateFiles}`);
  console.log(`Candidate size: ${report.totalBytes} bytes`);
  console.log(`Oversized files: ${report.oversizedFiles.length}`);
  console.log(`High-confidence secret findings: ${report.secretFindings.length}`);
  console.log(`Internal-reference files: ${report.internalReferences.totalFiles}`);
  console.log(`Active source files with internal references: ${activeInternalReferences.length}`);
  console.log(
    `Reviewed reference-only files: ${reviewedReferenceOnlyInternalReferences.length}`,
  );
  console.log(
    `Unreviewed reference-only files: ${unreviewedReferenceOnlyInternalReferences.length}`,
  );
  console.log(`Root license present: ${report.rootLicense ? 'yes' : 'no'}`);
  console.log(`Staged files: ${report.stagedFiles.length}`);
  console.log(`Git origin configured: ${report.originConfigured ? 'yes' : 'no'}`);
  console.log(`Snapshot status: ${report.status}`);
  console.log(`Report: ${reportPath}`);

  if (requireReady && report.status !== 'ready') {
    throw new Error(`GitHub snapshot is not ready: ${blockers.join(', ')}`);
  }
}

main();
