package com.networkbot.chatbot;

import com.networkbot.commands.CommandExecutor;
import com.networkbot.commands.CommandParser;
import com.networkbot.utils.Logger;

/**
 * Main chatbot class that handles user interaction
 */
public class Chatbot {
    private boolean isRunning;
    private static final String VERSION = "1.0.0";
    private static final String NAME = "Network Diagnostic Chatbot";

    public Chatbot() {
        this.isRunning = true;
    }

    /**
     * Start the chatbot
     */
    public void start() {
        Logger.info("========== " + NAME + " v" + VERSION + " Started ==========");
        displayWelcomeMessage();
        runInteractiveMode();
        displayGoodbyeMessage();
        Logger.info("========== Chatbot Shutdown ==========");
    }

    /**
     * Run the interactive mode
     */
    private void runInteractiveMode() {
        java.util.Scanner scanner = new java.util.Scanner(System.in);
        
        while (isRunning) {
            try {
                System.out.print("\n🤖 Chatbot> ");
                String userInput = scanner.nextLine().trim();
                
                if (userInput.isEmpty()) {
                    continue;
                }

                handleUserInput(userInput);
            } catch (Exception e) {
                Logger.error("Error in interactive mode: " + e.getMessage());
                System.out.println("An error occurred. Please try again.");
            }
        }
        
        scanner.close();
    }

    /**
     * Handle user input
     */
    private void handleUserInput(String input) {
        CommandParser.ParsedCommand command = CommandParser.parse(input);
        
        if (command == null) {
            System.out.println("\n❌ I didn't understand that command.");
            System.out.println("💡 Type 'help' or '?' to see available commands.\n");
            return;
        }

        String result = CommandExecutor.execute(command);
        
        if (result == null) {
            // Exit command
            isRunning = false;
            return;
        }
        
        System.out.println(result);
    }

    /**
     * Display welcome message
     */
    private void displayWelcomeMessage() {
        System.out.println("\n╔════════════════════════════════════════════════════════╗");
        System.out.println("║       Welcome to Network Diagnostic Chatbot!            ║");
        System.out.println("║              Version: " + VERSION + "                         ║");
        System.out.println("╠════════════════════════════════════════════════════════╣");
        System.out.println("║ I'm your network diagnostic assistant. I can help you: ║");
        System.out.println("║ • Test connectivity to hosts                           ║");
        System.out.println("║ • Resolve DNS queries                                  ║");
        System.out.println("║ • Check open ports                                     ║");
        System.out.println("║ • Trace network routes                                 ║");
        System.out.println("║ • Display network information                          ║");
        System.out.println("║                                                        ║");
        System.out.println("║ Type 'help' or '?' to get started!                     ║");
        System.out.println("╚════════════════════════════════════════════════════════╝\n");
    }

    /**
     * Display goodbye message
     */
    private void displayGoodbyeMessage() {
        System.out.println("\n╔════════════════════════════════════════════════════════╗");
        System.out.println("║         Thank you for using Network Bot!               ║");
        System.out.println("║         Goodbye! 👋                                     ║");
        System.out.println("╚════════════════════════════════════════════════════════╝\n");
    }

    /**
     * Get chatbot name
     */
    public String getName() {
        return NAME;
    }

    /**
     * Check if chatbot is running
     */
    public boolean isRunning() {
        return isRunning;
    }

    /**
     * Stop the chatbot
     */
    public void stop() {
        isRunning = false;
    }
}
