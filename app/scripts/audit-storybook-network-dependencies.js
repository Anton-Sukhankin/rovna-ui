const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const packagesRoot = path.join(appRoot, 'packages');
const outputPath = path.join(repoRoot, 'docs', 'storybook-network-inventory.json');
const mockCoveragePath = path.join(repoRoot, 'docs', 'storybook-mock-coverage.json');

const sourcePattern = /\.(?:cjs|mjs|js|jsx|ts|tsx)$/i;
const storyPattern = /\.stories\.(?:js|jsx|ts|tsx)$/i;
const ignoredDirectories = new Set([
  'coverage',
  'dist',
  'node_modules',
  'storybook-static',
]);

const publicReferenceHosts = new Set([
  'figma.com',
  'www.figma.com',
  'docs.example.com',
  'storybook.js.org',
  'stackoverflow.com',
  'github.com',
  'www.npmjs.com',
]);

const publicAssetHosts = new Set([
  'fastly.picsum.photos',
  'images.unsplash.com',
  'picsum.photos',
]);

const closedHostPattern =
  /(?:^|\.)(?:10d\.ru|tend-ui\.ru|corp|internal|intranet|gitlab|nexus|registry|samolet|samoletgroup)(?:\.|$)/i;
const closedUrlPattern =
  /(?:gitlab|nexus|registry|oauth|sso|keycloak|centrifug|corp|internal|intranet|samolet)/i;

const signalDefinitions = [
  { type: 'fetch', pattern: /\bfetch\s*\(/g, network: true },
  {
    type: 'axios',
    pattern: /\baxios(?:\s*\(|\.(?:get|post|put|patch|delete|request|create)\s*\()/g,
    network: true,
  },
  { type: 'websocket', pattern: /\bnew\s+WebSocket\s*\(|\bWebSocket\s*\(/g, network: true },
  { type: 'event-source', pattern: /\bnew\s+EventSource\s*\(/g, network: true },
  {
    type: 'centrifuge',
    pattern: /\b(?:new\s+)?Centrifuge\s*\(|\bcentrifuge\.(?:connect|subscribe|publish)\s*\(/gi,
    network: true,
  },
  {
    type: 'oauth',
    pattern: /\b(?:oauth|authorize|authorizationCode|accessToken|refreshToken)\s*\(/gi,
    network: true,
  },
  { type: 'set-timeout', pattern: /\bsetTimeout\s*\(/g, network: false },
  { type: 'set-interval', pattern: /\bsetInterval\s*\(/g, network: false },
];

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

function relativeToRepo(filePath) {
  return toPosix(path.relative(repoRoot, filePath));
}

function walk(directory) {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) return [];
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function packageMetadata() {
  const packages = [];

  for (const directory of fs.readdirSync(packagesRoot, { withFileTypes: true })) {
    if (!directory.isDirectory()) continue;
    const root = path.join(packagesRoot, directory.name);
    const packageJsonPath = path.join(root, 'package.json');
    if (!fs.existsSync(packageJsonPath)) continue;
    const manifest = readJson(packageJsonPath);
    packages.push({
      directory: directory.name,
      name: manifest.name || directory.name,
      root,
      sourceRoot: path.join(root, 'src'),
    });
  }

  return packages;
}

const packages = packageMetadata();
const packagesByName = new Map(packages.map(item => [item.name, item]));
const allFiles = walk(packagesRoot).filter(file => sourcePattern.test(file));
const knownFiles = new Set(allFiles.map(file => path.resolve(file)));

function packageForFile(filePath) {
  return (
    packages.find(item => {
      const relative = path.relative(item.root, filePath);
      return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
    }) || null
  );
}

function lineNumber(source, index) {
  return source.slice(0, index).split(/\r?\n/).length;
}

function lineText(source, line) {
  return (source.split(/\r?\n/)[line - 1] || '').trim().slice(0, 240);
}

function extractImportSpecifiers(source) {
  const specifiers = new Set();
  const patterns = [
    /\b(?:import|export)\s+(?:[\s\S]*?\s+from\s+)?['"]([^'"]+)['"]/g,
    /\brequire\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
    /\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
  ];

  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) specifiers.add(match[1]);
  }

  return [...specifiers];
}

function resolveCandidate(base) {
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.js`,
    `${base}.jsx`,
    `${base}.mjs`,
    `${base}.cjs`,
    path.join(base, 'index.ts'),
    path.join(base, 'index.tsx'),
    path.join(base, 'index.js'),
    path.join(base, 'index.jsx'),
  ];

  return candidates.find(candidate => knownFiles.has(path.resolve(candidate))) || null;
}

function resolveWorkspaceImport(fromFile, specifier) {
  if (specifier.startsWith('.')) {
    return resolveCandidate(path.resolve(path.dirname(fromFile), specifier));
  }

  const workspacePackage = [...packagesByName.entries()]
    .sort(([left], [right]) => right.length - left.length)
    .find(([name]) => specifier === name || specifier.startsWith(`${name}/`));

  if (!workspacePackage) return null;
  const [packageName, metadata] = workspacePackage;
  const subpath = specifier.slice(packageName.length).replace(/^[/\\]/, '');

  if (subpath) {
    return (
      resolveCandidate(path.join(metadata.sourceRoot, subpath)) ||
      resolveCandidate(path.join(metadata.root, subpath))
    );
  }

  return (
    resolveCandidate(path.join(metadata.sourceRoot, 'index')) ||
    resolveCandidate(path.join(metadata.root, 'index'))
  );
}

function extractImports(filePath, source) {
  return extractImportSpecifiers(source).map(specifier => ({
    specifier,
    resolved: resolveWorkspaceImport(filePath, specifier),
  }));
}

function classifyUrl(rawUrl, sourceLine, filePath) {
  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return {
      category: 'invalid',
      host: null,
      runtimeRelevant: false,
      access: 'unknown',
    };
  }

  const host = parsed.hostname.toLowerCase();
  const local =
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '0.0.0.0' ||
    host === '::1';
  const privateIp =
    /^10\./.test(host) ||
    /^192\.168\./.test(host) ||
    /^172\.(?:1[6-9]|2\d|3[01])\./.test(host);
  const standardNamespace =
    host === 'www.w3.org' &&
    /^\/(?:1999\/xlink|2000\/svg|2000\/xmlns)/i.test(parsed.pathname);
  const designReference =
    publicReferenceHosts.has(host) ||
    /\b(?:design|figma|parameters)\b/i.test(sourceLine);
  const codeReference =
    /\.(?:spec|test)\.(?:js|jsx|ts|tsx)$/i.test(filePath) ||
    /^\s*(?:\/\/|\*)/.test(sourceLine) ||
    ((host === 'example.com' || host.endsWith('.example.com')) &&
      !/\b(?:api|fetch|axios|href|src|url)\b/i.test(sourceLine));
  const externalAsset =
    publicAssetHosts.has(host) ||
    /\.(?:avif|gif|jpe?g|png|svg|webp)(?:[?#]|$)/i.test(parsed.pathname);
  const likelyClosed =
    privateIp ||
    closedHostPattern.test(host) ||
    closedUrlPattern.test(rawUrl);

  if (local) {
    return { category: 'local', host, runtimeRelevant: true, access: 'local' };
  }
  if (standardNamespace) {
    return {
      category: 'standard-namespace',
      host,
      runtimeRelevant: false,
      access: 'standard-reference',
    };
  }
  if (designReference || codeReference) {
    return {
      category: designReference ? 'design-reference' : 'code-reference',
      host,
      runtimeRelevant: false,
      access: 'public-reference',
    };
  }
  if (externalAsset) {
    return {
      category: 'external-asset',
      host,
      runtimeRelevant: true,
      access: likelyClosed ? 'closed-likely' : 'public-external',
    };
  }

  return {
    category: likelyClosed ? 'closed-endpoint' : 'external-endpoint',
    host,
    runtimeRelevant: true,
    access: likelyClosed ? 'closed-likely' : 'public-external',
  };
}

function extractUrls(filePath, source) {
  const findings = [];
  const urlPattern = /\b(?:https?|wss?):\/\/[A-Za-z0-9._~:/?#[\]@!&()*+,;=%-]+/gi;

  for (const match of source.matchAll(urlPattern)) {
    const line = lineNumber(source, match.index);
    const sourceLine = lineText(source, line);
    const url = match[0].replace(/[.,;:]$/, '');
    findings.push({
      file: relativeToRepo(filePath),
      line,
      url,
      ...classifyUrl(url, sourceLine, filePath),
      source: sourceLine,
    });
  }

  return findings;
}

function extractSignals(filePath, source, imports) {
  const findings = [];

  for (const definition of signalDefinitions) {
    for (const match of source.matchAll(definition.pattern)) {
      const line = lineNumber(source, match.index);
      findings.push({
        file: relativeToRepo(filePath),
        line,
        type: definition.type,
        network: definition.network,
        source: lineText(source, line),
      });
    }
  }

  const importedSignals = [
    {
      type: 'axios-import',
      pattern: /(?:^|\/)axios(?:\/|$)/i,
      network: true,
    },
    {
      type: 'centrifuge-import',
      pattern: /centrifug/i,
      network: true,
    },
    {
      type: 'oauth-import',
      pattern: /(?:oauth|openid|keycloak)/i,
      network: true,
    },
  ];

  for (const { specifier } of imports) {
    for (const definition of importedSignals) {
      if (!definition.pattern.test(specifier)) continue;
      findings.push({
        file: relativeToRepo(filePath),
        line: null,
        type: definition.type,
        network: definition.network,
        source: `import ${specifier}`,
      });
    }
  }

  return findings;
}

const fileAudits = new Map();

for (const filePath of allFiles) {
  const source = fs.readFileSync(filePath, 'utf8');
  const imports = extractImports(filePath, source);
  fileAudits.set(path.resolve(filePath), {
    file: relativeToRepo(filePath),
    package: packageForFile(filePath)?.name || null,
    story: storyPattern.test(filePath),
    imports,
    signals: extractSignals(filePath, source, imports),
    urls: extractUrls(filePath, source),
  });
}

function collectDependencyGraph(entryFile) {
  const visited = new Set();
  const queue = [path.resolve(entryFile)];

  while (queue.length > 0) {
    const current = queue.shift();
    if (visited.has(current)) continue;
    visited.add(current);
    const audit = fileAudits.get(current);
    if (!audit) continue;

    for (const dependency of audit.imports) {
      if (dependency.resolved) queue.push(path.resolve(dependency.resolved));
    }
  }

  return [...visited];
}

function extractStoryTitle(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const explicitTitle = source.match(/\btitle\s*:\s*['"`]([^'"`]+)['"`]/)?.[1];
  if (explicitTitle) return explicitTitle;

  const metadata = packageForFile(filePath);
  const localName = path
    .basename(filePath)
    .replace(/\.stories\.(?:js|jsx|ts|tsx)$/i, '');
  return `${metadata?.name || 'unknown'}/${localName}`;
}

function extractStoryExports(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const source = fs.readFileSync(filePath, 'utf8');
  return [...source.matchAll(/\bexport\s+const\s+([A-Za-z0-9_]+)/g)].map(
    match => match[1],
  );
}

function uniqueFindings(items) {
  const seen = new Set();
  return items.filter(item => {
    const key = JSON.stringify(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function uniqueStrings(items) {
  return [...new Set(items)].sort((left, right) => left.localeCompare(right));
}

function storyDecision(signals, urls) {
  const runtimeUrls = urls.filter(item => item.runtimeRelevant);
  const closedUrls = runtimeUrls.filter(item => item.access === 'closed-likely');
  const networkSignals = signals.filter(item => item.network);
  const timers = signals.filter(item => !item.network);

  if (closedUrls.length > 0) {
    return {
      policy: 'forbid',
      reason:
        'The story graph references a likely closed endpoint. Replace it with a deterministic local mock and forbid the real request in Storybook.',
    };
  }
  if (networkSignals.length > 0 || runtimeUrls.length > 0) {
    return {
      policy: 'mock',
      reason:
        'The story graph can perform network I/O or load an external runtime asset. Intercept it with a local mock/fixture before automated execution.',
    };
  }
  if (timers.length > 0) {
    return {
      policy: 'allow-with-fake-timers',
      reason:
        'No network dependency was found, but timer-driven behavior should use deterministic fake timers in automated tests.',
    };
  }
  return {
    policy: 'allow',
    reason: 'No static network or timer dependency was found in the reachable local import graph.',
  };
}

const storyFiles = allFiles.filter(file => storyPattern.test(file)).sort();
const storyGroups = storyFiles.map(storyFile => {
  const graph = collectDependencyGraph(storyFile);
  const audits = graph.map(file => fileAudits.get(file)).filter(Boolean);
  const signals = uniqueFindings(audits.flatMap(audit => audit.signals));
  const urls = uniqueFindings(audits.flatMap(audit => audit.urls));
  const decision = storyDecision(signals, urls);
  const relevantAudits = audits.filter(
    audit => audit.signals.length > 0 || audit.urls.length > 0,
  );

  return {
    title: extractStoryTitle(storyFile),
    storyFile: relativeToRepo(storyFile),
    package: packageForFile(storyFile)?.name || null,
    dependencyGraphFiles: graph.length,
    networkDependent:
      signals.some(item => item.network) || urls.some(item => item.runtimeRelevant),
    timerDependent: signals.some(item => !item.network),
    policy: decision.policy,
    recommendation: decision.reason,
    findings: {
      signalCounts: countBy(signals, signal => signal.type),
      urlCategoryCounts: countBy(urls, url => url.category),
      files: uniqueStrings(relevantAudits.map(audit => audit.file)),
      closedUrls: uniqueStrings(
        urls.filter(url => url.access === 'closed-likely').map(url => url.url),
      ),
      externalRuntimeUrls: uniqueStrings(
        urls
          .filter(url => url.runtimeRelevant && url.access === 'public-external')
          .map(url => url.url),
      ),
    },
  };
});

const allSignals = uniqueFindings([...fileAudits.values()].flatMap(audit => audit.signals));
const allUrls = uniqueFindings([...fileAudits.values()].flatMap(audit => audit.urls));

function countBy(items, selector) {
  return Object.fromEntries(
    [...items.reduce((counts, item) => {
      const key = selector(item);
      counts.set(key, (counts.get(key) || 0) + 1);
      return counts;
    }, new Map())].sort(([left], [right]) => left.localeCompare(right)),
  );
}

const mockFamilyDefinitions = [
  {
    id: 'async-select',
    title: 'AsyncSelect data loading',
    isolation: 'local callback plus local Storybook mock for relative pagination URLs',
    files: ['app/packages/tend-ui/src/components/AsyncSelect/AsyncSelect.stories.tsx'],
    states: {
      success: ['covered', ['ApiSuccess'], 'Local apiFactory().success callback.'],
      empty: ['covered', ['ApiEmpty'], 'Local apiFactory().empty callback.'],
      error: ['covered', ['ApiError'], 'Local apiFactory().error rejection.'],
      loading: ['covered', ['ApiLoading'], 'Dedicated permanently pending local callback.'],
      unauthorized: ['covered', ['ApiUnauthorized'], 'Deterministic local 401-equivalent rejection.'],
      retry: ['covered', ['ApiRetry'], 'First local attempt fails and remount retries successfully.'],
      timeout: ['covered', ['ApiTimeout'], 'Deterministic local timeout outcome without a clock.'],
    },
  },
  {
    id: 'async-checkbox',
    title: 'AsyncCheckbox data loading',
    isolation: 'local callback',
    files: ['app/packages/tend-ui/src/components/AsyncCheckbox/AsyncCheckbox.stories.tsx'],
    states: {
      success: ['covered', ['Api'], 'Local apiFactory().success callback.'],
      empty: ['covered', ['ApiEmpty'], 'Local apiFactory().empty callback.'],
      error: ['covered', ['ApiError'], 'Local apiFactory().error rejection.'],
      loading: ['covered', ['ApiLoading'], 'Dedicated permanently pending local callback.'],
      unauthorized: ['covered', ['ApiUnauthorized'], 'Deterministic local 401-equivalent rejection.'],
      retry: ['covered', ['ApiRetry'], 'First local attempt fails and remount retries successfully.'],
      timeout: ['covered', ['ApiTimeout'], 'Deterministic local timeout outcome without a clock.'],
    },
  },
  {
    id: 'async-radio',
    title: 'AsyncRadio data loading',
    isolation: 'local callback',
    files: ['app/packages/tend-ui/src/components/AsyncRadio/AsyncRadio.stories.tsx'],
    states: {
      success: ['covered', ['Api'], 'Local apiFactory().success callback.'],
      empty: ['covered', ['ApiEmpty'], 'Local apiFactory().empty callback.'],
      error: ['covered', ['ApiError'], 'Local apiFactory().error rejection.'],
      loading: ['covered', ['ApiLoading'], 'Dedicated permanently pending local callback.'],
      unauthorized: ['covered', ['ApiUnauthorized'], 'Deterministic local 401-equivalent rejection.'],
      retry: ['covered', ['ApiRetry'], 'First local attempt fails and remount retries successfully.'],
      timeout: ['covered', ['ApiTimeout'], 'Deterministic local timeout outcome without a clock.'],
    },
  },
  {
    id: 'filters',
    title: 'Filters async options',
    isolation: 'local callback and relative mocked URLs',
    files: ['app/packages/tend-ui-filters/src/Filters.stories.tsx'],
    states: {
      success: ['covered', ['AsyncOptionsSuccess'], 'Local promise callback returns fixture options.'],
      empty: ['covered', ['AsyncOptionsEmpty'], 'Dedicated empty async-options response.'],
      error: ['covered', ['AsyncOptionsError'], 'Dedicated rejected async-options response.'],
      loading: ['covered', ['AsyncOptionsLoading'], 'Dedicated permanently pending local callback.'],
      unauthorized: ['covered', ['AsyncOptionsUnauthorized'], 'Deterministic local 401-equivalent rejection.'],
      retry: ['covered', ['AsyncOptionsRetry'], 'First local attempt fails and reopen retries successfully.'],
      timeout: ['covered', ['AsyncOptionsTimeout'], 'Deterministic local timeout outcome without a clock.'],
    },
  },
  {
    id: 'table',
    title: 'Table async filter options and data states',
    isolation: 'local callback',
    files: ['app/packages/tend-ui-table/src/Table/Table.stories.tsx'],
    states: {
      success: ['covered', ['Default'], 'Local table fixture and callback-backed filter options.'],
      empty: ['covered', ['Empty'], 'Dedicated empty data state.'],
      error: ['n/a', [], 'Table consumes local data and has no table-level error prop or request owner.'],
      loading: ['covered', ['Loading'], 'Dedicated loading data state.'],
      unauthorized: ['n/a', [], 'Authorization belongs to the consumer data adapter, not Table.'],
      retry: ['n/a', [], 'Table exposes no request or retry contract.'],
      timeout: ['n/a', [], 'Timeout handling belongs to the consumer data adapter, not Table.'],
    },
  },
  {
    id: 'tree-children',
    title: 'Tree async children',
    isolation: 'local callback',
    files: ['app/packages/tend-ui-tree/src/Tree.stories.tsx'],
    states: {
      success: ['covered', ['OnNodeChildrenRequest'], 'Local delayed child fixture.'],
      empty: ['covered', ['OnNodeChildrenRequestEmpty'], 'Dedicated successful empty child response.'],
      error: ['covered', ['OnNodeChildrenRequestError'], 'Local rejected child request.'],
      loading: ['covered', ['OnNodeChildrenRequestLoading'], 'Dedicated permanently pending local callback.'],
      unauthorized: ['covered', ['OnNodeChildrenRequestUnauthorized'], 'Local 401-equivalent callback rejection.'],
      retry: ['covered', ['OnNodeChildrenRequestRetry'], 'oneveryexpand repeats a failed request deterministically.'],
      timeout: ['covered', ['OnNodeChildrenRequestTimeout'], 'Deterministic local timeout outcome without a clock.'],
    },
  },
  {
    id: 'upload-area',
    title: 'UploadArea lifecycle',
    isolation: 'local callback with deterministic progress',
    files: ['app/packages/tend-ui-upload/src/UploadArea.stories.tsx'],
    states: {
      success: ['covered', ['OnUpload'], 'Local onUpload callback resolves fixture attachments.'],
      empty: ['covered', ['WithAntdFormRequired'], 'Empty required form state.'],
      error: ['covered', ['UploadRejected'], 'Rejected local upload is exercised by a play function.'],
      loading: ['covered', ['UploadLoading'], 'Pending local upload is exercised by a play function.'],
      unauthorized: ['covered', ['UploadUnauthorized'], 'Local adapter maps 401 to the supported file message contract.'],
      retry: ['covered', ['UploadRetry'], 'Two local uploads exercise failure followed by success.'],
      timeout: ['covered', ['UploadTimeout'], 'Local adapter maps timeout to the supported file message contract.'],
    },
  },
  {
    id: 'header-projects',
    title: 'Header and SamoletHeader project loading',
    isolation: 'local callback plus local mock for the service menu',
    files: [
      'app/packages/tend-ui-header/src/Header/Header.stories.tsx',
      'app/packages/tend-ui-header/src/SamoletHeader/SamoletHeader.stories.tsx',
    ],
    states: {
      success: ['covered', ['Project'], 'Project lists resolve from repository-owned data.'],
      empty: ['covered', ['ProjectEmpty'], 'Dedicated empty project response.'],
      error: ['covered', ['ProjectError'], 'Dedicated rejected project response.'],
      loading: ['covered', ['ProjectLoading'], 'Dedicated permanently pending local callback.'],
      unauthorized: ['n/a', [], 'Project does not expose authorization-specific UI; it accepts a generic API callback.'],
      retry: ['n/a', [], 'Project has no retry action or retry policy in its public contract.'],
      timeout: ['covered', ['ProjectTimeout'], 'Deterministic local timeout outcome without a clock.'],
    },
  },
];

function createMockCoverageReport(networkReport) {
  const families = mockFamilyDefinitions.map(definition => {
    const files = definition.files.map(file => {
      const absolute = path.join(repoRoot, file);
      return { file, exists: fs.existsSync(absolute), stories: extractStoryExports(absolute) };
    });
    const availableStories = new Set(files.flatMap(file => file.stories));
    const coverage = Object.fromEntries(
      Object.entries(definition.states).map(([state, [declaredStatus, stories, note]]) => {
        const missingEvidence = stories.filter(story => !availableStories.has(story));
        return [
          state,
          {
            status: missingEvidence.length ? 'gap' : declaredStatus,
            evidence: stories,
            missingEvidence,
            note,
          },
        ];
      }),
    );

    return {
      id: definition.id,
      title: definition.title,
      isolation: definition.isolation,
      files,
      coverage,
    };
  });
  const stateEntries = families.flatMap(family =>
    Object.entries(family.coverage).map(([state, result]) => ({
      family: family.id,
      state,
      ...result,
    })),
  );
  const remainingGaps = stateEntries
    .filter(entry => entry.status === 'gap' || entry.status === 'partial')
    .map(entry => ({
      family: entry.family,
      state: entry.state,
      status: entry.status,
      reason: entry.note,
      recommendation:
        entry.status === 'partial'
          ? 'Add an explicit story and browser assertion for this state.'
          : 'Add a deterministic local callback/fixture and a dedicated story; do not use a real endpoint.',
    }));

  return {
    schemaVersion: 2,
    generatedBy: 'app/scripts/audit-storybook-network-dependencies.js',
    sourceInventory: 'docs/storybook-network-inventory.json',
    method:
      'Repository-owned state matrix with story-export verification. Covered means a deterministic local story exists; n/a means source inspection proves that the state belongs to a consumer adapter rather than the component contract.',
    stateDefinitions: {
      success: 'A deterministic request/callback resolves with non-empty data.',
      empty: 'A deterministic request/callback resolves successfully without data.',
      error: 'A deterministic request/callback rejects or returns an error state.',
      loading: 'Pending behavior is visible and can be asserted without external timing.',
      unauthorized: 'A deterministic 401/403-equivalent response is represented.',
      retry: 'A failed operation can be retried and then deterministically resolve or reject.',
      timeout: 'A deterministic timeout-equivalent outcome is represented without depending on wall-clock time.',
    },
    summary: {
      families: families.length,
      states: stateEntries.length,
      statusCounts: countBy(stateEntries, entry => entry.status),
      remainingGaps: remainingGaps.length,
      networkInventoryStoryGroups: networkReport.summary.networkDependentStoryGroups,
      serviceBoundaries: 5,
    },
    families,
    serviceBoundaries: [
      {
        boundary: 'api',
        status: 'isolated',
        evidence: 'Local callback fixtures and same-origin mockData handlers; unmatched external requests fail the runtime gate.',
      },
      {
        boundary: 'auth',
        status: 'isolated-source-only',
        evidence: 'Repository-owned samolet-oauth2 workspace stub; real OAuth and token refresh are excluded.',
      },
      {
        boundary: 'realtime',
        status: 'isolated-source-only',
        evidence: 'Notifications defaults to same-origin WebSocket; WebSocket and EventSource external origins are denied in browser tests.',
      },
      {
        boundary: 'upload',
        status: 'isolated',
        evidence: 'UploadArea stories use local File objects and callback adapters only.',
      },
      {
        boundary: 'search',
        status: 'isolated',
        evidence: 'Async search stories use repository fixtures; Search Assistant service integration remains source-only.',
      },
    ],
    remainingGaps,
  };
}

const report = {
  schemaVersion: 1,
  generatedBy: 'app/scripts/audit-storybook-network-dependencies.js',
  scope: {
    root: 'app/packages',
    sourceExtensions: ['cjs', 'mjs', 'js', 'jsx', 'ts', 'tsx'],
    ignoredDirectories: [...ignoredDirectories].sort(),
    method:
      'Static analysis of story files and their reachable local/workspace source imports. Findings are candidates and must be confirmed by browser runtime interception.',
  },
  summary: {
    packages: packages.length,
    sourceFiles: allFiles.length,
    storyFiles: storyFiles.length,
    networkDependentStoryGroups: storyGroups.filter(group => group.networkDependent).length,
    timerDependentStoryGroups: storyGroups.filter(group => group.timerDependent).length,
    policyCounts: countBy(storyGroups, group => group.policy),
    signalCounts: countBy(allSignals, signal => signal.type),
    urlCategoryCounts: countBy(allUrls, url => url.category),
    closedUrlFindings: allUrls.filter(url => url.access === 'closed-likely').length,
    externalRuntimeUrlFindings: allUrls.filter(
      url => url.runtimeRelevant && url.access === 'public-external',
    ).length,
    referenceUrlFindings: allUrls.filter(url => !url.runtimeRelevant).length,
  },
  policy: {
    allow:
      'No static network dependency found. Runtime request interception is still required for final verification.',
    'allow-with-fake-timers':
      'Use fake timers or explicit timer advancement to make async stories deterministic.',
    mock:
      'Use a local fixture, request interceptor, or Storybook loader. Automated Storybook runs should fail on an unmatched request.',
    forbid:
      'Never contact the endpoint from Storybook. Replace it with a local mock and block the hostname in the test runner.',
  },
  recommendations: [
    {
      priority: 'P0',
      action:
        'Install a runtime request guard in automated Storybook checks that fails every unmatched fetch, XMLHttpRequest, axios, WebSocket, EventSource, and Centrifuge connection.',
    },
    {
      priority: 'P0',
      action:
        'Forbid all closed-likely hosts and replace their responses with repository-owned fixtures. Do not probe endpoint availability.',
    },
    {
      priority: 'P1',
      action:
        'Mock public APIs and upload endpoints per story; include success, empty, error, timeout, cancellation, and retry states.',
    },
    {
      priority: 'P1',
      action:
        'Vendor runtime images/fonts used by visual baselines or intercept them locally so screenshots do not depend on the internet.',
    },
    {
      priority: 'P1',
      action:
        'Use fake timers for timer-dependent stories and assert that intervals/timeouts are cleaned up after unmount.',
    },
    {
      priority: 'P2',
      action:
        'Keep Figma and documentation links classified as references; validate their format separately without opening them during Storybook tests.',
    },
  ],
  storyGroups,
  sourceInventory: {
    signals: allSignals,
    urls: allUrls,
  },
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
const mockCoverageReport = createMockCoverageReport(report);
fs.writeFileSync(
  mockCoveragePath,
  `${JSON.stringify(mockCoverageReport, null, 2)}\n`,
  'utf8',
);

console.log(
  [
    'Storybook network inventory generated.',
    `Stories: ${report.summary.storyFiles}`,
    `Network-dependent groups: ${report.summary.networkDependentStoryGroups}`,
    `Timer-dependent groups: ${report.summary.timerDependentStoryGroups}`,
    `Likely closed URL findings: ${report.summary.closedUrlFindings}`,
    `Output: ${relativeToRepo(outputPath)}`,
    `Mock coverage: ${relativeToRepo(mockCoveragePath)}`,
  ].join('\n'),
);
