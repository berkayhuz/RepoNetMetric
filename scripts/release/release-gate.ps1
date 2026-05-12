param(
  [switch]$RunDevSmoke,
  [switch]$SkipSmoke,
  [switch]$SkipMigrationBundle,
  [switch]$SkipSecurityScan,
  [switch]$FailOnWarn,
  [switch]$FailFast,
  [switch]$CiOptionalSmoke
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$orchestrator = Join-Path $PSScriptRoot "release-gate.mjs"

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw "Required command not found: node"
}

if (-not (Test-Path $orchestrator)) {
  throw "Release gate orchestrator not found: $orchestrator"
}

$args = @()
if ($RunDevSmoke) { $args += "--run-dev-smoke" }
if ($SkipSmoke) { $args += "--skip-smoke" }
if ($SkipMigrationBundle) { $args += "--skip-migration-bundle" }
if ($SkipSecurityScan) { $args += "--skip-security-scan" }
if ($FailOnWarn) { $args += "--fail-on-warn" }
if ($FailFast) { $args += "--fail-fast" }
if ($CiOptionalSmoke) { $args += "--ci-optional-smoke" }

Push-Location $repoRoot
try {
  & node $orchestrator @args
  exit $LASTEXITCODE
}
finally {
  Pop-Location
}
