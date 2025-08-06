import { Schema, model } from "mongoose";
import { ITopicContent } from "./topic.interface";

const topicContentSchema = new Schema<ITopicContent>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    topic: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

topicContentSchema.index({ user: 1, course: 1, topic: 1 }, { unique: true });

export const TopicContent = model<ITopicContent>(
  "TopicContent",
  topicContentSchema
);
