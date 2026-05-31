#!/bin/sh
DIR="$(cd "$(dirname "$0")" && pwd)"
MAVEN_WRAPPER_DIR="$DIR/.mvn/wrapper"
CLASSPATH="$MAVEN_WRAPPER_DIR/maven-wrapper.jar"
exec java -cp "$CLASSPATH" org.apache.maven.wrapper.MavenWrapperMain "$@"
