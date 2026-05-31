# Network Diagnostic Chatbot - Setup Guide

Complete guide for setting up and running the full-stack Network Diagnostic Chatbot with React frontend and Java backend.

## Architecture Overview

```
┌─────────────────────────────────────┐
│   React Frontend (Port 3000)        │
│   - Chat Interface                  │
│   - Command Buttons                 │
│   - Message Display                 │
└──────────────┬──────────────────────┘
               │ HTTP/REST
               ▼
┌─────────────────────────────────────┐
│   Spring Boot Backend (Port 8080)   │
│   - REST API Controller             │
│   - Command Parser                  │
│   - Command Executor                │
│   - Network Diagnostics             │
└─────────────────────────────────────┘
```

## Prerequisites

### Required Software
- Java 11+ (check with `java -version`)
- Maven 3.6+ (check with `mvn -v`)
- Node.js 14+ (check with `node -v`)
- npm 6+ (check with `npm -v`)

### Optional
- Git for version control
- Visual Studio Code for development

## Installation & Setup

### Step 1: Build the Java Backend

1. Navigate to the project root:
   ```bash
   cd Network-Diagnostic-Chatbot
   ```

2. Build with Maven:
   ```bash
   mvn clean package
   ```

   This will:
   - Compile all Java source files
   - Run tests
   - Create `target/network-chatbot.jar`

### Step 2: Install Frontend Dependencies

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

   This installs:
   - React 18.2.0
   - Axios (HTTP client)
   - React Scripts (build tools)
   - Other required dependencies

3. Return to the project root (optional):
   ```bash
   cd ..
   ```

## Running the Application

### Terminal 1: Start the Java Backend

```bash
java -jar target/network-chatbot.jar
```

**Expected Output:**
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_|\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.7.14)
...
Started ChatbotApplication in X.XXX seconds
```

The backend will be running on `http://localhost:8080`

**Available API Endpoints:**
- `GET http://localhost:8080/api/health` - Health check
- `GET http://localhost:8080/api/info` - System information
- `GET http://localhost:8080/api/help` - Help information
- `POST http://localhost:8080/api/command` - Execute command

### Terminal 2: Start the React Frontend

```bash
cd frontend
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view network-chatbot-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://YOUR_IP:3000
```

The frontend will open automatically in your browser at `http://localhost:3000`

## Using the Application

### Via Web Interface

1. Open `http://localhost:3000` in your browser
2. You'll see the chat interface with:
   - Welcome message from the chatbot
   - Quick command buttons for common operations
   - Input field to type custom commands

### Quick Command Buttons

- **Network Info** - Display local network information
- **Local Network** - Show network status
- **Help** - Display all available commands
- **Ping Google** - Ping google.com
- **DNS Google** - DNS lookup for google.com
- **Port Check** - Check port 80 on google.com

### Manual Commands

Type any of these commands in the input field:

- `ping google.com` - Test connectivity to a host
- `dns google.com` - Resolve hostname to IP
- `port google.com 80` - Check if port is open
- `connect google.com 443` - Test connection
- `trace google.com` - Traceroute to host
- `info` - Display system information
- `help` - Show help message

## Project Structure

```
Network-Diagnostic-Chatbot/
├── src/
│   ├── main/
│   │   ├── java/com/networkbot/
│   │   │   ├── api/
│   │   │   │   └── ChatbotController.java (REST API)
│   │   │   ├── chatbot/
│   │   │   │   ├── ChatbotApplication.java (Spring Boot Entry)
│   │   │   │   └── Chatbot.java
│   │   │   ├── commands/
│   │   │   │   ├── CommandParser.java
│   │   │   │   └── CommandExecutor.java
│   │   │   ├── diagnostics/
│   │   │   │   ├── DiagnosticResult.java
│   │   │   │   └── NetworkDiagnostics.java
│   │   │   └── utils/
│   │   │       └── Logger.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── logback.xml
│   └── test/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatContainer.js
│   │   │   ├── MessageBubble.js
│   │   │   ├── MessageInput.js
│   │   │   └── CommandMenu.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── .env
│   └── README.md
├── pom.xml
├── QUICKSTART.md
└── README.md
```

## Configuration

### Backend Configuration

Edit `src/main/resources/application.properties`:

```properties
# Server port (default: 8080)
server.port=8080

# CORS allowed origins (for frontend)
# Already configured in ChatbotController for http://localhost:3000
```

### Frontend Configuration

Edit `frontend/.env`:

```properties
# API base URL (default: http://localhost:8080/api)
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

## Troubleshooting

### Backend Issues

**Error: "Port 8080 already in use"**
```bash
# Change port in application.properties
server.port=8081
```

**Error: "mvn: command not found"**
- Ensure Maven is installed: `mvn -v`
- Use the Maven wrapper if available: `./mvnw clean package` (on Windows: `mvnw.cmd clean package`)

**Error: "No main manifest attribute"**
- Rebuild the project: `mvn clean package`

### Frontend Issues

**Error: "Cannot find module 'react'"**
```bash
cd frontend
npm install
```

**Error: "Port 3000 already in use"**
```bash
PORT=3001 npm start
```

**Error: "Failed to connect to API"**
1. Verify backend is running: Check `http://localhost:8080/api/health`
2. Check CORS settings in ChatbotController.java
3. Verify .env file has correct API URL

### Connection Issues

**Frontend can't reach backend:**
1. Ensure backend is running on port 8080
2. Check if firewall is blocking port 8080
3. Verify CORS is properly configured

## Testing the API

### Using cURL

```bash
# Health check
curl http://localhost:8080/api/health

# Get system info
curl http://localhost:8080/api/info

# Execute a command
curl -X POST http://localhost:8080/api/command \
  -H "Content-Type: application/json" \
  -d '{"command":"ping google.com"}'
```

### Using Postman

1. Create a new POST request
2. URL: `http://localhost:8080/api/command`
3. Headers: `Content-Type: application/json`
4. Body:
   ```json
   {
     "command": "ping google.com"
   }
   ```
5. Click Send

## Performance Tips

- Keep the browser console open (`F12`) to check for errors
- Use Chrome DevTools for debugging frontend
- Check backend logs for detailed error messages
- Network operations may take a few seconds depending on connectivity

## Next Steps

### Enhancements
- [ ] Add real-time notifications
- [ ] Implement command history
- [ ] Add favorites/bookmarks
- [ ] Dark mode theme
- [ ] Export results as JSON/CSV
- [ ] Multi-language support

### Deployment
- Docker containerization
- Kubernetes deployment
- Cloud hosting (AWS, Azure, GCP)
- Docker Compose for local development

## Support & Documentation

- Java Backend: See `README.md` in project root
- React Frontend: See `frontend/README.md`
- API Documentation: Available at `GET /api/help`

## License

MIT License - See LICENSE file for details

---

**Last Updated:** May 2026
**Version:** 1.0.0
