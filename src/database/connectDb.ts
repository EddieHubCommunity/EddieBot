import fs from 'fs';
import { connect } from 'mongoose';
import { ExtendedClient } from '../interfaces/ExtendedClient';
import { errorHandler } from '../utils/errorHandler';

export const connectDb = async (bot: ExtendedClient) => {
  // DigitalOcean Apps has cert as environment variable but Mongo needs a file path
  // Write Mongo cert file to disk
  console.log('DB string ...', process.env.API_MONGO_CONNECTION_STRING);
  console.log('DB CERT ...', process.env.CA_CERT);
  fs.writeFileSync('cert.pem', process.env.CA_CERT!);

  try {
    await connect(bot.config.dbUri);
  } catch (err) {
    await errorHandler(bot, err, 'database connection');
  }
};
