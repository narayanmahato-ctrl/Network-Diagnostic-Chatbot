@echo off
REM Start both backend and frontend

echo ================================
echo Network Diagnostic Chatbot
echo Starting Backend & Frontend
echo ================================
echo.

REM Start Backend in a new window
echo Starting Backend Server (Java Spring Boot)...
start "Backend - Network Diagnostic Chatbot" cmd /c run.bat

REM Wait a moment for backend to start
timeout /t 3 /nobreak

REM Start Frontend in a new window
echo Starting Frontend Server (React)...
cd frontend
start "Frontend - Network Diagnostic Chatbot" cmd /c "npm start"

echo.
echo ================================
echo Both servers starting...
echo Backend:  http://localhost:8080
echo Frontend: http://localhost:3000
echo ================================
