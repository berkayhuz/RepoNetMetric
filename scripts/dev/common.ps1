Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-RepoRoot {
  return (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
}

function Get-DevStateRoot {
  $root = Join-Path (Get-RepoRoot) ".local\dev"
  New-Item -ItemType Directory -Path $root -Force | Out-Null
  return $root
}

function Get-ProcessRegistryPath {
  return (Join-Path (Get-DevStateRoot) "processes.json")
}

function Write-Log {
  param([string]$Message)
  Write-Host ("[{0}] {1}" -f (Get-Date -Format "HH:mm:ss"), $Message)
}

function Require-Command {
  param([string]$Name)
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "Required command not found: $Name"
  }
}

function Invoke-Compose {
  param([string[]]$ComposeArgs)
  $repoRoot = Get-RepoRoot
  if ($null -eq $ComposeArgs -or $ComposeArgs.Count -eq 0) {
    throw "Invoke-Compose requires at least one docker compose command argument."
  }

  & docker compose -f (Join-Path $repoRoot "docker-compose.dev.yml") @ComposeArgs
  if ($LASTEXITCODE -ne 0) {
    throw "docker compose failed: $($ComposeArgs -join ' ')"
  }
}

function Remove-ConflictingDevContainers {
  $names = @(
    "netmetric-sql",
    "netmetric-redis",
    "netmetric-rabbitmq",
    "netmetric-sonar-db",
    "netmetric-sonarqube"
  )

  foreach ($name in $names) {
    $existingIdRaw = & docker ps -a --filter "name=^/$name$" --format "{{.ID}}"
    $existingId = if ($null -eq $existingIdRaw) { "" } else { ([string]$existingIdRaw).Trim() }
    if (-not [string]::IsNullOrWhiteSpace($existingId)) {
      Write-Log "Removing conflicting container: $name ($existingId)"
      & docker rm -f $name | Out-Null
      if ($LASTEXITCODE -ne 0) {
        throw "Failed to remove conflicting container: $name"
      }
    }
  }
}

function Wait-HttpOk {
  param(
    [Parameter(Mandatory = $true)][string]$Url,
    [int]$TimeoutSeconds = 120
  )

  $deadline = (Get-Date).AddSeconds($TimeoutSeconds)
  while ((Get-Date) -lt $deadline) {
    try {
      $response = Invoke-WebRequest -Uri $Url -Method Get -UseBasicParsing -TimeoutSec 5 -MaximumRedirection 0
      if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 400) {
        return
      }
    } catch {
      $statusCode = $null
      if ($null -ne $_.Exception -and
          $null -ne $_.Exception.PSObject.Properties["Response"] -and
          $null -ne $_.Exception.Response -and
          $null -ne $_.Exception.Response.PSObject.Properties["StatusCode"]) {
        $statusCode = [int]$_.Exception.Response.StatusCode
      }
      if ($null -ne $statusCode -and $statusCode -ge 200 -and $statusCode -lt 400) {
        return
      }
      Start-Sleep -Seconds 2
      continue
    }
    Start-Sleep -Seconds 2
  }
  throw "Timeout waiting for HTTP endpoint: $Url"
}

function Wait-TcpPort {
  param(
    [Parameter(Mandatory = $true)][string]$Address,
    [Parameter(Mandatory = $true)][int]$Port,
    [int]$TimeoutSeconds = 120
  )

  $deadline = (Get-Date).AddSeconds($TimeoutSeconds)
  while ((Get-Date) -lt $deadline) {
    $client = $null
    try {
      $client = New-Object System.Net.Sockets.TcpClient
      $async = $client.BeginConnect($Address, $Port, $null, $null)
      if ($async.AsyncWaitHandle.WaitOne(2000, $false) -and $client.Connected) {
        $client.EndConnect($async) | Out-Null
        return
      }
    } catch {
      # keep retrying until timeout
    } finally {
      if ($null -ne $client) {
        $client.Dispose()
      }
    }
    Start-Sleep -Seconds 2
  }

  throw "Timeout waiting for TCP endpoint: $Address`:$Port"
}

function Load-ProcessRegistry {
  $path = Get-ProcessRegistryPath
  if (-not (Test-Path $path)) {
    return @()
  }
  $raw = Get-Content -Path $path -Raw
  if ([string]::IsNullOrWhiteSpace($raw)) {
    return @()
  }
  return @($raw | ConvertFrom-Json)
}

function Save-ProcessRegistry {
  param([array]$Entries)
  $path = Get-ProcessRegistryPath
  $Entries | ConvertTo-Json -Depth 5 | Set-Content -Path $path
}

function Add-ProcessRegistryEntry {
  param(
    [string]$Name,
    [string]$ProjectPath,
    [int]$ProcessId
  )
  $entries = Load-ProcessRegistry
  $entries = @($entries | Where-Object { $_.Name -ne $Name })
  $entries += [pscustomobject]@{
    Name       = $Name
    ProjectPath = $ProjectPath
    ProcessId  = $ProcessId
    StartedAt  = (Get-Date).ToString("o")
  }
  Save-ProcessRegistry -Entries $entries
}

function Remove-AllTrackedProcesses {
  $entries = Load-ProcessRegistry
  foreach ($entry in $entries) {
    try {
      $process = Get-Process -Id ([int]$entry.ProcessId) -ErrorAction SilentlyContinue
      if ($null -ne $process) {
        & taskkill.exe /PID $process.Id /T /F | Out-Null
        Write-Log "Stopped process [$($entry.Name)] pid=$($process.Id)"
      }
    } catch {
      Write-Log "Failed stopping process [$($entry.Name)] pid=$($entry.ProcessId): $($_.Exception.Message)"
    }
  }
  Save-ProcessRegistry -Entries @()
}

function Stop-DotNetRunForProject {
  param(
    [Parameter(Mandatory = $true)][string]$ProjectPath
  )

  $normalized = $ProjectPath.ToLowerInvariant()
  $dotnetProcesses = Get-CimInstance Win32_Process -Filter "Name = 'dotnet.exe'" -ErrorAction SilentlyContinue
  if ($null -eq $dotnetProcesses) {
    return
  }

  foreach ($process in $dotnetProcesses) {
    $commandLine = [string]$process.CommandLine
    if ([string]::IsNullOrWhiteSpace($commandLine)) {
      continue
    }

    $commandLineLower = $commandLine.ToLowerInvariant()
    if ($commandLineLower.Contains(" run ") -and $commandLineLower.Contains($normalized)) {
      try {
        & taskkill.exe /PID $process.ProcessId /T /F | Out-Null
        Write-Log "Stopped stale dotnet run process pid=$($process.ProcessId) for project [$ProjectPath]"
      } catch {
        Write-Log "Failed stopping stale dotnet run process pid=$($process.ProcessId): $($_.Exception.Message)"
      }
    }
  }
}

function Start-DotNetProject {
  param(
    [Parameter(Mandatory = $true)][string]$Name,
    [Parameter(Mandatory = $true)][string]$ProjectPath,
    [Parameter(Mandatory = $true)][hashtable]$EnvironmentVariables
  )

  $repoRoot = Get-RepoRoot
  $stateRoot = Get-DevStateRoot
  $logsRoot = Join-Path $stateRoot "logs"
  New-Item -ItemType Directory -Path $logsRoot -Force | Out-Null

  $stdoutLog = Join-Path $logsRoot "$Name.stdout.log"
  $stderrLog = Join-Path $logsRoot "$Name.stderr.log"

  $assignments = @(
    "`$ErrorActionPreference='Stop'"
    "Set-Location '$repoRoot'"
  )
  foreach ($k in $EnvironmentVariables.Keys) {
    $value = [string]$EnvironmentVariables[$k]
    $escaped = $value.Replace("'", "''")
    $assignments += "`$env:$k = '$escaped'"
  }
  $projectArg = $ProjectPath.Replace("'", "''")
  $assignments += "dotnet run --no-launch-profile --project '$projectArg'"
  $cmd = ($assignments -join "; ")

  $process = Start-Process -FilePath "powershell.exe" `
    -ArgumentList @("-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", $cmd) `
    -RedirectStandardOutput $stdoutLog `
    -RedirectStandardError $stderrLog `
    -WindowStyle Hidden `
    -PassThru

  Start-Sleep -Seconds 1
  if ($process.HasExited) {
    $stderr = if (Test-Path $stderrLog) { Get-Content -Path $stderrLog -Raw } else { "" }
    throw "Failed to start $Name. Process exited early. $stderr"
  }

  Add-ProcessRegistryEntry -Name $Name -ProjectPath $ProjectPath -ProcessId $process.Id
  Write-Log "Started $Name pid=$($process.Id)"
}
