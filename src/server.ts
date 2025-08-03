import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app";
import { config } from "./app/config";

dotenv.config();

const port = config.port;

async function bootstrap() {
  try {
    await mongoose.connect(config.dbUri as string);
    console.log("✅ MongoDB connected");

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to DB:", error);
  }
}

bootstrap();
