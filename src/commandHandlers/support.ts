import { MessageEmbed, Message } from 'discord.js';
import { removeStopwords } from 'stopword';
import removeMd from 'remove-markdown';
import axios from 'axios';
import { log } from '../logger';
import config, { issueRequestConfig } from '../config';
const { COLORS } = config;

export const command = async (
  arg: [string, string],
  embed: MessageEmbed,
  message: Message
) => {
  const parsedCommand = parseSearchCommand(arg[1]);
  if (parsedCommand) {
    return searchIssuesCommand(parsedCommand[1], embed);
  }

  const mention = message.mentions.users.first();

  return embed
    .addField(
      'Support',
      `Hey ${
        mention ? mention!.username : message.author.username
      }, for help, questions or to submit a suggestion, please create a discussion on our GitHub Community`
    )
    .addField(
      'Discussion',
      'https://github.com/EddieJaoudeCommunity/support/discussions/category_choices'
    );
};

/**
 * The first part of the pattern `^search\s+` matches against any string that starts with the word `search`
 * followed by at least one space or more, the second part `([\s\S]+)$` captures everything (including new lines)
 * after the space to the end of the string and the `i` flag make the pattern case-insensitive.
 *
 * `\s` matches any space character and `\S` matches any non-space character
 * so using them combined `[\s\S]` works like `.` with one difference that `.` can't match a newline but `[\s\S]` does.
 *
 * @param {string} text
 * @returns {RegExpMatchArray|null}
 */
const parseSearchCommand = (text: string): RegExpMatchArray | null =>
  text.match(/^search\s+([\s\S]+)$/i);

const searchIssuesCommand = async (question: string, embed: MessageEmbed) => {
  const words = question.split(/\W+/gi).filter((word) => word);
  const keywords = removeStopwords(words);
  const issues = await fetchIssues(keywords.join(' '));

  embed.setColor(COLORS.github).setTitle('Support repository issues');

  if (!issues.length) {
    return embed.setDescription(
      "we couldn't find any issue, raise a question on the [support repo](https://github.com/EddieJaoudeCommunity/support/issues/new/choose)."
    );
  }

  embed.setDescription(
    "if you didn't find what you need, raise a question on the [support repo](https://github.com/EddieJaoudeCommunity/support/issues/new/choose)."
  );

  issues.forEach((issue: Issue) => {
    const description = removeMd(issue.body).trim().replace(/\n+/g, '\n');
    const briefDescription = truncate(description);
    embed.addField(
      `${issue.title} #${issue.number}`,
      `Author: [${issue.user.login}](${issue.user.html_url}) | Status: ${issue.state} | Comments: ${issue.comments}\n[${briefDescription}](${issue.html_url})`
    );
  });

  return embed;
};

const fetchIssues = async (q: string): Promise<Issue[]> => {
  const request = {
    ...issueRequestConfig,
    url: '/issues',
    params: {
      per_page: 3,
      q: `${q} is:issue repo:EddieJaoudeCommunity/support`,
    },
  };
  try {
    return (await axios(request)).data.items;
  } catch (error) {
    log.error('Something went wrong when fetching the issues: ', error);
    return [];
  }
};

const truncate = (text: string, limit = 100) =>
  text.length > limit ? `${text.slice(0, limit)}...` : text;

export const description =
  'Get Support information or find issues in the support repository';

export const triggers = ['support'];

export const usage = `${triggers[0]} or ${triggers[0]} <@user> or ${triggers[0]} search <question>`;

interface Issue {
  title: string;
  html_url: string;
  body: string;
  state: string;
  number: number;
  comments: number;
  user: {
    login: string;
    html_url: string;
  };
}
