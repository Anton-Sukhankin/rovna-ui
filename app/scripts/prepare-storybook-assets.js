const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pngToIco = require('png-to-ico');

const appRoot = path.resolve(__dirname, '..');
const sourceRoot = path.join(appRoot, 'packages', 'tend-ui-assets', 'src', 'favicons');
const outputRoot = path.join(appRoot, 'packages', 'tend-ui-assets', 'dist', 'favicons');
async function main() {
  const names = fs
    .readdirSync(sourceRoot)
    .filter(file => file.endsWith('.svg'))
    .map(file => path.basename(file, '.svg'));
  fs.mkdirSync(outputRoot, { recursive: true });

  await Promise.all(
    names.map(async name => {
      const source = path.join(sourceRoot, `${name}.svg`);
      const png16 = path.join(outputRoot, `${name}-16.png`);
      const png32 = path.join(outputRoot, `${name}-32.png`);
      fs.copyFileSync(source, path.join(outputRoot, `${name}.svg`));
      await Promise.all([
        sharp(source).resize(16, 16).png().toFile(png16),
        sharp(source).resize(32, 32).png().toFile(png32),
        sharp(source).resize(48, 48).png().toFile(path.join(outputRoot, `${name}-48.png`)),
        sharp(source)
          .resize(180, 180)
          .png()
          .toFile(path.join(outputRoot, `${name}-apple-touch.png`)),
      ]);
      fs.writeFileSync(
        path.join(outputRoot, `${name}.ico`),
        await pngToIco([png16, png32]),
      );
    }),
  );

  const suffixes = ['.svg', '.ico', '-16.png', '-32.png', '-48.png', '-apple-touch.png'];
  const missing = names.flatMap(name =>
    suffixes
      .map(suffix => `${name}${suffix}`)
      .filter(file => !fs.existsSync(path.join(outputRoot, file))),
  );

  if (missing.length) {
    throw new Error(`Generated favicon assets are incomplete: ${missing.join(', ')}`);
  }

  console.log(
    `Storybook assets prepared: ${names.length} favicon sets, ${names.length * suffixes.length} files.`,
  );
}

try {
  main().catch(error => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
