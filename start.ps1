$scriptDir = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
$serverPort = 8080
$pidFile = Join-Path $scriptDir ".server.pid"

Write-Host "`n ================================"
Write-Host "   S-Jiffy 开发服务器"
Write-Host " ================================`n"

# Check Node.js
try { $null = node --version } catch {
  Write-Host "[错误] 未检测到 Node.js"
  Write-Host "请先安装: https://nodejs.org`n"
  Read-Host "按 Enter 退出"
  exit
}

# Kill stale server
if (Test-Path $pidFile) {
  $oldPid = Get-Content $pidFile -Raw
  if ($oldPid) { try { Stop-Process -Id $oldPid.Trim() -Force -ErrorAction Stop } catch {} }
  Remove-Item $pidFile -Force
}

# Start server
Write-Host "正在启动..." -NoNewline
$server = Start-Process -FilePath "node" -ArgumentList (Join-Path $scriptDir "server.js") -NoNewWindow -PassThru
Start-Sleep -Seconds 3

# Verify
try {
  $req = Invoke-WebRequest -Uri "http://localhost:$serverPort/" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
  if ($req.StatusCode -eq 200) {
    Write-Host " OK"
    Write-Host "服务已启动: http://localhost:$serverPort"
    Start-Process "http://localhost:$serverPort"
  }
} catch {
  Write-Host ""
  Write-Host "服务已启动: http://localhost:$serverPort"
}

Write-Host "`n按 Enter 键停止服务器..."
Read-Host | Out-Null

# Stop server
Write-Host "正在关闭..." -NoNewline
try { $server | Stop-Process -Force } catch {}
if (Test-Path $pidFile) { Remove-Item $pidFile -Force }
Write-Host " OK"
Start-Sleep -Seconds 1
