# EddieBot

The official [EddieBot](https://github.com/EddieHubCommunity/EddieBot.git) for the official [Discord server](http://discord.eddiehub.org). Join us at [Discord](http://discord.eddiehub.org) today!

## Features

- Uses a powerful [API](https://github.com/EddieHubCommunity/api.git) built by the EddieHub community.
- Checking all people's messages for inclusive language.

## Config / Secrets environment variables

Copy `.env.example` to `.env` and add your private information

*Note: never commit this file, it should be ignored by Git*

```
DISCORD_TOKEN="<your-token>"
DISCORD_PREFIX="!"
API_URL=
API_TOKEN=
```

*Note: to perform some of the reading/writing from the DB you will need the API project `EddieHubCommunity/api`*

## Installation

### SSH

```bash
$ git clone git@github.com:EddieHubCommunity/EddieBot.git
```

### GitHub CLI

```bash
$ gh repo clone EddieHubCommunity/EddieBot
```

### HTTPS

```bash
$ git clone https://github.com/EddieHubCommunity/EddieBot.git
```


```bash
$ cd EddieBot
$ npm install
```
### Discord Docs

- https://discord.com/developers/docs/intro#bots-and-apps

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

EddieBot is an MIT-licensed open source project. It can grow thanks to the contributors and the community members. If you'd like to join them, feel free to make a pull request and we'll review it.

Stuck? Have any questions or comments? Join us on [Discord](http://discord.eddiehub.org/) and ask for help.

## License

The EddieBot is licensed under the [MIT](https://github.com/EddieHubCommunity/EddieBot/blob/main/LICENSE) license.
