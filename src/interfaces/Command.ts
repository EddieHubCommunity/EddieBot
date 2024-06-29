import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from 'discord.js';
import type { ExtendedClient } from './ExtendedClient.js';

export interface Command {
  data: SlashCommandBuilder | SlashCommandSubcommandBuilder;
  run: (
    bot: ExtendedClient,
    interaction: ChatInputCommandInteraction,
  ) => Promise<void>;
}
