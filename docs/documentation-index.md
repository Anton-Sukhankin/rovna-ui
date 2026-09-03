# Rovna UI Documentation

This index routes readers to the smallest current document set for their role. It does not maintain independent project counters. Current metrics come from [Current Project Status](./current-project-status.md) and the generated [Rovna UI Catalog](./agent-context/ds-catalog.md).

## Design-System User

Read:

1. [User Guide](./user-guide.md)
2. [Storybook Runbook](./storybook-runbook.md)
3. [Package Connection Guide](./package-connection-guide.md)
4. [Current Project Status](./current-project-status.md)

Use this route to browse components, run Storybook and connect supported packages.

## Contributor

Read:

1. [Contributor Guide](./contributor-guide.md)
2. `app/AGENTS.md`
3. One exact [component passport](./agent-context/component-passports/README.md)
4. The target source, story and test

Use this route for components, stories, tests, accessibility and focused bug fixes.

## Maintainer

Read:

1. [Maintainer Guide](./maintainer-guide.md)
2. [Package Connection Guide](./package-connection-guide.md)
3. [Public API Versioning Policy](./public-api-versioning-policy.md)
4. [GitHub Repository Settings](./github-repository-settings.md)
5. [Final Quality Report](./r-final-quality-report.md)

Use this route for package artifacts, release order, public API, security, CI and GitHub handoff.

## Agent Or Subagent

Read:

1. Root `AGENTS.md`
2. The nearest scoped `AGENTS.md`
3. [Agent Context](./agent-context/README.md)
4. One exact passport and migration recipe
5. [Fact Ownership](./governance/fact-ownership.md) only for changing project facts
6. [Agent And Documentation Readiness](./governance/agent-readiness.md) only for governance or routing acceptance

Use [Subagent Task Passport](./agent-context/subagent-task-template.md) for delegated work. Do not load all documentation or large evidence reports by default.

## Documentation Classes

- Active guides describe current use and are linked above.
- Generated catalogs and passports expose current machine-derived facts.
- Evidence proves quality gates and is read by exact key or task.
- History preserves completed work and does not define current status.

See `docs/AGENTS.md` and [Documentation Governance](./governance/README.md) for edit and routing rules.

## Boundary

S-Tracker and other product repositories are outside the DS-only scope. Closed corporate sources are not required or requested. Public publication remains an owner-controlled action separate from local design-system readiness.
