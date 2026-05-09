# Quality Gates

## Mandatory gates

The repository enforces these minimum checks:

1. `pnpm run repo:validate`
2. `pnpm run frontend:lint`
3. `pnpm run frontend:typecheck`
4. `pnpm run repo:format:check`
5. `pnpm run frontend:build`

`pnpm run repo:check` executes the primary non-build gates in one command.

## Git hook gates

### pre-commit

- staged secret scan
- lint-staged checks (Prettier + ESLint for relevant files)
- selective package typecheck based on changed paths

### commit-msg

- Conventional Commit format validation

### pre-push

- workspace validation
- build verification

## CI gates

GitHub Actions pipeline:

1. Path filtering and changed-scope detection
2. Workspace validation
3. App scaffold validation matrix (for changed app scopes)
4. Package quality matrix (`lint`, `typecheck`, `build`, `test`, `coverage`) for changed packages only
5. Domain strategy signaling (`dotnet`, `native`, `deploy`) via job-level `if` gates
6. Security pipeline with Gitleaks

All CI installs use:

- pnpm cache
- frozen lockfile
- corepack
- Node version pinned from `.nvmrc`

Execution is Turborepo-based for dependency-graph-aware scheduling and caching.

## Health checks

Run `pnpm run frontend:health` to execute:

- dead import detection
- unused export detection
- circular dependency detection
- dependency version consistency checks
