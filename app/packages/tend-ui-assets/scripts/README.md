# Скрипты сборки tend-ui-assets

Этот пакет содержит модульные скрипты для сборки различных типов ресурсов.

## Основные команды

### Полная сборка
```bash
npm run build
```
Запускает все скрипты сборки в правильном порядке.

### Отдельные скрипты

#### Структура папок
```bash
npm run build:structure
```
Копирует структуру папок из `src` в `dist`.

#### Логотипы
```bash
npm run build:logos
```
Генерирует логотипы в разных цветах (blue600, gray400, gray0).

#### Изображения
```bash
npm run build:images
```
Копирует изображения из `src/images` в `dist/images`.

#### Шрифты
```bash
npm run build:fonts
```
Копирует шрифты из `src/fonts` в `dist/fonts`.

#### Favicons
```bash
npm run build:favicons
```
Генерирует favicons разных размеров (16x16, 32x32, 48x48) из SVG файлов.

#### Changelog
```bash
npm run build:changelog
```
Копирует changelog.json в папку dist.

## Структура файлов

```
scripts/
├── build.ts              # Основной скрипт сборки
├── copy-structure.ts     # Копирование структуры папок
├── generate-logos.ts     # Генерация логотипов
├── generate-images.ts    # Генерация изображений
├── copy-fonts.ts         # Копирование шрифтов
├── generate-favicons.ts  # Генерация favicons
└── copy-changelog.ts     # Копирование changelog
```

## Добавление новых скриптов

1. Создайте новый файл в папке `scripts/`
2. Добавьте команду в `package.json`
3. Подключите скрипт в `build.ts` если нужно

## Пример добавления нового скрипта

```typescript
// scripts/generate-new-assets.ts
import path from 'path';
import fs from 'fs';

const root = path.resolve(__dirname, '..');

console.log('Генерируем новые ассеты...');
// Ваша логика здесь
console.log('Новые ассеты созданы!');
```

```json
// package.json
{
  "scripts": {
    "build:new-assets": "yarn ts-node ./scripts/generate-new-assets.ts"
  }
}
```
