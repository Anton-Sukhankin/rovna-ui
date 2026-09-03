# R-00: план и baseline

Дата: 2026-08-08.

Статус: `[x]`.

## Выполнено

- создан мастер-план `docs/history/workflows/r-quality-maximization-plan.md`;
- QG-13 принят как стартовый baseline;
- задачи разделены на 12 последовательных пакетов `R-00`-`R-11`;
- зафиксированы DS-only граница, запрет закрытых корпоративных источников и исключение `S-Tracker`;
- npm publication исключена, GitHub определен как source repository;
- root license оставлена owner decision;
- определены артефакты, критерии приемки и формат отчетности каждого пакета.

## Проверено

- стартовый Q-report: `24 passed`, `5 accepted risks`, `0 blocking failures`;
- Storybook baseline: 949 stories и 215 docs;
- component coverage baseline: 969 public visual exports и 39 documented gaps;
- backlog baseline: 29 partial/gap mocks, 12 classified pending tests, 7 source-only packages, source maps `0/21`.

## Следующий пакет

```text
R-01: закрытие 39 component/story gaps.
```
