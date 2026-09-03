# Rovna UI Tarball Consumer

This example is copied into a generated isolated project by `F-13`.

The rehearsal script creates its `package.json`, installs the fifteen Rovna UI release artifacts from local tarballs, resolves public dependencies from the reviewed offline-public archive, and runs build plus DOM smoke checks through the main `@rovna-ui/components` package contract.

The example intentionally has no aliases to `app/packages`, `app/node_modules` or other monorepo paths.

`G-12` repeated the full route on 2026-07-29: 15 Rovna UI tarballs installed with Yarn offline, 705 Vite modules transformed and the provider/Button DOM smoke passed.
