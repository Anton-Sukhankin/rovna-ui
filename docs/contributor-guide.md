# Rovna UI Contributor Guide

## Граница Работы

Рабочая область находится в `app/`. Закрытые корпоративные источники и внешние product projects не используются. Публичные npm/GitHub источники разрешены только как контролируемый шаг с фиксацией lockfile и security evidence.

## Перед Изменением

1. Найдите пакет и public export в [Machine Catalog](./agent-context/ds-catalog.json).
2. Откройте паспорт группы через [Passport Index](./agent-context/component-passports/README.md).
3. Проверьте public API и SemVer правила в [Public API Versioning Policy](./public-api-versioning-policy.md).
4. Определите обязательные visual, interaction, a11y и network states.

## Изменение Компонента

- сохраняйте существующий package ownership и import style;
- пользовательский текст в stories и компонентах должен быть русским, кроме явных locale/i18n или технических примеров;
- добавляйте story для нового публичного визуального state;
- добавляйте play test для нового обязательного взаимодействия;
- обновляйте unit/snapshot tests только после проверки фактического изменения;
- не добавляйте runtime corporate URL, credentials или незафиксированные сетевые запросы.

## Локальные Команды

Из `app/`:

```powershell
npm.cmd run storybook:local:build
npm.cmd run storybook:static:check
npm.cmd run test:storybook:ci
npm.cmd run storybook:a11y:audit
npm.cmd run docs:r09:generate
npm.cmd run quality:r09
```

Для package/API/security изменений также применимы:

```powershell
npm.cmd run quality:r06
npm.cmd run quality:r07
npm.cmd run quality:r08
```

## Generated Documentation

Не редактируйте вручную:

- `docs/agent-context/ds-catalog.json`;
- `docs/agent-context/ds-catalog.md`;
- `docs/agent-context/component-passports/README.md`;
- `docs/agent-context/component-passports/generated/*.md`.

После изменения exports, stories, interactions, a11y evidence или package manifests выполните:

```powershell
node scripts/audit-component-story-coverage.js
npm.cmd run docs:r09:generate
npm.cmd run quality:r09
```

`quality:r09` блокирует drift, неполные паспорта, битые ссылки, неописанные группы и несовпадающие счетчики.

## Definition Of Done Для Изменения

- source и public API согласованы;
- stories и пользовательские тексты обновлены;
- unit/interaction/a11y проверки проходят;
- generated catalog актуален;
- новые зависимости прошли public audit и license inventory;
- release/package gates проходят, если затронут artifact contract;
- документация не объявляет непроверенное поведение подтвержденным.
