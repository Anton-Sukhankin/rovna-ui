# @rovna-ui/favicons

Пакет для управления favicons в проектах 10D.

## Установка

```bash
npm install @rovna-ui/favicons
```

> **Примечание:** `react-helmet` устанавливается автоматически как зависимость пакета.

## CDN

Favicons доступны через CDN по адресу: `/favicons/`

## Использование

### FaviconProvider

Компонент автоматически подключает все форматы favicons для максимальной совместимости с браузерами:

```tsx
import { FaviconProvider } from '@rovna-ui/favicons';

function App() {
  return (
    <>
      <FaviconProvider type="pass-10D" />
      {/* Ваше приложение */}
    </>
  );
}
```

### Таблица соответствия сервисов и фавиконок

| Сервис       | Global           | Samolet      |
|--------------|------------------|--------------|
| LK           | `lk-10D`         | undefined    |
| SBlueprint   | `sod-10D`        | `sblueprint` |
| SCenter      | `reports-10D`    | `?`          |
| SControl     | `quality-10D`    | `?`          |
| SGantt       | `plan-10D`       | `?`          |
| SKek         | `ks-manager-10D` | `?`          |
| SMaterials   | `materials-10D`  | `?`          |
| SPass        | `pass-10D`       | `?`          |
| SPass-Report | `pass-gdrs-10D`  | `?`          |
| SPro         | `pro-10D`        | `?`          |
| SRMP         | `rmp-10D`        | `?`          |
| STender      | `tender-10D`     | `?`          |

### Поддерживаемые форматы

Компонент автоматически подключает:

- **SVG** - для современных браузеров
- **ICO** - для старых браузеров и IE
- **PNG** - размеры 16x16, 32x32, 48x48
- **Apple Touch Icon** - 180x180 для iOS устройств

### Примеры URL

```typescript
// SVG favicon
/favicons/pass-10D.svg

// PNG favicons
/favicons/pass-10D-16.png
/favicons/pass-10D-32.png
/favicons/pass-10D-48.png

// ICO favicon
/favicons/pass-10D.ico

// Apple Touch Icon
/favicons/pass-10D-apple-touch.png
```
