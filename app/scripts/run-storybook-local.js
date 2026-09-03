const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const reportPath = path.join(repoRoot, 'tmp', 'g03-storybook-launcher.json');
const isWindows = process.platform === 'win32';

function parseArgs(argv) {
  const options = {
    port: 3000,
    previewOnly: false,
    smokeSuite: false,
    smokeTest: false,
  };

  argv.forEach(argument => {
    if (argument === '--preview-only') options.previewOnly = true;
    else if (argument === '--smoke-suite') options.smokeSuite = true;
    else if (argument === '--smoke-test') options.smokeTest = true;
    else if (argument.startsWith('--port=')) options.port = Number(argument.slice(7));
    else if (argument.startsWith('--drive=')) options.drive = argument.slice(8).toUpperCase();
    else throw new Error(`Unknown launcher argument: ${argument}`);
  });

  if (!Number.isInteger(options.port) || options.port < 1 || options.port > 65535) {
    throw new Error(`Invalid Storybook port: ${options.port}`);
  }

  if (options.drive && !/^[A-Z]:$/.test(options.drive)) {
    throw new Error(`Invalid subst drive: ${options.drive}`);
  }

  return options;
}

function selectDrive(preferredDrive) {
  const candidates = preferredDrive
    ? [preferredDrive]
    : ['T:', 'U:', 'V:', 'W:', 'X:', 'Y:', 'Z:'];
  const available = candidates.find(drive => !fs.existsSync(`${drive}\\`));

  if (!available) {
    throw new Error(`No free subst drive found in: ${candidates.join(', ')}`);
  }

  return available;
}

function run(command, args, options = {}) {
  return spawnSync(command, args, {
    encoding: 'utf8',
    stdio: options.stdio || 'pipe',
    ...options,
  });
}

function createAttempt(name, flags, runtimeRoot, environment, port) {
  const executable = isWindows
    ? path.join(runtimeRoot, 'node_modules', '.bin', 'storybook.cmd')
    : path.join(runtimeRoot, 'node_modules', '.bin', 'storybook');
  const args = [
    'dev',
    '-p',
    String(port),
    '--ci',
    '--no-open',
    '--disable-telemetry',
    '--no-version-updates',
    '-c',
    'storybook-f06',
    ...flags,
  ];
  const startedAt = Date.now();
  const result = run(executable, args, {
    cwd: `${runtimeRoot}${path.sep}`,
    env: environment,
    shell: isWindows,
    stdio: 'inherit',
  });

  return {
    name,
    args,
    durationMs: Date.now() - startedAt,
    status: result.status,
    signal: result.signal || null,
    error: result.error ? result.error.message : null,
  };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const profileRoot = path.join(os.tmpdir(), 'rovna-ui-storybook-profile');
  fs.mkdirSync(profileRoot, { recursive: true });
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });

  let drive = null;
  let runtimeRoot = appRoot;
  let mapped = false;
  const attempts = [];
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
    if (isWindows) {
      drive = selectDrive(options.drive);
      const subst = run('subst.exe', [drive, appRoot]);
      if (subst.status !== 0) {
        throw new Error(`subst failed: ${subst.stderr || subst.stdout || subst.error?.message}`);
      }
      runtimeRoot = drive;
      mapped = true;
    }

    const environment = {
      ...process.env,
      COREPACK_ENABLE_NETWORK: '0',
      HOME: profileRoot,
      Q_STORYBOOK_RUNTIME_ROOT: runtimeRoot,
      STORYBOOK_DISABLE_TELEMETRY: '1',
      USERPROFILE: profileRoot,
      npm_config_offline: 'true',
    };

    if (options.smokeSuite) {
      attempts.push(
        createAttempt(
          'preview-smoke',
          ['--preview-only', '--smoke-test'],
          runtimeRoot,
          environment,
          options.port,
        ),
      );
      if (attempts[0].status === 0) {
        attempts.push(
          createAttempt(
            'manager-smoke',
            ['--smoke-test'],
            runtimeRoot,
            environment,
            options.port,
          ),
        );
      }
    } else {
      const flags = [];
      if (options.previewOnly) flags.push('--preview-only');
      if (options.smokeTest) flags.push('--smoke-test');
      attempts.push(
        createAttempt(
          options.previewOnly ? 'preview' : 'manager',
          flags,
          runtimeRoot,
          environment,
          options.port,
        ),
      );
    }
  } finally {
    if (mapped) {
      run('subst.exe', [drive, '/D']);
    }
  }

  const passed = attempts.length > 0 && attempts.every(attempt => attempt.status === 0);
  const report = {
    status: passed ? 'passed' : 'failed',
    mode: options.smokeSuite ? 'smoke-suite' : options.smokeTest ? 'smoke-test' : 'dev',
    sourceRoot: appRoot,
    runtimeRoot,
    pathStrategy: isWindows ? 'temporary-subst-drive' : 'direct-local-path',
    drive,
    driveReleased: drive ? !fs.existsSync(`${drive}\\`) : true,
    networkInstallAllowed: false,
    port: options.port,
    attempts,
    durationMs: Date.now() - startedAt,
  };

  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`G-03 Storybook launcher: ${report.status}`);
  console.log(`Path strategy: ${report.pathStrategy}${drive ? ` (${drive})` : ''}`);
  console.log(`Drive released: ${report.driveReleased ? 'yes' : 'no'}`);
  console.log(`Report: ${reportPath}`);

  process.exitCode = passed ? 0 : 1;
}

try {
  main();
} catch (error) {
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(
    reportPath,
    `${JSON.stringify(
      {
        status: 'failed',
        error: error instanceof Error ? error.message : String(error),
      },
      null,
      2,
    )}\n`,
  );
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
