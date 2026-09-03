# Rovna UI User Guide

## Назначение

Этот маршрут помогает открыть Storybook, выбрать компонент, увидеть доказанные states и использовать дизайн-систему в локальном проекте-потребителе.

## Открытие Storybook

Из каталога `app/`:

```powershell
node scripts/serve-storybook-static.js --port=3000
```

Откройте:

```text
http://127.0.0.1:3000/
```

Текущий состав static-сборки хранится в Storybook index и generated catalog. Подробности запуска и пересборки находятся в [Storybook Runbook](./storybook-runbook.md).

## Поиск Компонента

1. Найдите компонент в левой панели Storybook.
2. Откройте `Docs` для API и примеров, если docs entry существует.
3. Сравните states в Storybook с требованиями интерфейса.
4. Откройте соответствующий паспорт через [Component Passport Index](./agent-context/component-passports/README.md).
5. Проверьте статус пакета: `supported` или `source-only`.

Полный актуальный состав компонентов, stories, imports и паспортов находится в generated [Rovna UI Catalog](./agent-context/ds-catalog.md).

## Как Читать Статусы

| Статус | Значение |
| --- | --- |
| `artifact verified` | Пакет собран как ESM/CJS/types и входит в release boundary. |
| `Storybook render verified` | Story открылась в полном browser runtime. |
| `axe verified` | Текущая story прошла автоматический accessibility audit. |
| `focused interaction evidence` | Для группы существует исполняемая play story. |
| `source-only` | Исходники доступны, но пакет не входит в подтвержденную tarball boundary. |

Успешный render не доказывает любое возможное бизнес-поведение. Для действий, которых нет в паспорте, требуется отдельная focused проверка.

## Подключение К Проекту

Подтвержденный автономный маршрут использует локальные tarballs и не требует registry. Порядок и ограничения описаны в [Package Connection Guide](./package-connection-guide.md).

Минимальный React contract:

```tsx
import { RovnaUI } from '@rovna-ui/components/theme';
import { Button } from '@rovna-ui/components/primitives';

RovnaUI.init();

export function App() {
  return (
    <RovnaUI>
      <Button>Продолжить</Button>
    </RovnaUI>
  );
}
```

Текущий peer contract определяется manifest главного пакета. Проверенные дополнительные версии и границы совместимости находятся в `docs/react-compatibility.json`; не расширяйте peer range без отдельного API-решения.

## Проверка Компонента

- визуально сравните default, hover, focus, active, disabled, loading/error/empty states, если они поддерживаются;
- проверьте длинный русский текст и нужный viewport;
- для overlay проверьте открытие, закрытие, focus return и keyboard path;
- для form/select/table/tree/upload повторите фактическое целевое действие;
- не подключайте закрытые API/auth/realtime endpoints;
- зафиксируйте использованные story и evidence IDs из паспорта.

## Сообщение О Проблеме

Укажите:

- компонент и import path;
- Storybook story ID;
- ожидаемое и фактическое поведение;
- browser и viewport;
- console/page errors;
- воспроизводится ли проблема в static Storybook и в consumer.
