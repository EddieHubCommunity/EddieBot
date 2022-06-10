import { connect } from 'mongoose';
import { ExtendedClient } from '../interfaces/ExtendedClient';
import { errorHandler } from '../utils/errorHandler';

export const connectDb = async (bot: ExtendedClient) => {
  try {
    await connect(bot.config.dbUri);
  } catch (err) {
    await errorHandler(bot, err, 'database connection');
  }
};
