package com.networkbot.chatbot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * Main entry point for the Network Diagnostic Chatbot application
 * Runs as a Spring Boot REST API server
 */
@SpringBootApplication
@ComponentScan(basePackages = {"com.networkbot"})
public class ChatbotApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(ChatbotApplication.class, args);
    }
}
