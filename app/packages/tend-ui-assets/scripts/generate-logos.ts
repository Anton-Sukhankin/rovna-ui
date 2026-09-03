import path from 'path';
import fs from 'fs';
import { colors } from '@rovna-ui/tokens/samolet';

const root = path.resolve(__dirname, '..');
const generating: (keyof typeof colors)[] = ['blue600', 'gray400', 'gray0'];

console.log('Создаем логотипы...');
fs.readdirSync(path.resolve(root, 'src/logos'))
  .map(file => ({
    fileName: path.basename(file.toLowerCase(), '.svg'),
    filePath: path.resolve(root, `src/logos/${file}`),
  }))
  .forEach(value => {
    const fileName = value.fileName;
    const content = fs.readFileSync(value.filePath, 'utf-8');
    generating.forEach(color => {
      const writing = content.replace(/fill="([^"]*)"/g, `fill="${colors[color]}"`);
      fs.writeFileSync(
        path.resolve(root, `dist/logos/${fileName}-${color}.svg`),
        writing,
      );
    });
  });
console.log('Логотипы созданы!');
