* Maven MongoDB Driver Version = 3.8.1
	<dependency>
		<groupId>org.mongodb</groupId>
		<artifactId>mongodb-driver-sync</artifactId>
		<version>3.8.1</version>
	</dependency>

이 MongoDB Driver 와 잘 호환 될 수 있는 버전을 Pull 한다.

https://hub.docker.com/_/mongo?tab=tags

$ docker pull mongo:3.6

위 명령으로 다운받은 Docker 이미지를 아래 명령으로 실행한다.

$ docker run --name mongo -p 27017:27017 -d mongo:3.6

위 명령으로 Docker 이미지로 mongo 컨테이너(이미지의 인스턴스)를 만들었다.

이제 아래 명령으로 컨테이너에 접속을 하고 MongoDB Shell 을 실행해 본다.

https://docs.mongodb.com/manual/reference/mongo-shell/

$ docker exec -it mongo /bin/bash

MongoDB 컨테이너는 디폴트로 /data/db 폴더에 DB 데이터를 저장한다.

mongo 컨테이너를 중지시키고 삭제하는 방법은 아래명령을 참고한다.

$ docker stop mongo

$ docker rm mongo

우리가 원하는 "mongod.conf" 를 사용하는 이미지를 만들어 본다.

$ cat mongod.conf

####BEGIN: mongod.conf
storage:
  dbPath: /data/db
  journal:
    enabled: true
systemLog:
  destination: file
  logAppend: true
  path: /data/log/mongod.log
net:
  port: 27017
  bindIp: 0.0.0.0
#security:
#  authorization: enabled
####END: mongod.conf

이미지 빌드시 우리의 "mongod.conf" 파일를 이미지에 넣도록 해야 한다.

우선 "Dockerfile" 을 만들어야 한다.

$ cat Dockerfile

####BEGIN: Dockerfile
FROM mongo:3.6
RUN mkdir -p /data/db \
    && chown -R mongodb:mongodb /data/db
RUN mkdir -p /data/log \
    && chown -R mongodb:mongodb /data/log
RUN touch /data/log/mongod.log \
    && chown -R mongodb:mongodb /data/log/mongod.log
RUN chown -R mongodb:mongodb /data
COPY ./mongod.conf /etc/
VOLUME ["/data/db", "/data/temp"]
WORKDIR /data/
CMD ["mongod", "--config", "/etc/mongod.conf"]
EXPOSE 27017
####END: Dockerfile

아래명령어로 이미지를 만든다.

$ docker build --tag mongodb:0.1 .

위 명령으로 생성한 Docker 이미지를 아래명령으로 실행한다.
참고: 호스트의 폴더를 공유 할 때, 컨테이너 내 해당 폴더에 이미 파일이 있을 경우 볼륨 맵핑 시 오류 발생

$ docker run -d --name mongodb -p 27017:27017 -v ~/docker_images/data/db:/data/db -v ~/docker_images/data/temp:/data/temp mongodb:0.1

아래명령을 통해 통해 위에서 실행한 컨테이너에 접속한다.

$ docker exec -it mongodb /bin/bash

이제 외부의 다른 IP를 가진 시스템에서 Docker 로 실행한 MongoDB 컨테이너에 원격으로 접속해 본다.

Windows 에서 MongoDB 관리를 편하게 해주는 Compass 라는 툴을 사용한다. 아래링크에서 다운로드 가능하다.

https://www.softpedia.com/get/Internet/Servers/Database-Utils/MongoDB-Compass.shtml

mongodb-compass-1.18.0-win32-x64.exe
