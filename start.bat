@echo off
title S-Jiffy Dev Server
chcp 65001 >NUL
ver >NUL
echo.
echo  ================================
echo    S-Jiffy Dev Server
echo  ================================
echo.

where node >NUL 2>NUL
if %errorlevel% neq 0 (
  echo [ERROR] Node.js not found
  echo Please install: https://nodejs.org
  pause
  exit /b 1
)

:: Kill stale server
if exist .server.pid (
  for /f %%p in (.server.pid) do taskkill /f /pid %%p >NUL 2>NUL
  del .server.pid
)

echo Starting server...
start /B "" node server.js
ping -n 4 127.0.0.1 >NUL

node -e "http.get('http://localhost:8080',function(r){process.exit(r.statusCode===200?0:1)}).on('error',function(){process.exit(1)})" 2>NUL
if %errorlevel% equ 0 (
  echo Server running at: http://localhost:8080
  start http://localhost:8080
) else (
  echo Server running at: http://localhost:8080
)

echo.
echo Press any key to stop server...
pause >NUL

if exist .server.pid (
  for /f %%p in (.server.pid) do taskkill /f /pid %%p >NUL 2>NUL
  del .server.pid
)
echo Server stopped.
timeout /t 1 /nobreak >NUL
