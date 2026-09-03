# Documentation And Agent Governance

This directory owns the permanent rules for information architecture, fact ownership, artifact classification and agent readiness in Rovna UI.

## Documents

- [Fact Ownership](./fact-ownership.md): authoritative owners of changing project facts.
- `artifact-policy.md` and `artifact-policy.json`: tracking, regeneration, reading and cleanup rules for local and generated artifacts. They are created during artifact classification.
- [Agent And Documentation Readiness](./agent-readiness.md): permanent zero-state acceptance record and maintenance contract.

## Operating Model

1. Route a task through root and scoped `AGENTS.md`.
2. Resolve the exact fact owner.
3. Read only the target source and evidence.
4. Change source or generator, not a derivative artifact.
5. Run focused verification and the governance gate when routing or documentation changes.

Active guides explain current use. Generated documents expose current machine-derived facts. Evidence proves a check. History preserves chronology. These classes must not substitute for one another.

## Change Rule

Any change to routes, fact owners, artifact policy or generated documentation must update its checker in the same change. A governance rule without an executable acceptance check is incomplete.
