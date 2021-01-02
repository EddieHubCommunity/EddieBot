# EddieBot

![Develop workflow](https://github.com/EddieJaoudeCommunity/EddieBot/workflows/develop/badge.svg)

Discord bot for Eddie Jaoude's Discord server

# Contributing

Feel free to [create an issue](https://github.com/EddieJaoudeCommunity/EddieBot/issues) or make a Pull Request 😃. Please see our [Contributing](CONTRIBUTING.md) file first, before making new commits or opening a PR. We appreciate it ❤️!

---

## → Features of EddieBot

- Set/Get user bio with description and social links

- Timezone, listens for messages that contain 1:30pm UTC and replies with common timezones translation

- Code of Conduct

- Daily standup message consistently formatted

- Help showing a list of available commands

- Members role rewards

- Gets tips of resources on a given subject

- Server status, to display some statistics of the server (e.g total number of users and messages)

- Firebase (Firestore) integration, allowing people to easily add commands and persist data

- GitHub Actions deploys mainline branch to Azure

## → Requirements

- [optional] Docker and Docker-Compose
- discord token. To get one follow [these instructions](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
- general channel ID of your discord server, read the instructions on one of these links to get yours:
  - [Get the channel ID of the Discord text channel](https://github.com/Chikachi/DiscordIntegration/wiki/How-to-get-a-token-and-channel-ID-for-Discord#get-the-channel-id-of-the-discord-text-channel)
  - [Where can I find my User/Server/Message ID?](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)
- ID of your discord server, to get your server ID follow these steps:
  - First make sure you have **Developer Mode** enabled on your Discord by visiting your Discord settings and going to Appearance
  - Right click on the server icon on the left hand sidebar then click on "Copy ID"
- firebase key for the project, check [these docs](https://firebase.google.com/docs/admin/setup) to get your key
- [optional] Github token that you can get from [here](https://github.com/settings/tokens)
- [optional] GCP account to deploy to (using GitHub Actions)

## → How to run EddieBot locally:

#### 1. Set Environment Variables

1. Copy `.env.example` to `.env`.
2. Generate the "Service Account" from Firebase Settings > Cloud Messaging.
   1. Download Service Account JSON file from this same screen.
3. Open `.env` and fill empty strings with matching credentials from the JSON file.

#### 2. To start the application
- [optional] To run with Docker ensure you have the latest version and Docker Compose installed and run
	- `docker-compose up`

- To run locally
  1. To setup: `npm run setup`
  2. To start: `npm run start:local`

---

### → Useful Commands

- **View Logs**

  `docker-compose logs --tail=all -f eddiebot-nodejs`

- **Use NodeJS instance CLI**

  `docker-compose exec eddiebot-nodejs /bin/bash`

### Standardized Code Formating

- **Before Commit**
  1. lint for errors: `npm run lint`
  2. fix any errors: `npm run lint:fix`

### Using Commitizen for commits
1. `git add <your files>`
2. `npm run commit`

### → Logging

Logging will happen to the console as well as to the Discord `bot` channel.

1. Include the logger object...

```typescript
import { log } from './logger';
```

2. Usage

```typescript
log.info('Message', 'Details');
```

or

```typescript
log.warn('Message', 'Details');
```

or

```typescript
log.error('Message', 'Details');
```

or

```typescript
log.fatal('Message', 'Details');
```

## Documentation
### Resources
- [Discord.js](https://discordjs.guide/)

- [Ban Example](docs/banexample.md)

- [Adding Commands](docs/addcommand.md)

- [Adding Allow Words](docs/allowedwords.md)

- [Database](docs/database.md)

---

## Socials

Join our discord community [here](https://discord.gg/jZQs6Wu)
