/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
/* eslint-enable @typescript-eslint/no-var-requires */

/**
 * Плагин валидирует файлв в конечных assets (папку dist)
 * на наличие директивных импортов
 */
module.exports = () => {
  const collectFiles = entry => {
    const dirs = fs.readdirSync(entry);
    const paths = dirs.map(dir => {
      const subPath = `${entry}/${dir}`;
      const isDir = fs.lstatSync(subPath).isDirectory();
      if (isDir) {
        return collectFiles(subPath);
      }

      return subPath;
    });

    return paths.flat();
  };

  return {
    name: 'validate',
    buildEnd: {
      sequential: true,
      handler: async () => {
        console.log('[INFO] Начинаем анализ сборки...');
        const folder = path.join(process.cwd(), 'dist');
        const result = collectFiles(folder)
          .filter(name => !name.match(/\.d\.|\.map/g))
          .filter(name => {
            const content = fs.readFileSync(name, 'utf-8');

            return !!content.match(/import '.*'/g);
          });

        if (result.length === 0) {
          console.log('[INFO] Сборка корректна!');

          return Promise.resolve();
        }

        const message = [
          '[ERROR] Проверьте следующие файлы на корректность:',
          '\n',
          ...result,
          '\n',
        ].join('\n');

        return Promise.reject(new Error(message));
      },
    },
  };
};
