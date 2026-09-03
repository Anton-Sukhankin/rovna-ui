# R-07: Артефакты и производительность

Дата проверки: 2026-08-10.

Статус: `[x]` выполнено.

## Результат

R-07 добавил проверяемый source-map contract для всех 21 поддерживаемого пакета, воспроизводимые бюджеты артефактов и consumer bundles, проверки tree-shaking и дублирования зависимостей. Все пакеты пересобраны, release bundle и registry-free consumer routes повторно проверены.

| Проверка | Результат |
| --- | --- |
| Поддерживаемые пакеты | `21/21` passed |
| JavaScript и source maps | `5128/5128`, missing и orphan maps `0` |
| Type declarations | `6588` |
| Проверенные mapped sources | `2478` |
| Ошибки путей и содержимого maps | `0` |
| Общий размер `dist` | `10242426` bytes |
| Общий размер 21 tarball | `2252043` bytes |
| Artifact budget violations | `0` |
| Tree-shaking scenarios | `9/9` passed |
| Root/subpath pairs | `4/4`, overhead `0` bytes |
| Duplicate React/styled-components/icons/utils roots | `0` |
| Tree-shaking budget violations | `0` |
| Webpack consumer | `372349` bytes, warnings `0` |
| Vite consumer | `378510` bytes, gzip `125120` bytes |
| Release tarballs | `21/21` |
| Internal consumer routes | `3/3` passed |
| React compatibility | React `17.0.2`, `18.3.1`, `19.2.8` passed |
| Unit/integration regression | `6652/6652` tests passed |
| Итоговый R-07 gate | `27/27` passed |

## Изменения

- Rollup ESM/CJS outputs создают external source maps без встраивания исходного кода.
- Type-only runtime stubs получают корректные минимальные `.js.map`.
- В публикуемые `package.json` добавлен CSS-only контракт `sideEffects: ["**/*.css"]`.
- Package artifact gate проверяет соответствие JS/maps и опубликованные metadata.
- Добавлен аудит путей, целостности tarball и размеров артефактов.
- Добавлена production Webpack-матрица для root/subpath imports и дублирования package roots.
- Добавлены явные бюджеты артефактов и tree-shaking, которые обновляются только отдельной командой.
- Webpack consumer получил явные performance thresholds, а безопасный CSS-only side-effects contract позволил исключить неиспользуемый код.

## Source Map Contract

Для каждого распространяемого `.js` требуется парный `.js.map`; orphan maps запрещены. JSON карт должен быть валиден, `sourcesContent` должен быть `null` или отсутствовать, а `sources` не могут содержать:

- абсолютные локальные пути;
- `file://`, HTTP(S) URL или закрытые hostnames;
- пути из `node_modules`;
- пути, выходящие за границу исходного пакета;
- отсутствующие исходные файлы.

Проверка прошла для `5128` JavaScript-файлов и `2478` уникальных ссылок на исходники без ошибок.

## Tree-Shaking И Размеры

Production Webpack проверил 9 сценариев. Root и subpath imports дали одинаковый результат для Button, Icon, Logo и Utils:

| Пара | Root | Subpath | Overhead |
| --- | ---: | ---: | ---: |
| Button | `80964` | `80964` | `0` |
| Icon | `51509` | `51509` | `0` |
| Logo | `50832` | `50832` | `0` |
| Utils | `52` | `52` | `0` |

Полный Webpack bundle уменьшен с R-06 baseline `637464` до `372349` bytes: на `265115` bytes, или примерно на `41.6%`. Три прежних size warnings устранены. Vite и Webpack consumer DOM smoke прошли.

Шесть extended packages не входят в dependency closure корневого consumer и поэтому имеют статус `n/a` только в установленной consumer side-effects проверке. Их собственные dist metadata и tarballs входят в полный аудит `21/21`; это не непроверенная область.

## Release И Совместимость

Свежий registry-free release rehearsal прошел offline install, Vite build, DOM smoke, archive boundary и checksum verification. Публикация не выполнялась, registry не использовался.

```text
tend-ui-4.82.0-release-bundle.tgz
SHA-256: ad33a3967fd743cf0f69cda875e90f1126d464b8c8fc3d6a6cddc8bdbbcb6e64
```

React `17.0.2`, `18.3.1` и `19.2.8` повторно прошли install/build/DOM smoke. Официальный peer contract намеренно остается React/ReactDOM `^17.0.2`; расширение диапазона не выполнялось без отдельного API-решения.

## Команды Воспроизведения

Из каталога `app/`:

```powershell
npm.cmd run packages:scope:check
npm.cmd run artifacts:r07
npm.cmd run treeshaking:r07
npm.cmd run quality:r06
npm.cmd run quality:r07
```

Изменение budget baseline выполняется только после осознанной проверки результата:

```powershell
npm.cmd run artifacts:r07:update
npm.cmd run treeshaking:r07:update
```

## Доказательства

- `docs/r07-package-artifacts.json`
- `docs/r07-tree-shaking.json`
- `docs/r07-artifacts-performance-gate.json`
- `app/artifact-size-budgets.json`
- `app/tree-shaking-budgets.json`
- `tmp/g11-ds-only-release-rehearsal.json`
- `docs/react-compatibility.json`
- `docs/r06-bundler-consumers.json`
- `docs/r06-api-surface.json`

Закрытые корпоративные registry, GitLab, Nexus, Figma и сервисные контуры не использовались и не запрашивались. R-08 впоследствии завершен; текущий следующий пакет: `R-09`.
