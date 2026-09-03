import path from 'path';
import fs from 'fs';

const root = path.resolve(__dirname, '..');

console.log('Копируем шрифты...');
fs.readdirSync(path.resolve(root, 'src/fonts'))
  .map(file => ({
    fileName: file,
    filePath: path.resolve(root, `src/fonts/${file}`),
  }))
  .forEach(value => {
    fs.copyFileSync(value.filePath, path.resolve(root, `dist/fonts/${value.fileName}`));
  });
console.log('Шрифты скопированы!');
