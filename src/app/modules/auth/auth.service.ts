import bcrypt from "bcrypt";
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { IAuthUser, IAuthResponse } from "./auth.interface";
import { User } from "../user/user.model";
import { AppError } from "../../errors/AppError";
import { config } from "../../config";

const createToken = (
  payload: object,
  secret: Secret,
  expiresIn: string
): string => {
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  };
  return jwt.sign(payload, secret, options);
};

const registerUser = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new AppError("User already exists", 409);

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...data, password: hashedPassword });
  return { id: newUser._id, email: newUser.email };
};

const loginUser = async (payload: IAuthUser): Promise<IAuthResponse> => {
  const user = await User.findOne({ email: payload.email }).select("+password");
  if (!user) throw new AppError("Invalid credentials", 401);

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) throw new AppError("Invalid credentials", 401);

  const accessToken = createToken(
    { _id: user._id, role: user.role },
    config.jwt.secret,
    config.jwt.expiresIn
  );

  const refreshToken = createToken(
    { _id: user._id, role: user.role },
    config.jwt.refreshSecret,
    config.jwt.refreshExpiresIn
  );

  return { accessToken, refreshToken };
};

const refreshToken = async (token: string): Promise<string> => {
  try {
    const decoded = jwt.verify(token, config.jwt.refreshSecret) as {
      _id: string;
      role: string;
    };
    return createToken(
      { _id: decoded._id, role: decoded.role },
      config.jwt.secret,
      config.jwt.expiresIn
    );
  } catch {
    throw new AppError("Invalid refresh token", 403);
  }
};

export const authServices = {
  refreshToken,
  loginUser,
  registerUser,
};
