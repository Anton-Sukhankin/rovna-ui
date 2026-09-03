# F-20: Containerized Storybook

Status: `[!]` - container route prepared and statically validated; runtime verification is blocked because Docker CLI is unavailable.

Date: 2026-07-15

## Goal

Prepare a reproducible Storybook container route that uses only repository source, local workspace packages and public package/image sources. Closed corporate registries, hosts and services must not be used.

## Implemented Route

Created:

```text
.dockerignore
Dockerfile.storybook
compose.storybook.yml
docker/storybook-nginx.conf
app/scripts/validate-storybook-container.js
app/scripts/check-storybook-container.js
```

The Dockerfile uses two stages:

1. `node:22-bookworm-slim` installs Yarn `1.22.15`, restores dependencies from `https://registry.npmjs.org` and builds static Storybook through `storybook-f06`.
2. `nginx:1.27-alpine` serves only the generated static Storybook on container port `8080`.

Compose exposes the container on `http://localhost:3001/` by default. Port `3001` avoids a conflict with the already running local Storybook on port `3000`.

No host `node_modules`, `dist`, generated release artifact or host volume is required by the container definition.

## Safety Boundary

- active container configuration contains `0` closed corporate endpoints;
- package installation is pinned to the public npm registry by `app/.yarnrc`;
- image names are public Docker Hub images and the resulting application image is local-only: `ds-tend-ui-storybook:local`;
- Storybook telemetry is disabled during the build;
- no credentials, registry token, package publication or Git operation is defined;
- `.dockerignore` excludes local dependencies, generated outputs, credentials, diagnostics and raw source documentation.

A fresh image build requires explicit access to public Docker Hub and npmjs. It does not require or attempt access to any closed corporate environment. If base images and dependency layers are already cached, the same route can be rebuilt without fresh downloads.

## Static Validation

Run from the repository root:

```powershell
node app/scripts/validate-storybook-container.js
```

Result:

```text
staticValidation: passed
runtimeAvailable: false
corporateEndpointFindings: 0
hostPort: 3001
containerPort: 8080
```

Machine-readable evidence:

```text
tmp/f20-container-validation.json
```

The validator parses Compose with the local `yaml` package and checks the Dockerfile stages, pinned Yarn version, public registry, nginx route, health endpoint, port mapping, volume boundary and endpoint policy.

## Local Static-Build Diagnostic

The existing full development Storybook remains healthy on `http://localhost:3000/` with `938` stories and `215` docs entries.

Two local static-build attempts were made without installing dependencies:

- the root Yarn script could not resolve the Storybook binary through the existing Windows workspace PATH;
- direct Storybook full and preview-only builds reached esbuild, then failed with `Cannot read directory "../../../../..": Access is denied` while resolving files under the OneDrive workspace.

This is the previously known Windows/OneDrive path boundary, not a component compilation or dependency error. The Docker builder uses the isolated Linux path `/workspace/app`, but that assumption cannot be confirmed until Docker is available.

## Runtime Commands

When Docker Desktop or another compatible Docker Engine is available, run from the repository root:

```powershell
docker compose -f compose.storybook.yml build --pull storybook
docker compose -f compose.storybook.yml up -d storybook
node app/scripts/check-storybook-container.js
docker compose -f compose.storybook.yml logs --tail=100 storybook
```

Expected URL:

```text
http://localhost:3001/
```

The runtime checker requires:

- `/`, `/healthz`, `/index.json`, `/iframe.html` and `/project.json` return successfully;
- the index contains `938` stories and `215` docs entries;
- the first story iframe opens.

Stop the container with:

```powershell
docker compose -f compose.storybook.yml down
```

To use another host port:

```powershell
$env:TEND_UI_STORYBOOK_PORT = '3100'
$env:TEND_UI_STORYBOOK_URL = 'http://localhost:3100'
docker compose -f compose.storybook.yml up -d storybook
node app/scripts/check-storybook-container.js
```

## Verification Result

| Check | Result |
| --- | --- |
| Dockerfile created | Passed |
| Compose created and parsed | Passed |
| nginx config and `/healthz` contract | Passed statically |
| Public npm registry only | Passed |
| Closed corporate endpoints | Passed: `0` |
| Host volume dependency | Passed: none |
| Local Storybook regression | Passed: `938` stories + `215` docs |
| Docker CLI | Blocked: command not found |
| Image build | Not run: Docker unavailable |
| Container start/health | Not run: Docker unavailable |
| Container story index check | Not run: Docker unavailable |

## Decision

`F-20` is diagnostically complete with status `[!]`.

The missing container recipe blocker is closed. `DS-05.5` remains `[!]` only because the current machine has no Docker CLI, so image build and container runtime cannot be honestly marked as verified. Installing Docker is an environment-owner action and was not attempted.

## Next Group

```text
F-21: reconcile the main workflow after the F-branch, close superseded historical blockers and separate the remaining Docker, license/scope and S-Tracker environment gates.
```
