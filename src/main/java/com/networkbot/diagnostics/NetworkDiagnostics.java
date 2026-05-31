package com.networkbot.diagnostics;

import com.networkbot.utils.Logger;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.UnknownHostException;

/**
 * Network diagnostic utilities
 */
public class NetworkDiagnostics {

    /**
     * Ping a host and return the result
     */
    public static DiagnosticResult ping(String host) {
        DiagnosticResult result = new DiagnosticResult("PING", host);
        try {
            String command = System.getProperty("os.name").toLowerCase().contains("win") 
                ? "ping -n 4 " + host 
                : "ping -c 4 " + host;
            
            Process process = Runtime.getRuntime().exec(command);
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
            
            int exitCode = process.waitFor();
            result.setSuccess(exitCode == 0);
            result.setOutput(output.toString());
            result.setMessage(exitCode == 0 ? "Host is reachable" : "Host is unreachable");
            
            Logger.info("Ping to " + host + ": " + (result.isSuccess() ? "SUCCESS" : "FAILED"));
        } catch (Exception e) {
            result.setSuccess(false);
            result.setMessage("Ping failed: " + e.getMessage());
            Logger.error("Ping error: " + e.getMessage());
        }
        return result;
    }

    /**
     * Check DNS resolution for a hostname
     */
    public static DiagnosticResult checkDNS(String hostname) {
        DiagnosticResult result = new DiagnosticResult("DNS_LOOKUP", hostname);
        try {
            InetAddress address = InetAddress.getByName(hostname);
            result.setSuccess(true);
            result.setMessage("DNS resolution successful");
            result.setOutput("Hostname: " + hostname + "\nIP Address: " + address.getHostAddress());
            Logger.info("DNS lookup for " + hostname + ": " + address.getHostAddress());
        } catch (UnknownHostException e) {
            result.setSuccess(false);
            result.setMessage("DNS resolution failed: Unable to resolve hostname");
            result.setOutput("Error: " + e.getMessage());
            Logger.error("DNS lookup failed for " + hostname);
        }
        return result;
    }

    /**
     * Check if a port is open on a host
     */
    public static DiagnosticResult checkPort(String host, int port) {
        DiagnosticResult result = new DiagnosticResult("PORT_CHECK", host + ":" + port);
        try {
            Socket socket = new Socket();
            socket.connect(new InetSocketAddress(host, port), 5000);
            socket.close();
            result.setSuccess(true);
            result.setMessage("Port " + port + " is open");
            result.setOutput("Successfully connected to " + host + ":" + port);
            Logger.info("Port check " + host + ":" + port + ": OPEN");
        } catch (IOException e) {
            result.setSuccess(false);
            result.setMessage("Port " + port + " is closed or unreachable");
            result.setOutput("Connection failed: " + e.getMessage());
            Logger.warn("Port check " + host + ":" + port + ": CLOSED");
        }
        return result;
    }

    /**
     * Get local network information
     */
    public static DiagnosticResult getNetworkInfo() {
        DiagnosticResult result = new DiagnosticResult("NETWORK_INFO", "localhost");
        try {
            InetAddress localhost = InetAddress.getLocalHost();
            StringBuilder info = new StringBuilder();
            info.append("Hostname: ").append(localhost.getHostName()).append("\n");
            info.append("IP Address: ").append(localhost.getHostAddress()).append("\n");
            info.append("OS: ").append(System.getProperty("os.name")).append("\n");
            info.append("Java Version: ").append(System.getProperty("java.version")).append("\n");
            
            result.setSuccess(true);
            result.setMessage("Network information retrieved");
            result.setOutput(info.toString());
            Logger.info("Network info retrieved successfully");
        } catch (UnknownHostException e) {
            result.setSuccess(false);
            result.setMessage("Failed to retrieve network information");
            result.setOutput("Error: " + e.getMessage());
            Logger.error("Failed to get network info: " + e.getMessage());
        }
        return result;
    }

    /**
     * Test connectivity to a specific URL
     */
    public static DiagnosticResult testConnectivity(String host, int port) {
        DiagnosticResult result = new DiagnosticResult("CONNECTIVITY_TEST", host + ":" + port);
        try {
            Socket socket = new Socket();
            socket.setSoTimeout(5000);
            socket.connect(new InetSocketAddress(host, port), 5000);
            socket.close();
            result.setSuccess(true);
            result.setMessage("Connectivity test passed");
            result.setOutput("Successfully established connection to " + host + ":" + port);
            Logger.info("Connectivity test to " + host + ":" + port + ": PASSED");
        } catch (IOException e) {
            result.setSuccess(false);
            result.setMessage("Connectivity test failed");
            result.setOutput("Unable to connect: " + e.getMessage());
            Logger.warn("Connectivity test to " + host + ":" + port + ": FAILED");
        }
        return result;
    }

    /**
     * Trace route (simplified version)
     */
    public static DiagnosticResult traceRoute(String host) {
        DiagnosticResult result = new DiagnosticResult("TRACEROUTE", host);
        try {
            String command = System.getProperty("os.name").toLowerCase().contains("win") 
                ? "tracert -d -h 20 -w 1000 " + host 
                : "traceroute -n -q 1 -w 1 -m 15 " + host;
            
            Process process = Runtime.getRuntime().exec(command);
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            int lineCount = 0;
            
            while ((line = reader.readLine()) != null && lineCount < 20) {
                output.append(line).append("\n");
                lineCount++;
            }
            
            int exitCode = process.waitFor();
            result.setSuccess(exitCode == 0);
            result.setOutput(output.toString());
            result.setMessage("Traceroute completed");
            Logger.info("Traceroute to " + host + " completed");
        } catch (Exception e) {
            result.setSuccess(false);
            result.setMessage("Traceroute failed");
            result.setOutput("Error: " + e.getMessage());
            Logger.error("Traceroute error: " + e.getMessage());
        }
        return result;
    }
}
