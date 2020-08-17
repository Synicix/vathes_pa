FROM ubuntu:20.04
LABEL maintainer="Synicix"
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y
RUN apt install python3-pip -y
RUN pip3 install datajoint flask flask-cors

ADD ./ /src

RUN pip3 install /src/
WORKDIR /src/dj_api
CMD export FLASK_ENV=development && flask run -h 0.0.0.0