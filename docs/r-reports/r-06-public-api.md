# R-06: Public API, types, exports и compatibility

Дата проверки: 2026-08-10.

Статус: `[x]` выполнено.

## Результат

Публичный контракт Tend UI проверен по свежей сборке и release tarballs. Все поддерживаемые пакеты, публичные subpaths, декларации типов, consumer-сценарии и заявленная React-граница имеют исполняемые доказательства.

| Проверка | Результат |
| --- | --- |
| Поддерживаемые пакеты | `21/21` |
| Публичные subpaths | `643`: 624 runtime, 19 type-only |
| Экспортируемые привязки символов | `2551` |
| Ошибки target/type resolution | `0` |
| API drift | `0` |
| TypeScript positive consumer | `643/643` импортов |
| TypeScript negative boundaries | `4/4` запрета внутренних импортов |
| Bundlers | Vite 7 и Webpack 5 passed |
| React compatibility | 17.0.2, 18.3.1 и 19.2.8 прошли install/build/DOM smoke |
| Unit/integration regression | `216/216` файлов, `6652/6652` теста |
| Итоговый R-06 gate | `29/29` checks passed |

API baseline SHA-256:

```text
064f605b60928448e85769c647da6a303a8e389fc1dd799b8d8e26889f2cf54b
```

Release bundle SHA-256:

```text
ffc615c7bfc565265ccc773236f79dd65dd501f5c546a25b0b82fcca2c358b44
```

## Реализованные gates

- `api:audit` проверяет все 21 package manifest, 643 публичных subpath, runtime/type targets и drift относительно `app/public-api-baseline.json`.
- `api:update` намеренно обновляет baseline после SemVer review.
- `types:consumer:r06` компилирует все публичные импорты с `skipLibCheck: false` и проверяет закрытость внутренних путей.
- `bundlers:r06` собирает и исполняет Vite 7 и Webpack 5 consumers на свежих tarballs.
- `compatibility:react` проверяет точные версии React/ReactDOM 17.0.2, 18.3.1 и 19.2.8.
- `quality:r06` объединяет API, types, release, bundlers, React, SemVer policy и unit regression в один обязательный gate.

## Исправленные дефекты

1. Исправлено раскрытие wildcard exports в release metadata: больше не создаются несуществующие пути вида `cjs/cjs/*`.
2. Для пакетов с alias `antd-core` добавлена реальная runtime/type dependency `antd@5.12.5`, необходимая для self-imports деклараций Ant Design.
3. Публичные декларации theme, Form Item, DatePicker icons и базового Icon очищены от приватных или нестабильных типов.
4. `UploadFile.edit` снова соответствует публичному контракту `Promise<void>` без потери защиты от обновления после unmount.
5. React compatibility harness изолирован уникальной временной директорией, чтобы OneDrive не оставлял ложные `EBUSY` блокировки между прогонами.

## React peer contract

Официальный peer-контракт сохранен как:

```text
react: ^17.0.2
react-dom: ^17.0.2
```

React 18.3.1 и 19.2.8 прошли install, build и DOM smoke, но пока считаются runtime-proven, а не официально заявленными peer-версиями. Расширять диапазон преждевременно: зависимости пакетов продолжают сообщать peer warnings, включая ограничение `qrcode.react` для React 19.

## Версионирование

Правила SemVer, deprecation window, breaking changes и намеренного обновления API baseline закреплены в `docs/public-api-versioning-policy.md`. Непреднамеренное изменение exports или типов блокирует `api:audit` и `quality:r06`.

## Принятый неблокирующий backlog

Webpack 5 consumer собран и прошел DOM smoke без ошибок, но сообщил три size warnings при размере основного bundle `637464` bytes. Это не дефект публичного API; измерение, tree-shaking и бюджеты bundle входят в `R-07`.

Этот backlog закрыт в R-07: итоговый Webpack bundle имеет размер `372357` bytes, warnings `0`, а воспроизводимые artifact и tree-shaking budgets проходят без нарушений.

## Команды воспроизведения

```powershell
Set-Location app
npm.cmd run packages:scope:check
npm.cmd run api:audit
npm.cmd run types:consumer:r06
npm.cmd run compatibility:react
npm.cmd run bundlers:r06
npm.cmd run test:ds-only
npm.cmd run quality:r06
```

## Машиночитаемые доказательства

- `docs/r06-public-api-audit.json`
- `docs/r06-types-consumer.json`
- `docs/r06-bundler-compatibility.json`
- `docs/react-compatibility.json`
- `docs/r06-public-api-gate.json`
- `app/public-api-baseline.json`

Закрытые корпоративные registry, GitLab, Nexus, Figma и сервисные контуры не использовались и не запрашивались. Следующий пакет: `R-07`, source maps, tree-shaking, bundle budgets и tarballs.
