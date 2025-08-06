// ai.route.ts
import express from "express";
import { auth } from "../../middlewares/auth";
import { generateCourseOutline } from "./ai.controller";

const router = express.Router();

router.post(
  "/course-outline",
  auth(["student", "admin"]),
  generateCourseOutline
);

export const AiRoutes = router;
