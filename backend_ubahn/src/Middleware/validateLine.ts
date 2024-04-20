import { NextFunction, Request, Response } from "express";
import { lines } from "../data";
import { Line } from "../domain/Line";

export interface RequestWithLineData extends Request {
  lineData: Line;
}

export function validateLine(req: Request, res: Response, next: NextFunction) {
  const { line } = req.params;

  const lineData = lines.find((l) => l.name === line);
  if (!lineData) {
    return res.status(404).send({ error: "Line not found" });
  }

  (req as RequestWithLineData).lineData = lineData;
  next();
}
