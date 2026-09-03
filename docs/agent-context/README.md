# Rovna UI Agent Context

## Purpose

This directory provides a compact, source-grounded context for agents working with Rovna UI. It routes an agent to one package or component without requiring a full repository or documentation scan.

Current machine-derived counts and support states are owned by [ds-catalog.json](./ds-catalog.json). The readable catalog is [ds-catalog.md](./ds-catalog.md). Do not copy those changing values into this manual route.

## Minimal Context Package

For a component task read:

1. Root and nearest scoped `AGENTS.md`.
2. [Import Rules](./import-rules.md).
3. One exact [generated or curated passport](./component-passports/README.md).
4. One relevant migration recipe.
5. The exact package manifest, source, story and test.

For source-level debugging, expand only to direct imports and shared helpers used by the target. Reading all packages or all reports is a last diagnostic step, not the default.

## Selection Algorithm

1. Resolve a component, story, package or task through `corepack yarn agent:context` when available.
2. Confirm `artifactStatus` and preferred import in the generated catalog.
3. Open the exact passport and evidence IDs.
4. Inspect exact source/story/test files.
5. Run focused verification before a broader gate.

If a name is ambiguous, stop and select from the candidates returned by the resolver. Do not guess a package from the component name.

## Status Meaning

- `supported`: verified package artifact inside the release boundary.
- `source-only`: local source may exist, but product integration is not claimed.
- `Storybook render verified`: the story rendered in the current browser gate.
- `focused interaction evidence`: the group has explicit play or equivalent evidence for named behavior.
- `catalog render verified / behavior task-specific`: rendering is proven, but the requested mechanic needs a focused check.

## Curated Passports

- [Button](./component-passports/button.md)
- [Input](./component-passports/input.md)
- [Select](./component-passports/select.md)
- [Modal](./component-passports/modal.md)
- [Table](./component-passports/table.md)

The [passport index](./component-passports/README.md) contains all generated group and boundary passports. Curated passports add migration guidance and do not replace generated evidence.

## Migration Recipes

- [Replace Button](./migration-recipes/replace-button.md)
- [Replace Select](./migration-recipes/replace-select.md)
- [Replace Table](./migration-recipes/replace-table.md)
- [Migrate Form](./migration-recipes/migrate-form.md)
- [Migrate Drawer](./migration-recipes/migrate-drawer.md)
- [Migrate Tree](./migration-recipes/migrate-tree.md)
- [Migrate Upload](./migration-recipes/migrate-upload.md)
- [Migrate Complex Table](./migration-recipes/migrate-complex-table.md)

## Authority

- [Fact Ownership](../governance/fact-ownership.md)
- [Current Project Status](../current-project-status.md)
- [Package Connection Guide](../package-connection-guide.md)
- `app/packages/`

Large coverage, interaction, accessibility, API and quality JSON files are targeted evidence. Query the exact component, story or key rather than loading the whole file.

## Subagents

Use [Subagent Task Passport](./subagent-task-template.md). Every delegated task requires objective, fact owner, read scope, write scope, prohibited paths and acceptance commands.

See [Button Story Task Example](./subagent-task-example-button-story.md) for a complete narrow-scope passport.

## Prohibitions

- Do not invent package names, props, states or imports.
- Do not change the `@rovna-ui/*` scope without a separate breaking-change decision.
- Do not use closed registry, GitLab, Nexus, Figma or internal services.
- Do not treat source-only packages as release-ready.
- Do not use S-Tracker as design-system evidence.
- Do not edit generated catalog or generated passports manually.
- Do not claim npm publication or an open-source license without owner action.

## Regeneration

After changes to exports, stories, interactions, accessibility or package manifests, run from `app/`:

```powershell
corepack yarn docs:r09:generate
corepack yarn docs:r09:check
corepack yarn quality:r09
```
