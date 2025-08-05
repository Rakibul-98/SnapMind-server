import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  dbUri: process.env.DB_URI as string,
};
