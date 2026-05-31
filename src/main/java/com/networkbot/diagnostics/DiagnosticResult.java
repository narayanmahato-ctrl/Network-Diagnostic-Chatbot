package com.networkbot.diagnostics;

/**
 * Represents the result of a diagnostic test
 */
public class DiagnosticResult {
    private String testType;
    private String target;
    private boolean success;
    private String message;
    private String output;
    private long timestamp;

    public DiagnosticResult(String testType, String target) {
        this.testType = testType;
        this.target = target;
        this.timestamp = System.currentTimeMillis();
    }

    // Getters and Setters
    public String getTestType() {
        return testType;
    }

    public void setTestType(String testType) {
        this.testType = testType;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public long getTimestamp() {
        return timestamp;
    }

    @Override
    public String toString() {
        return "DiagnosticResult{" +
                "testType='" + testType + '\'' +
                ", target='" + target + '\'' +
                ", success=" + success +
                ", message='" + message + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}
