import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";

export const router = Router();

router.use("/users", userRoutes);

router.get("/test", (req, res) => {
  res.status(200).json({ message: "Test route working!" });
});
