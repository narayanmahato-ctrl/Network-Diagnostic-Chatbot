#!/bin/bash

# Network Diagnostic Chatbot Runner Script
# This script runs the built application

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

JAR_FILE="target/network-diagnostic-chatbot-1.0.0.jar"
ALT_JAR="target/network-chatbot.jar"

echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}Network Diagnostic Chatbot${NC}"
echo -e "${GREEN}================================${NC}"
echo ""

# Check if JAR file exists
if [ ! -f "$JAR_FILE" ] && [ -f "$ALT_JAR" ]; then
    JAR_FILE="$ALT_JAR"
fi

if [ ! -f "$JAR_FILE" ]; then
    echo -e "${RED}❌ JAR file not found: $JAR_FILE${NC}"
    echo ""
    echo "Please build the project first:"
    echo "  bash build.sh"
    echo ""
    exit 1
fi

echo -e "${GREEN}✓ JAR file found${NC}"
echo ""

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo -e "${RED}❌ Java is not installed!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Java is installed${NC}"
echo ""

# Run the application
echo -e "${YELLOW}🚀 Starting Network Diagnostic Chatbot...${NC}"
echo ""

java -jar "$JAR_FILE"

echo ""
echo -e "${GREEN}Chatbot closed${NC}"
