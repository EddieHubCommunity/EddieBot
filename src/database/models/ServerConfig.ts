import { Document, model, Schema } from 'mongoose';

export interface ServerConfig extends Document {
  serverId: string;
  allow: string[];
  deny: string[];
}

const ServerConfigSchema = new Schema({
  serverId: {
    type: String,
    required: true,
    unique: true,
  },
  allow: {
    type: Array,
  },
  deny: {
    type: Array,
  },
});

export default model<ServerConfig>('ServerConfig', ServerConfigSchema);
