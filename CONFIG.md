# Network Diagnostic Chatbot - Configuration Guide

## Configuration Files

### pom.xml
Maven configuration file that defines:
- Project metadata
- Dependencies (GSON, SLF4J, Logback, JUnit)
- Build plugins for compilation and packaging
- Main class entry point

## Runtime Configuration

### Logging Configuration
- Log file: `chatbot.log` (created in application directory)
- Log levels: INFO, WARNING, ERROR, DEBUG
- Format: [YYYY-MM-DD HH:MM:SS] LEVEL: Message

### Network Settings
- Connection timeout: 5000 ms (5 seconds)
- Traceroute max hops: 15 (displayed limit: 20 lines)
- Platform detection: Automatic OS detection for ping/traceroute commands

### Command Processing
- Case-insensitive input
- Regex-based parameter extraction
- Automatic parameter validation

## System Requirements

### Minimum
- Java Runtime Environment (JRE) 11+
- 50 MB disk space
- Network connectivity

### Recommended
- Java Development Kit (JDK) 11+
- Maven 3.6+
- 100 MB disk space
- System admin/root privileges for advanced diagnostics

## Environment Variables

### Optional
- `JAVA_HOME`: Path to Java installation (for mvn execution)
- `MAVEN_HOME`: Path to Maven installation

## Troubleshooting Configuration Issues

### Build Fails with "Java version not found"
- Solution: Install JDK 11 or higher
- Verify: `java -version` in command line

### Port Check Timeout
- Default timeout: 5 seconds
- Cannot be changed without code modification
- Increase timeout by editing NetworkDiagnostics.java

### Ping/Traceroute Not Working
- Windows: Ensure ping.exe is in system PATH
- Linux/Mac: Ensure ping is installed (`which ping`)
- Solution: May require elevated privileges

## Advanced Configuration

To modify network timeout or other parameters, edit:
- `NetworkDiagnostics.java`: socket timeout values
- `CommandExecutor.java`: response formatting
- `Logger.java`: log file location or format

## Dependencies Configuration

All dependencies are defined in `pom.xml`. To add new dependencies:

1. Add to `<dependencies>` section in pom.xml
2. Run: `mvn clean install`
3. Restart the application

Current dependencies:
- GSON 2.10.1 (JSON processing)
- SLF4J 2.0.5 (Logging API)
- Logback 1.4.5 (Logging implementation)
- JUnit 4.13.2 (Testing)

## Performance Tuning

### For Better Responsiveness
- Reduce socket timeout (edit NetworkDiagnostics.java)
- Reduce traceroute hop limit
- Use SSD for log file storage

### For Better Reliability
- Increase socket timeout
- Reduce concurrent operations
- Enable verbose logging in Logger.java

## Security Considerations

- No authentication required (standalone CLI)
- Logs are stored locally without encryption
- Network operations depend on system firewall rules
- Ensure chatbot is run from trusted network

## Log File Management

- Log file location: `chatbot.log` (in working directory)
- Format: Plain text with timestamps
- No automatic rotation (append mode)
- Delete manually to reset logs
- Backup important logs before deletion

## Executing with Java Options

### Increase Heap Memory
```bash
java -Xmx512m -jar target/network-chatbot.jar
```

### Enable Debug Output
```bash
java -Ddebug=true -jar target/network-chatbot.jar
```

### Set Working Directory
```bash
java -Duser.dir=/path/to/dir -jar target/network-chatbot.jar
```
