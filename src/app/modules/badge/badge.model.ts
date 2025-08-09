import { Schema, model } from "mongoose";
import { IBadge } from "./badge.interface";

const badgeSchema = new Schema<IBadge>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  badgeType: { type: String, required: true },
  description: { type: String, required: true },
  awardedAt: { type: Date, default: Date.now },
});

badgeSchema.index({ user: 1, badgeType: 1 }, { unique: true });
export const BadgeModel = model<IBadge>("Badge", badgeSchema);
