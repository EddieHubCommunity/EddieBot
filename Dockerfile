FROM node:16 As development
LABEL org.opencontainers.image.source https://github.com/EddieHubCommunity/EddieBot

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:16 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV HUSKY=0
ENV VERSION="v0.0.0"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/prod ./prod

CMD ["npm", "start"]
