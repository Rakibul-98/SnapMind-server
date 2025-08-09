import { BadgeModel } from "./badge.model";

const hasBadge = async (userId: string, badgeType: string) => {
  const badge = await BadgeModel.findOne({ user: userId, badgeType });
  return !!badge;
};

const awardBadge = async (
  userId: string,
  badgeType: string,
  description: string
) => {
  const alreadyHas = await hasBadge(userId, badgeType);
  if (alreadyHas) return null;

  const badge = await BadgeModel.create({
    user: userId,
    badgeType,
    description,
  });

  return badge;
};

const checkAndAward = async (
  userId: string,
  eventType: "quiz_completed" | "course_completed" | "perfect_score" | "streak",
  context: {
    courseId?: string;
    topic?: string;
    streakDays?: number;
  }
) => {
  let badge = null;

  switch (eventType) {
    case "quiz_completed":
      if (context.topic) {
        badge = await awardBadge(
          userId,
          "quiz_completed",
          `Completed quiz for topic "${context.topic}"`
        );
      }
      break;

    case "course_completed":
      if (context.courseId) {
        badge = await awardBadge(
          userId,
          "course_completed",
          `Completed course "${context.courseId}"`
        );
      }
      break;

    case "perfect_score":
      if (context.topic) {
        badge = await awardBadge(
          userId,
          "perfect_score",
          `Achieved perfect score on topic "${context.topic}"`
        );
      }
      break;

    case "streak":
      if (context.streakDays && context.streakDays >= 5) {
        badge = await awardBadge(
          userId,
          "streak_5_days",
          `Achieved a streak of ${context.streakDays} days`
        );
      }
      break;

    default:
      break;
  }

  return badge;
};

const getUserBadges = async (userId: string) => {
  return BadgeModel.find({ user: userId }).sort({ awardedAt: -1 }).lean();
};

export const BadgeService = {
  checkAndAward,
  getUserBadges,
};
