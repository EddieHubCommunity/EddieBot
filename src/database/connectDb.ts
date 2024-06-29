import { connect } from 'mongoose';
import type { ExtendedClient } from '../interfaces/ExtendedClient.js';
import { errorHandler } from '../utils/errorHandler.js';

export const connectDb = async (bot: ExtendedClient) => {
  // DigitalOcean Apps has cert as environment variable but Mongo needs a file path
  // Write Mongo cert file to disk
  // fs.writeFileSync('cert.pem', process.env.CA_CERT!); no longer needed should remove

  try {
    await connect(bot.config.dbUri);
  } catch (err) {
    await errorHandler(bot, err, 'database connection');
  }
};
