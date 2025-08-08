import { Schema, model } from "mongoose";
import { IPoints } from "./gamification.interface";

const PointsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  totalPoints: { type: Number, default: 0 },
  history: [
    {
      type: {
        type: String,
        enum: ["quiz", "course", "streak"],
        required: true,
      },
      points: { type: Number, required: true },
      description: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

export const PointsModel = model<IPoints>("Points", PointsSchema);
