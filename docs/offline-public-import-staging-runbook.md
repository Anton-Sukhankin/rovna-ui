# E-22: Offline-Public Import Staging Runbook

Date: 2026-07-06

## Purpose

Define how to stage, inspect and validate an offline-public package archive before any dependency restore/import step.

This runbook does not install dependencies, build packages, launch Storybook, run Docker, publish packages or change source files.

## Required Inputs

| Input | Required | Notes |
| --- | --- | --- |
| Offline archive | yes | `.zip`, `.tgz` or folder prepared from public/offline-public sources. |
| Archive manifest | yes | Must follow `docs/offline-public-archive-manifest-template.md`. |
| Checksum file | yes | SHA256 or stronger. |
| Acquisition plan | yes | `docs/offline-public-package-acquisition-plan.md`. |
| Dependency manifest | yes | `docs/offline-public-dependency-package-manifest.md`. |

## Staging Location

Use only a staging folder under the project:

```text
tmp/offline-public-archive-staging/
```

Do not extract directly into:

```text
app/
app/node_modules/
app/packages/
```

## Protected Files

The staging process must not modify:

```text
app/package.json
app/yarn.lock
app/.yarnrc
app/.storybook/
app/packages/
app/node_modules/
app/packages/*/dist
```

## Staging Procedure

### 1. Place Archive In Staging Inbox

Expected inbox path:

```text
tmp/offline-public-archive-staging/inbox/
```

The archive and manifest should be placed there before validation.

### 2. Verify Manifest Exists

Required files:

```text
offline-public-package-archive-manifest.json
checksums.sha256
```

If the manifest is absent, stop.

### 3. Verify Source Boundary

Search the manifest and extracted metadata for forbidden strings:

```text
packages.samoletgroup.ru
repository/npm-all
gitlab
nexus
figma
ci
```

Any package that points to a closed corporate source must be rejected.

### 4. Verify Package Checksums

Every included public package must have:

- source URL;
- archive path;
- integrity or checksum;
- resolved version.

If a checksum is missing, stop.

### 5. Verify Priority Lanes

Every package must be mapped to one of:

- Lane 1. Build Tooling Minimum;
- Lane 2. Storybook And Vite Runtime;
- Lane 3. Foundational React Runtime;
- Lane 4. Type Packages Needed For Build;
- Lane 5. Complex UI Mechanics;
- Lane 6. Runtime Utilities And Service Support;
- Lane 7. Dev/Test/Release Tooling;
- local workspace;
- local compensation;
- deferred.

Unknown packages are allowed only when marked as public transitive dependencies with provenance.

### 6. Verify No Unreviewed `node_modules`

The archive must not include a ready-made `node_modules` tree unless a separate approval/inspection step explicitly accepts it as diagnostic-only.

Preferred archive content:

```text
packages/*.tgz
offline-public-package-archive-manifest.json
checksums.sha256
```

### 7. Create Validation Report

Write the result to:

```text
docs/offline-public-archive-validation-report.md
```

The report must include:

- archive name;
- archive checksum;
- package count;
- lanes covered;
- forbidden source scan result;
- checksum verification result;
- missing packages;
- rejected packages;
- import recommendation.

## Import Boundary

`E-22` does not import packages.

After a successful staging validation, the next step may choose one of:

| Route | When |
| --- | --- |
| Yarn cache import | Archive contains Yarn-compatible cache/tarballs with provenance. |
| Local package folder import | Archive contains reviewed package tarballs to be used by an explicit offline install command. |
| Diagnostic-only `node_modules` import | Only if separately approved and clearly marked as non-production verification. |
| Stop and compensate | Archive is missing packages that must be replaced locally. |

## Stop Conditions

Stop immediately if:

- manifest is missing;
- checksum file is missing;
- a source points to `packages.samoletgroup.ru`;
- a source requires closed corporate access;
- package provenance is unclear;
- archive contains unreviewed `node_modules`;
- the archive attempts to overwrite protected project files;
- foundational packages are replaced by fake stubs.

## E-22 Decision

`E-22` is complete when these two documents exist:

```text
docs/offline-public-archive-manifest-template.md
docs/offline-public-import-staging-runbook.md
```

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```

Do not rerun build or Storybook until dependencies are restored or an approved subset is imported.
