# Q-01 Storybook Test Toolchain

Проверено: 2026-08-07. Режим: DS-only, без закрытых корпоративных источников.

## Итог

Storybook browser toolchain работоспособен. Официальные пакеты Storybook выровнены на `10.1.11`; Vitest выполняется отдельным проектом и не заменяет существующие Jest suites.

| Инструмент | Версия | Статус |
| --- | --- | --- |
| Storybook / `@storybook/react-vite` | `10.1.11` | passed |
| `@storybook/addon-docs` | `10.1.11` | passed |
| `@storybook/addon-a11y` | `10.1.11` | passed |
| `@storybook/addon-vitest` | `10.1.11` | passed |
| Vite | `7.1.12` | passed |
| Vitest / `@vitest/browser-playwright` | `4.1.10` | passed |
| Playwright | `1.62.1` | passed |
| React / React DOM | `17.0.2` | passed |

Конфигурация находится в `app/vitest.config.ts` и `app/.storybook/vitest.setup.ts`. Browser project использует установленный Chrome, русский locale, последовательное выполнение файлов, test timeout `20s`, hook timeout `30s` и блокировку внешних `fetch`, XHR и WebSocket.

## Команды

Из `app/`:

```powershell
npm.cmd run test:storybook
npm.cmd run test:storybook:watch
npm.cmd run test:storybook:ci
```

Глобальный Yarn для этих команд не требуется. Подготовка и сборка Storybook выполняются локальными пакетами из `node_modules`.

## Проверка

- Chromium smoke одной Button story: passed.
- Полный browser suite: `112/112` файлов, `942/942` tests, `0` failures.
- Временный `subst` drive освобожден после каждого запуска.
- Внешние runtime-запросы блокируются; установка пакетов и сетевой registry не используются.
- Package artifact check: `21/21` core/extended packages passed.

## Известные результаты Jest baseline

Текущие Jest snapshots не обновлялись автоматически. Общий прогон выявил ожидаемый drift после доступной палитры в 10 пакетах. В основном `@10d/tend-ui` отдельно подтверждены `87` suites и `1367` tests: `471` failed assertions связаны со snapshots, `24` прямых ожидания содержат старые значения цветовых токенов, `9` тестов `AsyncSelect` воспроизводят гонку `preload=onmount` с URL mock. Их исправление и осознанное принятие snapshots относятся к `QG-09 / Q-10`.

Playwright trace на каждое падение пока не сохраняется. Screenshots и первичная причина доступны в runtime-аудите; CI trace policy будет закрыта в `QG-12`.
