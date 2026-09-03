# E-22: Offline-Public Archive Manifest Template

Date: 2026-07-06

## Purpose

Define the required manifest format for any offline-public package archive/cache used to restore Rovna UI dependencies.

This is a template. It does not import packages, install dependencies, build packages, launch Storybook, run Docker, publish packages or change source files.

## Required File Name

Recommended manifest file name inside the archive:

```text
offline-public-package-archive-manifest.json
```

Optional human-readable companion:

```text
offline-public-package-archive-manifest.md
```

## Archive Boundary

Allowed archive contents:

- package tarballs from public npm;
- package source archives from public GitHub when relevant;
- package cache files with public provenance;
- the archive manifest;
- checksum file.

Forbidden archive contents:

- resolved URLs from `packages.samoletgroup.ru`;
- private registry metadata;
- corporate GitLab/Nexus/Figma/CI artifacts;
- unverified `node_modules` tree;
- source changes to Rovna UI;
- generated `dist` files pretending to be build output of this project.

## JSON Template

```json
{
  "manifestVersion": "1.0",
  "createdAt": "YYYY-MM-DD",
  "createdBy": "person-or-tool",
  "purpose": "DS Rovna UI offline-public dependency restore",
  "sourcePolicy": {
    "allowedSources": [
      "public npm",
      "public GitHub",
      "local workspace",
      "local compensation"
    ],
    "forbiddenSources": [
      "internal registry",
      "packages.samoletgroup.ru",
      "corporate GitLab",
      "Nexus",
      "Figma",
      "CI/CD artifacts",
      "private service infrastructure"
    ]
  },
  "project": {
    "name": "DS Rovna UI",
    "rootPackage": "app/package.json",
    "packageManager": "yarn@1.22.15",
    "dependencyManifest": "docs/offline-public-dependency-package-manifest.md",
    "acquisitionPlan": "docs/offline-public-package-acquisition-plan.md"
  },
  "archive": {
    "name": "offline-public-package-archive.zip",
    "format": "zip",
    "checksumAlgorithm": "sha256",
    "checksum": "REQUIRED"
  },
  "packages": [
    {
      "package": "react",
      "requestedSpec": "^17.0.2",
      "resolvedVersion": "17.0.2",
      "priorityLane": "Lane 3. Foundational React Runtime",
      "sourceType": "public npm",
      "sourceUrl": "https://registry.npmjs.org/react/-/react-17.0.2.tgz",
      "archivePath": "packages/react-17.0.2.tgz",
      "integrityOrChecksum": "sha512-or-sha256-required",
      "license": "MIT",
      "compensationAllowed": "no",
      "notes": "Foundational runtime package; do not fake-stub."
    }
  ],
  "localPackagesNotIncluded": [
    {
      "package": "@rovna-ui/components",
      "route": "local workspace",
      "path": "app/packages/tend-ui"
    }
  ],
  "compensatedPackagesNotIncluded": [
    {
      "package": "classnames",
      "route": "local compensation workspace",
      "path": "app/packages/classnames"
    }
  ],
  "deferredPackages": [
    {
      "package": "jest",
      "reason": "Not required for first build/Storybook restore lane."
    }
  ],
  "validation": {
    "allPackagesHaveSourceUrl": false,
    "allPublicPackagesHaveChecksum": false,
    "containsClosedCorporateSource": true,
    "containsNodeModulesTree": true,
    "readyForImport": false
  }
}
```

## Required Package Fields

| Field | Required | Rule |
| --- | --- | --- |
| `package` | yes | Must match a package from `docs/offline-public-dependency-package-manifest.md` or be a transitive package discovered from public resolution. |
| `requestedSpec` | yes | Must match local `package.json` or record why it is transitive. |
| `resolvedVersion` | yes | Exact package version included in archive. |
| `priorityLane` | yes | Must match `docs/offline-public-package-acquisition-plan.md`. |
| `sourceType` | yes | `public npm`, `public GitHub`, `local workspace`, `local compensation`, or `deferred`. |
| `sourceUrl` | yes for public packages | Must not point to a forbidden source. |
| `archivePath` | yes for included packages | Relative path inside archive. |
| `integrityOrChecksum` | yes for included packages | Public integrity or computed checksum. |
| `license` | preferred | Use package metadata when available. |
| `compensationAllowed` | yes | `no`, `yes`, or `separate task only`. |

## Validation Rules

The archive is not ready for import unless all are true:

- every included package has a public or local source route;
- every included public package has an integrity/checksum;
- no source URL points to `packages.samoletgroup.ru`;
- no source URL points to internal registry, corporate GitLab, Nexus, Figma or CI/CD artifacts;
- the archive does not contain an unverified `node_modules` tree;
- foundational packages are not replaced by fake stubs;
- local workspace packages are not duplicated from the old internal registry;
- deferred packages are explicitly listed.

## Minimum First Archive Recommendation

For the first restore archive, prefer only the minimum lanes needed to unblock build/Storybook diagnostics:

1. Lane 1: Build Tooling Minimum.
2. Lane 2: Storybook And Vite Runtime.
3. Lane 3: Foundational React Runtime.
4. Minimum Lane 4: React/styled-components type packages.

Lane 5 complex UI mechanics may be added before full visual verification of table/tree/dnd/virtualized stories.

## E-22 Output

This template is paired with:

```text
docs/offline-public-import-staging-runbook.md
```

Next step:

```text
F-04C: repair the offline-public archive manifest and package paths.
```
