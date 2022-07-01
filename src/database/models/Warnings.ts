import { Document, model, Schema } from 'mongoose';

export interface Warnings extends Document {
  serverId: string;
  messageId: number;
  channelId: number;
  notificationId: number;
}

const WarningsSchema = new Schema({
  serverId: {
    type: String,
    required: true,
    unique: true,
  },
  messageId: {
    type: Number,
    required: true,
    unique: true,
  },
  channelId: {
    type: Number,
    required: true,
    unique: true,
  },
  notificationId: {
    type: Number,
    required: true,
    unique: true,
  },
});

export default model<Warnings>('Warnings', WarningsSchema);
