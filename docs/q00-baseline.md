# Q-00 Baseline

Captured: 2026-08-08 after QG-13. Machine report: `tmp/q00-baseline.json`.

## Status

Это текущая воспроизводимая точка сравнения DS-only Q-ветки. Исходный снимок до QG-01 сохранен в `tmp/q00-baseline-initial-2026-07-31.json` и остается историческим.

## Source

- Git commit: `f4e7b60454f0bc6d679f6fb6f2cfd99be2644926`.
- Branch: `main`.
- Worktree intentionally dirty: Q-ветка еще не зафиксирована новым commit.
- Network access used by baseline capture: no.
- Закрытые корпоративные среды не используются.

## Environment

| Item | Value |
| --- | --- |
| OS | Windows, `x64` |
| Node | `22.19.0` |
| npm | `10.9.3` |
| Corepack | `0.34.0` |
| Yarn | `1.22.15` |
| React / React DOM | `17.0.2` |

## Storybook Toolchain

| Item | Value |
| --- | ---: |
| Storybook / React Vite | `10.1.11` |
| Docs / a11y / Vitest addons | `10.1.11` |
| Vite | `7.1.12` |
| Vitest / browser-playwright | `4.1.10` |
| Playwright | `1.62.1` |
| Entries | `1164` |
| Stories | `949` |
| Docs | `215` |
| Story groups/files | `112` |
| Files with `play` | `19` |
| `play` functions | `36` |

## Build Binding

| Artifact | SHA-256 / count |
| --- | --- |
| `index.json` | `6fb36ac9a1ff2265c97adceb8213783fe1212c0bb28113573e6602614647d4c2` |
| `iframe.html` | `7d1b35a13cc286d7ca5c9a5ecdb86f558041d5a2bb438a8aae14e5f303ecd6ef` |
| Full static directory | `ce7a9668bbc932c44910df3448e931c51430090ba41bfb674d69bd0a4cbc2ff2` |
| Static files | `766` |

Любое изменение Storybook source или static build требует повторной фиксации hash и связанных runtime/a11y reports.

## Gate Results

- Static Storybook: `1164/1164` entries, missing assets `0`.
- Chromium runtime: `1164/1164`, failures/retries/console/page errors `0`.
- Browser tests: `112/112` suites, `949/949` tests.
- Accessibility: `949/949`, violations `0`.
- Unit/integration: `216/216` files, `6637/6649` passed, 12 classified pending, failures/drift `0`.
- Component coverage: 969 public visual exports, 39 documented gaps, 0 unclassified groups.
- Supported package gate: `21/21` passed.
- Final DS-only gate: 24 passed, 5 accepted risks, 0 blocking failures.
