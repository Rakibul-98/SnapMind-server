import { Schema, model } from "mongoose";

const progressSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    completedTopics: [{ type: String }],
    quizScores: [
      {
        topic: { type: String },
        score: { type: Number },
      },
    ],
    totalScore: { type: Number, default: 0 },
    totalTopics: { type: Number, default: 0 },
  },
  { timestamps: true }
);

progressSchema.index({ user: 1, course: 1 }, { unique: true });

export const ProgressModel = model("Progress", progressSchema);
