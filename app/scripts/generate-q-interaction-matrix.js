const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');
const packagesRoot = path.join(appRoot, 'packages');
const storyIndexPath = path.join(appRoot, 'storybook-static', 'index.json');
const outputPath = path.join(repoRoot, 'docs', 'storybook-interaction-matrix.json');

const storyFilePattern = /\.stories\.(?:js|jsx|ts|tsx|mjs|cjs)$/i;
const ignoredDirectories = new Set(['coverage', 'dist', 'node_modules', 'storybook-static']);

const tier1Names = [
  'Button',
  'Input',
  'Select',
  'Modal',
  'Form',
  'Table',
  'Filters',
  'Tree',
  'UploadArea',
  'Header',
];

const tier2Names = [
  'Accordion',
  'Actions',
  'Alert',
  'AsyncCheckbox',
  'AsyncRadio',
  'AsyncSelect',
  'BurgerMenu',
  'Checkbox',
  'Chips',
  'Collapse',
  'ColumnsSettings',
  'Counter',
  'DatePicker',
  'Dialog',
  'Drawer',
  'Dropdown',
  'HotFilters',
  'Link',
  'List',
  'Menu',
  'Overflow',
  'Pagination',
  'Password',
  'Popover',
  'Profile',
  'Radio',
  'RangeInput',
  'Search',
  'Segmented',
  'StackNavigation',
  'Tabs',
  'Tag',
  'Toast',
  'Toggle',
  'ToggleButton',
  'Tooltip',
  'UploadButton',
];

const criticalNames = ['Filters', 'Form', 'Table', 'Tree', 'UploadArea'];
const highRiskNames = [
  'Button',
  'ColumnsSettings',
  'DatePicker',
  'Dialog',
  'Drawer',
  'Dropdown',
  'Header',
  'Input',
  'Modal',
  'Password',
  'Popover',
  'Select',
  'UploadButton',
];
const tier1Aliases = new Set(['samoletheader']);
const highRiskAliases = new Set(['drawercolumnssettings', 'samoletheader']);

const sourceSignalRules = [
  ['play', /\bplay\s*:\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>|\b[A-Za-z_$][\w$]*\.play\s*=/m],
  ['user-event', /\buserEvent\s*\./],
  ['test-assertion', /\b(?:expect|waitFor|within)\s*\(/],
  ['callback', /\bon[A-Z][A-Za-z0-9_$]*\s*:/],
  ['form', /<(?:Form|form)\b|\b(?:submit|validation|required|invalid)\b/i],
  ['overlay', /\b(?:modal|dialog|drawer|dropdown|popover|tooltip|portal)\b/i],
  ['drag-and-drop', /\b(?:drag|drop|dnd|sortable|droppable|draggable)\b/i],
  ['upload', /\b(?:upload|attachment|fileList|accept|multiple)\b/i],
  ['async', /\b(?:async|await|Promise|setTimeout|setInterval|debounce)\b/],
  ['keyboard', /\b(?:keyboard|keyDown|keyUp|hotkey)\b/i],
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function toPosix(value) {
  return value.split(path.sep).join('/');
}

function relativeToApp(filePath) {
  return `./${toPosix(path.relative(appRoot, filePath))}`;
}

function collectStoryFiles(directory) {
  const files = [];

  function visit(currentDirectory) {
    const entries = fs.readdirSync(currentDirectory, { withFileTypes: true })
      .sort((left, right) => left.name.localeCompare(right.name, 'en'));

    for (const entry of entries) {
      const entryPath = path.join(currentDirectory, entry.name);
      if (entry.isDirectory()) {
        if (!ignoredDirectories.has(entry.name)) visit(entryPath);
      } else if (entry.isFile() && storyFilePattern.test(entry.name)) {
        files.push(entryPath);
      }
    }
  }

  visit(directory);
  return files.sort((left, right) => relativeToApp(left).localeCompare(relativeToApp(right), 'en'));
}

function getPackageName(importPath) {
  const match = String(importPath || '').match(/^\.\/packages\/([^/]+)\//);
  return match ? match[1] : null;
}

function getComponentName(title) {
  const parts = String(title || '').split('/');
  return (parts[parts.length - 1] || title || 'Unknown').replace(/\s*\([^)]*\)\s*/g, '').trim();
}

function matchesComponent(componentName, candidates) {
  const normalized = componentName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return candidates.some(candidate => normalized === candidate.toLowerCase());
}

function classify(componentName, sourceSignals) {
  const normalized = componentName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const isTier1 =
    matchesComponent(componentName, tier1Names) || tier1Aliases.has(normalized);
  const isTier2 = matchesComponent(componentName, tier2Names);
  const hasInteractionSignal = sourceSignals.some(signal =>
    ['callback', 'form', 'overlay', 'drag-and-drop', 'upload', 'keyboard', 'user-event'].includes(signal),
  );

  const tier = isTier1 ? 'tier-1' : isTier2 || hasInteractionSignal ? 'tier-2' : 'tier-3';
  const interactive = tier !== 'tier-3';
  let risk = 'low';
  if (matchesComponent(componentName, criticalNames)) risk = 'critical';
  else if (
    matchesComponent(componentName, highRiskNames) ||
    highRiskAliases.has(normalized)
  )
    risk = 'high';
  else if (interactive) risk = 'medium';

  return { interactive, risk, tier };
}

function collectSourceSignals(sourceText) {
  return sourceSignalRules
    .filter(([, pattern]) => pattern.test(sourceText))
    .map(([name]) => name)
    .sort((left, right) => left.localeCompare(right, 'en'));
}

function findExportSegment(sourceText, exportName) {
  if (!exportName) return '';
  const escapedName = exportName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const declaration = new RegExp(`\\bexport\\s+(?:const|let|var|function|class)\\s+${escapedName}\\b`, 'm');
  const match = declaration.exec(sourceText);
  if (!match) return '';

  const remainder = sourceText.slice(match.index + match[0].length);
  const nextExport = /\bexport\s+(?:const|let|var|function|class)\s+[A-Za-z_$][\w$]*\b/m.exec(remainder);
  return sourceText.slice(match.index, nextExport ? match.index + match[0].length + nextExport.index : undefined);
}

function hasStaticPlay(sourceText, exportName) {
  if (!sourceText) return false;
  const escapedName = String(exportName || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const assignment = escapedName
    ? new RegExp(`\\b${escapedName}\\.play\\s*=`, 'm').test(sourceText)
    : false;
  return assignment || /\bplay\s*:\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>/m.test(
    findExportSegment(sourceText, exportName),
  );
}

function sortStrings(values) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right, 'en'));
}

function countBy(items, selector) {
  const counts = {};
  for (const item of items) {
    const key = selector(item);
    counts[key] = (counts[key] || 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort(([left], [right]) => left.localeCompare(right, 'en')));
}

function buildReport() {
  if (!fs.existsSync(storyIndexPath)) {
    throw new Error(`Storybook index is missing: ${storyIndexPath}`);
  }

  const sourceFiles = collectStoryFiles(packagesRoot);
  const sources = new Map(
    sourceFiles.map(filePath => {
      const importPath = relativeToApp(filePath);
      const sourceText = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
      return [
        importPath,
        {
          importPath,
          sourceSignals: collectSourceSignals(sourceText),
          sourceText,
        },
      ];
    }),
  );

  const index = readJson(storyIndexPath);
  const indexEntries = Object.values(index.entries || {});
  const storyEntries = indexEntries
    .filter(entry => entry.type === 'story')
    .sort((left, right) => left.id.localeCompare(right.id, 'en'));
  const indexedSourcePaths = new Set(storyEntries.map(entry => entry.importPath));

  const stories = storyEntries.map(entry => {
    const source = sources.get(entry.importPath);
    const sourceSignals = source ? source.sourceSignals : [];
    const component = getComponentName(entry.title);
    const classification = classify(component, sourceSignals);
    const indexTag = Array.isArray(entry.tags) && entry.tags.includes('play-fn');
    const sourceStatic = source ? hasStaticPlay(source.sourceText, entry.exportName) : false;

    return {
      id: entry.id,
      title: entry.title,
      name: entry.name,
      exportName: entry.exportName || null,
      package: getPackageName(entry.importPath),
      importPath: entry.importPath,
      componentPath: entry.componentPath || null,
      component,
      interactive: classification.interactive,
      tier: classification.tier,
      risk: classification.risk,
      hasPlay: indexTag || sourceStatic,
      playEvidence: {
        indexTag,
        sourceStatic,
      },
      interactionSignals: sourceSignals,
    };
  });

  const groupsByTitle = new Map();
  for (const story of stories) {
    if (!groupsByTitle.has(story.title)) groupsByTitle.set(story.title, []);
    groupsByTitle.get(story.title).push(story);
  }

  const storyGroups = [...groupsByTitle.entries()]
    .sort(([left], [right]) => left.localeCompare(right, 'en'))
    .map(([title, groupStories]) => {
      const first = groupStories[0];
      const playStoryIds = groupStories.filter(story => story.hasPlay).map(story => story.id);
      return {
        title,
        package: first.package,
        component: first.component,
        importPaths: sortStrings(groupStories.map(story => story.importPath)),
        componentPaths: sortStrings(groupStories.map(story => story.componentPath).filter(Boolean)),
        interactive: first.interactive,
        tier: first.tier,
        risk: first.risk,
        storyCount: groupStories.length,
        playCount: playStoryIds.length,
        playCoveragePercent: Number(((playStoryIds.length / groupStories.length) * 100).toFixed(2)),
        storyIds: groupStories.map(story => story.id),
        playStoryIds,
        interactionSignals: sortStrings(groupStories.flatMap(story => story.interactionSignals)),
      };
    });

  const interactiveComponents = storyGroups
    .filter(group => group.interactive)
    .map(group => ({
      title: group.title,
      package: group.package,
      component: group.component,
      tier: group.tier,
      risk: group.risk,
      storyCount: group.storyCount,
      playCount: group.playCount,
      playCoveragePercent: group.playCoveragePercent,
      interactionSignals: group.interactionSignals,
    }));

  const playFunctions = stories
    .filter(story => story.hasPlay)
    .map(story => ({
      storyId: story.id,
      title: story.title,
      name: story.name,
      exportName: story.exportName,
      importPath: story.importPath,
      evidence: story.playEvidence,
    }));

  const gaps = [];
  for (const story of stories) {
    if (!sources.has(story.importPath)) {
      gaps.push({
        type: 'indexed-story-source-missing',
        severity: 'critical',
        scope: 'story',
        storyId: story.id,
        title: story.title,
        importPath: story.importPath,
        reason: 'The Storybook index references a story source file that is absent from app/packages.',
      });
    }
    if (story.interactive && !story.hasPlay) {
      gaps.push({
        type: 'interactive-story-without-play',
        severity: story.tier === 'tier-1' ? 'high' : 'medium',
        scope: 'story',
        storyId: story.id,
        title: story.title,
        importPath: story.importPath,
        reason: 'The story is classified as interactive but has no play function in source or index metadata.',
      });
    }
    if (story.playEvidence.indexTag !== story.playEvidence.sourceStatic) {
      gaps.push({
        type: 'play-evidence-mismatch',
        severity: 'low',
        scope: 'story',
        storyId: story.id,
        title: story.title,
        importPath: story.importPath,
        reason: 'Storybook play-fn metadata and direct static source detection do not agree; inherited or composed play functions require review.',
      });
    }
  }

  for (const group of storyGroups) {
    if (group.interactive && group.playCount === 0) {
      gaps.push({
        type: 'interactive-group-without-play',
        severity: group.tier === 'tier-1' ? 'critical' : 'high',
        scope: 'group',
        title: group.title,
        importPaths: group.importPaths,
        reason: 'No story in this interactive component group has an automated play scenario.',
      });
    }
  }

  for (const source of sources.values()) {
    if (!indexedSourcePaths.has(source.importPath)) {
      gaps.push({
        type: 'story-source-not-in-index',
        severity: 'high',
        scope: 'source',
        importPath: source.importPath,
        reason: 'A local *.stories.* file has no story entry in the current static Storybook index.',
      });
    }
  }

  gaps.sort((left, right) => {
    const leftKey = `${left.type}|${left.title || ''}|${left.storyId || ''}|${left.importPath || ''}`;
    const rightKey = `${right.type}|${right.title || ''}|${right.storyId || ''}|${right.importPath || ''}`;
    return leftKey.localeCompare(rightKey, 'en');
  });

  const interactiveStories = stories.filter(story => story.interactive);
  const coveredInteractiveStories = interactiveStories.filter(story => story.hasPlay);

  return {
    schemaVersion: 1,
    purpose: 'Q-03 deterministic static story-to-interaction coverage matrix',
    sources: {
      storyGlob: 'app/packages/**/*.stories.*',
      storyIndex: 'app/storybook-static/index.json',
      sourceFileCount: sourceFiles.length,
      storyIndexVersion: index.v ?? null,
    },
    classification: {
      tier1: {
        requirement: 'Primary and negative automated user scenarios.',
        componentNames: tier1Names,
      },
      tier2: {
        requirement: 'At least one automated smoke interaction per interactive component group.',
        componentNames: tier2Names,
      },
      tier3: {
        requirement: 'Render-only is acceptable when the component is demonstrably passive.',
        rule: 'No Tier 1/Tier 2 name match and no static interaction signal.',
      },
      risk: {
        critical: criticalNames,
        high: highRiskNames,
        medium: 'Other interactive Tier 2 components.',
        low: 'Passive Tier 3 components.',
      },
      limitations: [
        'Static analysis proves the presence of play code, not that the scenario passes in a browser.',
        'Source signals are evaluated at story-file scope and may apply to only some exports in that file.',
        'Composed or inherited play functions can produce a low-severity source/index evidence mismatch.',
      ],
    },
    summary: {
      storyCount: stories.length,
      storyGroupCount: storyGroups.length,
      playFunctionCount: playFunctions.length,
      interactiveComponentCount: interactiveComponents.length,
      interactiveStoryCount: interactiveStories.length,
      interactiveStoryWithPlayCount: coveredInteractiveStories.length,
      interactivePlayCoveragePercent: interactiveStories.length
        ? Number(((coveredInteractiveStories.length / interactiveStories.length) * 100).toFixed(2))
        : 100,
      storyCountByTier: countBy(stories, story => story.tier),
      storyCountByRisk: countBy(stories, story => story.risk),
      gapCount: gaps.length,
      gapCountByType: countBy(gaps, gap => gap.type),
      gapCountBySeverity: countBy(gaps, gap => gap.severity),
    },
    storyGroups,
    playFunctions,
    interactiveComponents,
    stories,
    gaps,
  };
}

function main() {
  const report = buildReport();
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  console.log(`Q-03 interaction matrix: ${path.relative(repoRoot, outputPath)}`);
  console.log(`Stories: ${report.summary.storyCount}`);
  console.log(`Groups: ${report.summary.storyGroupCount}`);
  console.log(`Interactive stories: ${report.summary.interactiveStoryCount}`);
  console.log(`Play functions: ${report.summary.playFunctionCount}`);
  console.log(`Interactive play coverage: ${report.summary.interactivePlayCoveragePercent}%`);
  console.log(`Explicit gaps: ${report.summary.gapCount}`);
}

main();
