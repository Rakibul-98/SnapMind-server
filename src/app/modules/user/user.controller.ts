import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";

export const getProfile = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await userServices.getUserProfileByEmail(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User profile fetched successfully",
    data: result,
  });
});

export const updateProfile = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await userServices.updateUserProfileByEmail(email, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User profile updated successfully",
    data: result,
  });
});

export const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getAllUsers();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All users retrieved successfully",
    data: result,
  });
});
