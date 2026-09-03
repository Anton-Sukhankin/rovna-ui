const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const outputRoot = path.join(appRoot, 'storybook-static');
const stagingRoot = path.join(appRoot, 'storybook-static-next');
const fallbackRoot = path.join(appRoot, 'storybook-static-previous');
const reportPath = path.join(repoRoot, 'tmp', 'g05-storybook-static-build.json');
const logPath = path.join(repoRoot, 'tmp', 'g05-storybook-static-build.log');
const isWindows = process.platform === 'win32';

function parseArgs(argv) {
  const options = {};
  argv.forEach(argument => {
    if (argument.startsWith('--drive=')) options.drive = argument.slice(8).toUpperCase();
    else throw new Error(`Unknown argument: ${argument}`);
  });
  if (options.drive && !/^[A-Z]:$/.test(options.drive)) {
    throw new Error(`Invalid subst drive: ${options.drive}`);
  }
  return options;
}

function run(command, args, options = {}) {
  return spawnSync(command, args, {
    encoding: 'utf8',
    maxBuffer: 100 * 1024 * 1024,
    ...options,
  });
}

function selectDrive(preferredDrive) {
  const candidates = preferredDrive
    ? [preferredDrive]
    : ['T:', 'U:', 'V:', 'W:', 'X:', 'Y:', 'Z:'];
  const drive = candidates.find(candidate => !fs.existsSync(`${candidate}\\`));
  if (!drive) throw new Error(`No free subst drive found in: ${candidates.join(', ')}`);
  return drive;
}

function assertSafeOutputPath() {
  const resolvedAppRoot = path.resolve(appRoot);
  const expectedRoots = new Map([
    [outputRoot, 'storybook-static'],
    [stagingRoot, 'storybook-static-next'],
    [fallbackRoot, 'storybook-static-previous'],
  ]);

  for (const [root, expectedName] of expectedRoots) {
    const resolvedRoot = path.resolve(root);
    if (
      resolvedRoot !== path.join(resolvedAppRoot, expectedName) ||
      !resolvedRoot.startsWith(`${resolvedAppRoot}${path.sep}`)
    ) {
      throw new Error(`Refusing to manage unsafe Storybook path: ${resolvedRoot}`);
    }
  }
}

function summarizeIndex(root) {
  const parsed = JSON.parse(fs.readFileSync(path.join(root, 'index.json'), 'utf8'));
  const entries = Object.values(parsed.entries || {});
  return {
    formatVersion: parsed.v || null,
    entryCount: entries.length,
    storyCount: entries.filter(entry => entry.type === 'story').length,
    docsCount: entries.filter(entry => entry.type === 'docs').length,
  };
}

function contentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return (
    {
      '.css': 'text/css; charset=utf-8',
      '.html': 'text/html; charset=utf-8',
      '.js': 'text/javascript; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.svg': 'image/svg+xml',
    }[extension] || 'application/octet-stream'
  );
}

function createStaticServer(root) {
  return http.createServer((request, response) => {
    const requestPath = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const relativePath = requestPath === '/' ? 'index.html' : requestPath.replace(/^\/+/, '');
    const filePath = path.resolve(root, relativePath);

    if (!filePath.startsWith(`${path.resolve(root)}${path.sep}`) || !fs.existsSync(filePath)) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }

    response.writeHead(200, { 'content-type': contentType(filePath) });
    fs.createReadStream(filePath).pipe(response);
  });
}

async function verifyStaticEndpoints(root) {
  const server = createStaticServer(root);
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });

  try {
    const address = server.address();
    const endpoints = ['/', '/index.json', '/iframe.html', '/project.json'];
    const results = [];
    for (const endpoint of endpoints) {
      const response = await fetch(`http://127.0.0.1:${address.port}${endpoint}`);
      const body = await response.arrayBuffer();
      results.push({
        endpoint,
        status: response.status,
        contentType: response.headers.get('content-type'),
        bodyBytes: body.byteLength,
      });
    }
    return results;
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
}

function preserveCurrentGeneration(runtimeAppRoot) {
  const runtimeOutputRoot = path.join(runtimeAppRoot, 'storybook-static');
  const runtimeFallbackRoot = path.join(runtimeAppRoot, 'storybook-static-previous');
  if (!fs.existsSync(runtimeOutputRoot)) return 0;
  fs.mkdirSync(runtimeFallbackRoot, { recursive: true });
  fs.cpSync(runtimeOutputRoot, runtimeFallbackRoot, { force: true, recursive: true });
  return fs.readdirSync(runtimeFallbackRoot, { recursive: true }).length;
}

function promoteStagingBuild(runtimeAppRoot) {
  const runtimeOutputRoot = path.join(runtimeAppRoot, 'storybook-static');
  const runtimeStagingRoot = path.join(runtimeAppRoot, 'storybook-static-next');
  const runtimeFallbackRoot = path.join(runtimeAppRoot, 'storybook-static-previous');
  const preservedFallbackFiles = preserveCurrentGeneration(runtimeAppRoot);
  fs.rmSync(runtimeOutputRoot, { force: true, recursive: true });

  try {
    fs.renameSync(runtimeStagingRoot, runtimeOutputRoot);
  } catch (error) {
    if (!fs.existsSync(runtimeOutputRoot) && fs.existsSync(runtimeFallbackRoot)) {
      fs.cpSync(runtimeFallbackRoot, runtimeOutputRoot, { force: true, recursive: true });
    }
    throw error;
  }

  return preservedFallbackFiles;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const profileRoot = path.join(os.tmpdir(), 'rovna-ui-storybook-profile');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.mkdirSync(profileRoot, { recursive: true });
  assertSafeOutputPath();

  let drive = null;
  let mapped = false;
  let runtimeRoot = appRoot;
  let commandResult = null;
  let errorMessage = null;
  let indexSummary = null;
  let endpoints = [];
  let preservedFallbackFiles = 0;
  const startedAt = Date.now();

  try {
    const assetResult = run(
      process.execPath,
      [path.join(__dirname, 'prepare-storybook-assets.js')],
      {
        cwd: appRoot,
        env: {
          ...process.env,
          COREPACK_ENABLE_NETWORK: '0',
          npm_config_offline: 'true',
        },
      },
    );
    if (assetResult.status !== 0) {
      throw new Error(
        `Storybook asset preparation failed: ${
          assetResult.stderr || assetResult.stdout || assetResult.error?.message
        }`,
      );
    }
    fs.rmSync(stagingRoot, { force: true, recursive: true });

    if (isWindows) {
      drive = selectDrive(options.drive);
      const subst = run('subst.exe', [drive, appRoot]);
      if (subst.status !== 0) {
        throw new Error(`subst failed: ${subst.stderr || subst.stdout || subst.error?.message}`);
      }
      runtimeRoot = drive;
      mapped = true;
    }

    const executable = isWindows
      ? path.join(runtimeRoot, 'node_modules', '.bin', 'storybook.cmd')
      : path.join(runtimeRoot, 'node_modules', '.bin', 'storybook');
    const args = [
      'build',
      '--disable-telemetry',
      '-c',
      'storybook-f06',
      '-o',
      'storybook-static-next',
    ];
    const environment = {
      ...process.env,
      COREPACK_ENABLE_NETWORK: '0',
      HOME: profileRoot,
      STORYBOOK_DISABLE_TELEMETRY: '1',
      USERPROFILE: profileRoot,
      npm_config_offline: 'true',
    };

    commandResult = run(executable, args, {
      cwd: `${runtimeRoot}${path.sep}`,
      env: environment,
      shell: isWindows,
    });
    fs.writeFileSync(
      logPath,
      `${commandResult.stdout || ''}${commandResult.stderr || ''}`,
    );
    if (commandResult.status !== 0) {
      throw new Error(
        `Storybook build failed with code ${commandResult.status}; see ${logPath}`,
      );
    }
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : String(error);
  }

  if (!errorMessage) {
    try {
      const requiredFiles = ['index.html', 'index.json', 'iframe.html', 'project.json'];
      const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(stagingRoot, file)));
      if (missingFiles.length) throw new Error(`Missing static files: ${missingFiles.join(', ')}`);
      indexSummary = summarizeIndex(stagingRoot);
      endpoints = await verifyStaticEndpoints(stagingRoot);
      const failingEndpoints = endpoints.filter(endpoint => endpoint.status !== 200);
      if (failingEndpoints.length) {
        throw new Error(
          `Static endpoint failures: ${failingEndpoints
            .map(endpoint => `${endpoint.endpoint}=${endpoint.status}`)
            .join(', ')}`,
        );
      }
      preservedFallbackFiles = promoteStagingBuild(runtimeRoot);
      endpoints = await verifyStaticEndpoints(outputRoot);
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : String(error);
    }
  }

  const runtimeStagingRoot = path.join(runtimeRoot, 'storybook-static-next');
  if (fs.existsSync(runtimeStagingRoot)) {
    fs.rmSync(runtimeStagingRoot, { force: true, recursive: true });
  }
  if (mapped) run('subst.exe', [drive, '/D']);

  const report = {
    status: errorMessage ? 'failed' : 'passed',
    sourceRoot: appRoot,
    outputRoot,
    fallbackRoot,
    runtimeRoot,
    pathStrategy: isWindows ? 'temporary-subst-drive' : 'direct-local-path',
    drive,
    driveReleased: drive ? !fs.existsSync(`${drive}\\`) : true,
    networkInstallAllowed: false,
    buildExitCode: commandResult?.status ?? null,
    index: indexSummary,
    endpoints,
    outputFileCount: fs.existsSync(outputRoot)
      ? fs.readdirSync(outputRoot, { recursive: true }).length
      : 0,
    preservedFallbackFiles,
    durationMs: Date.now() - startedAt,
    logPath,
    error: errorMessage,
  };

  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`G-05 static Storybook build: ${report.status}`);
  if (indexSummary) {
    console.log(
      `Entries: ${indexSummary.entryCount}; stories: ${indexSummary.storyCount}; docs: ${indexSummary.docsCount}`,
    );
  }
  endpoints.forEach(endpoint => {
    console.log(`${endpoint.endpoint}: ${endpoint.status} (${endpoint.bodyBytes} bytes)`);
  });
  console.log(`Output files: ${report.outputFileCount}`);
  console.log(`Drive released: ${report.driveReleased ? 'yes' : 'no'}`);
  console.log(`Report: ${reportPath}`);
  if (errorMessage) console.error(errorMessage);
  process.exitCode = errorMessage ? 1 : 0;
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
