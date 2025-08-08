import { Request, Response } from "express";
import { PointsService } from "./gamification.service";

const addPoints = async (req: Request, res: Response) => {
  const { userId, points, type, description } = req.body;
  const updated = await PointsService.addPoints(
    userId,
    points,
    type,
    description
  );
  res.json(updated);
};

const leaderboard = async (_req: Request, res: Response) => {
  const board = await PointsService.getLeaderboard();
  res.json(board);
};

export const PointsController = {
  addPoints,
  leaderboard,
};
