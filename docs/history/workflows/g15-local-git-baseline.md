# G-15 Local Git Baseline

Updated: 2026-07-29.

## Result

`G-15`: `[x]` - the DS-only repository now has one intentional local root commit on `main`.

No remote was configured and no push, registry publication or closed corporate access was attempted.

## Committed Boundary

The commit uses the explicit source allowlist from `docs/github-initial-commit-plan.md`:

```text
.gitattributes
.gitignore
.dockerignore
README.md
Dockerfile.storybook
compose.storybook.yml
docker/
github-snapshot-policy.json
github-internal-reference-allowlist.json
app/
docs/
examples/
```

Local dependency trees, generated builds, release archives, diagnostics, agent settings and original source reference documents remain excluded by `.gitignore`.

## Audit Evidence

| Check | Result |
| --- | --- |
| Candidate files | `6028` |
| Candidate size | `25,596,762` bytes |
| Oversized files | `0` |
| Secret findings | `0` |
| Active internal references | `0` |
| Unreviewed internal references | `0` |
| Generated/local-only leakage | `0` |
| Commit count | `1` |
| Configured remotes | `0` |

The 49 inert historical references accepted by the source audit remain documented by exact path in `github-internal-reference-allowlist.json`.

## Quality Gate

The post-commit DS-only gate reports:

```text
14 passed, 1 warning, 0 blocking failures
```

The single warning is owner/publication authorization. It concerns the missing root license, public-distribution rights and unverified ownership of the `@10d` npm scope; it does not invalidate the local commit or block Storybook.

## Decision

The local Git baseline is complete and suitable for continued local work and review. Remote setup and push are deliberately separate actions. Public publication must wait for the G-16 owner decisions.

## Completion Update

G-18 subsequently passed the final DS-only gate. No mandatory local G-group remains; G-17 remains optional until Docker CLI is available.
