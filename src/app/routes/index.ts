import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { courseRoutes } from "../modules/course/course.routes";
import { AiRoutes } from "../modules/ai/ai.route";
import { TopicContentRoutes } from "../modules/topicContent/topic.routes";

export const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
router.use("/ai", AiRoutes);
router.use("/topic", TopicContentRoutes);

router.get("/test", (req, res) => {
  res.status(200).json({ message: "Test route working!" });
});
