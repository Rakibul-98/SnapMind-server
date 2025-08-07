import express from "express";
import { ProgressController } from "./progress.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.get("/:courseId", auth(["student"]), ProgressController.getProgress);

export const ProgressRoutes = router;
