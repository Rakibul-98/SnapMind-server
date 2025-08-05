import { z } from "zod";

export const createCourseSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    description: z.string().optional(),
  }),
});
