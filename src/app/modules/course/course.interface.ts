import { Types } from "mongoose";

export interface ICourse {
  _id?: string;
  user: Types.ObjectId;
  title: string;
  description?: string;
  outline: string[];
  isCompleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
