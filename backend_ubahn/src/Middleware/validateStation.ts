import { NextFunction, Response, Request } from "express";
import { RequestWithLineData } from "./validateLine";

export function validateStation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { station } = req.params;
  const { lineData } = req as RequestWithLineData;

  if (!lineData.stations.includes(station)) {
    return res.status(404).send({ error: "Station not found on this line" });
  }

  next();
}
