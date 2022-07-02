import { Document, model, Schema } from 'mongoose';

export interface Statistics extends Document {
  serverId: string;
  totalTriggers: number;
  totalTriggersFixed: number;
  totalWordTriggers: {
    [key: string]: number;
  };
}

const Statistics = new Schema({
  serverId: {
    type: String,
    required: true,
    unique: true,
  },
  totalTriggers: {
    type: Number,
    required: false,
    unique: false,
    default: 0,
  },
  totalTriggersFixed: {
    type: Number,
    required: false,
    unique: false,
    default: 0,
  },
});

export default model<Statistics>('Statistics', Statistics);
