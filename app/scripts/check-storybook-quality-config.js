const fs = require('fs');
const path = require('path');

const appRoot = path.resolve(__dirname, '..');
const requiredInteractionFiles = [
  'packages/tend-ui-primitives/src/Button/Button.stories.tsx',
  'packages/tend-ui-primitives/src/Input/Input.stories.tsx',
  'packages/tend-ui/src/primitives/Select/Select.stories.tsx',
  'packages/tend-ui/src/primitives/Modal/Modal.stories.tsx',
  'packages/tend-ui-form/src/Form.stories.tsx',
  'packages/tend-ui-header/src/SamoletHeader/SamoletHeader.stories.tsx',
  'packages/tend-ui-table/src/Table/Table.stories.tsx',
  'packages/tend-ui-tree/src/Tree.stories.tsx',
  'packages/tend-ui-filters/src/Filters.stories.tsx',
  'packages/tend-ui-upload/src/UploadArea.stories.tsx',
];

const missingPlay = requiredInteractionFiles.filter(relativePath => {
  const source = fs.readFileSync(path.join(appRoot, relativePath), 'utf8');
  return !/^\s*play\s*:/m.test(source);
});

const configs = ['.storybook/main.ts', 'storybook-f06/main.ts'];
const missingA11y = configs.filter(relativePath => {
  const source = fs.readFileSync(path.join(appRoot, relativePath), 'utf8');
  return !source.includes("'@storybook/addon-a11y'");
});

const preview = fs.readFileSync(path.join(appRoot, '.storybook/preview.tsx'), 'utf8');
const a11yMode = preview.match(/a11y:\s*\{[\s\S]*?test:\s*'(todo|error)'/)?.[1] || null;
const hasA11yPolicy = a11yMode === 'error';
const passed = missingPlay.length === 0 && missingA11y.length === 0 && hasA11yPolicy;

console.log(
  JSON.stringify(
    {
      status: passed ? 'passed' : 'failed',
      requiredInteractionFiles: requiredInteractionFiles.length,
      missingPlay,
      a11yConfigs: configs.length,
      missingA11y,
      a11yMode,
      hasA11yPolicy,
    },
    null,
    2,
  ),
);

if (!passed) process.exitCode = 1;
