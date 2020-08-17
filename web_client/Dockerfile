FROM ubuntu:20.04
LABEL maintainer="Synicix"
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y
RUN apt-get install nodejs -y
RUN apt-get install npm -y

ADD ./ /src

WORKDIR /src
RUN npm install
ENV DANGEROUSLY_DISABLE_HOST_CHECK=true
CMD npm start