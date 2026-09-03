# R-09: Documentation And Agent Context

Updated: 2026-09-01.

Status: passed.

## Result

R-09 maintains one reproducible documentation layer for users, contributors, maintainers and agents. The machine catalog and generated passports are derived from current source, Storybook, interaction, accessibility and package evidence.

Volatile totals are not repeated in this report. Their owners are:

- `docs/agent-context/ds-catalog.json` for exports, component groups, stories and passports;
- `docs/r09-documentation-gate.json` for the current R-09 gate result;
- `docs/component-story-coverage.json` for component-to-story classification;
- `docs/storybook-interaction-matrix.json` for interaction coverage;
- `docs/accessibility-full-report.json` for accessibility results.

## Maintained Routes

- [Documentation Index](../documentation-index.md)
- [User Guide](../user-guide.md)
- [Contributor Guide](../contributor-guide.md)
- [Maintainer Guide](../maintainer-guide.md)
- [Agent Context](../agent-context/README.md)
- [Component Passport Index](../agent-context/component-passports/README.md)

Generated catalog and passport files must be changed through `app/scripts/generate-r09-documentation.js`, not by hand.

## Verification

From `app/`:

```powershell
corepack yarn docs:r09:generate
corepack yarn docs:r09:check
corepack yarn agent:context:check
corepack yarn quality:agent-governance
corepack yarn quality:r09
```

The latest execution passed all R-09 checks. Exact counts remain in the machine owners above.

Closed corporate sources and external product repositories are outside this documentation route.
