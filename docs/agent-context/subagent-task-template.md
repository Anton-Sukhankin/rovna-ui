# Rovna UI Subagent Task Passport

Use one passport per delegated task. Replace every placeholder before dispatch. Do not broaden scope after dispatch without an explicit new decision.

## Objective

`<One concrete result the subagent must deliver>`

## Current State

`<Observed behavior and evidence, without assumptions>`

## Target State

`<Measurable behavior after the change>`

## Fact Owner

`<Exact source, generated owner or governance decision>`

## Read Scope

- `<Exact file or narrowly scoped directory>`
- `<Exact story, test, passport or report key>`

## Write Scope

- `<Exact files that may be changed>`

## Prohibited Paths And Actions

- Do not read or change S-Tracker or another consumer project.
- Do not access closed corporate services or registries.
- Do not change files outside Write Scope.
- Do not edit generated output directly.
- Do not install dependencies, clean Git state or revert unrelated changes unless explicitly authorized.

## Generated-File Rule

`<Name the generator and regeneration command, or state that no generated files are involved>`

## Acceptance Commands

```text
<Focused command 1>
<Focused command 2>
```

## Expected Report

Report changed files, behavior, exact verification results, unresolved risks and any scope that was intentionally not touched.

## Escalation Condition

Stop and report when the fact owner contradicts source behavior, the required file lies outside Write Scope, a proposed action needs a closed source, or an acceptance command cannot run for a new reason.
