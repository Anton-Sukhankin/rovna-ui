/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
/* eslint-enable @typescript-eslint/no-var-requires */

const createCssColors = content => `
  :root {
    ${content}
  }
`;

const [samolet, global] = [
  path.join(path.resolve(process.cwd()), 'src/samolet/_colors.json'),
  path.join(path.resolve(process.cwd()), 'src/global/_colors.json'),
]
  .map(path => fs.readFileSync(path, 'utf-8'))
  .map(JSON.parse)
  .map(Object.entries)
  .map(schema => schema.map(([name, color]) => `--tend-ui-${name}: ${color};`).join('\n'))
  .map(createCssColors);

fs.writeFileSync(
  path.join(path.resolve(process.cwd()), 'src/samolet/colors.css'),
  samolet,
);
fs.writeFileSync(path.join(path.resolve(process.cwd()), 'src/global/colors.css'), global);
