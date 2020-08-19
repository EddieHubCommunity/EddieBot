# EddieBot

![Production workflow](https://github.com/EddieJaoudeCommunity/EddieBot/workflows/production/badge.svg)
![Develop workflow](https://github.com/EddieJaoudeCommunity/EddieBot/workflows/develop/badge.svg)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Discord bot for Eddie Jaoude's Discord server

## Features of EddieBot

- Set/Get user bio with description and social links

- Timezone, listens for messages that contain 1:30pm UTC and replies with common timezones translation

- Code of Conduct

- Daily standup message consistently formatted

- Help showing a list of available commands

- Members role rewards

- Gets tips of resources on a given subject

- Server status

- Firebase (Firestore) integration, allowing people to easily add commands and persist data

- GitHub Actions deploys mainline branch to Azure

## Required

- node v10+ installed
- discord token. To get one follow [these instructions](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
- general channel ID of your discord server, read the instructions on one of these links to get yours:
   - [Get the channel ID of the Discord text channel](https://github.com/Chikachi/DiscordIntegration/wiki/How-to-get-a-token-and-channel-ID-for-Discord#get-the-channel-id-of-the-discord-text-channel)
   - [Where can I find my User/Server/Message ID?](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)
- ID of your discord server, to get your server ID follow these steps:
   - First make sure you have **Developer Mode** enabled on your Discord by visiting your Discord settings and going to Appearance

   ![user settings button](https://user-images.githubusercontent.com/18630253/83634306-3458c180-a59a-11ea-8a96-15e9751b9d08.png)
   ![developer mode toggle button](https://user-images.githubusercontent.com/18630253/83634441-7a158a00-a59a-11ea-919c-2d7384d724f7.png)

   - Right click on the server icon on the left hand sidebar then click on "Copy ID"
- [optional] GCP account to deploy to (using GitHub Actions)

## Quickstart

1. Clone the project or your fork (if you plan to make changes use your fork)
2. Install dependencies by running the command `npm install`

### Run the project locally on Mac and Linux using below command
1. `DISCORD_TOKEN=<GET YOUR DISCORD TOKEN> GENERAL_CHANNEL_ID=<GET YOUR GENERAL CHANNEL ID> DISCORD_SERVER_ID=<YOUR SERVER_ID> DISCORD_BOT_CHANNEL_ID=<ID> COMMAND_PREFIX=<PREFIX> FIREBASE_KEY=<FIREBASE_KEY> npm run start:local`

or you can the envars in a file `envars.tmp.sh` and run the command `source envars.tmp.sh && npm run start:local`

Example `envars.tmp.sh` file

```bash
export DISCORD_TOKEN=<DISCORD_TOKEN>
export COMMAND_PREFIX='^'
export DISCORD_SERVER_ID=<DISCORD_SERVER_ID>
export DISCORD_BOT_CHANNEL_ID=<DISCORD_BOT_CHANNEL_ID>
export FIREBASE_KEY=<FIREBASE_KEY>
```

### Run on Windows using below commands
1. `set DISCORD_TOKEN=<GET YOUR DISCORD TOKEN>`
2. `set GENERAL_CHANNEL_ID=<GET YOUR GENERAL CHANNEL ID>`
3. `set DISCORD_SERVER_ID=<YOUR SERVER_ID>`
4. `set DISCORD_BOT_CHANNEL_ID=<ID>`
5. `set COMMAND_PREFIX=<PREFIX>`
6. `npm run start:local`

**Note**

`FIREBASE_KEY` is the firebase service key and expected key structure is json string that needs to be valid json with single quotes around the whole string and the field names/values need double quotes. An example below: 

`export FIREBASE_KEY='{"type": "service_account","project_id": ... }'`

### Logging

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

### [Discord Gateway Intents](https://discordjs.guide/popular-topics/intents.html)
If you want the bot to receive a **new type of event**, you might need to add the required intent in `client.ts` to receive that event. Have a look at [discord.js docs](https://discord.js.org/#/docs/main/stable/class/Intents?scrollTo=s-FLAGS) for the list of intents.

#### Example adding ban capabilities to moderators:
1. Add the `GUILD_BANS` intent in `client.ts`:
```ts
export const client = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_BANS', PrivilegedIntents.GUILD_MEMBERS] }
});
```

2. Add an event handler function for the events you want in `index.ts`:
```ts
client.on('guildBanAdd', guild => guildBanAdd(guild));
```

_Note: We are using the `GUILD_MEMBERS` **privileged intent** to receive the `guildMemberAdd` event. To know more about Privileged Intents check the [official docs](https://discord.com/developers/docs/topics/gateway#privileged-intents)_.

---

## How to add a new command to the bot

All the commands are located in the folder `src/commandHandlers` so that each command has its own file. They are then executed in `src/commands.ts` when a user types a command with the configured command prefix in [config.ts](https://github.com/EddieJaoudeCommunity/EddieBot/blob/develop/src/config.ts#L4).

To **create a new command**, follow these steps:

1. **Create a new file** on the `/commandHandlers` folder with the name of the new command.
   _Note: If you need to, use **camel case** for the file name, like_ `codeOfConduct.ts`
2. On this file you must **export a function** and **three variables**:
   - `command` - the function that executes the command. The **signature** of this function is the following:
   ```ts
   (arg: string, embed: MessageEmbed, message: Message): Promise<MessageEmbed>
   ```

   The **arg** parameter contains the arguments given to the command in a string.
   The **embed** parameter is a [MessageEmbed](https://discord.js.org/#/docs/main/stable/class/MessageEmbed) instance, and it represents the message that is returned by the bot, in response to the user. **The command should return this parameter or a new instance** with an appropriate message to the user.
   The **message** parameter is a [Message](https://discord.js.org/#/docs/main/stable/class/Message) instance that represents the message inputted  by the user to execute a given command.

   - `description` - a string with a more detailed description of the command. Used for example by the [help command](https://github.com/EddieJaoudeCommunity/EddieBot/blob/develop/src/commandHandlers/help.ts)
   - `triggers` - a string array with the values that trigger this command. If the user types the configured command prefix followed by one of these values, the command **should be executed**
   - `usage` - a string explaining how the command is used (e.g. specifying the number of arguments and their separator)
3. After creating that file, you have to import it and add it to the exported list of commands on the [index.ts](https://github.com/EddieJaoudeCommunity/EddieBot/blob/develop/src/commandHandlers/index.ts) file located in this folder. Here is an example of adding the `standup` command:

```diff
import * as codeOfConduct from './codeOfConduct';
import * as help from './help';
+ import * as standup from './standup';
import * as stats from './stats';

- export default [codeOfConduct, help, stats];
+ export default [codeOfConduct, help, standup, stats];

export { fallback } from './fallback';
```

## Database

Using Firestore from Firebase.

[![](https://mermaid.ink/img/eyJjb2RlIjoiY2xhc3NEaWFncmFtXG5cdFVzZXIgLS0gQmlvIDogTmVzdGVkXG5cblx0VXNlcjogYmlvIChvYmplY3QpXG5cdFVzZXI6IGF2YXRhciAoc3RyaW5nKVxuXHRVc2VyOiBqb2luZWRBdCAoZGF0ZSlcblx0VXNlcjogdXBkYXRlZEF0IChkYXRlKVxuXHRVc2VyOiB1c2VybmFtZSAoc3RyaW5nKVxuXG5cdEJpbzogZGVzY3JpcHRpb25cblx0QmlvOiB0d2l0dGVyXG5cdEJpbzogZ2l0aHViXG5cdEJpbzogeW91dHViZVxuXHRCaW86IGxpbmtlZGluXG5cblx0XHRcdFx0XHQiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiY2xhc3NEaWFncmFtXG5cdFVzZXIgLS0gQmlvIDogTmVzdGVkXG5cblx0VXNlcjogYmlvIChvYmplY3QpXG5cdFVzZXI6IGF2YXRhciAoc3RyaW5nKVxuXHRVc2VyOiBqb2luZWRBdCAoZGF0ZSlcblx0VXNlcjogdXBkYXRlZEF0IChkYXRlKVxuXHRVc2VyOiB1c2VybmFtZSAoc3RyaW5nKVxuXG5cdEJpbzogZGVzY3JpcHRpb25cblx0QmlvOiB0d2l0dGVyXG5cdEJpbzogZ2l0aHViXG5cdEJpbzogeW91dHViZVxuXHRCaW86IGxpbmtlZGluXG5cblx0XHRcdFx0XHQiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)

Source

```
classDiagram
	User -- Bio : Nested

	User: bio (object)
	User: avatar (string)
	User: joinedAt (date)
	User: updatedAt (date)
	User: username (string)

	Bio: description
	Bio: twitter
	Bio: github
	Bio: youtube
	Bio: linkedin
```

---

If you are having trouble creating a new command, here is an [example](https://github.com/EddieJaoudeCommunity/EddieBot/blob/develop/src/commandHandlers/standup.ts).
Feel free to [create an issue](https://github.com/EddieJaoudeCommunity/EddieBot/issues) or make a PR with a new command 😃. Please see our [Contributing](./.github/CONTRIBUTING.md) file first, before making new commits or opening a PR. We appreciate it ❤️!

---

## Socials

Join our discord community [here](https://discord.gg/jZQs6Wu)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/alrifay"><img src="https://avatars1.githubusercontent.com/u/19517534?v=4" width="100px;" alt=""/><br /><sub><b>Mohamed Al-Rifay</b></sub></a><br /><a href="https://github.com/EddieJaoudeCommunity/EddieBot/commits?author=alrifay" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://bolt04.github.io/react-ultimate-resume/"><img src="https://avatars2.githubusercontent.com/u/18630253?v=4" width="100px;" alt=""/><br /><sub><b>David</b></sub></a><br /><a href="https://github.com/EddieJaoudeCommunity/EddieBot/commits?author=BOLT04" title="Code">💻</a></td>
    <td align="center"><a href="https://ste.london"><img src="https://avatars0.githubusercontent.com/u/150512?v=4" width="100px;" alt=""/><br /><sub><b>Stephen Mount</b></sub></a><br /><a href="https://github.com/EddieJaoudeCommunity/EddieBot/commits?author=stemount" title="Tests">⚠️</a> <a href="#ideas-stemount" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/mikeysan"><img src="https://avatars1.githubusercontent.com/u/13338176?v=4" width="100px;" alt=""/><br /><sub><b>Michael Mba</b></sub></a><br /><a href="https://github.com/EddieJaoudeCommunity/EddieBot/commits?author=mikeysan" title="Code">💻</a></td>
    <td align="center"><a href="http://youtube.com/eddiejaoude?sub_confirmation=1"><img src="https://avatars3.githubusercontent.com/u/624760?v=4" width="100px;" alt=""/><br /><sub><b>Eddie Jaoude</b></sub></a><br /><a href="https://github.com/EddieJaoudeCommunity/EddieBot/commits?author=eddiejaoude" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/AllanRegush"><img src="https://avatars0.githubusercontent.com/u/17693494?v=4" width="100px;" alt=""/><br /><sub><b>Allan Regush</b></sub></a><br /><a href="https://github.com/EddieJaoudeCommunity/EddieBot/commits?author=AllanRegush" title="Code">💻</a> <a href="#maintenance-AllanRegush" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://ruthie.hashnode.dev/"><img src="https://avatars1.githubusercontent.com/u/62059002?v=4" width="100px;" alt=""/><br /><sub><b>Ruth Ikegah</b></sub></a><br /><a href="https://github.com/EddieJaoudeCommunity/EddieBot/commits?author=Ruth-ikegah" title="Code">💻</a> <a href="https://github.com/EddieJaoudeCommunity/EddieBot/commits?author=Ruth-ikegah" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
