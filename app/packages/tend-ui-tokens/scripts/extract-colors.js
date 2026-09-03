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

const extractVariant = ([alias, variants]) => {
  return {
    alias,
    variants: Object.entries(variants).map(([k, v]) => ({
      shade: k.replace(/\D/g, ''),
      hex: v.value,
    })),
  };
};

console.log('Создаем основную цветовую палитру 10D...');
const [maincolors] = [path.join(path.resolve(process.cwd()), 'src/figma.json')]
  .map(path => fs.readFileSync(path, 'utf-8'))
  .map(JSON.parse)
  .map(v => v['colors primitives']['samolet'])
  .map(Object.entries)
  .map(entries => entries.filter(([k]) => k !== 'transparent'))
  .map(entries => entries.map(extractVariant))
  .map(entries =>
    entries.reduce((accumulator, color) => {
      const variants = color.variants.map(({ shade, hex }) => {
        return [`${color.alias}${shade}`, hex.toUpperCase()];
      });

      accumulator.push(...variants);

      return accumulator;
    }, []),
  )
  .map(pipe => pipe.sort(sortColors))
  .map(pipe => Object.fromEntries(pipe));
console.log('Создаем прозрачную цветовую палитру 10D...');
const [transparentcolors] = [path.join(path.resolve(process.cwd()), 'src/figma.json')]
  .map(path => fs.readFileSync(path, 'utf-8'))
  .map(JSON.parse)
  .map(v => v['colors primitives']['samolet']['transparent'])
  .map(Object.entries)
  .map(entries => entries.map(extractVariant))
  .map(entries =>
    entries.reduce((accumulator, color) => {
      const variants = color.variants.map(({ shade, hex }) => {
        return [`${color.alias}${shade}-transparent`, hex.toUpperCase()];
      });

      accumulator.push(...variants);

      return accumulator;
    }, []),
  )
  .map(entries => entries.sort(sortColors))
  .map(entries => Object.fromEntries(entries));
console.log('Обновляем палитру 10D...');
[path.join(path.resolve(process.cwd()), 'src/samolet/_colors.json')]
  .map(path => fs.readFileSync(path, 'utf-8'))
  .map(JSON.parse)
  .map(v => Object.assign(v, { ...maincolors, ...transparentcolors }))
  .map(Object.entries)
  .map(pipe => pipe.sort(sortColors))
  .map(Object.fromEntries)
  .map(JSON.stringify)
  .forEach(mergedColors => {
    fs.writeFileSync(
      path.join(path.resolve(process.cwd()), 'src/samolet/_colors.json'),
      mergedColors,
    );
  });

console.log('Создаем основную цветовую палитру Global...');
const [mainGlobalColors] = [path.join(path.resolve(process.cwd()), 'src/figma.json')]
  .map(path => fs.readFileSync(path, 'utf-8'))
  .map(JSON.parse)
  .map(v => v['colors primitives']['global'])
  .map(Object.entries)
  .map(entries => entries.filter(([k]) => k !== 'transparent'))
  .map(entries => entries.map(extractVariant))
  .map(entries =>
    entries.reduce((accumulator, color) => {
      const variants = color.variants.map(({ shade, hex }) => {
        return [`${color.alias}${shade}`, hex.toUpperCase()];
      });

      accumulator.push(...variants);

      return accumulator;
    }, []),
  )
  .map(pipe => pipe.sort(sortColors))
  .map(pipe => Object.fromEntries(pipe));
console.log('Создаем прозрачную цветовую палитру Global...');
const [transparentGlobalColors] = [
  path.join(path.resolve(process.cwd()), 'src/figma.json'),
]
  .map(path => fs.readFileSync(path, 'utf-8'))
  .map(JSON.parse)
  .map(v => v['colors primitives']['global']['transparent'])
  .map(Object.entries)
  .map(entries => entries.map(extractVariant))
  .map(entries =>
    entries.reduce((accumulator, color) => {
      const variants = color.variants.map(({ shade, hex }) => {
        return [`${color.alias}${shade}-transparent`, hex.toUpperCase()];
      });

      accumulator.push(...variants);

      return accumulator;
    }, []),
  )
  .map(entries => entries.sort(sortColors))
  .map(entries => Object.fromEntries(entries));
console.log('Обновляем палитру Global...');
[path.join(path.resolve(process.cwd()), 'src/global/_colors.json')]
  .map(path => fs.readFileSync(path, 'utf-8'))
  .map(JSON.parse)
  .map(v => Object.assign(v, { ...mainGlobalColors, ...transparentGlobalColors }))
  .map(Object.entries)
  .map(pipe => pipe.sort(sortColors))
  .map(Object.fromEntries)
  .map(JSON.stringify)
  .forEach(mergedColors => {
    fs.writeFileSync(
      path.join(path.resolve(process.cwd()), 'src/global/_colors.json'),
      mergedColors,
    );
  });
console.log('Палитра успешно обновлена!');
