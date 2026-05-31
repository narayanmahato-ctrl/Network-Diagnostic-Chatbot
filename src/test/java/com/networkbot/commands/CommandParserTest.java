package com.networkbot.commands;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 * Unit tests for CommandParser
 */
public class CommandParserTest {

    @Before
    public void setUp() {
    }

    @Test
    public void testPingCommandParsing() {
        CommandParser.ParsedCommand cmd = CommandParser.parse("ping google.com");
        assertNotNull(cmd);
        assertEquals("ping", cmd.getCommand());
        assertEquals("google.com", cmd.getParameter("host"));
    }

    @Test
    public void testDNSCommandParsing() {
        CommandParser.ParsedCommand cmd = CommandParser.parse("dns example.com");
        assertNotNull(cmd);
        assertEquals("dns", cmd.getCommand());
        assertEquals("example.com", cmd.getParameter("hostname"));
    }

    @Test
    public void testPortCommandParsing() {
        CommandParser.ParsedCommand cmd = CommandParser.parse("port google.com 443");
        assertNotNull(cmd);
        assertEquals("port", cmd.getCommand());
        assertEquals("google.com", cmd.getParameter("host"));
        assertEquals("443", cmd.getParameter("port"));
    }

    @Test
    public void testConnectCommandParsing() {
        CommandParser.ParsedCommand cmd = CommandParser.parse("connect example.com 8080");
        assertNotNull(cmd);
        assertEquals("connect", cmd.getCommand());
        assertEquals("example.com", cmd.getParameter("host"));
        assertEquals("8080", cmd.getParameter("port"));
    }

    @Test
    public void testTraceCommandParsing() {
        CommandParser.ParsedCommand cmd = CommandParser.parse("trace google.com");
        assertNotNull(cmd);
        assertEquals("trace", cmd.getCommand());
        assertEquals("google.com", cmd.getParameter("host"));
    }

    @Test
    public void testInfoCommandParsing() {
        CommandParser.ParsedCommand cmd = CommandParser.parse("info");
        assertNotNull(cmd);
        assertEquals("info", cmd.getCommand());
    }

    @Test
    public void testHelpCommandParsing() {
        CommandParser.ParsedCommand cmd = CommandParser.parse("help");
        assertNotNull(cmd);
        assertEquals("help", cmd.getCommand());
    }

    @Test
    public void testExitCommandParsing() {
        CommandParser.ParsedCommand cmd = CommandParser.parse("exit");
        assertNotNull(cmd);
        assertEquals("exit", cmd.getCommand());
    }

    @Test
    public void testCaseInsensitivity() {
        CommandParser.ParsedCommand cmd = CommandParser.parse("PING GOOGLE.COM");
        assertNotNull(cmd);
        assertEquals("ping", cmd.getCommand());
    }
}
