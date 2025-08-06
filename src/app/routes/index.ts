import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { courseRoutes } from "../modules/course/course.routes";
import { AiRoutes } from "../modules/ai/ai.route";

export const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
router.use("/ai", AiRoutes);

router.get("/test", (req, res) => {
  res.status(200).json({ message: "Test route working!" });
});
