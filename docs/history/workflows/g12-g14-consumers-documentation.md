# G-12 + G-14 Consumers And Documentation Reconciliation

Updated: 2026-07-29.

## Result

- `G-12`: `[x]` - all three tracked DS-only consumer routes pass on current artifacts.
- `G-14`: `[x]` - current status, workflow, runbooks, connection guidance and agent context are reconciled with G-04 through G-12 evidence.
- Closed corporate sources, external projects and registries were not used.

## G-12 Consumer Gate

Command from `app/`:

```powershell
node scripts/run-ds-only-consumer-gate.js
```

The gate sets offline/no-network environment controls and writes `tmp/g12-ds-only-consumers/report.json`.

| Consumer | Route | Build | DOM/runtime proof |
| --- | --- | --- | --- |
| `consumer-smoke` | Diagnostic local aliases | Passed, 704 modules | Provider and `F-07 Smoke Button` rendered |
| `consumer-clean-package` | Built package exports | Passed, 708 modules | Provider, Button and packaged SVG logo rendered |
| `consumer-tarball` | Isolated registry-free tarballs | Offline install passed, 705 modules | Provider and `F-14 Tarball Button` rendered |

The tarball route installed 15 Tend UI packages and three local compensation packages without aliases to `app/packages` or `app/node_modules`.

The initial G-12 run completed that full tarball rehearsal successfully. After fixing the two Vite config-loader issues, the final aggregate report reused only this immediately preceding successful tarball result while rebuilding and rechecking the other two examples.

## Local Fixes

The initial built-example run exposed OneDrive path denial while Vite bundled the configuration. Both routes now use Vite's `runner` config loader, matching the stable tarball route.

The clean-package DOM assertion was aligned with the actual `SMaterials` contract: it verifies the rendered SVG rather than expecting `aria-label` forwarding that the component does not provide.

## G-14 Documentation Reconciliation

Updated current guidance:

- Storybook and build runbooks now start with authoritative current status and label old P/D/E blockers as historical.
- The package connection guide records the three passed internal consumer routes and excludes external product integrations from active scope.
- Agent catalog, import rules, five component passports and three migration recipes use evidence-based statuses.
- Example READMEs contain current G-12 build and DOM results.
- Main README, workflow, current status and quality gate point to the same next step.

Statuses are deliberately narrow:

- 21 core/extended packages: artifact verified;
- nine G-09 component groups: focused Storybook verified;
- provider/Button path: release-consumer verified;
- component states outside recorded evidence: still task-specific or runtime-unverified.

## Quality Gate

After G-12/G-14:

```text
13 passed, 2 warnings, 0 blocking failures
```

At the end of G-12/G-14, the remaining warnings were the missing local Git baseline and owner/publication authorization. G-15 subsequently closed the Git warning; Docker remains an optional environment gate and does not block local DS-only completion.

## Next Group

G-15 and G-18 are now complete. The mandatory local DS-only route has no remaining group.
