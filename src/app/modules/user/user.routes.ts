import express from "express";
import { updateUserSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { userControllers } from "./user.controller";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.get("/:email", auth(["admin"]), userControllers.getProfile);

router.get("/me", auth(["student", "admin"]), userControllers.getSelfProfile);

router.patch(
  "/:email",
  auth(["student", "admin"]),

  validateRequest(updateUserSchema),
  userControllers.updateProfile
);

router.get("/", auth(["admin"]), userControllers.getAllUsers);

export const userRoutes = router;
