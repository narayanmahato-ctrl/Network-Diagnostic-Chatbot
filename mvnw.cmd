@echo off
REM Maven Wrapper for Windows
setlocal
set MAVEN_PROJECTBASEDIR=%~dp0
set MAVEN_WRAPPER_DIR=%MAVEN_PROJECTBASEDIR%.mvn\wrapper
set CLASSPATH=%MAVEN_WRAPPER_DIR%\maven-wrapper.jar
java -cp "%CLASSPATH%" org.apache.maven.wrapper.MavenWrapperMain %*
endlocal
