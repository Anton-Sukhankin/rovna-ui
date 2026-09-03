# Q-13: CI quality contract

Дата проверки: 2026-09-03.

Статус: `[x]` CI-конфигурация и локально-эквивалентные команды проверены; remote GitHub Actions подключен и исполняет workflow.

## Workflow

| Job | Timeout | Зависимость | Назначение |
| --- | ---: | --- | --- |
| `quality` | 45 min | нет | lint, static policies, packages, tests, static Storybook, coverage/source audit |
| `browser-quality` | 120 min | `quality` | Chromium, runtime, network, browser matrix, a11y, visual, language, performance |
| `release-rehearsal` | 180 min | `quality`, `browser-quality` | tarballs, consumers, React matrix; без публикации |

Concurrency задана по Git ref с `cancel-in-progress: true`. Node закреплен в обеих `.nvmrc` как LTS `22.20.0`, package manager как `yarn@1.22.15`. Эта версия Node совместима с Linux-бинарниками dependency graph, которые не поддерживают промежуточную ветку Node 23. В workflow нет `continue-on-error` и команд публикации пакетов.

## Локальное доказательство

- `npm run test:storybook:ci`: `112/112` suites, `949/949` tests, `904.2 s`;
- `npm run storybook:runtime:audit`: `1164/1164` entries, retries `0`, `448.5 s`;
- flakiness gate: initial failures `0`, new flakes `0`, unresolved `0`;
- network policy: внешних runtime-запросов `0`, пять reference embeds заблокированы;
- accessibility warning baseline: `219/219` story/rule entries, added/changed `0`;
- CI contract validator: `18/18` checks.

Vitest browser JSON перенесен в `tmp/q03-storybook-browser-tests.json`; runtime report остается в `tmp/q02-story-render-report.json`, поэтому отчеты больше не перезаписывают друг друга. Failure artifacts используют фактические пути scripts. Runtime trace создается только для retry после initial failure; новый восстановившийся flake все равно блокирует gate, если не добавлен в отдельно reviewed baseline.

Первый вариант глобальной trace-записи был отклонен: full runtime достиг внешнего timeout из-за snapshots всего каталога. После ограничения trace только failure retry полный аудит прошел за `448.5 s` без изменения функционального охвата.

## Artifacts

CI сохраняет static Storybook, JSON reports, visual actual/failure/diff, runtime screenshots и failure traces. Release job сохраняет rehearsal/consumer/React reports и локальный release bundle. Retention для quality artifacts установлен в `14` дней.

## Remote verification

Первый remote run подтвердил запуск workflow и выявил два отличия чистого Linux-окружения: Node 23 не поддерживался Linux-бинарником dependency graph, а в публичной advisory-базе появились новые записи для dev dependencies. Обе `.nvmrc` переведены на LTS `22.20.0`; Faker и transitive `fast-uri`/`qs` обновлены до исправленных версий. Актуальный live-статус запусков хранится в GitHub Actions, а не дублируется в этом снимке. Публикация пакетов намеренно отсутствует в quality workflow.

Машинные доказательства:

- `docs/q13-ci-quality-report.json`;
- `docs/q13-accessibility-baseline-check.json`;
- `tmp/q13-story-flakiness.json`;
- `.github/workflows/quality.yml`.
