@echo off
REM Network Diagnostic Chatbot Runner Script
REM This script runs the built application

setlocal enabledelayedexpansion

set JAR_FILE=target\network-diagnostic-chatbot-1.0.0.jar
set ALT_JAR=target\network-chatbot.jar
set ORIGINAL_JAR=target\network-diagnostic-chatbot-1.0.0.jar.original

echo ================================
echo Network Diagnostic Chatbot
echo ================================
echo.

REM Choose existing runnable JAR
if not exist "%JAR_FILE%" if exist "%ALT_JAR%" (
    set JAR_FILE=%ALT_JAR%
)
if not exist "%JAR_FILE%" if exist "%ORIGINAL_JAR%" (
    set JAR_FILE=%ORIGINAL_JAR%
)

if not exist "%JAR_FILE%" (
    echo X JAR file not found: %JAR_FILE%
    echo.
    echo Please build the project first:
    echo   build.bat
    echo.
    pause
    exit /b 1
)

echo. JAR file found
echo.

REM Check if Java is installed
where java >nul 2>nul
if errorlevel 1 (
    echo X Java is not installed!
    pause
    exit /b 1
)

echo. Java is installed
echo.

REM Run the application
echo. Starting Network Diagnostic Chatbot in a new window...
echo.

start "Network Diagnostic Chatbot" cmd /k "cd /d "%~dp0" && java -jar "%JAR_FILE%""

echo.
echo The backend is starting in a new terminal window.
pause
