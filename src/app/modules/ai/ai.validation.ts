// ai.validation.ts
import { z } from "zod";

export const aiPromptValidation = z.object({
  body: z.object({
    prompt: z.string().min(5, "Prompt must be at least 5 characters long"),
    userId: z.string().uuid("Invalid user ID format"),
    model: z.string().optional(),
  }),
});
