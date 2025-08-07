import { Schema, model } from "mongoose";
import { IQuiz } from "./quiz.interface";

const quizSchema = new Schema<IQuiz>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    topic: { type: String, required: true },
    questions: [
      {
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        answer: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

quizSchema.index({ user: 1, course: 1, topic: 1 }, { unique: true });

export const Quiz = model<IQuiz>("Quiz", quizSchema);
