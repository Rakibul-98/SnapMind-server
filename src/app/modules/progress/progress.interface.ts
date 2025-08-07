export interface IQuizScore {
  topic: string;
  score: number;
}

export interface IProgress {
  user: string;
  course: string;
  completedTopics: string[];
  quizScores: IQuizScore[];
}
