export interface IPoints {
  user: string;
  totalPoints: number;
  history: {
    type: "quiz" | "course" | "streak" | "bonus";
    points: number;
    description: string;
    date: Date;
  }[];
}
