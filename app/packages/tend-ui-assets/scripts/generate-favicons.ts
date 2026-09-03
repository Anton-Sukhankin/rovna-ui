import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const root = path.resolve(__dirname, '..');
const faviconsDir = path.resolve(root, 'src/favicons');
const distDir = path.resolve(root, 'dist/favicons');

// Создаем папку dist если её нет
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Размеры favicon для генерации (стандартные размеры для максимальной совместимости)
const sizes = [16, 32, 48]; // PNG размеры

console.log('Генерируем favicons...');

// Читаем все SVG файлы из папки favicons
const svgFiles = fs
  .readdirSync(faviconsDir)
  .filter(file => file.endsWith('.svg'))
  .map(file => ({
    name: path.basename(file, '.svg'),
    path: path.resolve(faviconsDir, file),
  }));

const generateFavicon = async ({ name, path: filePath }: (typeof svgFiles)[number]) => {
  console.log(`Обрабатываем ${name}...`);

  // Копируем SVG favicon
  try {
    const svgPath = path.resolve(distDir, `${name}.svg`);
    fs.copyFileSync(filePath, svgPath);
    console.log(`  Создан ${name}.svg`);
  } catch (err) {
    console.error(`  Ошибка при создании ${name}.svg:`, err);
  }

  // Генерируем PNG для каждого размера
  const pngPromises = sizes.map(size => {
    const outputPath = path.resolve(distDir, `${name}-${size}.png`);

    return sharp(filePath)
      .resize(size, size)
      .png()
      .toFile(outputPath)
      .then(() => {
        console.log(`  Создан ${name}-${size}.png`);

        return outputPath;
      })
      .catch(err => {
        console.error(`  Ошибка при создании ${name}-${size}.png:`, err);

        return null;
      });
  });

  // Ждем создания всех PNG файлов
  const pngFiles = await Promise.all(pngPromises);
  const validPngFiles = pngFiles.filter(Boolean);

  // Создаем ICO файл из PNG (используем 16x16 и 32x32)
  try {
    const icoPngFiles = validPngFiles.filter(
      file => file && (file.includes('-16.png') || file.includes('-32.png')),
    );

    if (icoPngFiles.length > 0) {
      const icoBuffer = await pngToIco(icoPngFiles);
      const icoPath = path.resolve(distDir, `${name}.ico`);
      fs.writeFileSync(icoPath, icoBuffer);
      console.log(`  Создан ${name}.ico`);
    }
  } catch (err) {
    console.error(`  Ошибка при создании ${name}.ico:`, err);
  }

  // Создаем Apple Touch Icon (180x180)
  try {
    const appleTouchPath = path.resolve(distDir, `${name}-apple-touch.png`);
    await sharp(filePath).resize(180, 180).png().toFile(appleTouchPath);
    console.log(`  Создан ${name}-apple-touch.png`);
  } catch (err) {
    console.error(`  Ошибка при создании ${name}-apple-touch.png:`, err);
  }
};

const main = async () => {
  await Promise.all(svgFiles.map(generateFavicon));
  console.log('Favicons сгенерированы!');
};

main().catch(error => {
  console.error('Не удалось сгенерировать favicons:', error);
  process.exitCode = 1;
});
