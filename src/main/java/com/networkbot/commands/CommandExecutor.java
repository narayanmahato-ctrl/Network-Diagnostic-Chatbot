package com.networkbot.commands;

import com.networkbot.diagnostics.DiagnosticResult;
import com.networkbot.diagnostics.NetworkDiagnostics;
import com.networkbot.utils.Logger;

/**
 * Executes parsed commands and returns results
 */
public class CommandExecutor {

    /**
     * Execute a parsed command
     */
    public static String execute(CommandParser.ParsedCommand command) {
        if (command == null) {
            return "Invalid command. Type 'help' for available commands.";
        }

        Logger.info("Executing command: " + command.getCommand());

        switch (command.getCommand()) {
            case "ping":
                return executePing(command);
            case "dns":
                return executeDNS(command);
            case "port":
                return executePort(command);
            case "connect":
                return executeConnect(command);
            case "trace":
                return executeTrace(command);
            case "info":
                return executeInfo(command);
            case "help":
                return getHelpMessage();
            case "exit":
                return null;
            default:
                return "Unknown command. Type 'help' for available commands.";
        }
    }

    private static String executePing(CommandParser.ParsedCommand command) {
        String host = command.getParameter("host");
        if (host == null || host.isEmpty()) {
            return "Usage: ping <hostname>";
        }
        DiagnosticResult result = NetworkDiagnostics.ping(host);
        return formatResult(result);
    }

    private static String executeDNS(CommandParser.ParsedCommand command) {
        String hostname = command.getParameter("hostname");
        if (hostname == null || hostname.isEmpty()) {
            return "Usage: dns <hostname>";
        }
        DiagnosticResult result = NetworkDiagnostics.checkDNS(hostname);
        return formatResult(result);
    }

    private static String executePort(CommandParser.ParsedCommand command) {
        String host = command.getParameter("host");
        String portStr = command.getParameter("port");
        
        if (host == null || portStr == null) {
            return "Usage: port <hostname> <port>";
        }
        
        try {
            int port = Integer.parseInt(portStr);
            DiagnosticResult result = NetworkDiagnostics.checkPort(host, port);
            return formatResult(result);
        } catch (NumberFormatException e) {
            return "Invalid port number. Please provide a valid integer.";
        }
    }

    private static String executeConnect(CommandParser.ParsedCommand command) {
        String host = command.getParameter("host");
        String portStr = command.getParameter("port");
        
        if (host == null) {
            return "Usage: connect <hostname> [port]";
        }
        
        try {
            int port = Integer.parseInt(portStr);
            DiagnosticResult result = NetworkDiagnostics.testConnectivity(host, port);
            return formatResult(result);
        } catch (NumberFormatException e) {
            return "Invalid port number. Please provide a valid integer.";
        }
    }

    private static String executeTrace(CommandParser.ParsedCommand command) {
        String host = command.getParameter("host");
        if (host == null || host.isEmpty()) {
            return "Usage: trace <hostname>";
        }
        DiagnosticResult result = NetworkDiagnostics.traceRoute(host);
        return formatResult(result);
    }

    private static String executeInfo(CommandParser.ParsedCommand command) {
        DiagnosticResult result = NetworkDiagnostics.getNetworkInfo();
        return formatResult(result);
    }

    private static String formatResult(DiagnosticResult result) {
        StringBuilder output = new StringBuilder();
        output.append("\n╔═══════════════════════════════════════╗\n");
        output.append("║ DIAGNOSTIC RESULT\n");
        output.append("╠═══════════════════════════════════════╣\n");
        output.append("║ Test Type: ").append(result.getTestType()).append("\n");
        output.append("║ Target: ").append(result.getTarget()).append("\n");
        output.append("║ Status: ").append(result.isSuccess() ? "✓ SUCCESS" : "✗ FAILED").append("\n");
        output.append("║ Message: ").append(result.getMessage()).append("\n");
        output.append("╠═══════════════════════════════════════╣\n");
        if (result.getOutput() != null && !result.getOutput().isEmpty()) {
            output.append("║ OUTPUT:\n");
            String[] lines = result.getOutput().split("\n");
            for (String line : lines) {
                if (!line.trim().isEmpty()) {
                    output.append("║ ").append(line).append("\n");
                }
            }
        }
        output.append("╚═══════════════════════════════════════╝\n");
        return output.toString();
    }

    private static String getHelpMessage() {
        StringBuilder help = new StringBuilder();
        help.append("\n╔═══════════════════════════════════════════════════════╗\n");
        help.append("║         NETWORK DIAGNOSTIC CHATBOT - HELP\n");
        help.append("╠═══════════════════════════════════════════════════════╣\n");
        help.append("║ Available Commands:\n");
        help.append("║\n");
        help.append("║ 1. PING\n");
        help.append("║    Usage: ping <hostname>\n");
        help.append("║    Example: ping google.com\n");
        help.append("║    Function: Check if a host is reachable\n");
        help.append("║\n");
        help.append("║ 2. DNS LOOKUP\n");
        help.append("║    Usage: dns <hostname> OR resolve <hostname>\n");
        help.append("║    Example: dns google.com\n");
        help.append("║    Function: Resolve hostname to IP address\n");
        help.append("║\n");
        help.append("║ 3. PORT CHECK\n");
        help.append("║    Usage: port <hostname> <port_number>\n");
        help.append("║    Example: port google.com 80\n");
        help.append("║    Function: Check if a port is open\n");
        help.append("║\n");
        help.append("║ 4. CONNECTIVITY TEST\n");
        help.append("║    Usage: connect <hostname> [port]\n");
        help.append("║    Example: connect google.com 443\n");
        help.append("║    Function: Test connectivity to a host\n");
        help.append("║\n");
        help.append("║ 5. TRACEROUTE\n");
        help.append("║    Usage: trace <hostname>\n");
        help.append("║    Example: trace google.com\n");
        help.append("║    Function: Trace the route to a host\n");
        help.append("║\n");
        help.append("║ 6. NETWORK INFO\n");
        help.append("║    Usage: info OR network OR status\n");
        help.append("║    Function: Display local network information\n");
        help.append("║\n");
        help.append("║ 7. HELP\n");
        help.append("║    Usage: help OR ?\n");
        help.append("║    Function: Display this help message\n");
        help.append("║\n");
        help.append("║ 8. EXIT\n");
        help.append("║    Usage: exit OR quit OR q\n");
        help.append("║    Function: Exit the chatbot\n");
        help.append("║\n");
        help.append("╚═══════════════════════════════════════════════════════╝\n");
        return help.toString();
    }
}
