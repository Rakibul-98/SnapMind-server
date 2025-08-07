import { Types } from "mongoose";

export interface IQuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface IQuiz {
  user: Types.ObjectId;
  course: Types.ObjectId;
  topic: string;
  questions: IQuizQuestion[];
  createdAt?: Date;
}
