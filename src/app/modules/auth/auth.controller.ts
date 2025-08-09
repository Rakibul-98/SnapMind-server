import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.registerUser(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, refreshToken, user } = await authServices.loginUser(
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: { accessToken, refreshToken, user },
  });
});

const refresh = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const newAccessToken = await authServices.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Access token refreshed",
    data: { accessToken: newAccessToken },
  });
});

export const authControllers = {
  register,
  login,
  refresh,
};
