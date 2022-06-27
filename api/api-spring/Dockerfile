FROM openjdk:17-jdk-alpine

COPY /target/api-0.0.1-SNAPSHOT.jar api-0.0.1-SNAPSHOT.jar

COPY /target/api-0.0.1-SNAPSHOT.jar.original api-0.0.1-SNAPSHOT.jar.original

ENTRYPOINT ["java","-jar","api-0.0.1-SNAPSHOT.jar"]

#CMD ["java", "-jar", "api-0.0.1-SNAPSHOT.jar"]

EXPOSE 1000