import { Types } from "mongoose";

export interface IBadge {
  user: Types.ObjectId;
  badgeType: string;
  description: string;
  awardedAt: Date;
}
