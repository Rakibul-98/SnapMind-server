import express from "express";
import { auth } from "../../middlewares/auth";
import { TopicContentController } from "./topic.controller";

const router = express.Router();

router.post(
  "/content",
  auth(["student"]),
  TopicContentController.getContentByTopic
);

export const TopicContentRoutes = router;
