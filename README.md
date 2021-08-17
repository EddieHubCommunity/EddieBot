## Description
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Config / Secrets environment variables

Copy `.env.example` to `.env` and add your private information

*Note: never commit this file, it should be ignored by git*

```
DISCORD_TOKEN="<your-token>"
DISCORD_PREFIX="!"
API_URL=
API_TOKEN=
```

*Note: to perform some of the reading/writing from the DB you will need the API project `EddieHubCommunity/api`*

## Installation

#### SSH

```bash
$ git clone git@github.com:EddieHubCommunity/EddieBot.git
```

#### GitHub CLI

```bash
$ gh repo clone EddieHubCommunity/EddieBot
```

#### HTTPS

```bash
$ git clone https://github.com/EddieHubCommunity/EddieBot.git
```


```bash
$ cd EddieBot
$ npm install
```
#### Discord Docs

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

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

Still stuck join us on [discord](http://discord.eddiehub.org/) and ask for help 

## License

Nest is [MIT licensed](LICENSE).
