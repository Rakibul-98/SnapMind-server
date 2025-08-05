import { IUser } from "./user.interface";
import { User } from "./user.model";

const getUserProfileByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email }).select("-password");
};

const updateUserProfileByEmail = async (
  email: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  return User.findOneAndUpdate({ email }, payload, { new: true }).select(
    "-password"
  );
};

const getAllUsers = async (): Promise<IUser[]> => {
  return User.find().select("-password");
};

export const userServices = {
  getUserProfileByEmail,
  updateUserProfileByEmail,
  getAllUsers,
};
