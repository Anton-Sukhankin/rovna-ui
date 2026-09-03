# DS Rovna UI

Rovna UI is a local-first React design-system monorepository with component packages, Storybook, tests, package artifacts and documentation for reuse in product projects.

## Repository

- `app/packages/`: Rovna UI source packages and local compatibility workspaces.
- `app/.storybook/`: active Storybook configuration.
- `app/scripts/`: build, quality, release and documentation automation.
- `docs/`: current guides, generated agent context, evidence and history.
- `examples/`: isolated consumer checks for package and tarball boundaries.

Current technical status is maintained in [Current Project Status](./docs/current-project-status.md). Machine-derived component data is owned by the [Rovna UI Catalog](./docs/agent-context/ds-catalog.md).

## Local Storybook

From `app/`, serve the current static build:

```powershell
corepack yarn storybook:static:serve
```

Open `http://127.0.0.1:3000/`.

For active development or a fresh static build:

```powershell
corepack yarn storybook:local
corepack yarn storybook:local:build
```

The project runs from local files and public dependencies already represented by the current lockfile. Closed corporate registry, GitLab, Nexus, Figma and internal service access are not part of the workflow.

## Verification

Run focused checks first. The complete current acceptance route is:

```powershell
Set-Location app
corepack yarn quality:r11:suite
corepack yarn quality:r11
```

Documentation and agent routing are checked separately:

```powershell
corepack yarn docs:r09:check
corepack yarn quality:agent-governance
```

## Package Use

Supported packages can be rehearsed and consumed without a registry through local tarballs:

```powershell
Set-Location app
corepack yarn release:ds-only
corepack yarn consumers:ds-only
```

The source repository is licensed under MIT and prepared for GitHub. npm publication remains a separate owner action requiring control of the `@rovna-ui` scope and a configured publication target. See [Package Connection Guide](./docs/package-connection-guide.md) and [Maintainer Guide](./docs/maintainer-guide.md).

## Documentation Routes

- [Documentation Index](./docs/documentation-index.md)
- [User Guide](./docs/user-guide.md)
- [Contributor Guide](./docs/contributor-guide.md)
- [Maintainer Guide](./docs/maintainer-guide.md)
- [Storybook Runbook](./docs/storybook-runbook.md)
- [Agent Context](./docs/agent-context/README.md)
- [Final Quality Report](./docs/r-final-quality-report.md)
- [Documentation And Agent Governance](./docs/governance/README.md)

## Project Boundary

This repository owns the design system and Storybook only. S-Tracker and other consumer applications are outside the active scope and are not required to build, test, document or release Rovna UI.

## License

Rovna UI code and documentation are available under the [MIT License](./LICENSE). Third-party names and product-specific brand assets are subject to the separate [Trademark Notice](./TRADEMARKS.md).
