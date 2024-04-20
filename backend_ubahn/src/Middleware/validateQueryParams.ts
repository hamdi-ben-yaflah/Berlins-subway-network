import { Request, Response, NextFunction, RequestHandler } from "express";
import { z } from "zod";

export function validateQueryParams<T extends z.ZodType<any, any>>(
  schema: T
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationResult = schema.safeParse(req.query);

      if (validationResult.success) {
        req.query = (validationResult.data as unknown) as Request["query"];
        next();
      } else {
        res.status(400).send({ error: validationResult.error });
      }
    } catch (error) {
      res.status(500).send({ error: JSON.stringify(error) });
    }
  };
}
