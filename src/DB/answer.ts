import mongoose, { Schema, Document } from 'mongoose';

interface IAnswer extends Document {
  number: string;
  answers: string[];
}

const AnswerSchema: Schema = new Schema({
  number: { type: String, required: true, unique: true },
  answers: [{ type: String }],
});

export default mongoose.model<IAnswer>('Answer', AnswerSchema);
