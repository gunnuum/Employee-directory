#  Build the JAR using Maven
FROM maven:3.8.6-eclipse-temurin-17 AS build
WORKDIR /app


COPY pom.xml .
RUN mvn dependency:go-offline

COPY . .
RUN mvn clean package

#  Run the JAR using Java
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the built JAR from the previous stage
COPY --from=build /app/target/freemarker-demo-1.0-SNAPSHOT.jar app.jar

# Run the app
CMD ["java", "-jar", "app.jar"]
