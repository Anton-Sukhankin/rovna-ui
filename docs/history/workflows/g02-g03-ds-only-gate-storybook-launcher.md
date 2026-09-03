# G-02 + G-03: DS-only Gate And Storybook Launcher

Status: `[x]`.

Date: 2026-07-29.

## Goal

Create a repeatable DS-only quality gate and remove the current Storybook dependency on the protected OneDrive/reparse parent path.

No external consumer project, dependency installation, network request, closed corporate source, Docker action, publication or Git mutation is part of this group.

## G-03 Path Strategy

On Windows the launcher temporarily maps `app/` to a free short drive letter with `subst`:

```text
T:\ -> <repository>\app
```

Storybook and esbuild therefore resolve files from `T:\...` and cannot walk into the protected OneDrive parent directories.

The mapping:

- exists only while the launcher runs;
- points to the existing files, so no source or `node_modules` copy is created;
- is released in a `finally` cleanup;
- uses no network installation;
- writes a JSON result to `tmp/g03-storybook-launcher.json`.

## Commands

From `app/`:

```powershell
node scripts/run-storybook-local.js
```

Manager and preview smoke suite:

```powershell
node scripts/run-storybook-local.js --smoke-suite
```

Equivalent package scripts:

```powershell
corepack yarn storybook:local
corepack yarn storybook:local:smoke
```

## G-03 Verification

| Check | Result |
| --- | --- |
| Preview-only smoke | Passed |
| Full manager smoke | Passed |
| Storybook version | 10.1.11 |
| Port | 3000 |
| Path strategy | Temporary `subst` drive |
| Network install | Disabled |
| Drive cleanup | Passed; `T:` released |

The remaining Vite message about `markdown-to-jsx` in `optimizeDeps.include` is non-fatal and did not change either exit code.

## G-02 Quality Gate

The executable gate is:

```powershell
node scripts/run-ds-only-quality-gate.js
```

Equivalent package script:

```powershell
corepack yarn quality:ds-only
```

The gate verifies:

- required DS-only project structure;
- dependency graph and Storybook launcher;
- workspace/story/MDX/test inventory;
- 15 core package artifacts;
- release tarball count and SHA-256 integrity;
- G-03 manager/preview smoke suite;
- source endpoint and secret policy;
- presence and status of internal isolated consumers;
- Git, owner/publication, extended-scope and test-execution gates.

Machine-readable result:

```text
tmp/g02-ds-only-quality-gate.json
```

## G-02 Result

```text
status: passed-with-open-gates
passed checks: 8 after G-07 package-scope integration
warnings: 4 after G-07 package-scope integration
blocking failures: 0
```

Confirmed inventory:

```text
46 workspaces
112 story files
215 MDX files
210 test/spec files
15/15 core packages with dist
15/15 release tarballs
0 checksum failures
0 secrets
0 active internal references
0 unreviewed internal references
```

Warnings intentionally carried forward:

1. seven runtime packages do not have `dist`;
2. Git has no initial commit or origin;
3. root license and `@10d` ownership are not confirmed;
4. 210 tests were inventoried but not executed by G-02;
5. isolated consumers were found; their later fresh execution passed in G-11/G-12.

## Decision

`G-02` and `G-03` are complete.

The OneDrive path is no longer a blocker for Storybook startup smoke. The next step must keep the manager server open, verify HTTP endpoints and current story counts, then produce a fresh static Storybook.

## Next Group

```text
G-04 + G-05: live Storybook endpoint verification and fresh static Storybook build.
```
