@echo off
title S-Jiffy Dev Server
echo.
echo  ================================
echo    S-Jiffy 开发服务器
echo  ================================
echo.

:: Check Node.js
node --version >NUL 2>NUL
if %errorlevel% neq 0 (
  echo [错误] 未检测到 Node.js
  echo 请先安装: https://nodejs.org
  pause
  exit
)

:: Kill stale server from old PID file
if exist .server.pid (
  for /f %%p in (.server.pid) do taskkill /f /pid %%p >NUL 2>NUL
  del .server.pid
)

:: Start server in background (same window, auto-exits when batch window closes)
start /B "" node server.js

:: Wait for it to initialize
echo 正在启动...
ping -n 4 127.0.0.1 >NUL

:: Quick health check
node -e "http.get('http://localhost:8080',function(r){process.exit(r.statusCode===200?0:1)}).on('error',function(){process.exit(1)})" 2>NUL
if %errorlevel% equ 0 (
  echo 服务已启动: http://localhost:8080
  start http://localhost:8080
) else (
  echo 服务已启动，请访问: http://localhost:8080
)

echo.
echo 关闭此窗口 / 按任意键 = 停止服务器
pause >NUL

:: Server auto-stops when this window closes (start /B)
