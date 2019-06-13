Java SDK (Oracle) Version 8 와 잘 호환 될 수 있는 버전을 Pull 한다.

https://github.com/docker-library/openjdk/tree/master/8/jdk

$ docker pull openjdk:8-jdk-alpine

위 명령으로 Docker 이미지를 만든 후 아래명령을 실행한다.

$ docker run -it -d --name openjdk openjdk:8-jdk-alpine

실행된 컨테이너에 접근하기 위해 아래명령을 실행한다.

$ docker attach openjdk

SpringBoot App을 실행할 수 있는 Docker 이미지를 만들기위해 우선 "Dockerfile" 을 만들어야 한다.

$ cat Dockerfile

####BEGIN: Dockerfile
FROM openjdk:8-jdk-alpine

ADD target/ServiceBroker-0.0.1-SNAPSHOT.jar app.jar

ENV JAVA_OPTS=""

ENTRYPOINT ["java","-jar","/app.jar"]

# How to build
# $ docker build --tag servicebroker:0.1 .

# How to run
# $ docker run -p 9000:9000 servicebroker:0.1
####END: Dockerfile

아래명령어로 이미지를 만든다.

$ docker build --tag servicebroker:0.1 .

위 명령으로 생성한 Docker 이미지를 아래명령으로 실행한다.

참고: "-d" 옵션을 주게되면 백그라운드로 실행된다.

$ docker run -p 9000:9000 servicebroker:0.1

우분투 터미널을 꺼도 백그라운드에서 앱이 살아 있도록 하는방법:

$ sudo java -jar ServiceBroker-0.0.1-SNAPSHOT.jar ← 앱 실행 후 Ctrl+z 키로 중단 그리고,

"[1]+ Stopped sudo java -jar ServiceBroker-20190523-SNAPSHOT.jar" 이런 결과를 볼 수 있음

$ bg 또는 $ bg 1 ← 명령어를 사용하여 중단된 프로세스를 백그라운드로 실행

"[1]+ sudo java -jar ServiceBroker-20190523-SNAPSHOT.jar &" 이런 결과를 볼 수 있음

$ disown ← 이 명령어를 사용하면 터미널에서 나가도 백그라운드 앱을 Stop 하지 않음

"-bash: warning: deleting stopped job 1 with process group 9699" 이런 결과를 볼 수 있음

$ ps -ef | grep ServiceBroker ← 이 명령어로 프로세스 확인
