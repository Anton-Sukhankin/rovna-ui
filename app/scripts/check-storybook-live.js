const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn, spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const reportPath = path.join(repoRoot, 'tmp', 'g04-storybook-live-check.json');
const logPath = path.join(repoRoot, 'tmp', 'g04-storybook-live.log');
const isWindows = process.platform === 'win32';

function parseArgs(argv) {
  const options = { port: 3000, timeoutMs: 120000 };

  argv.forEach(argument => {
    if (argument.startsWith('--port=')) options.port = Number(argument.slice(7));
    else if (argument.startsWith('--timeout=')) options.timeoutMs = Number(argument.slice(10));
    else if (argument.startsWith('--drive=')) options.drive = argument.slice(8).toUpperCase();
    else throw new Error(`Unknown argument: ${argument}`);
  });

  if (!Number.isInteger(options.port) || options.port < 1 || options.port > 65535) {
    throw new Error(`Invalid port: ${options.port}`);
  }
  if (!Number.isInteger(options.timeoutMs) || options.timeoutMs < 1000) {
    throw new Error(`Invalid timeout: ${options.timeoutMs}`);
  }
  if (options.drive && !/^[A-Z]:$/.test(options.drive)) {
    throw new Error(`Invalid subst drive: ${options.drive}`);
  }

  return options;
}

function run(command, args) {
  return spawnSync(command, args, { encoding: 'utf8' });
}

function selectDrive(preferredDrive) {
  const candidates = preferredDrive
    ? [preferredDrive]
    : ['T:', 'U:', 'V:', 'W:', 'X:', 'Y:', 'Z:'];
  const drive = candidates.find(candidate => !fs.existsSync(`${candidate}\\`));
  if (!drive) throw new Error(`No free subst drive found in: ${candidates.join(', ')}`);
  return drive;
}

function delay(durationMs) {
  return new Promise(resolve => setTimeout(resolve, durationMs));
}

async function fetchEndpoint(baseUrl, endpoint) {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    redirect: 'manual',
    signal: AbortSignal.timeout(10000),
  });
  const body = await response.text();
  return {
    endpoint,
    status: response.status,
    contentType: response.headers.get('content-type'),
    body,
  };
}

async function waitForEndpoints(baseUrl, timeoutMs, child) {
  const endpoints = ['/', '/index.json', '/iframe.html', '/project.json'];
  const startedAt = Date.now();
  let lastError = null;

  while (Date.now() - startedAt < timeoutMs) {
    if (child.exitCode !== null) {
      throw new Error(`Storybook exited before readiness with code ${child.exitCode}`);
    }

    try {
      const results = [];
      for (const endpoint of endpoints) {
        results.push(await fetchEndpoint(baseUrl, endpoint));
      }
      if (results.every(result => result.status === 200)) return results;
      lastError = new Error(
        results.map(result => `${result.endpoint}=${result.status}`).join(', '),
      );
    } catch (error) {
      lastError = error;
    }

    await delay(1000);
  }

  throw new Error(
    `Storybook did not expose all endpoints within ${timeoutMs}ms: ${lastError?.message || 'unknown error'}`,
  );
}

function summarizeIndex(indexBody) {
  const parsed = JSON.parse(indexBody);
  const entries = Object.values(parsed.entries || {});
  const storyCount = entries.filter(entry => entry.type === 'story').length;
  const docsCount = entries.filter(entry => entry.type === 'docs').length;
  return {
    formatVersion: parsed.v || null,
    entryCount: entries.length,
    storyCount,
    docsCount,
  };
}

function stopProcessTree(child) {
  if (!child || child.exitCode !== null) return;
  if (isWindows) run('taskkill.exe', ['/PID', String(child.pid), '/T', '/F']);
  else child.kill('SIGTERM');
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const profileRoot = path.join(os.tmpdir(), 'rovna-ui-storybook-profile');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.mkdirSync(profileRoot, { recursive: true });
  fs.writeFileSync(logPath, '');

  let drive = null;
  let mapped = false;
  let child = null;
  let logStream = null;
  let runtimeRoot = appRoot;
  let endpointResults = [];
  const startedAt = Date.now();
  let errorMessage = null;

  try {
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
      'dev',
      '-p',
      String(options.port),
      '--ci',
      '--no-open',
      '--disable-telemetry',
      '--no-version-updates',
      '-c',
      'storybook-f06',
    ];
    const environment = {
      ...process.env,
      COREPACK_ENABLE_NETWORK: '0',
      HOME: profileRoot,
      STORYBOOK_DISABLE_TELEMETRY: '1',
      USERPROFILE: profileRoot,
      npm_config_offline: 'true',
    };
    logStream = fs.createWriteStream(logPath, { flags: 'a' });

    child = spawn(executable, args, {
      cwd: `${runtimeRoot}${path.sep}`,
      env: environment,
      shell: isWindows,
      windowsHide: true,
    });
    child.stdout.pipe(logStream);
    child.stderr.pipe(logStream);

    endpointResults = await waitForEndpoints(
      `http://127.0.0.1:${options.port}`,
      options.timeoutMs,
      child,
    );
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : String(error);
  } finally {
    stopProcessTree(child);
    child?.stdout?.destroy();
    child?.stderr?.destroy();
    logStream?.end();
    child?.unref();
    if (mapped) run('subst.exe', [drive, '/D']);
  }

  let indexSummary = null;
  if (!errorMessage) {
    try {
      indexSummary = summarizeIndex(
        endpointResults.find(result => result.endpoint === '/index.json').body,
      );
    } catch (error) {
      errorMessage = `Cannot parse /index.json: ${error.message}`;
    }
  }

  const report = {
    status: errorMessage ? 'failed' : 'passed',
    sourceRoot: appRoot,
    runtimeRoot,
    pathStrategy: isWindows ? 'temporary-subst-drive' : 'direct-local-path',
    drive,
    driveReleased: drive ? !fs.existsSync(`${drive}\\`) : true,
    networkInstallAllowed: false,
    port: options.port,
    endpoints: endpointResults.map(({ body, ...result }) => ({
      ...result,
      bodyBytes: Buffer.byteLength(body),
    })),
    index: indexSummary,
    durationMs: Date.now() - startedAt,
    logPath,
    error: errorMessage,
  };

  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`G-04 live Storybook check: ${report.status}`);
  if (indexSummary) {
    console.log(
      `Entries: ${indexSummary.entryCount}; stories: ${indexSummary.storyCount}; docs: ${indexSummary.docsCount}`,
    );
  }
  report.endpoints.forEach(endpoint => {
    console.log(`${endpoint.endpoint}: ${endpoint.status} (${endpoint.bodyBytes} bytes)`);
  });
  console.log(`Drive released: ${report.driveReleased ? 'yes' : 'no'}`);
  console.log(`Report: ${reportPath}`);
  if (errorMessage) console.error(errorMessage);
  process.exitCode = errorMessage ? 1 : 0;
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
