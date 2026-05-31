@echo off
REM Network Diagnostic Chatbot Build Script
REM Builds the project and creates executable JAR

echo ================================
echo Network Diagnostic Chatbot
echo Build Script
echo ================================
echo.

REM Check if Maven wrapper is available first
set MVN_CMD=mvn
if exist "mvnw.cmd" (
    set MVN_CMD=mvnw.cmd
    echo Using Maven Wrapper
) else (
    echo Using system Maven
)
echo.

REM Check if Maven command works
%MVN_CMD% -version >nul 2>nul
if errorlevel 1 (
    echo X Failed to execute Maven command: %MVN_CMD%
    pause
    exit /b 1
)
echo.

REM Check if Java is installed
where java >nul 2>nul
if errorlevel 1 (
    echo X Java is not installed!
    echo Please install JDK 11+ from https://www.oracle.com/java/technologies/downloads/
    pause
    exit /b 1
)

java -version 2>&1 | findstr /R "version" >nul
echo. Java is installed
echo.

REM Clean and build
echo Building project...
call %MVN_CMD% clean package -DskipTests


if errorlevel 1 (
    echo.
    echo X Build failed!
    pause
    exit /b 1
)

set ARTIFACT=target\network-diagnostic-chatbot-1.0.0.jar
set ALIAS=target\network-chatbot.jar

if exist "%ARTIFACT%" (
    copy /Y "%ARTIFACT%" "%ALIAS%" >nul
)

echo.
echo. Build successful!
echo.
echo. Executable JAR created:
if exist "%ARTIFACT%" (
    echo.    %ARTIFACT%
) else (
    echo.    %ALIAS%
)
echo.
echo. To run the application:
echo.    java -jar %ALIAS%
echo.
pause
