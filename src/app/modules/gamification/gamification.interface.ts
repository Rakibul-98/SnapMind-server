export interface IPoints {
  user: string;
  totalPoints: number;
  history: {
    type: "quiz" | "course" | "streak";
    points: number;
    description: string;
    date: Date;
  }[];
}
