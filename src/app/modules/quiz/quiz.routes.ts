import express from "express";
import { QuizController } from "./quiz.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post("/topic", auth(["student"]), QuizController.getQuizByTopic);

export const QuizRoutes = router;
