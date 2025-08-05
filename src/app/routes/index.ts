import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";

export const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

router.get("/test", (req, res) => {
  res.status(200).json({ message: "Test route working!" });
});
