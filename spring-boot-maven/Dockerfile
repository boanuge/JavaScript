FROM openjdk:8-jdk-alpine

ADD target/ServiceBroker-0.0.1-SNAPSHOT.jar app.jar

ENV JAVA_OPTS=""

ENTRYPOINT ["java","-jar","/app.jar"]

# How to build
# $ docker build --tag servicebroker:0.1 .

# How to run
# $ docker run -p 9000:9000 servicebroker:0.1
