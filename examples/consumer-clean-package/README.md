# Rovna UI Clean Package Consumer Smoke

This example verifies the `F-09` package entrypoint/export cleanup.

It is still local and offline, but it is cleaner than `examples/consumer-smoke`: imports go through the built `@rovna-ui/components` package exports instead of explicit diagnostic aliases for every Rovna UI subpath.

## Verified Scenario

- `@rovna-ui/components/theme`
- `@rovna-ui/components/primitives/Button`
- built `dist/package.json` `exports`
- package-level local workspace mapping for `@rovna-ui/*` packages
- no hand-written aliases for internal `@rovna-ui/icons/*`, `@rovna-ui/utils/*`, `@rovna-ui/locale/*` subpaths

Verified again in `G-12` on 2026-07-29:

- Vite build passed;
- `708` modules transformed;
- built DOM check found one button;
- rendered text was `F-09 Clean Package Button`.

## Command

From the repository root:

```powershell
Set-Location app
corepack yarn vite build --config ../examples/consumer-clean-package/vite.config.mjs
```

## Limit

This is not a registry install. It simulates installed packages by mapping local workspace package names to their built local outputs.
