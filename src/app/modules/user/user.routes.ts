import express from "express";
import * as userController from "./user.controller";
import { updateUserSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = express.Router();

router.get(
  "/:email",
  // auth(['admin']),
  userController.getProfile
);
router.patch(
  "/:email",
  // auth(['student', 'admin']),

  validateRequest(updateUserSchema),
  userController.updateProfile
);
router.get(
  "/",
  // auth(['admin']),
  userController.getAllUsers
); // Admin-only

export const userRoutes = router;
