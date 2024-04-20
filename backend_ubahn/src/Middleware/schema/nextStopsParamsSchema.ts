import { z } from "zod";
import { Direction } from "../../domain/Direction";

export const nextStopsParamsSchema = z.object({
  n: z
    .string()
    .transform((val) => parseInt(val))
    .optional(),

  direction: z.enum([Direction.Forward, Direction.Backward]).optional(),
});

export type NextStopsParams = z.infer<typeof nextStopsParamsSchema>;
