# Политика Публичного API Rovna UI

Обновлено: 2026-08-10.

## Область Действия

Публичным API считается любой package root или subpath, объявленный в `exports` одного из 21 поддерживаемого пакета `core/extended`, а также экспортируемые TypeScript-типы, React props, theme/tokens contracts и peer dependencies. Папки `src`, неэкспортируемые файлы и семь пакетов `experimental/source-only` не являются публичным контрактом.

Источник машинной истины: `app/public-api-baseline.json`. Проверка выполняется командой `npm.cmd run api:audit`; непреднамеренное изменение блокирует R-06 gate.

## SemVer

- `patch`: исправление реализации без изменения доступных импортов, типов и обещанного поведения.
- `minor`: обратно совместимое добавление export, необязательного prop, нового token или нового компонента.
- `major`: удаление/переименование export, удаление subpath, сужение типа, новый обязательный prop, изменение peer contract или несовместимое изменение поведения/DOM/accessibility contract.
- Для пакетов `0.x` breaking change требует как минимум нового minor, явной маркировки breaking change и migration note. Проект применяет к ним тот же review-процесс, что и к major-релизам.
- Связанные изменения нескольких `@rovna-ui/*` пакетов выпускаются в dependency-safe порядке; совместимые диапазоны внутренних зависимостей обновляются одновременно.

Версия не повышается автоматически в R-ветке. Изменение версий выполняется отдельной release-задачей после утверждения состава релиза.

## Deprecation

1. Устаревающий symbol остается работоспособным и получает `@deprecated` с причиной, заменой и целевой версией удаления.
2. Storybook/docs показывают рекомендуемую замену; новый код и migration recipes используют только ее.
3. Deprecation сохраняется минимум один обычный release cycle. Немедленное удаление допустимо только для подтвержденной security-проблемы.
4. Удаление выполняется как breaking change и сопровождается migration note.
5. Deprecated API остается в baseline до фактического breaking release.

## API Drift Workflow

1. Собрать все 21 поддерживаемых пакета.
2. Выполнить `npm.cmd run api:audit` и изучить added/removed/changed packages/subpaths.
3. Для ожидаемого изменения определить SemVer impact, tests, docs и migration note.
4. Только после review выполнить `npm.cmd run api:update`.
5. Повторить TypeScript positive/negative consumers, Vite/Webpack и React matrix.
6. Не принимать baseline update, если validation/type/bundler failures отличаются от нуля.

## React Contract

Официальный peer contract остается `react` и `react-dom` `^17.0.2`. React 18 и 19 проходят runtime build/DOM smoke, но peer warnings и ограничения transitive dependencies не позволяют объявить их поддерживаемыми без отдельного migration package. Runtime smoke не равен публичной гарантии совместимости.

## Breaking Change Checklist

- API snapshot diff рассмотрен человеком;
- version impact определен для каждого затронутого пакета;
- TypeScript positive и negative contracts обновлены осознанно;
- Vite/Webpack и заявленная React matrix проходят;
- Storybook, component passports и migration guide синхронизированы;
- release order и consumer tarball rehearsal повторены;
- удаление не маскируется patch-релизом.
