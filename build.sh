#!/bin/bash

# Network Diagnostic Chatbot Build Script
# Builds the project and creates executable JAR

echo "================================"
echo "Network Diagnostic Chatbot"
echo "Build Script"
echo "================================"
echo ""

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven is not installed!"
    echo "Please install Maven 3.6+ from https://maven.apache.org/"
    exit 1
fi

echo "✓ Maven found: $(mvn -version | head -1)"
echo ""

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed!"
    echo "Please install JDK 11+ from https://www.oracle.com/java/technologies/downloads/"
    exit 1
fi

echo "✓ Java found: $(java -version 2>&1 | head -1)"
echo ""

# Clean and build
echo "Building project..."
mvn clean package -DskipTests

if [ $? -eq 0 ]; then
    ARTIFACT="target/network-diagnostic-chatbot-1.0.0.jar"
    ALIAS="target/network-chatbot.jar"

    if [ -f "$ARTIFACT" ]; then
        cp -f "$ARTIFACT" "$ALIAS"
    fi

    echo ""
    echo "✓ Build successful!"
    echo ""
    echo "📦 Executable JAR created:"
    if [ -f "$ARTIFACT" ]; then
        echo "   $ARTIFACT"
    else
        echo "   $ALIAS"
    fi
    echo ""
    echo "🚀 To run the application:"
    echo "   java -jar $ALIAS"
    echo ""
else
    echo ""
    echo "❌ Build failed!"
    exit 1
fi
