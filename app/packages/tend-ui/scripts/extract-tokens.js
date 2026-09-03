/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
/* eslint-enable @typescript-eslint/no-var-requires */

const root = path.join(__dirname, '..');
const tokensJSONInputPath = path.join(root, 'dist/tokens.json');
const tokensJSONOutputPath = path.join(root, 'src/tokens/tokens.json');

const tokens = JSON.parse(fs.readFileSync(tokensJSONInputPath, 'utf-8'));

function extractColor(resolvedValuesByMode) {
  const [color] = Object.values(resolvedValuesByMode)
    .at(0)
    .aliasName.replace(/\s/g, '')
    .split('|');

  return `colors.${color.toLowerCase().replace(/\//, '')}`;
}

function extractName(name) {
  return name.split('/').at(-1);
}

function toCamelCase(str) {
  return str
    .replace(/[-_]\w/g, match => match.charAt(1).toUpperCase())
    .replace(/\s/g, '');
}

const objectSourceCode = tokens.variables
  .map(v => [extractName(v.name), extractColor(v.resolvedValuesByMode)])
  .map(([name, color]) => [toCamelCase(name), color])
  .sort(([aName], [bName]) => aName.localeCompare(bName))
  .reduce((acc, [token, color]) => {
    acc[token] = color;

    return acc;
  }, {});

fs.writeFileSync(tokensJSONOutputPath, JSON.stringify(objectSourceCode, null, 2));

console.log('Tokens are extracted!');
