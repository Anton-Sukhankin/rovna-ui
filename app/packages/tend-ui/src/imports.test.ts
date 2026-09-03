import fs from 'fs';
import path from 'path';

import * as icons from '@rovna-internal/components/icons';
import * as primitives from '@rovna-internal/components/primitives';
import * as components from '@rovna-internal/components/components';
import * as typography from '@rovna-internal/components/typography';
import * as widgets from '@rovna-internal/components/widgets';
import * as grid from '@rovna-internal/components/grid';

function collectComponents(entry: string) {
  const dirs = fs.readdirSync(entry);
  const paths = dirs.reduce<string[]>((acc, dir) => {
    const subPath = `${entry}/${dir}`;
    const isDir = fs.lstatSync(subPath).isDirectory();
    if (isDir) {
      acc.push(dir);
    }

    return acc;
  }, []);

  return paths.flat();
}

const exportedPrimitives = Object.keys(primitives);
const existingPrimitives = collectComponents(path.join(__dirname, 'primitives'));
describe.each(existingPrimitives)('%s primitive', componentName => {
  it('is exported through public API correctly', () => {
    expect(exportedPrimitives).toContain(componentName);
  });
});

const exportedComponents = Object.keys(components);
const existingComponents = collectComponents(path.join(__dirname, 'components'));
describe.each(existingComponents)('%s component', componentName => {
  it('is exported through public API correctly', () => {
    expect(exportedComponents).toContain(componentName);
  });
});

const exportedWidgets = Object.keys(widgets);
const existingWidgets = collectComponents(path.join(__dirname, 'widgets'));
describe.each(existingWidgets)('%s component', componentName => {
  it('is exported through public API correctly', () => {
    expect(exportedWidgets).toContain(componentName);
  });
});

const exportedGrid = Object.keys(grid);
const existingGrid = collectComponents(path.join(__dirname, 'grid'));
describe.each(existingGrid)('%s component', componentName => {
  it('is exported through public API correctly', () => {
    expect(exportedGrid).toContain(componentName);
  });
});

const exportedTypography = Object.keys(typography);
const existingTypography = collectComponents(path.join(__dirname, 'typography'));
describe.each(existingTypography)('%s component', componentName => {
  it('is exported through public API correctly', () => {
    expect(exportedTypography).toContain(componentName);
  });
});

const blacklist = ['__snapshots__', 'svg'];
const exportedIcons = Object.keys(icons);
const existingIcons = collectComponents(path.join(__dirname, 'icons')).filter(
  name => !blacklist.includes(name),
);
describe.each(existingIcons)('%s icon', componentName => {
  it('is exported through public API correctly', () => {
    expect(exportedIcons).toContain(componentName);
  });
});
