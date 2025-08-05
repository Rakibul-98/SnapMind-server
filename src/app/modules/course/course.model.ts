import { Schema, model } from "mongoose";
import { ICourse } from "./course.interface";

const courseSchema = new Schema<ICourse>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    outline: { type: [String], default: [] },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Course = model<ICourse>("Course", courseSchema);
