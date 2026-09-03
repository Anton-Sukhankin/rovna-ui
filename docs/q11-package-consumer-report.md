# Q-11: package и consumer contract

Дата проверки: 2026-08-08.

Статус: `[x]` локальный DS-only release-контракт подтвержден.

## Результат

| Проверка | Результат |
| --- | --- |
| Core/extended package artifacts | `21/21`, ошибок artifact contract нет |
| `dist` / manifests / declarations | `21/21` / `21/21` / `21/21` |
| Source maps | `0/21`; отдельное неблокирующее ограничение отладки |
| Release tarballs | `21` |
| Local compensation tarballs | `3` |
| Offline public mirror | `1560` tarballs |
| Release bundle | `tend-ui-4.82.0-release-bundle.tgz` |
| SHA-256 | `3f56a16df99b3068af74f77ced12a785db98fee8fab5f4f88752abf9363f2876` |
| Consumer profiles | `3/3` |
| Offline install/build/DOM smoke | passed |
| React 17/18/19 install/build/DOM | passed |
| Registry contacted | release rehearsal: no; React matrix: public `registry.npmjs.org` only |
| Publication performed | no |

Свежая сборка выявила несовпадение accessibility runtime-props с публичными TypeScript-типами Checkbox, Radio, Select и Toggle. Типы расширены через `React.AriaAttributes`, Select получил безопасный string fallback для accessible name. После исправления главный пакет, Upload и Header собрались; итоговый artifact gate подтвердил весь scope `21/21`.

## Consumer contract

- `consumer-smoke`: local aliases, Vite build и DOM smoke прошли;
- `consumer-clean-package`: публичные built exports, provider, button и logo прошли;
- `consumer-tarball`: установка `21` tarball через `yarn --offline`, build без source aliases и DOM smoke прошли;
- archive checksum совпадает, workspace/source-only пути в release boundary не используются.

## React contract

React/ReactDOM `17.0.2` остается официальным peer contract. React `18.3.1` и `19.2.0` успешно прошли runtime smoke, но дают ожидаемые peer warnings и не считаются основанием автоматически расширять объявленный диапазон.

## Граница

В artifact contract не входят семь пакетов `experimental/source-only` и один исключенный пакет. Это зафиксированное решение release boundary, а не ошибка сборки. Публикация не выполнялась; license, scope ownership и remote registry остаются owner gates.

Текущая build-конфигурация не выпускает source maps ни для одного из 21 поддерживаемого пакета. Это не мешает установке, type checking, build или DOM runtime, но переход к source-level debugging у потребителя требует отдельной задачи с проверкой размера tarballs и отсутствия закрытых путей в `sources`.

Машинные доказательства:

- `tmp/g07-supported-package-gate.json`;
- `tmp/g11-ds-only-release-rehearsal.json`;
- `tmp/g12-ds-only-consumers/report.json`;
- `docs/react-compatibility.json` (bound to the release archive SHA-256 above).
