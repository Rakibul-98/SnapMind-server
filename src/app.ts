import express from "express";
import cors from "cors";
// import morgan from 'morgan';
import { router } from "./app/routes";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("🌐 SnapMind API is running!");
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});
