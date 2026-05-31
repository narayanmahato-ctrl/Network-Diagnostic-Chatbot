package com.networkbot.commands;

import com.networkbot.utils.Logger;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Parses user input and extracts commands and parameters
 */
public class CommandParser {

    public static class ParsedCommand {
        private String command;
        private Map<String, String> parameters;

        public ParsedCommand(String command) {
            this.command = command;
            this.parameters = new HashMap<>();
        }

        public String getCommand() {
            return command;
        }

        public Map<String, String> getParameters() {
            return parameters;
        }

        public void addParameter(String key, String value) {
            parameters.put(key, value);
        }

        public String getParameter(String key) {
            return parameters.get(key);
        }

        public boolean hasParameter(String key) {
            return parameters.containsKey(key);
        }
    }

    /**
     * Parse user input into a command
     */
    public static ParsedCommand parse(String input) {
        input = input.trim().toLowerCase();
        Logger.debug("Parsing input: " + input);

        ParsedCommand command = null;

        // Ping command
        if (input.contains("ping")) {
            Pattern pattern = Pattern.compile("ping\\s+([\\w.-]+)");
            Matcher matcher = pattern.matcher(input);
            if (matcher.find()) {
                command = new ParsedCommand("ping");
                command.addParameter("host", matcher.group(1));
            }
        }
        // DNS check
        else if (input.contains("dns") || input.contains("resolve")) {
            Pattern pattern = Pattern.compile("(?:dns|resolve)\\s+([\\w.-]+)");
            Matcher matcher = pattern.matcher(input);
            if (matcher.find()) {
                command = new ParsedCommand("dns");
                command.addParameter("hostname", matcher.group(1));
            }
        }
        // Port check
        else if (input.contains("port")) {
            Pattern pattern = Pattern.compile("port\\s+([\\w.-]+)\\s+(\\d+)");
            Matcher matcher = pattern.matcher(input);
            if (matcher.find()) {
                command = new ParsedCommand("port");
                command.addParameter("host", matcher.group(1));
                command.addParameter("port", matcher.group(2));
            }
        }
        // Connectivity test
        else if (input.contains("connect") || input.contains("connectivity")) {
            Pattern pattern = Pattern.compile("(?:connect|connectivity)\\s+([\\w.-]+)(?:\\s+(\\d+))?");
            Matcher matcher = pattern.matcher(input);
            if (matcher.find()) {
                command = new ParsedCommand("connect");
                command.addParameter("host", matcher.group(1));
                if (matcher.group(2) != null) {
                    command.addParameter("port", matcher.group(2));
                } else {
                    command.addParameter("port", "80");
                }
            }
        }
        // Traceroute
        else if (input.contains("trace")) {
            Pattern pattern = Pattern.compile("trace\\s+([\\w.-]+)");
            Matcher matcher = pattern.matcher(input);
            if (matcher.find()) {
                command = new ParsedCommand("trace");
                command.addParameter("host", matcher.group(1));
            }
        }
        // Network info
        else if (input.contains("info") || input.contains("network") || input.contains("status")) {
            command = new ParsedCommand("info");
        }
        // Help
        else if (input.contains("help") || input.equals("?")) {
            command = new ParsedCommand("help");
        }
        // Exit/Quit
        else if (input.equals("exit") || input.equals("quit") || input.equals("q")) {
            command = new ParsedCommand("exit");
        }

        return command;
    }

    /**
     * Check if a command is valid
     */
    public static boolean isValidCommand(String input) {
        ParsedCommand cmd = parse(input);
        return cmd != null;
    }
}
