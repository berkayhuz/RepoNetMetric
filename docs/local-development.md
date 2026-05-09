# Local Development Guide

## 1. Install dependencies

```bash
pnpm install
```

## 2. Setup environment files

Copy templates from:

- `.env.example`
- `apps/<app-name>/.env.example`

and fill local non-sensitive values.

## 3. Validate workspace

```bash
pnpm run repo:validate
```

## 4. Run baseline checks

```bash
pnpm run frontend:lint
pnpm run frontend:typecheck
pnpm run frontend:build
pnpm run frontend:test
pnpm run frontend:coverage
pnpm run repo:format:check
```

## 5. Optional health checks

```bash
pnpm run frontend:health
```

## 6. Hook behavior

Installed git hooks:

- `pre-commit`: secret scan, lint-staged, selective typecheck
- `commit-msg`: Conventional Commit validation
- `pre-push`: optional local gitleaks + workspace validation + build verification

If hooks are not active, run:

```bash
pnpm run prepare
```
