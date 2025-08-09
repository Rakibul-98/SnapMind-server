import express from "express";
import { BadgeController } from "./badge.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.get("/", auth(["student"]), BadgeController.getBadges);

export const BadgeRoutes = router;
