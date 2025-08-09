import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { courseRoutes } from "../modules/course/course.routes";
import { AiRoutes } from "../modules/ai/ai.route";
import { TopicContentRoutes } from "../modules/topicContent/topic.routes";
import { QuizRoutes } from "../modules/quiz/quiz.routes";
import { ProgressRoutes } from "../modules/progress/progress.routes";
import { PointRoutes } from "../modules/gamification/gamification.routes";
import { BadgeRoutes } from "../modules/badge/badge.routes";
import { LeaderboardRoutes } from "../modules/leaderboard/leaderboard.route";
import { AdminRoutes } from "../modules/admin/admin.routes";

export const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
router.use("/ai", AiRoutes);
router.use("/topic", TopicContentRoutes);
router.use("/quiz", QuizRoutes);
router.use("/progress", ProgressRoutes);
router.use("/points", PointRoutes);
router.use("/badges", BadgeRoutes);
router.use("/leaderboard", LeaderboardRoutes);
router.use("/admin", AdminRoutes);
