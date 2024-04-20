import express, { NextFunction, Request, Response } from "express";
import { lines } from "../data";
import { getAccessibleLines } from "../domain/getAccessibleLines";
import { getNextStops } from "../domain/getNextStops";
import { getRoute } from "../domain/getRoute";
import {
  NextStopsParams,
  nextStopsParamsSchema,
} from "../Middleware/schema/nextStopsParamsSchema";
import {
  RouteQuery,
  routeQuerySchema,
} from "../Middleware/schema/routeQuerySchema";
import { RequestWithLineData, validateLine } from "../Middleware/validateLine";
import { validateQueryParams } from "../Middleware/validateQueryParams";
import { validateStation } from "../Middleware/validateStation";
import { Direction } from "../domain/Direction";

const router = express.Router();

router.get(
  "/",
  /**
   * returns an array of line information from the route "/"":
   *
   * ```json
   * {
   *  "name": "string";
   *  "color": "string";
   * }
   * ```
   */
  async function getAllLines(req, res) {
    try {
      res.send(lines);
    } catch (error) {
      res.status(500).send((error as any).message);
    }
  }
);

router.get("/routes", validateQueryParams(routeQuerySchema), (req, res) => {
  try {
    const { from, to } = req.query as RouteQuery; // Cast to any here for demonstration
    const route = getRoute(from, to, lines);
    res.send(route);
  } catch (error) {
    res.status(500).send((error as any).message);
  }
});

router.get("/:line", validateLine, (req: Request, res: Response) => {
  try {
    const lineData = (req as RequestWithLineData).lineData;
    res.send(lineData.stations);
  } catch (error) {
    res.status(500).send((error as any).message);
  }
});
router.get(
  "/:line/stations/:station/next-stops",
  [validateLine, validateStation, validateQueryParams(nextStopsParamsSchema)],
  (req: Request, res: Response) => {
    try {
      const lineData = (req as RequestWithLineData).lineData;
      const { station } = req.params;
      const {
        n = 3,
        direction = Direction.Forward,
      } = req.query as NextStopsParams;

      const nextStops = getNextStops(lineData, direction!, n!, station);
      res.send(nextStops);
    } catch (error) {
      res.status(500).send((error as any).message);
    }
  }
);

router.get(
  "/:line/stations/:station/accessible-lines",
  [validateLine, validateStation],
  (req: Request, res: Response) => {
    try {
      const lineData = (req as RequestWithLineData).lineData;
      const accessibleLines = getAccessibleLines(
        lineData,
        req.params.station,
        lines
      );
      res.send(accessibleLines);
    } catch (error) {
      res.status(500).send((error as any).message);
    }
  }
);

export const lineRoutes = router;
