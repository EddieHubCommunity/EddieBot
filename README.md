# EddieBot

The official **EddieBot** for the official [Discord server](http://discord.eddiehub.org). Join us at [Discord](http://discord.eddiehub.org) today!

## Features

- Checking all people's messages for inclusive language.

## Config / Secrets environment variables

Copy `.env.example` to `.env` and add your private information

*Note: never commit this file, it is ignored by Git*

```
DISCORD_TOKEN="<your-token>"
EDDIEBOT_MONGO_CONNECTION_STRING="<your-mongo-connection-string>"
```

## Installation

**1.** Start by making a fork of the repository. Click on the "Fork" symbol at the top right corner.

**2.** Clone your new fork of the repository:

### SSH  [Github Docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

```bash
$ git clone git@github.com:EddieHubCommunity/EddieBot.git
```

*note: recommended*

### GitHub CLI

```bash
$ gh repo clone EddieHubCommunity/EddieBot
```

### HTTPS

```bash
$ git clone https://github.com/EddieHubCommunity/EddieBot.git
```

**3.** Set upstream command:
```bash
git remote add upstream https://github.com/EddieHubCommunity/EddieBot.git
```

**4.** Navigate to the new project directory:

```bash
cd EddieBot
```

**5.** Create a new branch:
```bash
git checkout -b <branch-name>
```

**6.** Sync your fork or a local repository with the origin repository:
- In your forked repository click on "Fetch upstream"
- Click "Fetch and merge".

### Alternatively, Git CLI way to Sync forked repository with origin repository:
```bash
git fetch upstream
```
```bash
git merge upstream/main
```

**7.** Make your changes to the source code.

**8.** Stage your changes and commit:

```bash
git add <filename>
```

```bash
git commit -m "<your-commit-message>"
```

**9.** Push your local commits to the remote repository:

```bash
git push origin <branch-name>
```

**10.** Create a [Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)!

**11.** **Congratulations!** You've made your first contribution to [**EddieBot**](https://github.com/EddieHubCommunity/EddieBot/graphs/contributors)! 🙌🏼


### Discord Docs

- https://discord.com/developers/docs/intro#bots-and-apps

## Running the app

```bash
$ npm install

# development
$ npm run build
$ npm start
```

## Support

EddieBot is an MIT-licensed open source project. It can grow thanks to the contributors and the community members. If you'd like to join them, feel free to make a pull request and we'll review it.

Stuck? Have any questions or comments? Join us on [Discord](http://discord.eddiehub.org/) and ask for help.

## License

The EddieBot is licensed under the [MIT](https://github.com/EddieHubCommunity/EddieBot/blob/main/LICENSE) license.

## Thanks to all Contributors 💪 

Thanks a lot for spending your time helping EddieBot grow. Thanks a lot! Keep rocking 🍻

[![Contributors](https://contrib.rocks/image?repo=EddieHubCommunity/EddieBot)](https://github.com/EddieHubCommunity/EddieBot/graphs/contributors)
