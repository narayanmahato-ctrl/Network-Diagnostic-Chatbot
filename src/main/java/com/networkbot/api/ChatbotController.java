package com.networkbot.api;

import com.networkbot.commands.CommandExecutor;
import com.networkbot.commands.CommandParser;
import com.networkbot.diagnostics.DiagnosticResult;
import com.networkbot.utils.Logger;
import org.springframework.web.bind.annotation.*;

import java.net.InetAddress;
import java.util.HashMap;
import java.util.Map;

/**
 * REST API Controller for Network Diagnostic Chatbot
 * Provides REST endpoints for command execution and diagnostics
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://narayanmahato-ctrl.github.io"
})
public class ChatbotController {

    /**
     * Get system information
     */
    @GetMapping("/info")
    public Map<String, String> getSystemInfo() {
        try {
            Map<String, String> info = new HashMap<>();
            InetAddress localhost = InetAddress.getLocalHost();
            info.put("hostname", localhost.getHostName());
            info.put("ipAddress", localhost.getHostAddress());
            info.put("osName", System.getProperty("os.name"));
            info.put("javaVersion", System.getProperty("java.version"));
            return info;
        } catch (Exception e) {
            Logger.error("Error getting system info: " + e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to get system info");
            return error;
        }
    }

    /**
     * Execute a diagnostic command
     */
    @PostMapping("/command")
    public Map<String, Object> executeCommand(@RequestBody CommandRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Logger.info("Executing command via REST API: " + request.getCommand());
            
            // Parse the command
            CommandParser.ParsedCommand parsedCommand = CommandParser.parse(request.getCommand());
            
            // Execute the command - returns a String
            String result = CommandExecutor.execute(parsedCommand);
            
            // Build response
            response.put("status", "SUCCESS");
            response.put("testType", parsedCommand.getCommand());
            response.put("output", result != null ? result : "Command executed");
            response.put("message", "Command executed successfully");
            
            return response;
        } catch (Exception e) {
            Logger.error("Error executing command: " + e.getMessage());
            response.put("status", "ERROR");
            response.put("message", e.getMessage());
            response.put("output", "Error: " + e.getMessage());
            return response;
        }
    }

    /**
     * Get help information
     */
    @GetMapping("/help")
    public Map<String, Object> getHelp() {
        Map<String, Object> help = new HashMap<>();
        help.put("commands", new String[]{
            "ping <hostname>",
            "dns <hostname>",
            "resolve <hostname>",
            "port <hostname> <port>",
            "connect <hostname> [port]",
            "trace <hostname>",
            "info",
            "network",
            "status",
            "help"
        });
        help.put("description", "Network Diagnostic Chatbot - Perform network diagnostics");
        return help;
    }

    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> health = new HashMap<>();
        health.put("status", "UP");
        health.put("service", "Network Diagnostic Chatbot");
        health.put("version", "1.0.0");
        return health;
    }

    /**
     * Request body for command execution
     */
    public static class CommandRequest {
        private String command;

        public CommandRequest() {}

        public CommandRequest(String command) {
            this.command = command;
        }

        public String getCommand() {
            return command;
        }

        public void setCommand(String command) {
            this.command = command;
        }
    }
}
