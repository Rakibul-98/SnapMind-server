import express from "express";
import { registerSchema, loginSchema } from "./auth.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { authControllers } from "./auth.controller";

const router = express.Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  authControllers.register
);
router.post("/login", validateRequest(loginSchema), authControllers.login);
router.post("/refresh-token", authControllers.refresh);

export const authRoutes = router;
