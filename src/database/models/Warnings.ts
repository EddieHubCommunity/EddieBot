import { Document, model, Schema } from 'mongoose';

export interface Warnings extends Document {
  serverId: string;
  messageId: string;
  channelId: string;
  notificationId: string;
}

const WarningsSchema = new Schema({
  serverId: {
    type: String,
    required: true,
    unique: true,
  },
  messageId: {
    type: String,
    required: true,
    unique: true,
  },
  channelId: {
    type: String,
    required: true,
    unique: true,
  },
  notificationId: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model<Warnings>('Warnings', WarningsSchema);
