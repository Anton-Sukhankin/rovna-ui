const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const repositoryRoot = path.resolve(appRoot, '..');
const catalogPath = path.join(repositoryRoot, 'docs', 'agent-context', 'ds-catalog.json');
const policyPath = path.join(repositoryRoot, 'docs', 'governance', 'artifact-policy.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const artifactPolicy = JSON.parse(fs.readFileSync(policyPath, 'utf8'));
const defaultMaxBytes = artifactPolicy.defaultContextMaxBytes || 50000;
const defaultMaxPaths = 12;

function normalize(value) {
  return value.replace(/\\/g, '/');
}

function repositoryPath(absolutePath) {
  return normalize(path.relative(repositoryRoot, absolutePath));
}

function existing(relativePath) {
  return fs.existsSync(path.join(repositoryRoot, relativePath));
}

function parseArgs(argv) {
  const options = {
    component: null,
    story: null,
    package: null,
    task: null,
    extended: false,
    json: false,
    check: false,
    help: false,
  };
  const valueOptions = new Set(['component', 'story', 'package', 'task']);
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--extended') options.extended = true;
    else if (argument === '--json') options.json = true;
    else if (argument === '--check') options.check = true;
    else if (argument === '--help' || argument === '-h') options.help = true;
    else if (argument.startsWith('--')) {
      const [rawName, inlineValue] = argument.slice(2).split(/=(.*)/s, 2);
      if (!valueOptions.has(rawName)) throw new Error(`Unknown option: --${rawName}`);
      const value = inlineValue === undefined ? argv[++index] : inlineValue;
      if (!value || value.startsWith('--')) throw new Error(`Missing value for --${rawName}`);
      options[rawName] = value;
    } else {
      throw new Error(`Unexpected argument: ${argument}`);
    }
  }
  return options;
}

function packageManifests() {
  const result = new Map();
  const packagesRoot = path.join(appRoot, 'packages');
  for (const directory of fs.readdirSync(packagesRoot)) {
    const manifestPath = path.join(packagesRoot, directory, 'package.json');
    if (!fs.existsSync(manifestPath)) continue;
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    result.set(manifest.name, {
      directory,
      manifest,
      path: repositoryPath(manifestPath),
    });
  }
  return result;
}

const manifests = packageManifests();

function sourceDetails(group) {
  const stories = (group.sourceFiles || [])
    .map(file => normalize(path.join('app', file)))
    .filter(existing);
  const directories = [...new Set(stories.map(file => path.dirname(path.join(repositoryRoot, file))))];
  const implementation = [];
  const tests = [];

  for (const directory of directories) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (!entry.isFile() || !/\.(?:js|jsx|ts|tsx)$/.test(entry.name)) continue;
      const relative = repositoryPath(path.join(directory, entry.name));
      if (/\.(?:test|spec)\.[^.]+$/.test(entry.name)) tests.push(relative);
      else if (!/\.stories\.[^.]+$/.test(entry.name)) implementation.push(relative);
    }
  }

  function sourceScore(file) {
    const name = path.basename(file).toLowerCase();
    const component = group.component.toLowerCase();
    if (name === `${component}.tsx` || name === `${component}.ts`) return 0;
    if (name === 'index.ts' || name === 'index.tsx') return 1;
    if (name.includes('types')) return 4;
    if (name.includes('styled')) return 5;
    return 2;
  }

  return {
    implementation: [...new Set(implementation)].sort((a, b) => sourceScore(a) - sourceScore(b) || a.localeCompare(b)),
    stories: [...new Set(stories)].sort(),
    tests: [...new Set(tests)].sort(),
  };
}

function recipeFor(component) {
  const map = {
    button: 'docs/agent-context/migration-recipes/replace-button.md',
    select: 'docs/agent-context/migration-recipes/replace-select.md',
    table: 'docs/agent-context/migration-recipes/replace-table.md',
    form: 'docs/agent-context/migration-recipes/migrate-form.md',
    drawer: 'docs/agent-context/migration-recipes/migrate-drawer.md',
    tree: 'docs/agent-context/migration-recipes/migrate-tree.md',
    uploadarea: 'docs/agent-context/migration-recipes/migrate-upload.md',
    uploadbutton: 'docs/agent-context/migration-recipes/migrate-upload.md',
  };
  const recipe = map[component.toLowerCase()];
  return recipe && existing(recipe) ? recipe : null;
}

function groupScore(group, query) {
  let score = 0;
  if (group.component.toLowerCase() === query.toLowerCase()) score += 100;
  if (group.title?.toLowerCase() === query.toLowerCase()) score += 80;
  if (group.id.toLowerCase() === query.toLowerCase()) score += 80;
  if (group.artifactStatus === 'supported') score += 20;
  if (group.package === '@rovna-ui/components') score += 10;
  if ((group.imports || []).some(item => item.kind === 'preferred-barrel' && item.verified)) score += 5;
  return score;
}

function componentCandidates(query, packageFilter) {
  const lower = query.toLowerCase();
  const all = [...catalog.componentGroups, ...catalog.boundaryPassports];
  let candidates = all.filter(group =>
    group.component.toLowerCase() === lower ||
    group.title?.toLowerCase() === lower ||
    group.id.toLowerCase() === lower,
  );
  if (!candidates.length) {
    candidates = all.filter(group =>
      group.component.toLowerCase().includes(lower) ||
      group.title?.toLowerCase().includes(lower) ||
      group.id.toLowerCase().includes(lower),
    );
  }
  if (packageFilter) candidates = candidates.filter(group => group.package === packageFilter);
  return candidates.sort((a, b) => groupScore(b, query) - groupScore(a, query) || a.title.localeCompare(b.title));
}

function basePacket(kind, query) {
  return {
    schemaVersion: 1,
    kind,
    query,
    authority: [
      'AGENTS.md',
      kind === 'documentation' ? 'docs/AGENTS.md' : 'app/AGENTS.md',
      'docs/governance/fact-ownership.md',
    ],
    routes: [],
    excludedPaths: [
      'docs/history/',
      'docs/evidence/ large reports unless an exact key is required',
      'app/node_modules/',
      'app/storybook-static/ generated assets',
      'S-Tracker and other consumer repositories',
    ],
    acceptanceCommands: [],
  };
}

function addRoute(packet, route) {
  if (!route || packet.routes.includes(route) || !existing(route)) return;
  packet.routes.push(route);
}

function componentPacket(query, packageFilter, extended) {
  const candidates = componentCandidates(query, packageFilter);
  if (!candidates.length) throw new Error(`No component candidate found for: ${query}`);
  const selected = candidates[0];
  const details = sourceDetails(selected);
  const manifest = manifests.get(selected.package);
  const packet = basePacket('component', query);
  packet.resolution = {
    selected: selected.title,
    reason: candidates.length === 1
      ? 'unique match'
      : 'deterministic preference: exact, supported, product barrel, verified import',
    alternatives: candidates.slice(1, extended ? undefined : 6).map(item => ({
      title: item.title,
      package: item.package,
      artifactStatus: item.artifactStatus,
    })),
  };
  packet.component = selected.component;
  packet.package = selected.package;
  packet.artifactStatus = selected.artifactStatus;
  packet.imports = (selected.imports || []).filter(item => item.verified || extended);
  packet.status = selected.status;
  packet.storybook = {
    storyCount: selected.storybook?.storyCount || 0,
    docsCount: selected.storybook?.docsCount || 0,
    url: selected.storybook?.url || null,
    storyIds: extended ? selected.storybook?.storyIds || [] : (selected.storybook?.storyIds || []).slice(0, 8),
    omittedStoryIds: extended ? 0 : Math.max(0, (selected.storybook?.storyIds || []).length - 8),
  };
  packet.interactions = selected.interactions;
  packet.risks = extended ? selected.riskDependencies || [] : (selected.riskDependencies || []).slice(0, 12);
  packet.omittedRisks = extended ? 0 : Math.max(0, (selected.riskDependencies || []).length - 12);
  packet.evidenceIds = extended ? selected.evidenceIds || [] : (selected.evidenceIds || []).slice(0, 8);

  addRoute(packet, 'docs/agent-context/import-rules.md');
  if (manifest) addRoute(packet, manifest.path);
  for (const file of details.implementation.slice(0, extended ? undefined : 2)) addRoute(packet, file);
  for (const file of details.stories.slice(0, extended ? undefined : 1)) addRoute(packet, file);
  for (const file of details.tests.slice(0, extended ? undefined : 1)) addRoute(packet, file);
  addRoute(packet, selected.passport);
  addRoute(packet, recipeFor(selected.component));

  if (manifest?.manifest.scripts?.test) {
    packet.acceptanceCommands.push(`corepack yarn workspace ${selected.package} test --runInBand`);
  }
  packet.acceptanceCommands.push('corepack yarn lint');
  if (selected.storybook?.storyIds?.length) packet.acceptanceCommands.push('corepack yarn test:storybook');
  return packet;
}

function storyPacket(storyId, extended) {
  const group = catalog.componentGroups.find(item => item.storybook.storyIds.includes(storyId));
  if (!group) throw new Error(`Story ID not found: ${storyId}`);
  const packet = componentPacket(group.component, group.package, extended);
  packet.kind = 'story';
  packet.query = storyId;
  packet.storybook.storyIds = [storyId];
  packet.storybook.omittedStoryIds = 0;
  packet.storybook.url = `http://127.0.0.1:3000/?path=/story/${storyId}`;
  return packet;
}

function packagePacket(packageName, extended) {
  const item = catalog.packages.find(row => row.package === packageName);
  const manifest = manifests.get(packageName);
  if (!item || !manifest) throw new Error(`Package not found: ${packageName}`);
  const packet = basePacket('package', packageName);
  packet.package = item;
  addRoute(packet, manifest.path);
  addRoute(packet, 'app/release-boundary.json');
  addRoute(packet, 'docs/r07-package-artifacts.json');
  addRoute(packet, 'docs/package-connection-guide.md');
  const groups = catalog.componentGroups.filter(group => group.package === packageName);
  packet.componentGroups = groups.slice(0, extended ? undefined : 12).map(group => ({
    title: group.title,
    component: group.component,
    passport: group.passport,
  }));
  packet.omittedGroups = extended ? 0 : Math.max(0, groups.length - 12);
  packet.acceptanceCommands = [
    `corepack yarn workspace ${packageName} build`,
    'corepack yarn packages:scope:check',
    'corepack yarn quality:r07',
  ];
  return packet;
}

const taskRoutes = {
  storybook: {
    kind: 'storybook',
    routes: ['docs/storybook-runbook.md', 'app/.storybook/main.ts', 'app/.storybook/preview.tsx', 'app/package.json'],
    acceptanceCommands: ['corepack yarn storybook:static:check', 'corepack yarn test:storybook', 'corepack yarn storybook:runtime:audit'],
  },
  documentation: {
    kind: 'documentation',
    routes: ['docs/AGENTS.md', 'docs/documentation-index.md', 'docs/governance/fact-ownership.md', 'app/scripts/generate-r09-documentation.js', 'app/scripts/check-r09-documentation.js'],
    acceptanceCommands: ['corepack yarn docs:r09:check', 'corepack yarn quality:r09', 'corepack yarn quality:agent-governance'],
  },
  release: {
    kind: 'release',
    routes: ['docs/maintainer-guide.md', 'docs/package-connection-guide.md', 'app/release-boundary.json', 'docs/r07-package-artifacts.json', 'app/package.json'],
    acceptanceCommands: ['corepack yarn packages:scope:check', 'corepack yarn release:ds-only', 'corepack yarn consumers:ds-only'],
  },
  quality: {
    kind: 'quality',
    routes: ['docs/current-project-status.md', 'docs/r-final-quality-report.json', 'app/scripts/run-r11-final-suite.js', 'app/scripts/check-r11-final-quality.js'],
    acceptanceCommands: ['corepack yarn quality:r11:suite', 'corepack yarn quality:r11'],
  },
};

function taskPacket(taskName) {
  const route = taskRoutes[taskName.toLowerCase()];
  if (!route) throw new Error(`Unknown task route: ${taskName}. Available: ${Object.keys(taskRoutes).join(', ')}`);
  const packet = basePacket(route.kind, taskName);
  for (const file of route.routes) addRoute(packet, file);
  packet.acceptanceCommands = route.acceptanceCommands;
  return packet;
}

function buildPacket(options) {
  if (options.story) return storyPacket(options.story, options.extended);
  if (options.component) return componentPacket(options.component, options.package, options.extended);
  if (options.task) return taskPacket(options.task);
  if (options.package) return packagePacket(options.package, options.extended);
  throw new Error('Select one route with --component, --story, --package or --task.');
}

function markdown(packet) {
  const lines = ['# Rovna UI Agent Context Packet', '', `- Kind: \`${packet.kind}\``, `- Query: \`${packet.query}\``];
  if (packet.resolution) {
    lines.push(`- Selected: \`${packet.resolution.selected}\``);
    lines.push(`- Resolution: ${packet.resolution.reason}`);
  }
  if (packet.package && typeof packet.package === 'string') lines.push(`- Package: \`${packet.package}\``);
  if (packet.artifactStatus) lines.push(`- Artifact: \`${packet.artifactStatus}\``);
  lines.push('', '## Authority', '', ...packet.authority.map(item => `- \`${item}\``));
  if (packet.imports?.length) lines.push('', '## Imports', '', ...packet.imports.map(item => `- \`${item.path}\` (${item.kind})`));
  lines.push('', '## Minimal Route', '', ...packet.routes.map((item, index) => `${index + 1}. \`${item}\``));
  if (packet.storybook) {
    lines.push('', '## Storybook', '', `- URL: ${packet.storybook.url || 'n/a'}`);
    lines.push(...packet.storybook.storyIds.map(item => `- \`${item}\``));
    if (packet.storybook.omittedStoryIds) lines.push(`- ${packet.storybook.omittedStoryIds} additional story IDs omitted.`);
  }
  if (packet.risks?.length) {
    lines.push('', '## Risk Dependencies', '', ...packet.risks.map(item => `- \`${item}\``));
    if (packet.omittedRisks) lines.push(`- ${packet.omittedRisks} additional risks omitted.`);
  }
  if (packet.resolution?.alternatives?.length) {
    lines.push('', '## Alternatives', '', ...packet.resolution.alternatives.map(item => `- \`${item.title}\` in \`${item.package}\` (${item.artifactStatus})`));
  }
  lines.push('', '## Acceptance', '', '```text', ...packet.acceptanceCommands, '```');
  lines.push('', '## Excluded From Default Context', '', ...packet.excludedPaths.map(item => `- ${item}`), '');
  return lines.join('\n');
}

function validatePacket(packet, label) {
  const output = markdown(packet);
  const bytes = Buffer.byteLength(output);
  const failures = [];
  if (bytes > defaultMaxBytes) failures.push(`${label}: ${bytes} bytes exceeds ${defaultMaxBytes}`);
  if (packet.routes.length > defaultMaxPaths) failures.push(`${label}: ${packet.routes.length} routes exceeds ${defaultMaxPaths}`);
  const prohibited = packet.routes.filter(route => route.startsWith('docs/history/') || route.startsWith('docs/evidence/'));
  if (prohibited.length) failures.push(`${label}: prohibited default routes ${prohibited.join(', ')}`);
  const missing = packet.routes.filter(route => !existing(route));
  if (missing.length) failures.push(`${label}: missing routes ${missing.join(', ')}`);
  return { label, bytes, routes: packet.routes.length, failures };
}

function runCheck() {
  const cases = [
    ['Button', componentPacket('Button', '@rovna-ui/primitives', false)],
    ['Table', componentPacket('Table', '@rovna-ui/components', false)],
    ['Storybook', taskPacket('storybook')],
    ['Documentation', taskPacket('documentation')],
    ['Release', taskPacket('release')],
  ];
  const results = cases.map(([label, packet]) => validatePacket(packet, label));
  const failures = results.flatMap(result => result.failures);
  console.log(JSON.stringify({ status: failures.length ? 'failed' : 'passed', maxBytes: defaultMaxBytes, maxPaths: defaultMaxPaths, results, failures }, null, 2));
  if (failures.length) process.exit(1);
}

function printHelp() {
  console.log(`Rovna UI agent context resolver

Usage:
  corepack yarn agent:context --component Button [--package @rovna-ui/primitives]
  corepack yarn agent:context --story rovna-ui-primitives-button--primary
  corepack yarn agent:context --package @rovna-ui/primitives
  corepack yarn agent:context --task storybook|documentation|release|quality

Options:
  --extended  Include complete states, evidence and related files.
  --json      Print machine-readable output.
  --check     Run deterministic routing acceptance cases.`);
}

try {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) printHelp();
  else if (options.check) runCheck();
  else {
    const packet = buildPacket(options);
    const result = options.json ? `${JSON.stringify(packet, null, 2)}\n` : `${markdown(packet)}\n`;
    if (!options.extended && Buffer.byteLength(result) > defaultMaxBytes) throw new Error(`Context packet exceeds ${defaultMaxBytes} bytes. Use a narrower query.`);
    if (!options.extended && packet.routes.length > defaultMaxPaths) throw new Error(`Context packet exceeds ${defaultMaxPaths} routes. Use a narrower query.`);
    process.stdout.write(result);
  }
} catch (error) {
  console.error(`Agent context resolver failed: ${error.message}`);
  process.exit(1);
}
