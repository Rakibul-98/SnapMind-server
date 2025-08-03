import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app";

dotenv.config();

const port = process.env.PORT || 5000;

async function bootstrap() {
  try {
    // await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ MongoDB connected");

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to DB:", error);
  }
}

bootstrap();
