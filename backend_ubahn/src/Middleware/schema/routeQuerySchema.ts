import { z } from "zod";

export const routeQuerySchema = z.object({
  from: z.string().min(1, "From station is required"),
  to: z.string().min(1, "To station is required"),
});

export type RouteQuery = z.infer<typeof routeQuerySchema>;
