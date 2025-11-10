# serve.ps1 — safe helper to copy images into kebab-case folder and open homepage
# Run this from the repository root in PowerShell.

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
$source = Join-Path $scriptRoot 'HTML\6 images'
$dest = Join-Path $scriptRoot 'HTML\6-images'

if (-not (Test-Path $source)) {
  Write-Host "Source folder not found: $source" -ForegroundColor Yellow
  Write-Host "If your images are already in 'HTML\\6-images', you can just run: Start-Process (Join-Path $scriptRoot 'HTML\Educonet.html')" -ForegroundColor Cyan
  exit 1
}

# Create destination folder if needed
if (-not (Test-Path $dest)) {
  New-Item -ItemType Directory -Path $dest | Out-Null
}

Get-ChildItem -Path $source -File | ForEach-Object {
  $new = ($_.Name -replace ' ', '-') -replace '__','-'
  $new = $new.ToLower()
  $dstPath = Join-Path $dest $new
  Copy-Item -Path $_.FullName -Destination $dstPath -Force
  Write-Host "Copied: $($_.Name) -> $new"
}

Write-Host "All files copied to: $dest" -ForegroundColor Green

# Open the homepage in the default browser
$homepage = Join-Path $scriptRoot 'HTML\Educonet.html'
if (Test-Path $homepage) {
  Start-Process $homepage
} else {
  Write-Host "Could not find homepage at $homepage" -ForegroundColor Red
}
