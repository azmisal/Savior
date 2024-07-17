// src/app/api/tester/model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ClickData extends Document {
  button: string;
  input: string;
  message: string;
  createdAt: Date;
}

const ClickDataSchema = new Schema({
  button: { type: String, required: true },
  input: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.ClickData ||
  mongoose.model<ClickData>('ClickData', ClickDataSchema);
