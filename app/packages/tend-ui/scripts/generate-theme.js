/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
/* eslint-enable @typescript-eslint/no-var-requires */

const root = path.join(__dirname, '..');

const colorsJSONInputPath = path.resolve(root, 'src/tokens/json/colors.json');
const baseJSONInputPath = path.resolve(root, 'src/tokens/json/base.json');
const tokensJSONInputPath = path.resolve(root, 'src/tokens/json/tokens.json');

const schemaTSOutputPath = path.resolve(root, 'src/tokens/BaseSchema.ts');
const themeTSOutputPath = path.resolve(root, 'src/tokens/schemas/samolet.ts');
const themeJSONOutputPath = path.resolve(root, 'src/tokens/schemas/samolet.json');

const base = JSON.parse(fs.readFileSync(baseJSONInputPath, 'utf-8'));
const tokens = JSON.parse(fs.readFileSync(tokensJSONInputPath, 'utf-8'));
const colors = JSON.parse(fs.readFileSync(colorsJSONInputPath, 'utf-8'));

const types = [...Object.entries(base), ...Object.entries(tokens)]
  .map(([key, value]) => `${key}:${typeof value}`)
  .join(',\n');

const result = [...Object.entries(base), ...Object.entries(tokens)].reduce(
  (acc, [key, value]) => {
    const isColor = typeof value === 'string' && value.includes('colors.');
    const v = isColor ? colors[value.replace('colors.', '')] : value;
    acc[key] = v;

    return acc;
  },
  {},
);

const schema = `
/**
 * DO NOT EDIT MANUALLY
 */

export type BaseSchema = { ${types} };
`;
const theme = `
/**
 * DO NOT EDIT MANUALLY
 */

import { BaseSchema } from '@/tokens/BaseSchema';

export const samolet: BaseSchema = ${JSON.stringify(result, null, 2)};
`;

fs.writeFileSync(schemaTSOutputPath, schema);
fs.writeFileSync(themeTSOutputPath, theme);
fs.writeFileSync(themeJSONOutputPath, JSON.stringify(result, null, 2));
