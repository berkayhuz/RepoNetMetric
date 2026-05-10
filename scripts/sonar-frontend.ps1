param(
    [string]$SonarUrl = "http://localhost:9000",
    [switch]$StrictCoverage
)

$ErrorActionPreference = "Stop"

function Invoke-Checked {
    param(
        [string]$StepName,
        [scriptblock]$Command
    )

    Write-Host "==> $StepName"
    & $Command
    if ($LASTEXITCODE -ne 0) {
        Write-Error "$StepName failed with exit code $LASTEXITCODE."
        exit $LASTEXITCODE
    }
}

function Invoke-PnpmScriptIfExists {
    param(
        [string]$ScriptName,
        [switch]$ContinueOnFailure
    )

    if ($null -eq $packageScripts.$ScriptName) {
        Write-Warning "package.json script '$ScriptName' not found. Skipping."
        return $false
    }

    Write-Host "==> pnpm run $ScriptName"
    pnpm run $ScriptName
    if ($LASTEXITCODE -ne 0) {
        if ($ContinueOnFailure) {
            Write-Warning "pnpm run $ScriptName failed with exit code $LASTEXITCODE. Continuing."
            return $false
        }

        Write-Error "pnpm run $ScriptName failed with exit code $LASTEXITCODE."
        exit $LASTEXITCODE
    }

    return $true
}

if ([string]::IsNullOrWhiteSpace($env:SONAR_TOKEN)) {
    Write-Error "SONAR_TOKEN environment variable is required. Set it first: `$env:SONAR_TOKEN='your-token'"
    exit 1
}

if ($null -eq (Get-Command -Name "sonar-scanner" -ErrorAction SilentlyContinue)) {
    Write-Error "sonar-scanner was not found in PATH. Install it first (example: npm install -g sonarqube-scanner), then retry."
    exit 1
}

if ($null -eq (Get-Command -Name "pnpm" -ErrorAction SilentlyContinue)) {
    Write-Error "pnpm was not found in PATH. Install pnpm and retry."
    exit 1
}

if (-not (Test-Path -LiteralPath ".\sonar-project.frontend.properties")) {
    Write-Error "sonar-project.frontend.properties not found at repository root."
    exit 1
}

if (-not (Test-Path -LiteralPath ".\package.json")) {
    Write-Error "package.json not found at repository root."
    exit 1
}

$package = Get-Content -Raw -LiteralPath ".\package.json" | ConvertFrom-Json
$packageScripts = $package.scripts
$ciFlag = [string]$env:CI
$strictCoverageMode = $StrictCoverage -or ($ciFlag -match '^(?i:true|1|yes)$')

if ($strictCoverageMode) {
    Write-Host "Strict coverage mode is enabled."
}
else {
    Write-Host "Local coverage mode is enabled."
}

Invoke-Checked -StepName "pnpm install --frozen-lockfile" -Command {
    pnpm install --frozen-lockfile
}

if ($null -ne $packageScripts."frontend:check") {
    Invoke-PnpmScriptIfExists -ScriptName "frontend:check" | Out-Null
}
else {
    if ($null -ne $packageScripts."frontend:typecheck") {
        Invoke-PnpmScriptIfExists -ScriptName "frontend:typecheck" | Out-Null
    }

    if ($null -ne $packageScripts."frontend:lint") {
        Invoke-PnpmScriptIfExists -ScriptName "frontend:lint" | Out-Null
    }

    if ($null -ne $packageScripts."frontend:test") {
        Invoke-PnpmScriptIfExists -ScriptName "frontend:test" | Out-Null
    }
}

$coverageRan = $false
if ($null -ne $packageScripts."frontend:coverage") {
    $coverageRan = Invoke-PnpmScriptIfExists -ScriptName "frontend:coverage" -ContinueOnFailure
}
elseif ($null -ne $packageScripts."coverage") {
    $coverageRan = Invoke-PnpmScriptIfExists -ScriptName "coverage" -ContinueOnFailure
}
else {
    if ($strictCoverageMode) {
        Write-Error "Strict coverage mode: no coverage script found in package.json."
        exit 1
    }

    Write-Warning "No coverage script found in package.json. Sonar analysis will continue without new LCOV generation."
}

if (-not $coverageRan) {
    if ($strictCoverageMode) {
        Write-Error "Strict coverage mode: coverage script did not run successfully."
        exit 1
    }

    Write-Warning "Coverage step did not run successfully. Sonar analysis will continue; coverage may appear as 0%."
}

Invoke-Checked -StepName "sonar-scanner" -Command {
    sonar-scanner `
        -Dproject.settings=sonar-project.frontend.properties `
        -Dsonar.host.url="$SonarUrl" `
        -Dsonar.token="$env:SONAR_TOKEN"
}
