param(
  [string]$GatewayBaseUrl = "http://localhost:5030",
  [string]$AuthDbConnectionString = "Server=localhost,14333;Database=CRM.AuthDb;User Id=sa;Password=NetMetric.Dev.Sql.2026!;TrustServerCertificate=True;Encrypt=False;MultipleActiveResultSets=True",
  [string]$AccountDbConnectionString = "Server=localhost,14333;Database=CRM.AccountDb;User Id=sa;Password=NetMetric.Dev.Sql.2026!;TrustServerCertificate=True;Encrypt=False;MultipleActiveResultSets=True",
  [switch]$CiOptional,
  [switch]$NoDbTokenSeed,
  [int]$TimeoutSeconds = 30
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$project = Join-Path $repoRoot "tools\NetMetric.LocalSmoke\NetMetric.LocalSmoke.csproj"

if (-not (Get-Command dotnet -ErrorAction SilentlyContinue)) {
  throw "Required command not found: dotnet"
}

$args = @(
  "run",
  "--project",
  $project,
  "--",
  "--gateway",
  $GatewayBaseUrl,
  "--timeout-seconds",
  $TimeoutSeconds
)

if (-not $NoDbTokenSeed) {
  $args += @("--auth-db", $AuthDbConnectionString)
}
else {
  $args += "--no-db-token-seed"
}

if (-not [string]::IsNullOrWhiteSpace($AccountDbConnectionString)) {
  $args += @("--account-db", $AccountDbConnectionString)
}

if ($CiOptional) {
  $args += "--ci-optional"
}

Push-Location $repoRoot
try {
  & dotnet @args
  exit $LASTEXITCODE
}
finally {
  Pop-Location
}
