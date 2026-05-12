param(
  [switch]$SkipBuild,
  [switch]$SkipSonar,
  [switch]$NoApiStart,
  [switch]$SkipAuthDbReset
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

. (Join-Path $PSScriptRoot "dev\common.ps1")

function Get-ApiProjects {
  $repoRoot = Get-RepoRoot
  $projects = New-Object System.Collections.Generic.List[object]

  $gatewayProject = Join-Path $repoRoot "platform\gateway\src\NetMetric.ApiGateway\NetMetric.ApiGateway.csproj"
  if (Test-Path $gatewayProject) {
    $projects.Add([pscustomobject]@{
      Name = "api-gateway"
      Path = $gatewayProject
    })
  }

  $serviceApiProjects = Get-ChildItem -Path (Join-Path $repoRoot "services") -Recurse -Filter "*.API.csproj" -File -ErrorAction SilentlyContinue
  foreach ($project in $serviceApiProjects) {
    $projects.Add([pscustomobject]@{
      Name = [IO.Path]::GetFileNameWithoutExtension($project.Name).ToLowerInvariant()
      Path = $project.FullName
    })
  }

  return $projects
}

function Ensure-AuthWebEnvLocal {
  $repoRoot = Get-RepoRoot
  $path = Join-Path $repoRoot "apps\auth-web\.env.local"
  if (Test-Path $path) {
    Write-Log "auth-web .env.local already exists, keeping current values."
    return
  }

  @"
NODE_ENV=development
APP_ENV=development
NEXT_PUBLIC_APP_NAME=NetMetric-auth-web
NEXT_PUBLIC_API_GATEWAY_BASE_URL=http://localhost:5030
NEXT_PUBLIC_APP_ORIGIN=http://localhost:7002
"@ | Set-Content -Path $path

  Write-Log "Created apps/auth-web/.env.local for gateway-based local development."
}

function Reset-AuthDatabase {
  Write-Log "Resetting auth database (CRM.AuthDb) for deterministic local startup."
  $sql = @"
IF DB_ID('CRM.AuthDb') IS NOT NULL
BEGIN
  ALTER DATABASE [CRM.AuthDb] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
  DROP DATABASE [CRM.AuthDb];
END

CREATE DATABASE [CRM.AuthDb];
"@

  & docker exec -i netmetric-sql /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "NetMetric.Dev.Sql.2026!" -C -Q $sql | Out-Null
  if ($LASTEXITCODE -ne 0) {
    throw "Failed to reset CRM.AuthDb in SQL container."
  }
}

Require-Command -Name docker
Require-Command -Name dotnet
Require-Command -Name pnpm

$repoRoot = Get-RepoRoot
Set-Location $repoRoot

Write-Log "Stopping previously tracked local API processes."
Remove-AllTrackedProcesses

Write-Log "Stopping stale dotnet run API processes."
foreach ($project in Get-ApiProjects) {
  Stop-DotNetRunForProject -ProjectPath $project.Path
}

Write-Log "Removing conflicting pre-existing dev containers (if any)."
Remove-ConflictingDevContainers

Write-Log "Starting docker dependencies (SQL, Redis, RabbitMQ, SonarQube)."
Invoke-Compose -ComposeArgs @("up", "-d")

Write-Log "Waiting for base infrastructure endpoints."
Wait-TcpPort -Address "localhost" -Port 14333 -TimeoutSeconds 180
Wait-TcpPort -Address "localhost" -Port 6379 -TimeoutSeconds 120
Wait-TcpPort -Address "localhost" -Port 5672 -TimeoutSeconds 120
Wait-HttpOk -Url "http://localhost:15672" -TimeoutSeconds 120
Wait-HttpOk -Url "http://localhost:9000/api/system/status" -TimeoutSeconds 240

if (-not $SkipAuthDbReset) {
  Reset-AuthDatabase
}

Ensure-AuthWebEnvLocal

if (-not $SkipBuild) {
  Write-Log "Restoring and building solution."
  dotnet restore NetMetric.slnx --locked-mode
  if ($LASTEXITCODE -ne 0) { throw "dotnet restore failed." }
  dotnet build NetMetric.slnx -c Release --no-restore -m:1 -v minimal
  if ($LASTEXITCODE -ne 0) { throw "dotnet build failed." }
}

if (-not $NoApiStart) {
  $sharedGatewaySecret = "NETMETRIC_DEV_GATEWAY_SIGNING_SECRET_2026_0001"
  $authConnectionString = "Server=localhost,14333;Database=CRM.AuthDb;User Id=sa;Password=NetMetric.Dev.Sql.2026!;TrustServerCertificate=True;Encrypt=False;MultipleActiveResultSets=True"

  $commonEnv = @{
    ASPNETCORE_ENVIRONMENT = "Development"
    DOTNET_ENVIRONMENT = "Development"
    LocalDevelopment__DisableHttpsRedirection = "true"
  }

  foreach ($project in Get-ApiProjects) {
    $envVars = @{}
    foreach ($key in $commonEnv.Keys) { $envVars[$key] = $commonEnv[$key] }

    if ($project.Name -eq "api-gateway") {
      $envVars["Security__TrustedGateway__Keys__0__Secret"] = $sharedGatewaySecret
    }

    if ($project.Name -match "auth\.api$") {
      $envVars["ConnectionStrings__IdentityConnection"] = $authConnectionString
      $envVars["Messaging__RabbitMq__Uri"] = "amqp://guest:guest@localhost:5672/"
      $envVars["Infrastructure__DistributedCache__Provider"] = "Redis"
      $envVars["Infrastructure__DistributedCache__RedisConnectionString"] = "localhost:6379,abortConnect=false"
      $envVars["Security__TrustedGateway__Keys__0__Secret"] = $sharedGatewaySecret
      $envVars["Security__TrustedGateway__Keys__1__Secret"] = "NETMETRIC_DEV_ACCOUNT_LOCAL_SECRET_2026_0001"
    }

    Start-DotNetProject -Name $project.Name -ProjectPath $project.Path -EnvironmentVariables $envVars
  }

  Write-Log "Waiting for auth and gateway readiness."
  Wait-HttpOk -Url "http://localhost:5030/health/ready" -TimeoutSeconds 120
  Wait-HttpOk -Url "http://localhost:5030/auth/health/ready" -TimeoutSeconds 120
}

if (-not $SkipSonar) {
  Write-Log "SonarQube container is running on http://localhost:9000"
}

Write-Log "Dev environment is up."
