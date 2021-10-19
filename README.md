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

**1.** Start by making a fork of the repository. Click on the "Fork" symbol at the top right corner.

**2.** Clone your new fork of the repository:

### SSH  [Github Docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

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
git checkout -b YourBranchName
```

**6.** Sync your fork or local repository with the origin repository:
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
git add .
```

```bash
git commit -m "<your_commit_message>"
```

**9.** Push your local commits to the remote repository:

```bash
git push origin YourBranchName
```

**10.** Create a [Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)!

**11.** **Congratulations!** You've made your first contribution to [**EddieBot**](https://github.com/EddieHubCommunity/EddieBot/graphs/contributors)! 🙌🏼


### Discord Docs

- https://discord.com/developers/docs/intro#bots-and-apps

## Running the app

```bash
$ npm install

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
