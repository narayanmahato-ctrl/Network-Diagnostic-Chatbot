@echo off
powershell -NoProfile -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/io/takari/maven-wrapper/0.5.6/maven-wrapper-0.5.6.jar' -OutFile 'tools\\maven-wrapper.jar'"
