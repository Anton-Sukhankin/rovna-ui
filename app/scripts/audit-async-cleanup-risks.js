const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const packagesRoot = path.join(appRoot, 'packages');
const outputPath = path.join(repoRoot, 'docs', 'async-cleanup-risk-inventory.json');
const sourceExtensions = new Set(['.js', '.jsx', '.ts', '.tsx']);
const ignoredDirectories = new Set([
  'build',
  'coverage',
  'dist',
  'node_modules',
  'storybook-static',
]);

const timerDefinitions = Object.assign(Object.create(null), {
  setInterval: { cleanup: 'clearInterval', severity: 'high' },
  setTimeout: { cleanup: 'clearTimeout', severity: 'medium' },
  requestAnimationFrame: { cleanup: 'cancelAnimationFrame', severity: 'medium' },
  requestIdleCallback: { cleanup: 'cancelIdleCallback', severity: 'medium' },
});

const observerDefinitions = Object.assign(Object.create(null), {
  IntersectionObserver: ['disconnect', 'unobserve'],
  MutationObserver: ['disconnect'],
  ResizeObserver: ['disconnect', 'unobserve'],
});

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) return [];
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(entryPath);
    if (!sourceExtensions.has(path.extname(entry.name))) return [];
    if (/\.d\.ts$|\.snap$/.test(entry.name)) return [];
    return [entryPath];
  });
}

function packageMetadata(filePath, cache) {
  const relative = path.relative(packagesRoot, filePath);
  const directory = relative.split(path.sep)[0];
  if (!cache.has(directory)) {
    const manifestPath = path.join(packagesRoot, directory, 'package.json');
    const manifest = fs.existsSync(manifestPath) ? readJson(manifestPath) : {};
    cache.set(directory, {
      directory,
      name: manifest.name || directory,
    });
  }
  return cache.get(directory);
}

function sourceKind(filePath) {
  const normalized = toPosix(filePath);
  if (/\.stories\.[jt]sx?$/.test(normalized)) return 'story';
  if (/\.(?:test|spec)\.[jt]sx?$/.test(normalized) || /\/(?:__tests__|test)\//.test(normalized)) {
    return 'test';
  }
  if (/\/__(?:fixtures|mocks|code)__\//.test(normalized)) return 'fixture';
  if (/\/src\//.test(normalized)) return 'runtime';
  return 'support';
}

function componentName(filePath, packageDirectory) {
  const packageRoot = path.join(packagesRoot, packageDirectory);
  const relative = toPosix(path.relative(packageRoot, filePath));
  const parts = relative.split('/');
  const srcIndex = parts.indexOf('src');
  const semanticRoots = new Set([
    'components',
    'entities',
    'features',
    'grid',
    'hooks',
    'primitives',
    'shared',
    'ui',
    'widgets',
  ]);

  if (srcIndex >= 0) {
    const afterSrc = parts.slice(srcIndex + 1);
    if (semanticRoots.has(afterSrc[0]) && afterSrc[1]) return afterSrc[1];
    if (afterSrc[0]) {
      const first = afterSrc[0].replace(/\.(?:stories\.)?[jt]sx?$/, '');
      if (first && first !== 'index') return first;
    }
  }

  return path.basename(filePath).replace(/\.(?:stories\.)?[jt]sx?$/, '');
}

function scriptKind(filePath) {
  if (filePath.endsWith('.tsx')) return ts.ScriptKind.TSX;
  if (filePath.endsWith('.jsx')) return ts.ScriptKind.JSX;
  if (filePath.endsWith('.js')) return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}

function callName(node, sourceFile) {
  if (!ts.isCallExpression(node)) return null;
  const expression = node.expression;
  if (ts.isIdentifier(expression)) return expression.text;
  if (ts.isPropertyAccessExpression(expression)) return expression.name.text;
  return expression.getText(sourceFile);
}

function callTarget(node, sourceFile) {
  if (!ts.isCallExpression(node) || !ts.isPropertyAccessExpression(node.expression)) return null;
  return node.expression.expression.getText(sourceFile);
}

function enclosingScope(node, sourceFile) {
  let current = node.parent;
  let nearestFunction = null;
  while (current && current !== sourceFile) {
    if (ts.isFunctionLike(current)) {
      if (!nearestFunction) nearestFunction = current;
      if (ts.isCallExpression(current.parent)) {
        const owner = callName(current.parent, sourceFile);
        if (owner === 'useEffect' || owner === 'useLayoutEffect') return current;
      }
    }
    current = current.parent;
  }
  return nearestFunction || sourceFile;
}

function lineInfo(sourceFile, node) {
  const start = node.getStart(sourceFile);
  const position = sourceFile.getLineAndCharacterOfPosition(start);
  return {
    line: position.line + 1,
    column: position.character + 1,
  };
}

function compactEvidence(sourceFile, node) {
  return node
    .getText(sourceFile)
    .replace(/\s+/g, ' ')
    .slice(0, 240);
}

function expressionIdentity(call, sourceFile) {
  const parent = call.parent;
  if (ts.isVariableDeclaration(parent) && parent.initializer === call && ts.isIdentifier(parent.name)) {
    return parent.name.text;
  }
  if (
    ts.isBinaryExpression(parent) &&
    parent.right === call &&
    parent.operatorToken.kind === ts.SyntaxKind.EqualsToken
  ) {
    return parent.left.getText(sourceFile);
  }
  return null;
}

function cleanupMatches(scopeText, cleanupNames, identity) {
  const names = Array.isArray(cleanupNames) ? cleanupNames : [cleanupNames];
  for (const cleanupName of names) {
    const escapedName = cleanupName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (identity) {
      const escapedIdentity = identity.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const exact = new RegExp(`\\b${escapedName}\\s*\\(\\s*${escapedIdentity}\\s*\\)`);
      if (exact.test(scopeText)) return cleanupName;
    }
    if (new RegExp(`\\b${escapedName}\\s*\\(`).test(scopeText)) return cleanupName;
  }
  return null;
}

function cleanupLine(sourceFile, scope, cleanupName) {
  if (!cleanupName) return null;
  let result = null;
  function visit(node) {
    if (result || !ts.isCallExpression(node)) {
      ts.forEachChild(node, visit);
      return;
    }
    if (callName(node, sourceFile) === cleanupName) {
      result = {
        ...lineInfo(sourceFile, node),
        evidence: compactEvidence(sourceFile, node),
      };
      return;
    }
    ts.forEachChild(node, visit);
  }
  visit(scope);
  return result;
}

function lifecycleCleanupEvidence(sourceFile, cleanupName, identity) {
  let result = null;

  function findReturns(current, returns) {
    if (ts.isReturnStatement(current) && current.expression) {
      returns.push(current.expression);
      return;
    }
    ts.forEachChild(current, child => findReturns(child, returns));
  }

  function findCleanup(node) {
    if (result) return;
    if (ts.isCallExpression(node) && callName(node, sourceFile) === cleanupName) {
      const argument = node.arguments[0]?.getText(sourceFile);
      if (!identity || argument === identity) {
        result = {
          ...lineInfo(sourceFile, node),
          evidence: compactEvidence(sourceFile, node),
        };
        return;
      }
    }
    ts.forEachChild(node, findCleanup);
  }

  function visit(node) {
    if (result) return;
    if (ts.isCallExpression(node)) {
      const name = callName(node, sourceFile);
      if (name === 'useEffect' || name === 'useLayoutEffect') {
        const effect = node.arguments.find(
          argument => ts.isArrowFunction(argument) || ts.isFunctionExpression(argument),
        );
        if (effect) {
          const returns = [];
          if (ts.isArrowFunction(effect) && ts.isFunctionLike(effect.body)) {
            returns.push(effect.body);
          }
          findReturns(effect.body, returns);
          returns.forEach(findCleanup);
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return result;
}

function isReactEffectScope(scope, sourceFile) {
  if (!ts.isFunctionLike(scope) || !ts.isCallExpression(scope.parent)) return false;
  const name = callName(scope.parent, sourceFile);
  return name === 'useEffect' || name === 'useLayoutEffect';
}

function asyncGuardPresent(scopeText) {
  return /AbortController|\.abort\s*\(|\bsignal\b|isMounted|mountedRef|isCancelled|isCanceled|cancelled|canceled|disposed|activeRef/.test(
    scopeText,
  );
}

function classifyTimer(name, cleanupName, identity, scope, sourceFile) {
  const scopeText = scope.getText(sourceFile);
  const matchedCleanup = cleanupMatches(scopeText, cleanupName, identity);

  if (identity?.includes('.current') && !isReactEffectScope(scope, sourceFile)) {
    const lifecycleCleanup = lifecycleCleanupEvidence(sourceFile, cleanupName, identity);
    if (lifecycleCleanup) {
      return {
        cleanupStatus: 'present',
        cleanupEvidence: lifecycleCleanup,
        rationale: `${cleanupName} is present in a React lifecycle cleanup for the retained timer.`,
      };
    }

    return {
      cleanupStatus: 'requires-review',
      cleanupEvidence: matchedCleanup
        ? cleanupLine(sourceFile, scope, matchedCleanup)
        : null,
      rationale: `${name} is retained in a ref but no matching React lifecycle cleanup was found.`,
    };
  }

  if (matchedCleanup) {
    return {
      cleanupStatus: 'present',
      cleanupEvidence: cleanupLine(sourceFile, scope, matchedCleanup),
      rationale: `${matchedCleanup} is present in the same functional scope.`,
    };
  }

  if (name === 'setInterval') {
    return {
      cleanupStatus: 'missing',
      cleanupEvidence: null,
      rationale: 'A repeating interval has no matching clearInterval in the same functional scope.',
    };
  }

  if (isReactEffectScope(scope, sourceFile) && identity) {
    return {
      cleanupStatus: 'missing',
      cleanupEvidence: null,
      rationale: `${name} is retained by a React effect but has no matching ${cleanupName}.`,
    };
  }

  return {
    cleanupStatus: 'requires-review',
    cleanupEvidence: null,
    rationale: `${name} is one-shot or unretained; verify that it cannot outlive the owning component or story.`,
  };
}

function eventName(call, sourceFile) {
  const argument = call.arguments[0];
  if (!argument) return null;
  if (ts.isStringLiteral(argument) || ts.isNoSubstitutionTemplateLiteral(argument)) return argument.text;
  return argument.getText(sourceFile);
}

function matchingEventCleanup(scope, target, event, sourceFile) {
  let result = null;
  function visit(node) {
    if (result) return;
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
      const method = node.expression.name.text;
      const cleanupTarget = node.expression.expression.getText(sourceFile);
      if (
        method === 'removeEventListener' &&
        cleanupTarget === target &&
        eventName(node, sourceFile) === event
      ) {
        result = {
          ...lineInfo(sourceFile, node),
          evidence: compactEvidence(sourceFile, node),
        };
        return;
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(scope);
  return result;
}

function matchingMethodCleanup(scope, target, cleanupMethods, sourceFile) {
  let result = null;
  function visit(node) {
    if (result) return;
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
      const method = node.expression.name.text;
      const cleanupTarget = node.expression.expression.getText(sourceFile);
      if (cleanupMethods.includes(method) && (!target || cleanupTarget === target)) {
        result = {
          method,
          ...lineInfo(sourceFile, node),
          evidence: compactEvidence(sourceFile, node),
        };
        return;
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(scope);
  return result;
}

function containsAwaitBefore(scope, node) {
  let found = false;
  function visit(current) {
    if (found || current.getStart() >= node.getStart()) return;
    if (ts.isAwaitExpression(current)) {
      found = true;
      return;
    }
    ts.forEachChild(current, visit);
  }
  visit(scope);
  return found;
}

function isThenCallback(scope, sourceFile) {
  if (!ts.isFunctionLike(scope) || !ts.isCallExpression(scope.parent)) return false;
  return ['then', 'catch', 'finally'].includes(callName(scope.parent, sourceFile));
}

function isStateUpdateCall(call, sourceFile) {
  const name = callName(call, sourceFile) || '';
  return /^(?:set[A-Z]|dispatch$|forceUpdate$)/.test(name);
}

function makeFinding({
  category,
  cleanup,
  cleanupEvidence,
  cleanupStatus,
  component,
  evidence,
  file,
  line,
  column,
  packageName,
  packageDirectory,
  rationale,
  resource,
  severity,
  kind,
}) {
  return {
    id: '',
    category,
    resource,
    cleanup,
    cleanupStatus,
    severity,
    package: packageName,
    packageDirectory,
    component,
    sourceKind: kind,
    file,
    line,
    column,
    evidence,
    cleanupEvidence,
    rationale,
  };
}

function auditFile(filePath, metadata) {
  const text = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    filePath,
    text,
    ts.ScriptTarget.Latest,
    true,
    scriptKind(filePath),
  );
  const relativeFile = toPosix(path.relative(repoRoot, filePath));
  const component = componentName(filePath, metadata.directory);
  const kind = sourceKind(filePath);
  const findings = [];

  function common(node) {
    return {
      component,
      evidence: compactEvidence(sourceFile, node),
      file: relativeFile,
      ...lineInfo(sourceFile, node),
      packageName: metadata.name,
      packageDirectory: metadata.directory,
      kind,
    };
  }

  function visit(node) {
    if (ts.isCallExpression(node)) {
      const name = callName(node, sourceFile);
      const timer = timerDefinitions[name];
      if (timer && !(name === 'setTimeout' && callTarget(node, sourceFile) === 'jest')) {
        const scope = enclosingScope(node, sourceFile);
        const identity = expressionIdentity(node, sourceFile);
        const classification = classifyTimer(
          name,
          timer.cleanup,
          identity,
          scope,
          sourceFile,
        );
        findings.push(
          makeFinding({
            category: 'timer',
            resource: name,
            cleanup: timer.cleanup,
            severity: classification.cleanupStatus === 'missing' ? 'high' : timer.severity,
            ...classification,
            ...common(node),
          }),
        );
      }

      if (name === 'addEventListener' && ts.isPropertyAccessExpression(node.expression)) {
        const scope = enclosingScope(node, sourceFile);
        const target = callTarget(node, sourceFile);
        const event = eventName(node, sourceFile);
        const cleanupEvidence = matchingEventCleanup(scope, target, event, sourceFile);
        findings.push(
          makeFinding({
            category: 'event-listener',
            resource: event ? `${target}.${name}(${JSON.stringify(event)})` : `${target}.${name}`,
            cleanup: 'removeEventListener',
            cleanupStatus: cleanupEvidence ? 'present' : 'missing',
            cleanupEvidence,
            severity: cleanupEvidence ? 'low' : 'high',
            rationale: cleanupEvidence
              ? 'A matching removeEventListener for the same target and event is present in the same functional scope.'
              : 'No matching removeEventListener for the same target and event was found in the same functional scope.',
            ...common(node),
          }),
        );
      }

      if (
        ['subscribe', 'addListener', 'on'].includes(name) &&
        ts.isPropertyAccessExpression(node.expression)
      ) {
        const scope = enclosingScope(node, sourceFile);
        const target = callTarget(node, sourceFile);
        const cleanupMethods =
          name === 'subscribe'
            ? ['unsubscribe']
            : name === 'addListener'
              ? ['removeListener']
              : ['off', 'removeListener'];
        const cleanupEvidence = matchingMethodCleanup(scope, target, cleanupMethods, sourceFile);
        findings.push(
          makeFinding({
            category: 'subscription',
            resource: `${target}.${name}`,
            cleanup: cleanupMethods.join(' or '),
            cleanupStatus: cleanupEvidence ? 'present' : 'requires-review',
            cleanupEvidence,
            severity: cleanupEvidence ? 'low' : 'medium',
            rationale: cleanupEvidence
              ? `${cleanupEvidence.method} is present for the same target in the same functional scope.`
              : `${name} may represent a persistent subscription; verify its API and disposal contract.`,
            ...common(node),
          }),
        );
      }

      if (isStateUpdateCall(node, sourceFile)) {
        const scope = enclosingScope(node, sourceFile);
        if (containsAwaitBefore(scope, node) || isThenCallback(scope, sourceFile)) {
          const scopeText = scope.getText(sourceFile);
          const guarded = asyncGuardPresent(scopeText);
          findings.push(
            makeFinding({
              category: 'async-state',
              resource: callName(node, sourceFile),
              cleanup: 'AbortSignal or mounted/cancelled guard',
              cleanupStatus: guarded ? 'present' : 'requires-review',
              cleanupEvidence: guarded
                ? { ...lineInfo(sourceFile, scope), evidence: 'Async cancellation or mounted-state guard in scope.' }
                : null,
              severity: guarded ? 'low' : 'medium',
              rationale: guarded
                ? 'The async scope contains an AbortSignal or mounted/cancelled guard.'
                : 'State is updated after an await/Promise boundary; verify behavior when the owner unmounts.',
              ...common(node),
            }),
          );
        }
      }
    }

    if (ts.isNewExpression(node) && ts.isIdentifier(node.expression)) {
      const observerName = node.expression.text;
      const cleanupMethods = observerDefinitions[observerName];
      if (cleanupMethods) {
        const scope = enclosingScope(node, sourceFile);
        const identity = expressionIdentity(node, sourceFile);
        const scopeText = scope.getText(sourceFile);
        const cleanupName = cleanupMatches(scopeText, cleanupMethods, identity);
        const cleanupEvidence = cleanupLine(sourceFile, scope, cleanupName);
        findings.push(
          makeFinding({
            category: 'observer',
            resource: observerName,
            cleanup: cleanupMethods.join(' or '),
            cleanupStatus: cleanupName ? 'present' : 'missing',
            cleanupEvidence,
            severity: cleanupName ? 'low' : 'high',
            rationale: cleanupName
              ? `${cleanupName} is present in the same functional scope.`
              : `No ${cleanupMethods.join(' or ')} call was found in the same functional scope.`,
            ...common(node),
          }),
        );
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return findings;
}

function countBy(items, selector) {
  return items.reduce((result, item) => {
    const key = selector(item);
    result[key] = (result[key] || 0) + 1;
    return result;
  }, {});
}

function sortedObject(value) {
  return Object.fromEntries(Object.entries(value).sort(([left], [right]) => left.localeCompare(right)));
}

function completeCounts(items, selector, keys) {
  const counts = countBy(items, selector);
  return Object.fromEntries(keys.map(key => [key, counts[key] || 0]));
}

function main() {
  if (!fs.existsSync(packagesRoot)) {
    throw new Error(`Packages directory not found: ${packagesRoot}`);
  }

  const packageCache = new Map();
  const files = walk(packagesRoot).sort((left, right) => left.localeCompare(right));
  const findings = files
    .flatMap(filePath => auditFile(filePath, packageMetadata(filePath, packageCache)))
    .sort(
      (left, right) =>
        left.file.localeCompare(right.file) ||
        left.line - right.line ||
        left.category.localeCompare(right.category),
    );

  findings.forEach((finding, index) => {
    finding.id = `ACR-${String(index + 1).padStart(4, '0')}`;
  });

  const affectedPackages = new Set(findings.map(finding => finding.package));
  const inventory = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    sourceRoot: 'app/packages',
    methodology: {
      scope: 'JavaScript and TypeScript source files under app/packages; generated and dependency directories are excluded.',
      categories: {
        timer: 'setTimeout, setInterval, requestAnimationFrame and requestIdleCallback allocations.',
        subscription: 'subscribe, addListener and on calls that may create persistent subscriptions.',
        'event-listener': 'DOM/EventTarget addEventListener calls.',
        observer: 'IntersectionObserver, MutationObserver and ResizeObserver construction.',
        'async-state': 'React-style state setters or dispatch calls after await/Promise boundaries.',
      },
      cleanupStatuses: {
        present: 'A matching cleanup or cancellation guard was found in the same functional scope.',
        missing: 'A persistent resource has no matching cleanup in the same functional scope.',
        'requires-review': 'Static analysis cannot prove that cleanup is required or that the lifecycle is safe.',
      },
      limitations: [
        'This is a conservative static audit, not proof of a runtime leak.',
        'Cleanup delegated to helper functions, framework internals or returned abstractions may require manual confirmation.',
        'One-shot timers and Promise state updates are review items unless an explicit cancellation pattern is visible.',
      ],
    },
    summary: {
      filesScanned: files.length,
      packagesScanned: packageCache.size,
      packagesAffected: affectedPackages.size,
      findings: findings.length,
      byCleanupStatus: completeCounts(
        findings,
        finding => finding.cleanupStatus,
        ['present', 'missing', 'requires-review'],
      ),
      byCategory: sortedObject(countBy(findings, finding => finding.category)),
      bySourceKind: sortedObject(countBy(findings, finding => finding.sourceKind)),
      bySeverity: sortedObject(countBy(findings, finding => finding.severity)),
    },
    packages: [...affectedPackages]
      .sort((left, right) => left.localeCompare(right))
      .map(packageName => {
        const packageFindings = findings.filter(finding => finding.package === packageName);
        return {
          package: packageName,
          findings: packageFindings.length,
          byCleanupStatus: completeCounts(
            packageFindings,
            finding => finding.cleanupStatus,
            ['present', 'missing', 'requires-review'],
          ),
          byCategory: sortedObject(countBy(packageFindings, finding => finding.category)),
        };
      }),
    findings,
  };

  fs.writeFileSync(outputPath, `${JSON.stringify(inventory, null, 2)}\n`, 'utf8');

  console.log(`Async cleanup risk inventory written to ${path.relative(repoRoot, outputPath)}.`);
  console.log(`Scanned ${files.length} files across ${packageCache.size} packages.`);
  console.log(`Findings: ${findings.length}.`);
  console.log(`Cleanup status: ${JSON.stringify(inventory.summary.byCleanupStatus)}.`);
  console.log(`Categories: ${JSON.stringify(inventory.summary.byCategory)}.`);
}

main();
