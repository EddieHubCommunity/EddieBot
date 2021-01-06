#### Example adding ban capabilities to moderators:

1. Add the `GUILD_BANS` intent in `client.ts`:

```ts
export const client = new Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  ws: {
    intents: [
      'GUILDS',
      'GUILD_MESSAGES',
      'GUILD_MESSAGE_REACTIONS',
      'GUILD_BANS',
      PrivilegedIntents.GUILD_MEMBERS,
    ],
  },
});
```

2. Add an event handler function for the events you want in `index.ts`:

```ts
client.on('guildBanAdd', (guild) => guildBanAdd(guild));
```

_Note: We are using the `GUILD_MEMBERS` **privileged intent** to receive the `guildMemberAdd` event. To know more about Privileged Intents check the [official docs](https://discord.com/developers/docs/topics/gateway#privileged-intents)_.
