## How to add a new command to the bot
 If you are new to Discord bot development, here is a small introduction about the flow of something happening on the Discord server to the bot.
 
 ### Introduction
 When a message is sent by a user on the Discord server, the Discord app sends an event to the [Discord Gateway](https://discord.com/developers/docs/topics/gateway), which then sends that event to the clients that are connected to it with WebSockets, in our case [Discord.js](https://discord.js.org/#/).
 The start of the program is at `src/index.ts`, and here we register an event handler (the function exported on `src/commands.ts`) for the `message` event here. The client library ([Discord.js](https://discord.js.org/#/)) will call that function when it receives the `message` event from the Discord Gateway, and this is where the commands exported in the [src/commandHandlers/index.ts](https://github.com/EddieJaoudeCommunity/EddieBot/blob/develop/src/commandHandlers/index.ts) are used and where there is logic to decide which one to call.
 
 ### Steps to create a new command
 All the commands are located in the folder `src/commandHandlers` so that each command has its own file. They are then executed in `src/commands.ts` when a user types a command with the configured command prefix in [config.ts](https://github.com/EddieJaoudeCommunity/EddieBot/blob/develop/src/config.ts#L4).
 
To **create a new command**, follow these steps:

1. **Create a new file** on the `/commandHandlers` folder with the name of the new command.
   _Note: If you need to, use **camel case** for the file name, like_ `codeOfConduct.ts`
2. On this file you must **export a function** and **three variables**:

   - `command` - the function that executes the command. The **signature** of this function is the following:

   ```ts
   (arg: [string, string], embed: MessageEmbed, message: Message): Promise<MessageEmbed>
   ```

   The **arg** parameter contains the arguments given to the command in a string.
   The **arg** parameter is a tuple of two `string`s where, `arg[0]` is the command name and `arg[1]` is the string of command arguments.
   The **embed** parameter is a [MessageEmbed](https://discord.js.org/#/docs/main/stable/class/MessageEmbed) instance, and it represents the message that is returned by the bot, in response to the user. **The command should return this parameter or a new instance** with an appropriate message to the user.
   The **message** parameter is a [Message](https://discord.js.org/#/docs/main/stable/class/Message) instance that represents the message inputted by the user to execute a given command.

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

If you are having trouble creating a new command, here is an [example](https://github.com/EddieJaoudeCommunity/EddieBot/blob/develop/src/commandHandlers/standup.ts).