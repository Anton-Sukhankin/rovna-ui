# Publication Configuration

This directory contains credential-free publication templates only.

- `npmjs.npmrc.example` is the selected npmjs route and must not become active until `@rovna-ui` scope ownership is confirmed.
- `github-packages.npmrc.example` is a fallback template and requires replacing `NAMESPACE` with a controlled GitHub user or organization.
- `scope-migration-plan.json` records the completed local migration to `@rovna-ui` and the remaining ownership gate.

Never commit a real token or copy an authenticated user-level `.npmrc` into this repository.

Validate the current decision from `app/`:

```powershell
corepack yarn release:validate-target
```

The validator passing means the blocked decision is internally consistent. It does not authorize publication.
