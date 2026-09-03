import fs from 'fs';

console.log('Копируем структуру папок...');
fs.cpSync('src', 'dist', {
  recursive: true,
  filter: source => {
    const isDir = fs.lstatSync(source).isDirectory();

    return isDir;
  },
});
console.log('Структура папок скопирована!');
