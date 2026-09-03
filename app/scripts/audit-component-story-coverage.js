const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const packagesRoot = path.join(appRoot, 'packages');
const scopePath = path.join(appRoot, 'ds-package-scope.json');
const storyIndexPath = path.join(appRoot, 'storybook-static', 'index.json');
const jsonOutputPath = path.join(repoRoot, 'docs', 'component-story-coverage.json');
const markdownOutputPath = path.join(repoRoot, 'docs', 'component-story-coverage.md');

const collectionPackages = new Set([
  '@rovna-ui/icons',
  '@rovna-ui/logos',
  '@rovna-ui/tokens',
  '@rovna-ui/types',
]);

const coverageOverrides = new Map(
  [
    ['@rovna-ui/locale', 'Language', 'provider-contract', [], 'Контекстный provider не создает самостоятельный UI; используется глобальным RovnaUI wrapper.'],
    ['@rovna-ui/api', 'ApiClient', 'provider-contract', [], 'Контекстный provider не создает самостоятельный UI; проверяется через RovnaUI consumer.'],
    ['@rovna-ui/theme', 'Theme', 'provider-contract', [], 'Контекстный theme provider проверяется через Storybook decorator и RovnaUI consumer.'],
    ['@rovna-ui/theme', 'RovnaUI', 'provider-contract', [], 'Корневой provider проверяется всем Storybook runtime и тремя consumer routes.'],
    ['@rovna-ui/components', 'RovnaUI', 'provider-contract', [], 'Compatibility provider проверяется всем Storybook runtime и тремя consumer routes.'],
    ['@rovna-ui/typography', 'INTERNAL_TypographyBase', 'composition-story', ['Rovna UI/Typography/Text', 'Rovna UI/Typography/Paragraph', 'Rovna UI/Typography/Title'], 'Внутренняя база покрывается публичными typography compositions.'],
    ['@rovna-ui/primitives', 'ButtonGroup', 'composition-story', ['Rovna UI/Primitives/Button'], 'ButtonGroup покрывается story Group публичного Button.'],
    ['@rovna-ui/primitives', 'UNSTABLE_InputNumber', 'alias-story', ['Rovna UI/Primitives/InputNumber'], 'Публичное нестабильное имя документируется каталогом InputNumber.'],
    ['@rovna-ui/components', 'FilterPicker', 'composition-story', ['Rovna UI/Main/Components/Filters'], 'FilterPicker требует Filters/Form context и покрывается публичной Filters composition.'],
    ['@rovna-ui/form', 'Field', 'composition-story', ['Rovna UI/Form/Form'], 'Field требует Form context и покрывается Form stories.'],
    ['@rovna-ui/filters', 'INTERNAL_FilterPicker', 'composition-story', ['Rovna UI/Filters/Filters'], 'Внутренний picker требует Filters context и покрывается Filters stories.'],
    ['@rovna-ui/notifications', 'Notifications', 'source-only-boundary', [], 'Experimental source-only приложение требует service mocks; автономные состояния относятся к R-02.'],
    ['@rovna-ui/search-assistant', 'SearchAssistant', 'source-only-boundary', [], 'Experimental source-only приложение требует service/store mocks; автономные состояния относятся к R-02.'],
  ].map(([packageName, component, coverage, storyTitles, reason]) => [
    `${packageName}::${component}`,
    { coverage, storyTitles, reason },
  ]),
);

const keyComponents = [
  {
    name: 'Button',
    title: 'Rovna UI/Primitives/Button',
    requiredStates: {
      default: /primary|default/i,
      loading: /loading/i,
      disabled: /disabled/i,
      interaction: /onClick|play\s*:|userEvent/i,
    },
  },
  {
    name: 'Input',
    title: 'Rovna UI/Primitives/Input',
    requiredStates: {
      default: /default|play/i,
      disabled: /disabled/i,
      validation: /error|invalid|status/i,
      interaction: /onChange|play\s*:|userEvent/i,
    },
  },
  {
    name: 'Select',
    title: 'Rovna UI/Main/Primitives/Select',
    requiredStates: {
      default: /large|medium|small|default/i,
      loading: /loading/i,
      multiple: /multiple/i,
      interaction: /onChange|play\s*:|userEvent/i,
    },
  },
  {
    name: 'Modal',
    title: 'Rovna UI/Main/Primitives/Modal',
    requiredStates: {
      default: /large|medium|small|default/i,
      open: /open|visible/i,
      close: /onClose|onCancel|close/i,
      scroll: /scroll/i,
    },
  },
  {
    name: 'Table',
    title: 'Rovna UI/Table/Table',
    requiredStates: {
      default: /default/i,
      customization: /custom/i,
      emptyOrLoading: /empty|loading/i,
      interaction: /onChange|onRow|onClick|play\s*:|userEvent/i,
    },
  },
  {
    name: 'DrawerColumnsSettings',
    title: 'Rovna UI/Columns Settings/DrawerColumnsSettings',
    requiredStates: {
      default: /default/i,
      controlled: /controlled/i,
      disabled: /disabled/i,
      persistence: /local storage|preset/i,
    },
  },
  {
    name: 'Filters',
    title: 'Rovna UI/Filters/Filters',
    requiredStates: {
      default: /default/i,
      loading: /loading/i,
      dependency: /depends|requires/i,
      apply: /apply/i,
    },
  },
  {
    name: 'Tree',
    title: 'Rovna UI/Tree/Tree',
    requiredStates: {
      default: /default/i,
      selection: /selectable|checkable/i,
      drag: /draggable|drag|drop/i,
      async: /children request/i,
    },
  },
  {
    name: 'UploadArea',
    title: 'Rovna UI/Upload/UploadArea',
    requiredStates: {
      default: /default/i,
      disabled: /disabled/i,
      multiple: /multiple/i,
      actions: /upload|remove|download|edit/i,
    },
  },
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function normalize(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();
}

function resolveModule(sourceFile, specifier) {
  if (!specifier.startsWith('.')) return null;
  const base = path.resolve(path.dirname(sourceFile), specifier);
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.js`,
    `${base}.jsx`,
    path.join(base, 'index.ts'),
    path.join(base, 'index.tsx'),
    path.join(base, 'index.js'),
  ];
  return candidates.find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile()) || null;
}

function collectExports(entryFile, cache = new Map(), stack = new Set()) {
  const absolute = path.resolve(entryFile);
  if (cache.has(absolute)) return cache.get(absolute);
  if (stack.has(absolute) || !fs.existsSync(absolute)) return new Map();
  stack.add(absolute);

  const sourceText = fs.readFileSync(absolute, 'utf8');
  const source = ts.createSourceFile(
    absolute,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    absolute.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const exports = new Map();
  const hasExportModifier = node =>
    node.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword);

  for (const statement of source.statements) {
    if (ts.isExportDeclaration(statement)) {
      const specifier = statement.moduleSpecifier && ts.isStringLiteral(statement.moduleSpecifier)
        ? statement.moduleSpecifier.text
        : null;
      const targetFile = specifier ? resolveModule(absolute, specifier) : null;
      const targetExports = targetFile ? collectExports(targetFile, cache, stack) : new Map();

      if (!statement.exportClause) {
        for (const [name, metadata] of targetExports) exports.set(name, metadata);
      } else if (ts.isNamedExports(statement.exportClause)) {
        for (const element of statement.exportClause.elements) {
          const sourceName = element.propertyName?.text || element.name.text;
          const exportedName = element.name.text;
          exports.set(
            exportedName,
            targetExports.get(sourceName) || {
              name: exportedName,
              kind: 're-export',
              sourceFile: targetFile || absolute,
            },
          );
        }
      } else if (ts.isNamespaceExport(statement.exportClause)) {
        exports.set(statement.exportClause.name.text, {
          name: statement.exportClause.name.text,
          kind: 'namespace',
          sourceFile: targetFile || absolute,
        });
      }
      continue;
    }

    if (!hasExportModifier(statement)) continue;
    if (
      ts.isFunctionDeclaration(statement) ||
      ts.isClassDeclaration(statement) ||
      ts.isInterfaceDeclaration(statement) ||
      ts.isTypeAliasDeclaration(statement) ||
      ts.isEnumDeclaration(statement)
    ) {
      if (statement.name) {
        exports.set(statement.name.text, {
          name: statement.name.text,
          kind: ts.SyntaxKind[statement.kind],
          sourceFile: absolute,
        });
      }
    } else if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name)) {
          exports.set(declaration.name.text, {
            name: declaration.name.text,
            kind: 'VariableDeclaration',
            sourceFile: absolute,
          });
        }
      }
    }
  }

  stack.delete(absolute);
  cache.set(absolute, exports);
  return exports;
}

function sourceEntrypoints(packageRoot, manifest) {
  const targets = new Set();
  const rootEntry = path.join(packageRoot, 'src', 'index.ts');
  if (fs.existsSync(rootEntry)) targets.add(rootEntry);

  for (const target of Object.values(manifest.exports || {})) {
    if (typeof target !== 'string' || target.includes('*')) continue;
    const resolved = path.resolve(packageRoot, target);
    if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) targets.add(resolved);
    else if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
      const indexFile = resolveModule(path.join(packageRoot, 'placeholder.ts'), target);
      if (indexFile) targets.add(indexFile);
    }
  }
  return [...targets];
}

function isTypeOnlyExport(metadata) {
  if (/InterfaceDeclaration|TypeAliasDeclaration/.test(metadata.kind)) return true;
  if (!fs.existsSync(metadata.sourceFile)) return false;
  const sourceText = fs.readFileSync(metadata.sourceFile, 'utf8');
  const name = metadata.name;
  return [
    new RegExp(`\\b(?:type|interface)\\s+${name}\\b`),
    new RegExp(`export\\s+type\\s*\\{[^}]*\\b${name}\\b[^}]*\\}`, 's'),
  ].some(pattern => pattern.test(sourceText));
}

function isVisualExport(metadata) {
  const name = metadata.name;
  if (!/^[A-Z]/.test(name)) return false;
  if (isTypeOnlyExport(metadata)) return false;
  if (/^(?:I[A-Z]|.*(?:Props|Options|Config|Context|State|Value|Values|Params|Parameters|Result|Map|Type|Types|Variant|Variants|Status|Size|Sizes|Ref))$/.test(name)) {
    return false;
  }
  const normalizedPath = metadata.sourceFile.replace(/\\/g, '/');
  return (
    normalizedPath.endsWith('.tsx') ||
    /\/(?:components|primitives|grid|typography|icons|logos|Header|Form|Upload)/i.test(normalizedPath)
  );
}

function buildStoryGroups(indexEntries) {
  const groups = new Map();
  for (const entry of indexEntries.filter(item => item.type === 'story')) {
    if (!groups.has(entry.title)) {
      groups.set(entry.title, {
        title: entry.title,
        storyNames: [],
        storyIds: [],
        sourceFiles: new Set(),
      });
    }
    const group = groups.get(entry.title);
    group.storyNames.push(entry.name);
    group.storyIds.push(entry.id);
    group.sourceFiles.add(entry.importPath.replace(/^\.\//, ''));
  }
  return groups;
}

function sourceEvidence(group) {
  return [...group.sourceFiles]
    .map(relative => path.join(appRoot, relative))
    .filter(fs.existsSync)
    .map(filePath => fs.readFileSync(filePath, 'utf8'))
    .join('\n');
}

function packageDirectoryFromGroup(group) {
  const source = [...group.sourceFiles][0] || '';
  return source.match(/^packages\/([^/]+)\//)?.[1] || null;
}

function main() {
  if (!fs.existsSync(storyIndexPath)) {
    throw new Error(`Storybook index is missing: ${storyIndexPath}. Run G-05 first.`);
  }

  const scope = readJson(scopePath);
  const storyIndex = readJson(storyIndexPath);
  const indexEntries = Object.values(storyIndex.entries || {});
  const storyGroups = buildStoryGroups(indexEntries);
  const docsByTitle = new Map();
  for (const entry of indexEntries.filter(item => item.type === 'docs')) {
    docsByTitle.set(entry.title, (docsByTitle.get(entry.title) || 0) + 1);
  }

  const packageRows = [];
  const componentRows = [];
  const reviewedTypeOnlyExports = [];
  const publicNamesByDirectory = new Map();

  for (const scopeEntry of scope.packages) {
    const packageRoot = path.join(packagesRoot, scopeEntry.directory);
    const manifest = readJson(path.join(packageRoot, 'package.json'));
    const exportCache = new Map();
    const publicExports = new Map();
    for (const entrypoint of sourceEntrypoints(packageRoot, manifest)) {
      for (const [name, metadata] of collectExports(entrypoint, exportCache)) {
        publicExports.set(name, metadata);
      }
    }
    publicNamesByDirectory.set(scopeEntry.directory, publicExports);

    const packageGroups = [...storyGroups.values()].filter(
      group => packageDirectoryFromGroup(group) === scopeEntry.directory,
    );
    const visualExports = [...publicExports.values()].filter(isVisualExport);
    for (const metadata of publicExports.values()) {
      if (!isTypeOnlyExport(metadata)) continue;
      reviewedTypeOnlyExports.push({
        package: scopeEntry.name,
        export: metadata.name,
        sourceFile: path.relative(repoRoot, metadata.sourceFile).replace(/\\/g, '/'),
        resolution: 'non-visual-type-export',
      });
    }

    for (const metadata of visualExports) {
      const override = coverageOverrides.get(`${scopeEntry.name}::${metadata.name}`);
      const normalizedName = normalize(metadata.name);
      const directMatches = packageGroups.filter(group => {
        const leaf = group.title.split('/').pop();
        return normalize(leaf) === normalizedName || normalize(group.title).endsWith(normalizedName);
      });
      const crossPackageMatches = [...storyGroups.values()].filter(group => {
        const leaf = group.title.split('/').pop();
        return normalize(leaf) === normalizedName || normalize(group.title).endsWith(normalizedName);
      });
      const collectionReExport =
        scopeEntry.name === '@rovna-ui/components' &&
        /\/src\/(?:icons|logos)\//i.test(metadata.sourceFile.replace(/\\/g, '/'));
      const overrideMatches = (override?.storyTitles || [])
        .map(title => storyGroups.get(title))
        .filter(Boolean);
      const matches = directMatches.length
        ? directMatches
        : crossPackageMatches.length
          ? crossPackageMatches
          : overrideMatches;
      const coverage = directMatches.length
        ? 'direct-story'
        : crossPackageMatches.length
          ? 'cross-package-story'
          : override
            ? override.coverage
          : collectionPackages.has(scopeEntry.name) || collectionReExport
            ? 'package-collection'
            : 'documented-gap';
      componentRows.push({
        package: scopeEntry.name,
        classification: scopeEntry.classification,
        component: metadata.name,
        sourceFile: path.relative(repoRoot, metadata.sourceFile).replace(/\\/g, '/'),
        declarationKind: metadata.kind,
        coverage,
        storyTitles: matches.map(group => group.title),
        storyCount: matches.reduce((total, group) => total + group.storyIds.length, 0),
        docsCount: matches.reduce((total, group) => total + (docsByTitle.get(group.title) || 0), 0),
        evidence: override?.reason || null,
        exception:
          override
            ? override.reason
            : coverage === 'package-collection'
            ? 'Covered by a package-level catalog rather than one story per exported item.'
            : coverage === 'cross-package-story'
              ? 'This compatibility re-export is covered by the originating package story.'
              : coverage === 'documented-gap'
                ? 'Public visual export has no directly matching Storybook title; review in G-09 or future coverage work.'
                : null,
      });
    }

    packageRows.push({
      package: scopeEntry.name,
      classification: scopeEntry.classification,
      publicExports: publicExports.size,
      visualExports: visualExports.length,
      storyGroups: packageGroups.length,
      stories: packageGroups.reduce((total, group) => total + group.storyIds.length, 0),
      docs: packageGroups.reduce((total, group) => total + (docsByTitle.get(group.title) || 0), 0),
    });
  }

  const storyGroupRows = [...storyGroups.values()].map(group => {
    const directory = packageDirectoryFromGroup(group);
    const scopeEntry = scope.packages.find(entry => entry.directory === directory);
    const componentName = group.title.split('/').pop();
    const publicExports = publicNamesByDirectory.get(directory) || new Map();
    const publicMatch = [...publicExports.keys()].find(name => normalize(name) === normalize(componentName));
    return {
      title: group.title,
      package: scopeEntry?.name || directory,
      classification: scopeEntry?.classification || 'unclassified',
      component: componentName,
      publicExport: publicMatch || null,
      publicContract:
        scopeEntry?.classification === 'core' || scopeEntry?.classification === 'extended'
          ? publicMatch
            ? 'direct-export'
            : 'package-root-or-docs-only'
          : 'source-only',
      stories: group.storyIds.length,
      docs: docsByTitle.get(group.title) || 0,
      storyIds: group.storyIds,
      sourceFiles: [...group.sourceFiles],
    };
  });

  const keyStateRows = keyComponents.map(target => {
    const group = storyGroups.get(target.title);
    const evidence = group ? `${group.storyNames.join('\n')}\n${sourceEvidence(group)}` : '';
    const states = Object.fromEntries(
      Object.entries(target.requiredStates).map(([state, pattern]) => [state, pattern.test(evidence)]),
    );
    return {
      name: target.name,
      title: target.title,
      storyCount: group?.storyIds.length || 0,
      storyIds: group?.storyIds || [],
      requiredStates: states,
      missingStates: Object.entries(states).filter(([, covered]) => !covered).map(([state]) => state),
    };
  });

  const coverageCounts = componentRows.reduce((counts, row) => {
    counts[row.coverage] = (counts[row.coverage] || 0) + 1;
    return counts;
  }, {});
  const unclassifiedStoryGroups = storyGroupRows.filter(row => row.classification === 'unclassified');
  const documentedGapCount = componentRows.filter(row => row.coverage === 'documented-gap').length;
  const report = {
    formatVersion: 1,
    status: unclassifiedStoryGroups.length
      ? 'failed'
      : documentedGapCount
        ? 'passed-with-documented-gaps'
        : 'passed',
    generatedAt: new Date().toISOString(),
    source: {
      scope: path.relative(repoRoot, scopePath).replace(/\\/g, '/'),
      storybookIndex: path.relative(repoRoot, storyIndexPath).replace(/\\/g, '/'),
    },
    summary: {
      packages: packageRows.length,
      storyEntries: indexEntries.filter(entry => entry.type === 'story').length,
      docsEntries: indexEntries.filter(entry => entry.type === 'docs').length,
      storyGroups: storyGroupRows.length,
      publicVisualExports: componentRows.length,
      reviewedTypeOnlyExports: reviewedTypeOnlyExports.length,
      coverage: coverageCounts,
      keyComponents: keyStateRows.length,
      keyComponentsWithMissingStates: keyStateRows.filter(row => row.missingStates.length).length,
      unclassifiedStoryGroups: unclassifiedStoryGroups.length,
    },
    packages: packageRows,
    publicComponents: componentRows,
    reviewedTypeOnlyExports,
    storyGroups: storyGroupRows,
    keyComponents: keyStateRows,
  };

  fs.writeFileSync(jsonOutputPath, `${JSON.stringify(report, null, 2)}\n`);

  const packageTable = packageRows
    .map(row => `| \`${row.package}\` | ${row.classification} | ${row.publicExports} | ${row.visualExports} | ${row.storyGroups} | ${row.stories} | ${row.docs} |`)
    .join('\n');
  const keyTable = keyStateRows
    .map(row => {
      const covered = Object.entries(row.requiredStates).filter(([, value]) => value).map(([name]) => name).join(', ') || '-';
      const missing = row.missingStates.join(', ') || '-';
      return `| ${row.name} | ${row.storyCount} | ${covered} | ${missing} |`;
    })
    .join('\n');
  const gapTable = packageRows
    .map(row => {
      const gaps = componentRows.filter(component => component.package === row.package && component.coverage === 'documented-gap').length;
      const collection = componentRows.filter(component => component.package === row.package && component.coverage === 'package-collection').length;
      return { ...row, gaps, collection };
    })
    .filter(row => row.gaps || row.collection)
    .map(row => `| \`${row.package}\` | ${row.collection} | ${row.gaps} |`)
    .join('\n');

  const markdown = `# Component-to-Story Coverage\n\nUpdated: 2026-07-29.\n\n## Status\n\n- Audit: \`${report.status}\`.\n- Packages classified: \`${report.summary.packages}\`.\n- Story entries: \`${report.summary.storyEntries}\`.\n- Docs entries: \`${report.summary.docsEntries}\`.\n- Story groups: \`${report.summary.storyGroups}\`.\n- Public visual exports discovered through TypeScript AST: \`${report.summary.publicVisualExports}\`.\n- Unclassified Storybook groups: \`${report.summary.unclassifiedStoryGroups}\`.\n\nThe full per-component and per-story matrix is stored in [component-story-coverage.json](component-story-coverage.json).\n\n## Coverage Rules\n\n- \`direct-story\`: a public visual export has a matching Storybook title.\n- \`package-collection\`: icons, logos, tokens or type collections are intentionally covered by package-level catalogs.\n- \`documented-gap\`: the public visual export has no directly matching title and remains an explicit review item.\n- \`source-only\`: Storybook documents an experimental package that is outside the supported artifact contract.\n\n## Package Summary\n\n| Package | Classification | Public exports | Visual exports | Story groups | Stories | Docs |\n| --- | --- | ---: | ---: | ---: | ---: | ---: |\n${packageTable}\n\n## Key Component States\n\n| Component | Stories | Covered state evidence | Missing state evidence |\n| --- | ---: | --- | --- |\n${keyTable}\n\nMissing state evidence is not silently treated as implemented. It becomes an explicit G-09 runtime check or a future story requirement.\n\n## Documented Exceptions\n\n| Package | Collection-covered exports | Direct-story gaps |\n| --- | ---: | ---: |\n${gapTable || '| - | 0 | 0 |'}\n\nEvery public visual export is present in the JSON matrix with either direct coverage or an explicit exception.\n\n## Command\n\nFrom \`app/\`:\n\n\`\`\`powershell\nnode scripts/audit-component-story-coverage.js\n\`\`\`\n\n## Next Runtime Check\n\nG-09 uses the key-component rows and concrete story IDs from the JSON matrix for browser verification.\n`;
  const completeMarkdown = markdown
    .replace('Updated: 2026-07-29.', `Updated: ${new Date().toISOString().slice(0, 10)}.`)
    .replace(
      '- Unclassified Storybook groups:',
      `- Reviewed type-only exports: \`${report.summary.reviewedTypeOnlyExports}\`.\n- Unclassified Storybook groups:`,
    )
    .replace(
      '- `package-collection`:',
      '- `cross-package-story`: a compatibility re-export is linked to the originating package story.\n- `provider-contract`: a non-visual provider is verified by the shared Storybook/consumer wrapper.\n- `composition-story`: an internal or contextual export is exercised by its public composition story.\n- `alias-story`: a compatibility or unstable export is covered under its catalog name.\n- `source-only-boundary`: an experimental application is outside the supported release and moves to the mock backlog.\n- `package-collection`:',
    )
    .replace(
      'G-09 uses the key-component rows and concrete story IDs from the JSON matrix for browser verification.',
      'R-01 binds every public visual export to a direct story or an evidence-backed boundary. R-02 continues the source-only service/mock cases.',
    );
  fs.writeFileSync(markdownOutputPath, completeMarkdown);

  console.log(`G-08 component coverage audit: ${report.status}`);
  console.log(`Story groups: ${report.summary.storyGroups}; public visual exports: ${report.summary.publicVisualExports}`);
  console.log(`Coverage: ${JSON.stringify(report.summary.coverage)}`);
  console.log(`Key components with missing state evidence: ${report.summary.keyComponentsWithMissingStates}`);
  console.log(`Report: ${jsonOutputPath}`);
  process.exitCode = report.status === 'failed' ? 1 : 0;
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
