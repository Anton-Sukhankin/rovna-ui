/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const lodash = require('lodash');
/* eslint-enable @typescript-eslint/no-var-requires */

const rootDir = path.resolve(__dirname, '..');
const svgIconsInputPath = path.resolve(rootDir, 'src/svg');
const componentsOutputPath = path.resolve(rootDir, 'src');
const historyOutputPath = path.resolve(rootDir, 'src/history.json');

function fileNameToComponentName(fileName) {
  return fileName.replace(/\s/g, '-').replace(/-./g, match => match[1].toUpperCase());
}

function composeComponent(name, svg) {
  const kebabComponentName = lodash.kebabCase(name);

  return `
    import React from 'react';

    import { useColor } from '@rovna-ui/theme';
    import { Icon } from '@rovna-internal/icons/Icon';
    import { IconProps } from '@rovna-internal/icons/types';

    const ${name} = React.forwardRef<HTMLSpanElement, Omit<IconProps, 'children'>>(({ color, ...props}, ref) => {
      const _color = useColor(color);
      return <Icon data-testid="tend-ui-${kebabComponentName}-icon" {...props} ref={ref} color={_color}>${svg}</Icon>;
    });

    ${name}.displayName = '${name}';

    export { ${name} };
  `;
}

function composeIndex(name) {
  return `export { ${name} } from './${name}';\n`;
}

function readHistory() {
  try {
    if (fs.existsSync(historyOutputPath)) {
      const stream = fs.readFileSync(historyOutputPath, 'utf-8');
      const history = JSON.parse(stream);

      return history;
    }

    return {};
  } catch (error) {
    return {};
  }
}

const history = readHistory();
const svgFiles = fs
  .readdirSync(svgIconsInputPath)
  .filter(fileName => path.extname(fileName) === '.svg')
  .filter(fileName => {
    const name = path.parse(fileNameToComponentName(fileName)).name;

    return !Object.keys(history).includes(name);
  });

if (!svgFiles.length) {
  console.log('No new icons to generate :(');
  process.exit();
}

console.log(`Found new ${svgFiles.length} icons`);
console.log('Icons generation has started');

const components = svgFiles
  .map(svgFileName => {
    const componentName = path.basename(fileNameToComponentName(svgFileName), '.svg');
    const svgFilePath = path.resolve(svgIconsInputPath, svgFileName);

    return {
      svgFileName,
      svgFilePath,
      componentName,
      componentPath: path.resolve(
        componentsOutputPath,
        `${componentName}/${componentName}.tsx`,
      ),
      componentIndexPath: path.resolve(componentsOutputPath, `${componentName}/index.ts`),
      componentFolderPath: path.resolve(componentsOutputPath, componentName),
      componentCode: composeComponent(
        componentName,
        fs.readFileSync(svgFilePath, 'utf-8'),
      )
        .replace(/fill="([^"]*)"/g, 'fill="currentColor"')
        .replace(/width="([^"]*)"/, 'width="1em"')
        .replace(/height="([^"]*)"/, 'height="1em"'),
      componentIndexCode: composeIndex(componentName),
    };
  })
  .map(value => {
    if (!fs.existsSync(value.componentFolderPath)) {
      fs.mkdirSync(value.componentFolderPath);
    }

    return value;
  })
  .map(value => {
    fs.writeFileSync(value.componentPath, value.componentCode);
    fs.writeFileSync(value.componentIndexPath, value.componentIndexCode);
    fs.appendFileSync(`${componentsOutputPath}/index.ts`, value.componentIndexCode);

    return value;
  });

console.log('Saving history...');
const updatedHistory = components.reduce((acc, currentValue) => {
  acc[currentValue.componentName] = {
    svgFileName: currentValue.svgFileName,
    generationDate: new Date().toLocaleString('en-US', { timeZone: 'Europe/Moscow' }),
  };

  return acc;
}, history);
fs.writeFileSync(historyOutputPath, JSON.stringify(updatedHistory));

console.log('Icons generation succeed');
console.log(`Generated ${components.length} new icons`);
