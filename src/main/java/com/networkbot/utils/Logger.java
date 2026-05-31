package com.networkbot.utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Utility class for logging application events
 */
public class Logger {
    private static final String LOG_FILE = "chatbot.log";
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public enum LogLevel {
        INFO, WARNING, ERROR, DEBUG
    }

    /**
     * Log a message with the specified level
     */
    public static void log(LogLevel level, String message) {
        String timestamp = LocalDateTime.now().format(formatter);
        String logMessage = String.format("[%s] %s: %s%n", timestamp, level, message);
        System.out.print(logMessage);
        writeToFile(logMessage);
    }

    /**
     * Log info level message
     */
    public static void info(String message) {
        log(LogLevel.INFO, message);
    }

    /**
     * Log warning level message
     */
    public static void warn(String message) {
        log(LogLevel.WARNING, message);
    }

    /**
     * Log error level message
     */
    public static void error(String message) {
        log(LogLevel.ERROR, message);
    }

    /**
     * Log debug level message
     */
    public static void debug(String message) {
        log(LogLevel.DEBUG, message);
    }

    /**
     * Write log message to file
     */
    private static void writeToFile(String message) {
        try {
            Files.write(Paths.get(LOG_FILE), message.getBytes(), 
                StandardOpenOption.CREATE, StandardOpenOption.APPEND);
        } catch (IOException e) {
            System.err.println("Failed to write to log file: " + e.getMessage());
        }
    }
}
