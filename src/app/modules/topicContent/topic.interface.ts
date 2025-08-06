// topicContent.interface.ts
import { Types } from "mongoose";

export interface ITopicContent {
  user: Types.ObjectId;
  course: Types.ObjectId;
  topic: string;
  content: string;
  createdAt?: Date;
}
