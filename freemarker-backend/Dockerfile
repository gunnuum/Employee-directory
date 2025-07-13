# Use Java 17 slim image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy your JAR into the container
COPY target/freemarker-demo-1.0-SNAPSHOT.jar app.jar

# Run the app
CMD ["java", "-jar", "app.jar"]
