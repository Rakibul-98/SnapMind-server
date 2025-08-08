import { Router } from "express";
import { PointsController } from "./gamification.controller";

const router = Router();

router.post("/add", PointsController.addPoints);
router.get("/leaderboard", PointsController.leaderboard);

export const PointRoutes = router;
