import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbUri: process.env.DB_URI as string,
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: process.env.JWT_EXPIRES_IN as string,
    refreshSecret: process.env.JWT_REFRESH_SECRET as string,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN as string,
  },

  quizPoint: Number(process.env.QUIZ_POINT) || 5,
  topicPoint: Number(process.env.TOPIC_POINT) || 10,
  perfectScoreBonus: Number(process.env.PERFECT_SCORE_BONUS) || 20,
  baseStreakPoint: Number(process.env.BASE_STREAK_POINT) || 5,

  groqAiModel: process.env.GROQ_AI_MODEL as string,
  groqAPIKEY: process.env.GROQ_API_KEY as string,
};
