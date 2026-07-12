@echo off
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8080"') do taskkill /f /pid %%a 2>NUL
start "S-Jiffy" cmd /c "node server.js & pause"
timeout /t 2 /nobreak >NUL
start http://localhost:8080
exit
