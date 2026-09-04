# R-08: Security, SBOM и supply chain

Дата проверки: 2026-08-10.

Статус: `[x]` выполнено.

## Результат

R-08 закрыл аудит публичных зависимостей, инвентаризацию лицензий, CycloneDX SBOM, проверку lockfile и локальных компенсаций, а также воспроизводимый security gate. Закрытые корпоративные registry, GitLab, Nexus, Figma и сервисные контуры не использовались и не запрашивались.

| Проверка | Результат |
| --- | --- |
| Публичный production audit | `0` advisories, `276` dependencies |
| Полный публичный audit | `0` advisories, `1590` dependencies |
| R-08 gate | `18` passed, `2` accepted risks, `0` failed |
| Release boundary в SBOM | `21/21` packages |
| CycloneDX SBOM | версия `1.5`, `204` components, `684` dependency edges |
| Отсутствующие SBOM dependencies | `0` |
| License inventory | `1364` package versions |
| Runtime / development packages | `204` / `1160` |
| Валидные SPDX expressions | `1318` |
| Отсутствующие или невалидные license records | `0` / `0` |
| Owner-unconfirmed workspace metadata | `46` |
| Lockfile entries | `1927` |
| Разрешенные lockfile hosts | только `registry.npmjs.org`, `1927/1927` |
| Invalid source / version / resolved / integrity | `0 / 0 / 0 / 0` |
| Secrets / active closed hosts / absolute paths | `0 / 0 / 0` |
| Неожиданные binary и executable artifacts | `0 / 0` |
| Подозрительные credential filenames | `0` |
| Проверки локальных lodash/uuid компенсаций | `6/6` passed |

Проверенный SHA-256 `yarn.lock`:

```text
97d5574f4396ad8271ebd9f5f8ced9c659021076bc077dc5d3baeb4c3c91f382
```

## Исправления зависимостей

- Storybook обновлен до `10.5.7`, Vite до `7.3.6`, Rollup до `4.62.4`, Turbo до `2.10.9`, axios до `1.19.0`.
- Уязвимые транзитивные версии зафиксированы безопасными совместимыми resolutions из публичного npm.
- Удалены неиспользуемый `vite-plugin-markdown` и legacy release tooling, не требуемые для локальной сборки, tarball-маршрута и GitHub source repository.
- Локальные компенсации lodash защищены от prototype pollution; UUID-компенсация проверена на формат, уникальность и variant/version bits.
- Все установки R-08 выполнялись только из публичного npm с `--ignore-scripts`.

## Lifecycle Scripts

В установленном графе обнаружены четыре пакета с lifecycle scripts: `esbuild`, `protobufjs`, `sharp` и `unrs-resolver`. Во время R-08 эти scripts не исполнялись. CI и воспроизводимые install-команды используют `--ignore-scripts`; включение lifecycle script допускается только после отдельной проверки конкретного пакета и необходимости его native artifact.

В исходных workspace packages активных lifecycle scripts нет. Неожиданные бинарные файлы и исполняемые артефакты в source boundary не найдены.

## SBOM И Лицензии

`docs/sbom.cdx.json` описывает runtime closure поддерживаемой release boundary в формате CycloneDX 1.5. `docs/dependency-license-inventory.json` содержит отдельную полную инвентаризацию runtime и development graph и связан с текущим hash lockfile.

Корневой `LICENSE` намеренно отсутствует до решения владельца. Поля `license: ISC` в исторических package manifests не считаются разрешением владельца на open-source публикацию. Это принятое owner decision, которое не блокирует локальную работу, Storybook, сборку и registry-free tarball integration.

## Release Regression

После обновления dependency graph повторно подтверждены:

- package build `21/21`;
- unit/integration `216/216` files и `6652/6652` tests;
- Storybook static integrity: `1223` entries, `1008` stories, `215` docs;
- Vite 7 и Webpack 5 consumers;
- React `17.0.2`, `18.3.1` и `19.2.8` compatibility;
- offline release rehearsal: `21` package tarballs и `3` local compensation tarballs;
- R-07 artifact gate `27/27`.

Актуальный release bundle:

```text
tend-ui-4.82.0-release-bundle.tgz
SHA-256: ad33a3967fd743cf0f69cda875e90f1126d464b8c8fc3d6a6cddc8bdbbcb6e64
```

Публикация не выполнялась, registry при consumer rehearsal не использовался.

## Команды Воспроизведения

Из каталога `app/`:

```powershell
npm.cmd run security:r08:audit
npm.cmd run security:r08:inventory
npm.cmd run security:r08:compensations
npm.cmd run quality:r08
```

`security:r08:audit` строит production/full closure по фактическому `yarn.lock` и обновляет audit evidence через публичный npm bulk advisory API с retry. `quality:r08` проверяет уже сохраненный audit offline, сверяет hash lockfile и не обращается к registry. Устаревший Yarn 1 audit endpoint не используется.

## Доказательства

- `docs/dependency-audit.json`
- `docs/dependency-license-inventory.json`
- `docs/sbom.cdx.json`
- `docs/r08-security-supply-chain.json`
- `docs/r08-security-supply-chain-gate.json`
- `tmp/g11-ds-only-release-rehearsal.json`
- `.github/workflows/quality.yml`

Следующий пакет: `R-09`, полный agent/user/developer documentation layer.
