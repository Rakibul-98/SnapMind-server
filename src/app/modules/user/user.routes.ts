import express from "express";
import { updateUserSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { userControllers } from "./user.controller";

const router = express.Router();

router.get(
  "/:email",
  // auth(['admin']),
  userControllers.getProfile
);
router.patch(
  "/:email",
  // auth(['student', 'admin']),

  validateRequest(updateUserSchema),
  userControllers.updateProfile
);
router.get(
  "/",
  // auth(['admin']),
  userControllers.getAllUsers
); // Admin-only

export const userRoutes = router;
