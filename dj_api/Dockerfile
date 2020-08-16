FROM ubuntu:20.04
LABEL maintainer="Synicix"
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y
RUN apt install python3-pip -y
RUN pip3 install datajoint flask

ADD ./ /src

WORKDIR /src
CMD sleep infinity