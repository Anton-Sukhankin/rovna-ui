# Rovna UI Maintainer Guide

## Ответственность

Maintainer поддерживает синхронность source, Storybook, public API, artifacts, tarballs, security evidence и документации. Код распространяется по MIT; публикация не входит в автономную работу до подтверждения npm scope и authorization.

## Текущая Release Boundary

Поддерживаемый набор и порядок пакетов определяет `app/release-boundary.json`. ESM/CJS/types/exports, source maps, tarball consumers и React compatibility проверяются их machine reports. Не копируйте сюда число пакетов, версии React или хеш release bundle.

Source-only experimental packages не должны молча добавляться в release. Их решения находятся в `docs/experimental-package-decisions.json`.

## Обязательные Gates

Из `app/`:

```powershell
corepack yarn quality:ds-only
corepack yarn quality:r06
corepack yarn quality:r07
corepack yarn quality:r08
corepack yarn quality:r09
```

Long-running browser/a11y/visual suites запускаются при изменении соответствующей поверхности. Полная приемка R-11 повторит все обязательные gates на одном final baseline.

## Storybook Baseline

Текущий Storybook index и принятые browser/a11y/visual результаты принадлежат `app/storybook-static/index.json`, Q/R machine reports и `docs/r-final-quality-report.json`. После пересборки проверьте `/`, `/index.json`, `/iframe.html` и static asset graph. Старую static generation разрешено удалить только после успешной promotion новой.

## Supply Chain

- dependency restore выполняется только из публичного npm или проверенного offline-public cache;
- install для audit/reproducibility использует `--ignore-scripts`;
- `yarn.lock` обязан содержать только разрешенные публичные sources и integrity;
- SBOM и license inventory пересоздаются после изменения dependency graph;
- package lifecycle script разрешается только после отдельного review необходимости и provenance.

Текущая security evidence описана в [R-08 Report](./r-reports/r-08-security-supply-chain.md).

## Документация

После изменения exports/stories/packages:

```powershell
corepack yarn docs:r09:generate
corepack yarn quality:r09
```

Человеческие guides изменяются вручную; catalog и generated passports обновляются только генератором.

## Owner Decisions

До GitHub/npm handoff владелец должен определить:

- private или public GitHub repository;
- право на публичное размещение исходников;
- сохранение MIT-лицензии в корне и во всех публикуемых tarball;
- npm/GitHub Packages scope и credentials, если публикация пакетов будет разрешена.

Эти решения не блокируют локальный Storybook и registry-free tarball integration.
