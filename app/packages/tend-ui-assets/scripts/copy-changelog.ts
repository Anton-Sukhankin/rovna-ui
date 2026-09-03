import path from 'path';
import fs from 'fs';

const root = path.resolve(__dirname, '..');

console.log('Копируем changelog...');
const content = fs.readFileSync(path.resolve(root, 'src/changelog.json'), 'utf-8');
fs.writeFileSync(path.resolve(root, `dist/changelog.json`), content);
console.log('Changelog скопирован!');
