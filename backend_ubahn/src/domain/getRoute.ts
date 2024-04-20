import { Line } from "./Line";
import { findLineByStation } from "./utils/findLineByStation";
import { findNextTransfer } from "./utils/findNextTransfer";

export type RouteSegment = {
  /**
   * `enter` = enter to `line` at this `station`
   *
   * `switch` = switch to `line` at this `station`
   *
   * `exit` = exit `line` at `station`
   */

  action: "enter" | "switch" | "exit";
  station: string;
  line: Line;
};

export type Route = RouteSegment[];

/**
 * returns the `Route` from `originStation` to `destinationStation`.
 * If there are multiple possible routes, you can return any of those routes.
 *
 * You can assume `allLines` to be the sample data included in this project, which means you can make the following assumptions:
 *  - all stations are interconnected, so it should always be possible to find a valid Route.
 *  - there's a finite set of stations with a size of around ~100
 *
 * @returns a structure like e.g.
 * ```json
 * [{
 *   "action": "enter",
 *   "station": "Otisstraße",
 *   "line": (U9)
 * }, {
 *   "action": "switch",
 *   "station": "Leopoldplatz",
 *   "line": (U9)
 *  }, {
 *   "action": "exit",
 *   "station": "Hansaplatz",
 *   "line": (U9)
 *  }]
 * ```
 */

export function getRoute(
  originStation: string,
  destinationStation: string,
  allLines: Line[]
) {
  const startLine = findLineByStation(allLines, originStation);
  const endLine = findLineByStation(allLines, destinationStation);

  if (!startLine || !endLine) {
    return [];
  }

  if (startLine.name === endLine.name) {
    return [
      { action: "enter", station: originStation, line: startLine },
      { action: "exit", station: destinationStation, line: endLine },
    ];
  } else {
    const route = [];
    route.push({ action: "enter", station: originStation, line: startLine });

    let currentLine = startLine;
    let transferStation = originStation;

    while (currentLine.name !== endLine.name) {
      const nextTransfer = findNextTransfer(currentLine, endLine);
      if (!nextTransfer) break;

      route.push({
        action: "switch",
        station: nextTransfer.station,
        line: nextTransfer.newLine,
      });
      currentLine = nextTransfer.newLine;
      transferStation = nextTransfer.station;
    }

    route.push({ action: "exit", station: destinationStation, line: endLine });
    return route;
  }
}
