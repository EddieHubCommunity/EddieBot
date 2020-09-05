# Use the Alpine Linux box as this is more than enough.
FROM node:14-alpine

# Run as root
USER root

VOLUME /opt

# Set path to EddieBot
WORKDIR /opt/EddieBot/

RUN apk update
RUN apk upgrade

# Bash is probably a preferred shell over /bin/sh.
RUN apk add --no-cache bash

# Set Timezone
ARG TZ=GMT
ENV TZ ${TZ}

# Set timezone
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install API Dependencies.
RUN apk --no-cache add tzdata ca-certificates
RUN npm install -g typescript ts-node ts-node-dev

RUN cd /opt/EddieBot/ && npm install
