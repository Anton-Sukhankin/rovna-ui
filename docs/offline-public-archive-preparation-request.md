# E-24: Offline-Public Archive Preparation Request

Date: 2026-07-06

## Purpose

Define the exact input needed to continue the offline-public dependency restore route.

`E-24` attempted to provide or create a reviewed offline-public archive, then rerun staging validation. In the current Codex shell, this cannot be completed because:

- network access is restricted;
- `tmp/offline-public-archive-staging/inbox/` is empty;
- no reviewed archive, manifest or checksum file has been provided;
- closed corporate sources remain forbidden.

This document is the preparation request for the archive that must be created or provided before staging validation can pass.

## Required Inbox Files

Place these files in:

```text
tmp/offline-public-archive-staging/inbox/
```

Required:

```text
offline-public-package-archive.zip
offline-public-package-archive-manifest.json
checksums.sha256
```

Accepted archive formats:

```text
.zip
.tgz
.tar.gz
```

## Manifest Contract

The manifest must follow:

```text
docs/offline-public-archive-manifest-template.md
```

The staging procedure must follow:

```text
docs/offline-public-import-staging-runbook.md
```

The previous validation report is:

```text
docs/offline-public-archive-validation-report.md
```

## First Archive Scope

The first archive should be minimal and focused on unblocking build and Storybook diagnostics.

Include these lanes first:

1. Lane 1: Build Tooling Minimum.
2. Lane 2: Storybook And Vite Runtime.
3. Lane 3: Foundational React Runtime.
4. Minimum Lane 4: React/styled-components type packages.

Do not include Lane 5 complex UI mechanics unless the archive source/provenance is already clean and reviewed.

## Minimum Package List

### Lane 1. Build Tooling Minimum

```text
typescript
tsc-alias
rollup
@rollup/plugin-commonjs
@rollup/plugin-node-resolve
@rollup/plugin-typescript
rollup-plugin-copy
rollup-plugin-dts
rollup-plugin-import-css
rollup-plugin-postcss
turbo
```

### Lane 2. Storybook And Vite Runtime

```text
storybook
@storybook/react-vite
@storybook/addon-docs
@storybook/addon-designs
vite
@vitejs/plugin-react
vite-plugin-markdown
```

### Lane 3. Foundational React Runtime

```text
react
react-dom
styled-components
```

### Minimum Lane 4. Type Packages Needed For Build

```text
@types/react
@types/react-dom
@types/styled-components
```

## Exclude From First Archive Unless Needed

These can be deferred until build/Storybook reaches the next concrete blocker:

```text
jest
@testing-library/*
release-it
@commitlint/*
express
http-proxy-middleware
nock
nodemon
vite-bundle-visualizer
yarn-deduplicate
```

## Do Not Include From External Sources

These are already local or locally compensated:

```text
@rovna-ui/components-*
@rovna-ui/eslint-config
@rovna-ui/prettier-config
classnames
query-string
samolet-oauth2
uuid
@types/uuid
```

## Forbidden Sources

Reject the archive if any source points to:

```text
packages.samoletgroup.ru
repository/npm-all
internal registry
corporate GitLab
Nexus
Figma
CI/CD artifacts
private service infrastructure
```

## Required Checksums

Every included public package must have one of:

- public npm integrity;
- SHA256 checksum in `checksums.sha256`;
- both.

The archive itself must also have a checksum.

## E-24 Decision

`E-24` is complete as a blocked input step.

The archive cannot be created or validated in the current environment because no archive input is available and public network access is restricted.

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

Do not rerun build or Storybook until dependencies are restored or an approved subset is imported.
