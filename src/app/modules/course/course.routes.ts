import express from "express";
import { createCourseSchema } from "./course.validation";
import { courseControllers } from "./course.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  auth(["student"]),
  validateRequest(createCourseSchema),
  courseControllers.createCourse
);

router.get("/", auth(["student"]), courseControllers.getMyCourses);

router.get("/:id", auth(["student"]), courseControllers.getCourseById);

router.patch(
  "/:id/complete",
  auth(["student"]),
  courseControllers.completeCourse
);

export const courseRoutes = router;
