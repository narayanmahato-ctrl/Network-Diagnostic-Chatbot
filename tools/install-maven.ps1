$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$toolsDir = Join-Path $root '..' | Resolve-Path | ForEach-Object { Join-Path $_ 'tools' }
if (-not (Test-Path $toolsDir)) { New-Item -ItemType Directory -Path $toolsDir | Out-Null }
$zipPath = Join-Path $toolsDir 'apache-maven-3.9.9-bin.zip'
$extractDir = Join-Path $toolsDir 'apache-maven-3.9.9'
if (-not (Test-Path $zipPath)) {
    Write-Host "Downloading Maven to $zipPath..."
    curl.exe -L -o $zipPath 'https://dlcdn.apache.org/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.zip'
}
if (-not (Test-Path $extractDir)) {
    Write-Host "Extracting Maven to $extractDir..."
    Expand-Archive -LiteralPath $zipPath -DestinationPath $toolsDir -Force
}
Write-Host "Maven is ready at: $extractDir"
