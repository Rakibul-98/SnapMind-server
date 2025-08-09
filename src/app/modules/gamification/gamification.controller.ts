import { Request, Response } from "express";
import { PointsService } from "./gamification.service";

const addPoints = async (req: Request, res: Response) => {
  const { userId, points, type, description } = req.body;

  if (!userId || !points || !type) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const updated = await PointsService.addPoints(
      userId,
      points,
      type,
      description || ""
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to add points" });
  }
};

const leaderboard = async (_req: Request, res: Response) => {
  try {
    const board = await PointsService.getLeaderboard();
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};

export const PointsController = {
  addPoints,
  leaderboard,
};
