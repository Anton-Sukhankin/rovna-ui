# F-02 Git Repository Repair

## Purpose

This document records `F-02`: repair or initialize the local Git repository state.

The goal was to make `git status` work locally so the project can later be prepared for GitHub publication.

## Initial Problem

The workspace contained a `.git` path, but Git did not recognize the project as a repository.

Observed state:

| Check | Result |
| --- | --- |
| `.git` path exists | yes |
| `.git` attributes | `ReadOnly`, `Directory`, `Archive`, `ReparsePoint` |
| `.git` contents | no normal Git files visible |
| `git status --short` | failed |
| `git rev-parse --show-toplevel` | failed |
| `git init` before repair | failed with `Permission denied` while writing `.git/description` |

## Repair Action

The invalid `.git` reparse point was not deleted. It was moved aside inside the workspace:

```text
.git.broken-reparsepoint-20260706-173419
```

Then a new repository was initialized:

```text
git init -b main
```

## Result

Status: `[x] complete`

`git status --short` now works.

Current untracked top-level project content:

```text
.gitignore
README.md
app/
docs/
source-docs/
```

The temporary `tmp/` folder and the broken `.git` backup are excluded by the new root `.gitignore`.

## Added Git Ignore Rules

Created:

```text
.gitignore
```

The root ignore file excludes:

- dependency folders;
- build outputs;
- Storybook static output;
- local staging and diagnostic folders;
- the saved broken `.git` reparse point backup;
- logs and local editor files.

## Not Done

- no commit was created;
- no remote repository was added;
- no push to GitHub was attempted;
- no dependency install;
- no build;
- no Storybook launch;
- no Docker build;
- no package publication;
- no edits inside `S-Tracker`;
- no closed corporate source access.

## Decision

`F-02` is complete.

The project now has a working local Git repository on branch `main`, but it is not yet committed or connected to GitHub.

## Next Step

Proceed to:

```text
F-04C: repair the offline-public archive manifest and package paths.
```
