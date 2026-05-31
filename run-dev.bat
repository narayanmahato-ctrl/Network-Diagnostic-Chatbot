@echo off
REM Run both backend and frontend for development

echo ================================
echo Network Diagnostic Chatbot
echo Development Runner
echo ================================
echo.

REM Ensure script runs from repository root
pushd "%~dp0" || exit /b 1

REM Check Java and Maven for backend
where java >nul 2>nul
if errorlevel 1 (
    echo X Java is not installed!
    echo Please install Java JDK 11+.
    pause
    exit /b 1
)

where mvn >nul 2>nul
if errorlevel 1 (
    echo X Maven is not installed!
    echo Please install Maven from https://maven.apache.org/
    pause
    exit /b 1
)

REM Check npm for frontend
where npm >nul 2>nul
if errorlevel 1 (
    echo X npm is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Starting backend and frontend in new windows...
echo.

start "Network Diagnostic Backend" cmd /k "cd /d "%~dp0" && mvn spring-boot:run"
start "Network Diagnostic Frontend" cmd /k "cd /d "%~dp0frontend" && npm start"

echo Both windows should now be starting. Close this window if you want to keep them running.
popd
exit /b 0