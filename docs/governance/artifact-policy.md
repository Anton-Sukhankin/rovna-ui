# Repository Artifact Policy

## Purpose

This policy separates functional source, active documentation, generated documentation, quality evidence, regression baselines, history and local output. File volume alone is never a deletion criterion.

The machine contract is [artifact-policy.json](artifact-policy.json). `app/scripts/inventory-repository-artifacts.js` applies its ordered rules to tracked, untracked and summarized ignored paths.

## Classes

| Class | Git policy | Agent read policy |
|---|---|---|
| `source-versioned` | Include | Exact task files |
| `source-asset-versioned` | Include | Referencing story/runtime task only |
| `active-documentation-versioned` | Include | By active route |
| `generated-documentation-versioned` | Include | Exact catalog/passport entry |
| `evidence-versioned` | Include | Query exact keys only |
| `history-versioned` | Include | Explicit provenance task only |
| `reference-documentation-versioned` | Include | Explicit task only; never part of the default route |
| `regression-baseline-versioned` | Include | Related test task only |
| `temporary-execution-versioned` | Include only while active | Current execution only |
| `local-generated` | Ignore | Never |
| `local-sensitive` | Ignore and never publish | Never |

## Confirmed Decisions

- `app/.q-visual-baseline/*.png` is versioned visual-regression evidence. The visual audit reads these files and its update mode owns regeneration.
- `docs/agent-context/ds-catalog.*` and generated passports are versioned generated documentation. R-09 owns them.
- Jest snapshots are versioned regression evidence.
- `app/packages/tend-ui-assets/src/media/demo-avatar.svg` is a versioned Storybook source asset. Multiple stories reference `/media/demo-avatar.svg`, and Storybook exposes the package source through `staticDirs`.
- `app/packages/tend-ui-assets/src/stats.html` is a versioned local fallback used by `BundleAnalyzer.mdx`. The full analyzer still writes `app/dist/stats.html`, but Storybook must not return a 404 when that optional report is absent.
- `node_modules`, package `dist`, Storybook static output, release bundles, temporary diagnostics and local logs are local generated output.
- History remains versioned for provenance but is excluded from default agent context.
- Compatibility routes for completed dependency and quality workflows remain short, while their accumulated content lives under `docs/history/`.

## Cleanup Rule

Do not use `git clean` or delete a directory by category name. A candidate may be removed only when the policy identifies its owner, incoming references are absent, regeneration is understood and the exact cleanup condition is satisfied.

## Verification

From `app/`:

```powershell
corepack yarn artifacts:inventory
corepack yarn quality:agent-governance
```

The inventory must report zero unmatched paths, zero tracked local-only outputs, zero visible unignored local-only outputs and zero ignored versioned files.
