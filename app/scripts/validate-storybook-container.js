const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const YAML = require('yaml');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const reportPath = path.join(repoRoot, 'tmp', 'f20-container-validation.json');

const files = {
  dockerfile: path.join(repoRoot, 'Dockerfile.storybook'),
  compose: path.join(repoRoot, 'compose.storybook.yml'),
  dockerignore: path.join(repoRoot, '.dockerignore'),
  nginx: path.join(repoRoot, 'docker', 'storybook-nginx.conf'),
  yarnrc: path.join(appRoot, '.yarnrc'),
  packageJson: path.join(appRoot, 'package.json'),
  policy: path.join(repoRoot, 'github-snapshot-policy.json'),
};

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required container file: ${path.relative(repoRoot, filePath)}`);
  }

  return fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function commandStatus(command, args) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    encoding: 'utf8',
    stdio: 'pipe',
  });

  return {
    available: result.status === 0,
    status: result.status,
    output: `${result.stdout || ''}${result.stderr || ''}`.trim(),
    error: result.error ? result.error.message : null,
  };
}

function main() {
  const dockerfile = read(files.dockerfile);
  const composeText = read(files.compose);
  const dockerignore = read(files.dockerignore);
  const nginx = read(files.nginx);
  const yarnrc = read(files.yarnrc);
  const packageJson = JSON.parse(read(files.packageJson));
  const policy = JSON.parse(read(files.policy));
  const compose = YAML.parse(composeText);
  const service = compose?.services?.storybook;

  assert(service, 'compose.storybook.yml must define services.storybook');
  assert(service.image === 'ds-rovna-ui-storybook:local', 'Compose image must remain local-only');
  assert(service.build?.context === '.', 'Compose build context must be the repository root');
  assert(
    service.build?.dockerfile === 'Dockerfile.storybook',
    'Compose must use Dockerfile.storybook',
  );
  assert(
    service.ports?.includes('${ROVNA_UI_STORYBOOK_PORT:-3001}:8080'),
    'Compose must expose configurable host port 3001 to container port 8080',
  );
  assert(!service.volumes, 'Container Storybook must not depend on host volume mounts');

  const dockerfileRequirements = [
    'FROM node:22-bookworm-slim AS builder',
    'FROM nginx:1.27-alpine AS runtime',
    'corepack prepare yarn@1.22.15 --activate',
    'yarn install --frozen-lockfile --ignore-scripts --non-interactive',
    'node ./node_modules/storybook/dist/bin/dispatcher.js build',
    '--config-dir storybook-f06',
    '--output-dir storybook-static',
    'COPY --from=builder /workspace/app/storybook-static/',
  ];

  dockerfileRequirements.forEach(requirement =>
    assert(dockerfile.includes(requirement), `Dockerfile requirement is missing: ${requirement}`),
  );

  ['app/node_modules', 'app/**/dist', 'tmp', 'release', 'source-docs'].forEach(requirement =>
    assert(dockerignore.includes(requirement), `.dockerignore requirement is missing: ${requirement}`),
  );

  assert(nginx.includes('listen 8080;'), 'nginx must listen on port 8080');
  assert(nginx.includes('location = /healthz'), 'nginx must expose /healthz');
  assert(nginx.includes('try_files $uri $uri/ /index.html;'), 'nginx must support Storybook routes');
  assert(
    yarnrc.includes('"registry" "https://registry.npmjs.org"'),
    'Container dependency installation must use the public npm registry',
  );
  assert(packageJson.packageManager === 'yarn@1.22.15', 'Yarn version must remain pinned to 1.22.15');

  const internalReferencePattern = new RegExp(policy.internalReferencePattern, 'i');
  const activeContainerFiles = [dockerfile, composeText, nginx, yarnrc];
  assert(
    activeContainerFiles.every(content => !internalReferencePattern.test(content)),
    'Active container configuration contains a closed corporate endpoint',
  );

  const docker = commandStatus('docker', ['version', '--format', '{{.Server.Version}}']);
  const composeRuntime = docker.available
    ? commandStatus('docker', ['compose', 'version', '--short'])
    : { available: false, status: null, output: '', error: 'Docker CLI is unavailable' };
  const runtimeAvailable = docker.available && composeRuntime.available;
  const report = {
    status: runtimeAvailable ? 'prepared-runtime-available' : 'prepared-runtime-blocked',
    staticValidation: 'passed',
    runtimeAvailable,
    docker,
    compose: composeRuntime,
    buildContext: '.',
    dockerfile: 'Dockerfile.storybook',
    hostPort: 3001,
    containerPort: 8080,
    publicDependencyRegistry: 'https://registry.npmjs.org',
    corporateEndpointFindings: 0,
    publicationPerformed: false,
  };

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

  console.log('F-20 container configuration validation passed.');
  console.log(`Runtime available: ${runtimeAvailable ? 'yes' : 'no'}`);
  console.log('Host URL after launch: http://localhost:3001/');
  console.log(`Report: ${reportPath}`);
}

main();
