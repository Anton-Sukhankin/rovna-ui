# Rovna UI Consumer Smoke Example

This example is a tracked version of the `F-07` isolated consumer smoke test.

It is diagnostic, not a clean production integration. The example uses Vite aliases and small ESM shims to point at local `app/packages/*/dist` outputs. Those aliases document the current package-consumption gaps that must be removed before registry or GitHub Packages publication.

## Verified Scenario

- React/Vite consumer app.
- `RovnaUI` provider from `@rovna-ui/components/theme`.
- `Button` from `@rovna-ui/components/primitives/Button`.
- Production Vite build and built DOM verification passed again in `G-12`.
- The current G-12 build transformed 704 modules and rendered one button with text `F-07 Smoke Button`.

## Preconditions

The repository must already have:

- restored `app/node_modules`;
- built `dist` outputs for main/key packages;
- available Vite and React dependencies through `app/node_modules`.

These conditions were satisfied locally after `F-04G`, `F-05A` and `F-07`.

## Diagnostic Command

From the repository root:

```powershell
Set-Location app
corepack yarn vite build --config ../examples/consumer-smoke/vite.config.mjs
```

Optional local dev server:

```powershell
Set-Location app
corepack yarn vite --config ../examples/consumer-smoke/vite.config.mjs --host 127.0.0.1 --port 3100 --strictPort
```

## Important Limit

This example confirms only the diagnostic sandbox route. Clean built-package and registry-free tarball routes are separately verified by the other G-12 examples; real registry publication still requires owner/license/scope decisions.

The clean route is tracked in:

```text
docs/f08-github-publication-and-connection-plan.md
```
