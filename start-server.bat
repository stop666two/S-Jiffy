@echo off
chcp 65001 >NUL
echo S-Jiffy - 正在启动...
:: Kill any process using port 8080
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8080" ^| findstr "LISTENING"') do (
  taskkill /f /pid %%a 2>NUL
)
timeout /t 1 /nobreak >NUL
:: Start server
start "S-Jiffy" /B node server.js
:: Wait for server to start
timeout /t 2 /nobreak >NUL
:: Verify server is running
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8080" ^| findstr "LISTENING"') do (
  echo Server started on port 8080 (PID: %%a)
  start http://localhost:8080
)
exit
