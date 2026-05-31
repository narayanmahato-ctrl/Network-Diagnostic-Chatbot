# Quick Start Guide - Network Diagnostic Chatbot

## 5-Minute Setup

### Step 1: Extract/Navigate to Project
```bash
cd Network-Diagnostic-Chatbot
```

### Step 2: Build the Project

**Windows:**
```bash
build.bat
```

**Linux/Mac:**
```bash
bash build.sh
chmod +x build.sh
./build.sh
```

**Or manually with Maven:**
```bash
mvn clean package
```

### Step 3: Run the Application

```bash
java -jar target/network-chatbot.jar
```

## First Commands to Try

Once the chatbot starts, try these commands:

### 1. Check Help
```
help
```

### 2. Get Network Info
```
info
```

### 3. Ping Google
```
ping google.com
```

### 4. Check DNS
```
dns github.com
```

### 5. Test Port
```
port google.com 80
```

### 6. Test Connectivity
```
connect github.com 443
```

## Common Scenarios

### Diagnose No Internet Connection
```
1. ping 8.8.8.8          (Test basic connectivity)
2. dns google.com        (Test DNS resolution)
3. info                  (Check local network)
```

### Test Specific Service
```
1. dns service.example.com    (Resolve the hostname)
2. port service.example.com 8080  (Check if port is open)
3. connect service.example.com 8080 (Test connection)
```

### Trace Network Path
```
trace destination.com
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `?` | Show help |
| `q` | Quit application |
| Ctrl+C | Force quit (if needed) |
| ↑ Arrow | Previous command (if supported by terminal) |

## Getting Help

In the application, use:
- `help` - Full command reference
- `?` - Quick help

## Output Interpretation

### Success Output
```
╔═══════════════════════════════════════╗
║ DIAGNOSTIC RESULT
╠═══════════════════════════════════════╣
║ Test Type: PING
║ Target: google.com
║ Status: ✓ SUCCESS
║ Message: Host is reachable
╚═══════════════════════════════════════╝
```

### Failed Output
```
║ Status: ✗ FAILED
║ Message: Host is unreachable
```

## Troubleshooting

### "Command not found: mvn"
- Install Maven from: https://maven.apache.org/download.cgi
- Add Maven bin directory to PATH

### "Java not found"
- Install JDK 11+ from: https://www.oracle.com/java/technologies/downloads/
- Add Java bin directory to PATH

### "Port check always fails"
- The host might be unreachable
- Try ping first to verify connectivity
- The port might be firewalled

### "Ping doesn't work on Windows"
- Ensure you have admin privileges
- Windows Firewall might be blocking
- Try a different hostname

### "No output from traceroute"
- Traceroute requires elevated privileges on some systems
- Some networks block ICMP/traceroute packets
- Try ping first to verify connectivity

## Project Structure Summary

```
Network-Diagnostic-Chatbot/
├── pom.xml          ← Build configuration
├── build.sh         ← Linux/Mac build script
├── build.bat        ← Windows build script
├── README.md        ← Full documentation
├── CONFIG.md        ← Configuration guide
├── QUICKSTART.md    ← This file
└── src/
    ├── main/java/com/networkbot/
    │   ├── chatbot/      ← Main chatbot logic
    │   ├── commands/     ← Command parsing/execution
    │   ├── diagnostics/  ← Network diagnostic utilities
    │   └── utils/        ← Utility functions
    └── test/java/       ← Unit tests
```

## Next Steps

1. Read `README.md` for comprehensive documentation
2. Read `CONFIG.md` for advanced configuration
3. Explore the source code in `src/main/java/`
4. Run unit tests: `mvn test`

## Need Help?

Check these resources:
- `help` command in the application
- `README.md` - Full documentation
- `CONFIG.md` - Configuration options
- Source code comments - Inline documentation

---

**Happy diagnosing! 🔍**
