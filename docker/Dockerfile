# Use the Alpine Linux box as this is more than enough.
FROM node:14-alpine

# Run as root
USER root

VOLUME "/opt"

# Set path to EddieBot
WORKDIR /opt/EddieBot/

RUN apk update
RUN apk upgrade

# We need Python3 for sqlite3 library.
RUN apk add python3

# Set Timezone
ARG TZ=GMT
ENV TZ ${TZ}

# Set timezone
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install API Dependencies.
RUN apk --no-cache add tzdata ca-certificates
RUN npm install -g typescript ts-node ts-node-dev
