@echo off
chcp 65001 >NUL
title S-Jiffy Dev Server
echo.
echo  ================================
echo    S-Jiffy 开发服务器
echo  ================================
echo.

:: Check Node.js
where node >NUL 2>NUL
if errorlevel 1 (
  echo [错误] 请先安装 Node.js: https://nodejs.org
  pause
  exit /b 1
)

:: Start server ("" avoids PowerShell start cmdlet conflict)
echo 正在启动...
start /B "" node server.js
timeout /t 2 /nobreak >NUL

:: Open browser
echo 服务已启动: http://localhost:8080
start http://localhost:8080
echo 按任意键停止服务器...
pause >NUL

:: Stop server via PID file
echo 正在关闭...
if exist .server.pid (
  for /f %%p in (.server.pid) do taskkill /f /pid %%p >NUL 2>NUL
  del .server.pid
)
echo 已停止。
timeout /t 1 /nobreak >NUL
