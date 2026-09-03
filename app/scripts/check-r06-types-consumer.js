const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { appRoot, createContract } = require('./public-api-contract');

const repoRoot = path.resolve(appRoot, '..');
const outputRoot = path.join(repoRoot, 'tmp', 'r06-types-consumer');
const reportPath = path.join(repoRoot, 'docs', 'r06-types-consumer.json');
const tscPath = path.join(appRoot, 'node_modules', 'typescript', 'bin', 'tsc');

function toPosix(value) {
  return value.replace(/\\/g, '/');
}

function runTsc(configPath) {
  const startedAt = Date.now();
  const result = spawnSync(process.execPath, [tscPath, '--project', configPath, '--pretty', 'false'], {
    cwd: appRoot,
    encoding: 'utf8',
    timeout: 300000,
    env: { ...process.env, COREPACK_ENABLE_NETWORK: '0', npm_config_offline: 'true' },
  });
  return {
    status: result.status === 0 ? 'passed' : 'failed',
    exitCode: result.status,
    durationMs: Date.now() - startedAt,
    output: `${result.stdout || ''}${result.stderr || ''}`.trim(),
  };
}

function main() {
  const startedAt = Date.now();
  const { errors, snapshot, summary } = createContract();
  if (errors.length) throw new Error(errors.join('\n'));
  fs.rmSync(outputRoot, { force: true, recursive: true });
  fs.mkdirSync(outputRoot, { recursive: true });

  const paths = {};
  const entrypoints = snapshot.packages.flatMap(packageEntry => packageEntry.entrypoints);
  for (const entrypoint of entrypoints) {
    paths[entrypoint.specifier] = [toPosix(path.join(appRoot, entrypoint.types))];
  }
  const positiveSource = entrypoints.map((entrypoint, index) =>
    `import * as Public${index} from '${entrypoint.specifier}';\nexport type PublicCheck${index} = keyof typeof Public${index};`,
  ).join('\n');
  const negativeSource = `import type * as React from 'react';
import { Button } from '@rovna-ui/components/primitives/Button';

// @ts-expect-error Source folders are not part of the public package contract.
import * as PrivateSource from '@rovna-ui/components/src/primitives/Button';
// @ts-expect-error Unknown package subpaths must remain inaccessible.
import * as UnknownSubpath from '@rovna-ui/components/not-a-public-subpath';
// @ts-expect-error Unknown named exports must remain rejected.
import { DefinitelyMissingPublicExport } from '@rovna-ui/components/primitives/Button';

// @ts-expect-error Button size is a closed public union.
const invalidButtonProps: React.ComponentProps<typeof Button> = { size: 'gigantic' };

void PrivateSource;
void UnknownSubpath;
void DefinitelyMissingPublicExport;
void invalidButtonProps;
`;
  const baseCompilerOptions = {
    allowSyntheticDefaultImports: true,
    baseUrl: appRoot,
    esModuleInterop: true,
    forceConsistentCasingInFileNames: true,
    jsx: 'react',
    lib: ['ES2020', 'DOM'],
    module: 'ESNext',
    moduleResolution: 'Node',
    noEmit: true,
    paths,
    skipLibCheck: false,
    strict: true,
    target: 'ES2020',
    typeRoots: [toPosix(path.join(appRoot, 'node_modules', '@types'))],
    types: ['react', 'react-dom'],
  };
  const cases = [
    { id: 'positive-all-public-subpaths', source: positiveSource, assertions: entrypoints.length },
    { id: 'negative-public-boundaries', source: negativeSource, assertions: 4 },
  ];
  const results = [];
  for (const testCase of cases) {
    const sourcePath = path.join(outputRoot, `${testCase.id}.ts`);
    const configPath = path.join(outputRoot, `${testCase.id}.json`);
    fs.writeFileSync(sourcePath, testCase.source);
    fs.writeFileSync(configPath, `${JSON.stringify({
      compilerOptions: baseCompilerOptions,
      files: [sourcePath],
    }, null, 2)}\n`);
    const execution = runTsc(configPath);
    fs.writeFileSync(path.join(outputRoot, `${testCase.id}.log`), `${execution.output}\n`);
    results.push({
      id: testCase.id,
      status: execution.status,
      assertions: testCase.assertions,
      exitCode: execution.exitCode,
      durationMs: execution.durationMs,
      log: toPosix(path.relative(repoRoot, path.join(outputRoot, `${testCase.id}.log`))),
      outputTail: execution.output.slice(-3000),
    });
    console.log(`${testCase.id}: ${execution.status}`);
  }
  const failures = results.filter(result => result.status !== 'passed');
  const report = {
    status: failures.length ? 'failed' : 'passed',
    checkedAt: new Date().toISOString(),
    networkInstallAllowed: false,
    packages: summary.packages,
    publicSubpaths: summary.publicSubpaths,
    positiveImports: entrypoints.length,
    negativeAssertions: 4,
    results,
    durationMs: Date.now() - startedAt,
  };
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`R-06 TypeScript consumers: ${report.status}`);
  console.log(`Positive imports: ${report.positiveImports}; negative assertions: ${report.negativeAssertions}`);
  console.log(`Report: ${reportPath}`);
  if (failures.length) process.exitCode = 1;
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.stack : String(error));
  process.exitCode = 1;
}
