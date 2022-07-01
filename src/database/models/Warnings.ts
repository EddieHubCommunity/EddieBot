import { Document, model, Schema } from 'mongoose';

export interface Warnings extends Document {
  serverId: string;
  messageId: string;
  channelId: string;
  warningId: string;
}

const WarningsSchema = new Schema({
  serverId: {
    type: String,
    required: true,
    unique: false,
  },
  messageId: {
    type: String,
    required: true,
    unique: false,
  },
  channelId: {
    type: String,
    required: true,
    unique: false,
  },
  warningId: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model<Warnings>('Warnings', WarningsSchema);
