param(
    [string]$ProjectKey = "netmetric_backend",
    [string]$ProjectName = "NetMetric Backend",
    [string]$SonarUrl = "http://localhost:9000",
    [string]$Solution = ".\NetMetric.slnx",
    [string]$Configuration = "Release"
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

if ([string]::IsNullOrWhiteSpace($env:SONAR_TOKEN)) {
    Write-Error "SONAR_TOKEN environment variable is required. Set it first: `$env:SONAR_TOKEN='your-token'"
    exit 1
}

$resolvedSolution = Resolve-Path -LiteralPath $Solution -ErrorAction SilentlyContinue
if ($null -eq $resolvedSolution) {
    Write-Error "Solution file not found: $Solution"
    exit 1
}
$resolvedSolutionPath = $resolvedSolution.Path

& dotnet sonarscanner --version *> $null
if ($LASTEXITCODE -ne 0) {
    Write-Error "dotnet sonarscanner is not installed. Install it with: dotnet tool install --global dotnet-sonarscanner"
    exit 1
}

Invoke-Checked -StepName "dotnet sonarscanner begin" -Command {
    dotnet sonarscanner begin `
        /k:"$ProjectKey" `
        /n:"$ProjectName" `
        /d:sonar.host.url="$SonarUrl" `
        /d:sonar.token="$env:SONAR_TOKEN" `
        /d:sonar.cs.opencover.reportsPaths="**/coverage.opencover.xml" `
        /d:sonar.exclusions="**/bin/**,**/obj/**,**/node_modules/**,**/.next/**,**/dist/**,**/build/**,**/coverage/**,**/.turbo/**" `
        /d:sonar.coverage.exclusions="**/Migrations/**,**/*.generated.cs,**/*Generated*.cs,**/*Designer.cs,**/Program.cs"
}

Invoke-Checked -StepName "dotnet restore" -Command {
    dotnet restore $resolvedSolutionPath
}

Invoke-Checked -StepName "dotnet build" -Command {
    dotnet build $resolvedSolutionPath -c $Configuration --no-restore
}

Invoke-Checked -StepName "dotnet test (OpenCover coverage)" -Command {
    dotnet test $resolvedSolutionPath `
        -c $Configuration `
        --no-build `
        --collect:"XPlat Code Coverage" `
        --results-directory ".\TestResults" `
        -- DataCollectionRunSettings.DataCollectors.DataCollector.Configuration.Format=opencover
}

Invoke-Checked -StepName "dotnet sonarscanner end" -Command {
    dotnet sonarscanner end /d:sonar.token="$env:SONAR_TOKEN"
}
