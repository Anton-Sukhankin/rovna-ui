# G-10 + G-11 Tests And Release Rehearsal

Updated: 2026-07-29.

## Result

- `G-10`: `[x]` - all 210 discovered test/spec files were executed locally across 22 packages.
- `G-11`: `[x]` - all 21 supported artifacts were rebuilt and the 15-package public release wave passed a registry-free tarball consumer rehearsal.
- Overall result: `passed-with-classified-visual-drift`.
- No closed corporate source, external project, registry request or publication was used.

## G-10 Test Gate

Command from `app/`:

```powershell
node scripts/run-ds-only-tests.js
```

| Metric | Result |
| --- | ---: |
| Packages | 22 |
| Test/spec files | 210 |
| Test suites | 210 |
| Tests | 6603 |
| Passed tests | 6543 |
| Snapshot-only failures | 29 |
| Skipped tests | 26 |
| Todo tests | 5 |
| Blocking functional/runtime failures | 0 |

Nineteen packages passed without failures. Three packages have classified visual snapshot drift:

| Package | Snapshot failures |
| --- | ---: |
| `@10d/tend-ui` | 16 |
| `@10d/tend-ui-table` | 1 |
| `@10d/tend-ui-tree` | 12 |

Snapshots were not updated automatically. The differences are retained as an explicit visual-review backlog because local source mapping and styled-components class/style ordering can change serialized markup without proving a runtime regression. G-09 remains the current browser evidence for the nine key component groups.

The machine-readable result is `tmp/g10-ds-only-tests/report.json`.

## Local Test Fixes

The test gate exposed and closed four local reproducibility problems:

- added `lodash/isEqualWith` to the local dual package for `@testing-library/jest-dom`;
- added deep-path support to the local `lodash/pick` implementation, restoring scoped Filters reset behavior;
- mapped Tend UI Jest aliases to local package sources instead of stale `cjs` subpaths;
- made the main package import-contract test independent of the shell working directory.

## G-11 Release Rehearsal

Commands from `app/`:

```powershell
node scripts/run-supported-package-gate.js
node scripts/run-ds-only-release-rehearsal.js --reuse-supported-build
```

The reusable report flag was used only after the immediately preceding fresh `21/21` build completed successfully.

| Check | Result |
| --- | --- |
| Supported artifacts | `21/21` passed |
| Public release tarballs | `15` |
| Dependency release levels | `7` |
| Local compensation tarballs | `3` (`classnames`, `lodash`, `uuid`) |
| Offline public mirror | `1560` tarballs |
| Consumer install | Passed with `yarn --offline` |
| Consumer build | Passed without source aliases; 705 Vite modules transformed |
| Consumer DOM smoke | `TendUI` provider and `Button` rendered |
| Registry contacted | No |
| Publication performed | No |

Release archive:

```text
release/tend-ui-4.82.0-release-bundle.tgz
SHA-256: 80fb64401bdd5ae7923948aee31ae0f0b32e3e9f6bd069b82040f232abec0646
```

The checksum was recalculated and matches the release report. Machine evidence is stored in `tmp/g11-ds-only-release-rehearsal.json`.

## Scope Boundary

The supported artifact scope contains 21 core/extended packages. The current public release wave intentionally contains 15 packages defined by `app/release-boundary.json`. The six extended packages are build-verified artifacts but are not silently added to the public publication contract in this group.

## Quality Gate

After G-10 and G-11, the consolidated DS-only gate reports:

```text
12 passed, 3 warnings, 0 blocking failures
```

The remaining warnings are Git baseline, owner/publication decisions and the broader G-12 rerun of all tracked consumer examples. None blocks local Storybook or the verified registry-free release rehearsal.

## Next Group

Completed by `G-12 + G-14`; see `docs/history/workflows/g12-g14-consumers-documentation.md`. The active next group is `G-15`.
