# Current Evidence Index

Machine evidence proves the current Rovna UI quality state. It is not a narrative entrypoint and must be read by exact file and key.

## Evidence Owners

| Domain | Current evidence | Regeneration or check |
|---|---|---|
| Component and story coverage | `docs/component-story-coverage.json` | `corepack yarn components:coverage` |
| Agent catalog and passports | `docs/agent-context/ds-catalog.json` | `corepack yarn docs:r09:generate` |
| Interactions and async reliability | `docs/storybook-interaction-matrix.json`, R-03 reports | `corepack yarn quality:r03` |
| Accessibility | `docs/accessibility-full-report.json`, R-04 reports | `corepack yarn quality:r04` |
| Visual, responsive and browser | R-05 and Q visual reports | `corepack yarn quality:r05` |
| Public API and types | `app/public-api-baseline.json`, R-06 reports | `corepack yarn quality:r06` |
| Package artifacts and performance | `docs/r07-package-artifacts.json`, R-07 reports | `corepack yarn quality:r07` |
| Security, SBOM and licenses | R-08 reports, `docs/sbom.cdx.json` | `corepack yarn quality:r08` |
| Documentation | `docs/r09-documentation-gate.json` | `corepack yarn quality:r09` |
| GitHub and CI readiness | R-10 reports | `corepack yarn quality:r10` |
| Final acceptance | `docs/r-final-quality-report.json` | `corepack yarn quality:r11` |

## Read Policy

- Use a human guide or generated summary first.
- Query only the component, story, package or check involved in the task.
- Do not copy a full large JSON report into agent context.
- Do not manually edit machine evidence. Change its source or generator and rerun the owning command.
- Evidence paths remain stable when scripts and CI consume them directly. Physical location does not make a report an active instruction.
