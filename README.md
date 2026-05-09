# NetMetric Monorepo

Multi-platform monorepo foundation with a thin root orchestration layer and a production-grade frontend platform baseline.

## Workspace Layout

- `apps/*`: frontend application slots (Next.js-ready)
- `packages/frontend/*`: shared frontend platform packages
- `services/*`: .NET runtime services
- `platform/*`: cross-cutting backend platform capabilities
- `packages/dotnet/*`: reusable .NET packages
- `native/*`: native helper components (C/C++)
- `deploy/*`: deployment and infrastructure artifacts
- `docs/*`: architecture, quality, and contributor documentation
- `.github/*`: CI/CD workflows and ownership controls

## Quick Start

1. `pnpm install`
2. `pnpm run repo:validate`
3. `pnpm run repo:check`

## Quality Gates

- `pnpm run frontend:lint`
- `pnpm run frontend:typecheck`
- `pnpm run frontend:build`
- `pnpm run frontend:test`
- `pnpm run frontend:coverage`
- `pnpm run repo:format:check`

## Workspace Health

- `pnpm run frontend:health`

Includes dead import checks, unused export checks, circular dependency detection, and dependency consistency checks.

## Documentation

- [Contributing](./CONTRIBUTING.md)
- [Frontend Architecture](./docs/frontend-architecture.md)
- [Environment Setup](./docs/environment-setup.md)
- [Local Development Guide](./docs/local-development.md)
- [Workspace Commands](./docs/workspace-commands.md)
- [Frontend Platform Governance](./docs/frontend-platform-governance.md)
- [Kubernetes and Helm Assessment](./docs/kubernetes-helm-assessment.md)
- [Multi-Platform Monorepo Governance](./docs/multi-platform-monorepo-governance.md)
- [TypeScript Governance](./docs/typescript-governance.md)
- [Quality Gates](./docs/quality-gates.md)
