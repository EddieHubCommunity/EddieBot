import { Document, model, Schema } from 'mongoose';

export interface ServerConfig extends Document {
  serverId: string;
  alexConfig?: {
    allow: string[];
    profanitySureness: 0 | 1 | 2;
    noBinary: boolean;
  };
  bannedWordConfig?: [];
}

const ServerConfigSchema = new Schema({
  serverId: {
    type: String,
    required: true,
    unique: true,
  },
  alexConfig: {
    type: {
      allow: Array,
      profanitySureness: Number,
      noBinary: Boolean,
    },
  },
  bannedWordConfig: {
    type: Array,
  },
});

export default model<ServerConfig>('ServerConfig', ServerConfigSchema);
