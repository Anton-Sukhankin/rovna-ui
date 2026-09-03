/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
/* eslint-enable @typescript-eslint/no-var-requires */

function sortColors([colorA], [colorB]) {
  if (colorA.includes('transparent') && !colorB.includes('transparent')) return 1;
  if (!colorA.includes('transparent') && colorB.includes('transparent')) return -1;
  if (colorA.replace(/[0-9]/g, '') !== colorB.replace(/[0-9]/g, ''))
    return colorA.localeCompare(colorB);

  return (
    parseInt(colorA.match(/\d+/g).at(0), 10) - parseInt(colorB.match(/\d+/g).at(0), 10)
  );
}

console.log('Creating 10d colors...');
const [tendcolors] = [path.join(path.resolve(process.cwd()), 'dist/colors.json')]
  .map(path => fs.readFileSync(path, 'utf-8'))
  .map(JSON.parse)
  .map(v => v['colors primitives']['samolet'])
  .map(Object.entries)
  .map(pipe =>
    pipe.map(([alias, variants]) => ({
      alias,
      variants: Object.entries(variants).reduce((accumulator, [k, v]) => {
        if (k === 'transparent') {
          const transparentVariants = Object.entries(v).map(
            ([transparentName, transparentValue]) => [
              transparentName,
              transparentValue.value,
            ],
          );

          return [...accumulator, ...transparentVariants];
        }
        const name = k.replace(/\D/g, '');
        const value = v.value;

        accumulator.push([name, value]);

        return accumulator;
      }, []),
    })),
  )
  .map(pipe =>
    pipe.reduce((accumulator, color) => {
      const variants = color.variants.map(([variantAlias, variantValue]) => [
        `${color.alias}${variantAlias}`,
        variantValue.toUpperCase(),
      ]);

      accumulator.push(...variants);

      return accumulator;
    }, []),
  )
  .map(pipe => pipe.sort(sortColors))
  .map(pipe => Object.fromEntries(pipe));

console.log('Merging existing 10d colors...');
[path.join(path.resolve(process.cwd()), 'src/tokens/samolet/colors.json')]
  .map(path => fs.readFileSync(path, 'utf-8'))
  .map(JSON.parse)
  .map(v => Object.assign(v, tendcolors))
  .map(Object.entries)
  .map(pipe => pipe.sort(sortColors))
  .map(Object.fromEntries)
  .map(JSON.stringify)
  .forEach(mergedColors => {
    fs.writeFileSync(
      path.join(path.resolve(process.cwd()), 'src/tokens/samolet/colors.json'),
      mergedColors,
    );
  });

console.log('Done!');

console.log('Creating global colors...');
const [globalColors] = [path.join(path.resolve(process.cwd()), 'dist/colors.json')]
  .map(path => fs.readFileSync(path, 'utf-8'))
  .map(JSON.parse)
  .map(v => v['colors primitives']['global'])
  .map(Object.entries)
  .map(pipe =>
    pipe.map(([alias, variants]) => ({
      alias,
      variants: Object.entries(variants).reduce((accumulator, [k, v]) => {
        if (k === 'transparent') {
          const transparentVariants = Object.entries(v).map(
            ([transparentName, transparentValue]) => [
              transparentName,
              transparentValue.value,
            ],
          );

          return [...accumulator, ...transparentVariants];
        }
        const name = k.replace(/\D/g, '');
        const value = v.value;

        accumulator.push([name, value]);

        return accumulator;
      }, []),
    })),
  )
  .map(pipe =>
    pipe.reduce((accumulator, color) => {
      const variants = color.variants.map(([variantAlias, variantValue]) => [
        `${color.alias}${variantAlias}`,
        variantValue.toUpperCase(),
      ]);

      accumulator.push(...variants);

      return accumulator;
    }, []),
  )
  .map(pipe => pipe.sort(sortColors))
  .map(pipe => Object.fromEntries(pipe));

console.log('Merging existing global colors...');
[path.join(path.resolve(process.cwd()), 'src/tokens/global/colors.json')]
  .map(path => fs.readFileSync(path, 'utf-8'))
  .map(JSON.parse)
  .map(v => Object.assign(v, globalColors))
  .map(Object.entries)
  .map(pipe => pipe.sort(sortColors))
  .map(Object.fromEntries)
  .map(JSON.stringify)
  .forEach(mergedColors => {
    fs.writeFileSync(
      path.join(path.resolve(process.cwd()), 'src/tokens/global/colors.json'),
      mergedColors,
    );
  });
console.log('Done!');
