import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from 'discord.js';
import { ExtendedClient } from './ExtendedClient';

export interface Command {
  data: SlashCommandBuilder | SlashCommandSubcommandBuilder;
  run: (
    bot: ExtendedClient,
    interaction: ChatInputCommandInteraction,
  ) => Promise<void>;
}
