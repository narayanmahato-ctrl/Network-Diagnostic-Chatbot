# Architecture and Design

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│               ChatbotApplication (Entry Point)              │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    Chatbot (Main Loop)                      │
│  • User Input Processing                                    │
│  • Command Routing                                          │
│  • Response Display                                         │
└─────────────────────────┬───────────────────────────────────┘
                          │
                ┌─────────┴─────────┐
                ▼                   ▼
    ┌──────────────────────┐  ┌──────────────────┐
    │  CommandParser       │  │ CommandExecutor  │
    │ • Parse Input        │  │ • Execute Cmd    │
    │ • Extract Params     │  │ • Format Output  │
    └──────────────────────┘  └────────┬─────────┘
                                       │
                           ┌───────────┴───────────┐
                           ▼                       ▼
                ┌──────────────────────┐  ┌────────────────────┐
                │NetworkDiagnostics    │  │Logger              │
                │ • Ping               │  │ • Log to File      │
                │ • DNS Lookup         │  │ • Console Output   │
                │ • Port Check         │  │ • Timestamp        │
                │ • Connectivity       │  └────────────────────┘
                │ • Traceroute         │
                │ • Network Info       │
                └──────────────────────┘
```

## Class Hierarchy

### Chatbot Module
- **ChatbotApplication** (static main)
  - Entry point
  - Creates and starts Chatbot instance

- **Chatbot**
  - Core chatbot engine
  - Manages user interaction loop
  - Handles command routing
  - Displays UI messages

### Command Module
- **CommandParser**
  - Parses raw user input
  - Uses regex for parameter extraction
  - Returns ParsedCommand objects
  - Supports 8 command types

- **CommandExecutor**
  - Executes parsed commands
  - Calls appropriate diagnostic methods
  - Formats output for display
  - Generates help messages

- **ParsedCommand** (inner class)
  - Stores command name
  - Stores extracted parameters
  - Provides parameter accessors

### Diagnostics Module
- **NetworkDiagnostics**
  - Static utility class
  - Performs network operations
  - Returns DiagnosticResult objects
  - 6 diagnostic methods

- **DiagnosticResult**
  - Data class for results
  - Stores test metadata
  - Stores success/failure status
  - Stores output and messages

### Utils Module
- **Logger**
  - Static logging utility
  - Multiple log levels
  - Writes to file and console
  - Timestamp formatting

## Design Patterns Used

### 1. **Singleton Pattern** (Logger)
```java
Logger.info("message");
Logger.error("error message");
```

### 2. **Command Pattern** (CommandExecutor)
- Commands are parsed and executed
- Easy to add new commands
- Decoupled parsing from execution

### 3. **Strategy Pattern** (CommandParser)
- Different parsing strategies per command
- Regex-based parameter extraction
- Extensible for new command types

### 4. **Data Transfer Object (DTO)** (DiagnosticResult)
- Encapsulates diagnostic data
- Passed between layers
- Serializable for logging

### 5. **Factory Pattern** (CommandParser.parse)
- Creates appropriate ParsedCommand objects
- Based on input string patterns

## Data Flow

### User Input → Output Flow

```
1. User enters: "ping google.com"
                    ↓
2. Scanner reads input in Chatbot
                    ↓
3. CommandParser.parse() extracts:
   - Command: "ping"
   - Parameters: {host: "google.com"}
                    ↓
4. CommandExecutor.execute() routes to:
   - executePing() method
                    ↓
5. NetworkDiagnostics.ping() performs:
   - System process execution
   - Output capture
   - Result wrapping in DiagnosticResult
                    ↓
6. CommandExecutor formats result as:
   - ASCII table with status
                    ↓
7. Chatbot displays to user
                    ↓
8. Logger writes to file + console
```

## Module Responsibilities

| Module | Responsibility | Key Classes |
|--------|-----------------|------------|
| **chatbot** | User interaction & main loop | Chatbot, ChatbotApplication |
| **commands** | Input parsing & command execution | CommandParser, CommandExecutor |
| **diagnostics** | Network operations & results | NetworkDiagnostics, DiagnosticResult |
| **utils** | Cross-cutting concerns | Logger |

## Extensibility Points

### Adding a New Command

1. **CommandParser.parse()**
   - Add regex pattern for new command
   - Create ParsedCommand with parameters

2. **CommandExecutor.execute()**
   - Add case in switch statement
   - Create execute method (e.g., executeNewCommand)

3. **NetworkDiagnostics**
   - Add static method for operation
   - Return DiagnosticResult

4. **CommandExecutor.formatResult()**
   - Already handles formatting generically

### Example: Adding DNS Reverse Lookup

```java
// 1. In CommandParser
Pattern pattern = Pattern.compile("reverse\\s+([0-9.]+)");

// 2. In CommandExecutor
case "reverse":
    return executeReverse(command);

private static String executeReverse(CommandParser.ParsedCommand cmd) {
    String ip = cmd.getParameter("ip");
    DiagnosticResult result = NetworkDiagnostics.reverseDNS(ip);
    return formatResult(result);
}

// 3. In NetworkDiagnostics
public static DiagnosticResult reverseDNS(String ipAddress) {
    // Implementation
}
```

## Error Handling Strategy

1. **Parsing Errors**
   - Invalid commands return null
   - User sees "Unknown command" message

2. **Execution Errors**
   - Try-catch blocks in diagnostic methods
   - Failures marked in DiagnosticResult
   - Error messages included in output

3. **Network Errors**
   - Connection timeouts handled
   - IOException caught and logged
   - User sees failure message

4. **System Errors**
   - Process execution failures handled
   - Stdout/stderr captured
   - Error logged with level

## Performance Considerations

### Network Operations
- 5-second socket timeout
- Parallel execution not implemented
- Sequential command processing

### Memory Usage
- Minimal object creation
- Static methods where possible
- String builders for output formatting

### I/O Operations
- Asynchronous file logging
- Buffered console output
- Process input streams managed

## Security Considerations

1. **Input Validation**
   - Regex-based parameter extraction
   - Type checking on port numbers
   - Host validation via DNS

2. **System Commands**
   - Uses Runtime.exec() safely
   - Input from parsing, not user directly
   - No shell interpretation

3. **File I/O**
   - Logs written to local file only
   - No external file access
   - User has control over log location

4. **Network Operations**
   - No credentials transmitted
   - Standard TCP/IP protocols only
   - Timeout protection against hangs

## Testing Strategy

### Unit Tests (CommandParserTest)
- Command parsing correctness
- Parameter extraction accuracy
- Case insensitivity
- Edge case handling

### Manual Testing Scenarios
1. Basic connectivity (ping, DNS, info)
2. Port availability
3. Route tracing
4. Invalid commands
5. System error conditions

### Integration Points
- Chatbot ↔ CommandParser
- CommandParser ↔ CommandExecutor
- CommandExecutor ↔ NetworkDiagnostics
- All modules → Logger

---

**Note**: This architecture is designed for maintainability, extensibility, and ease of understanding. New developers can quickly add features by following the established patterns.
