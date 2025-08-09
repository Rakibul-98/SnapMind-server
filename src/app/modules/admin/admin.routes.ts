import express from "express";
import { AdminController } from "./admin.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.use(auth(["admin"]));

router.get("/users", AdminController.getAllUsers);
router.get("/courses/:userId", AdminController.getUserCourses);
router.get("/progress/:userId/:courseId", AdminController.getUserProgress);
router.get("/points/:userId", AdminController.getUserPoints);
router.get("/badges/:userId", AdminController.getUserBadges);

router.get("/leaderboard", AdminController.getLeaderboard);

export const AdminRoutes = router;
