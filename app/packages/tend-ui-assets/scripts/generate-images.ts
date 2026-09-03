import path from 'path';
import fs from 'fs';

const root = path.resolve(__dirname, '..');

console.log('Создаем изображения...');
fs.readdirSync(path.resolve(root, 'src/images'))
  .map(file => ({
    fileName: path.basename(file.toLowerCase(), '.svg'),
    filePath: path.resolve(root, `src/images/${file}`),
  }))
  .forEach(value => {
    const fileName = value.fileName;
    const content = fs.readFileSync(value.filePath, 'utf-8');
    fs.writeFileSync(path.resolve(root, `dist/images/${fileName}.svg`), content);
  });
console.log('Изображения созданы!');
