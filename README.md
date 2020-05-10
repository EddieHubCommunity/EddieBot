# EddieBot

Discord bot for Eddie Jaoude's Discord server

## Required

- node v10+ installed
- discord token. To get one follow [these instructions](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
- general channel ID of your discord server, read the instructions on one of these links to get yours:
   - [Get the channel ID of the Discord text channel](https://github.com/Chikachi/DiscordIntegration/wiki/How-to-get-a-token-and-channel-ID-for-Discord#get-the-channel-id-of-the-discord-text-channel)
   - [Where can I find my User/Server/Message ID?](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)
- [optional] GCP account to deploy to (using GitHub Actions)

## Quickstart

1. Clone the project or your fork (if you plan to make changes use your fork)
2. Install dependencies by running the command `npm install`

## Run the project locally on Mac and Linux using below command 
1. `DISCORD_TOKEN=<GET YOUR DISCORD TOKEN> GENERAL_CHANNEL_ID=<GET YOUR GENERAL CHANNEL ID> npm run start:local`

## Run on Windows using below commands
1. `set DISCORD_TOKEN=<GET YOUR DISCORD TOKEN>`
2. `set GENERAL_CHANNEL_ID=<GET YOUR GENERAL CHANNEL ID>`
3. `npm run start:local`
