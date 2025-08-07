import { model, Schema } from "mongoose";

const quizAttemptSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    score: { type: Number, required: true },
    answers: [
      {
        question: String,
        selected: String,
        correct: String,
      },
    ],
  },
  { timestamps: true }
);
quizAttemptSchema.index({ user: 1, quiz: 1 }, { unique: true });

export const QuizAttemptModel = model("QuizAttempt", quizAttemptSchema);
