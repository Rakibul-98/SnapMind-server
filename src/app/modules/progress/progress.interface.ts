export interface IQuizScore {
  topic: string;
  score: number;
}

export interface IProgress {
  user: string;
  course: string;
  totalScore: number;
  totalTopics: number;
  completedTopics: string[];
  quizScores: IQuizScore[];
}
