# H-E: React Compatibility And Experimental Decisions

Updated: 2026-07-30.

## H-08 Result

The same `@10d/tend-ui@4.82.0` release tarball was installed and rendered in three isolated public-npm consumers:

| React | Install | Vite build | DOM smoke | Contract decision |
| --- | --- | --- | --- | --- |
| `17.0.2` | passed | passed | passed | Declared and runtime supported. |
| `18.3.1` | passed | passed | passed | Runtime-compatible in the smoke scenario; peer contract is not yet expanded. |
| `19.2.0` | passed | passed | passed | Runtime-compatible in the smoke scenario; peer contract is not yet expanded. |

The machine-readable results and warning lists are stored in `docs/react-compatibility.json`.

### Peer Contract

The release remains officially declared for `react` and `react-dom` `^17.0.2`. React 18 and 19 produced peer warnings because the 21 package manifests still declare React 17. Their successful provider/Button render is useful compatibility evidence, but it is not a promise that every legacy component and third-party primitive works across all three majors.

Expanding the peer range is deferred until the complete Jest, Storybook interaction, accessibility and isolated-consumer suites are run natively under each React major.

## H-09 Decisions

| Package | Decision | Evidence and condition for change |
| --- | --- | --- |
| `@10d/tend-ui-columns-settings` | `defer` | Stories and tests exist, but no `dist` or tarball contract; promote together with filters/table after artifact and accessibility gates. |
| `@10d/tend-ui-filters` | `defer` | Stories and tests pass locally, but the standalone package is outside the supported artifact chain; promote with its dependent packages. |
| `@10d/tend-ui-table` | `defer` | Rich Storybook and 15 test files pass, but it depends on two deferred standalone packages and has unresolved critical a11y findings. |
| `@10d/tend-ui-tree` | `defer` | Rich Storybook and three test files pass, but DnD, semantics, snapshot stability and artifact packaging need a dedicated promotion gate. |
| `@10d/tend-ui-ai-chat` | `exclude` | No stories or verified artifact; query/store feature integration is outside the portable design-system release. |
| `@10d/tend-ui-notifications` | `exclude` | Requires authentication, realtime and query infrastructure; keep source-only/mocked in this repository. |
| `@10d/tend-ui-search-assistant` | `exclude` | Requires service and corporate-auth-shaped flows; keep source-only/mocked and out of the public package boundary. |

`defer` means the source remains visible and testable in Storybook but is not promised as an installable package. `exclude` means the feature is not part of the portable design-system distribution; this does not delete its source.

## Source Policy

The compatibility installs used only local Tend UI tarballs and `https://registry.npmjs.org`. No corporate registry, GitLab, Nexus, Figma or service environment was contacted.

## Next Group

`H-F / H-10`: prepare GitHub CI and public-delivery documentation while retaining owner blocks for license, scope ownership and publication authorization.
