import { Collection, Snowflake } from 'discord.js';
import config from './config';

const collection = new Collection<Snowflake, number>();

export default {
  isCooled: (id: Snowflake): boolean => {
    const nextCommand = collection.get(id);
    return !!nextCommand && nextCommand > Date.now();
  },
  setCool: (id: Snowflake): void => {
    collection.set(id, Date.now() + config.COOLDOWN_SECONDS * 1000);
  },
};
