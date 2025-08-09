export type UserRole = "student" | "admin";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}
