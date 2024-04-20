import { Direction } from "./Direction";
import { Line } from "./Line";
import { LineType } from "./LineType";

/**
 * Computes which stations of a given line follow next after a given station
 *
 * @returns the next `nStops` stations of `line`, counting from `fromStation` and in direction `direction`
 */

export function getNextStops(
  line: Line,
  /**
   * if `forward`, returns the stations that follow `fromStation` in the `line.stations` array.
   *
   * if `backward`, returns the stations that precede `fromStation` in the `line.stations` array.
   */
  direction: Direction,
  /**
   * the maximum number of stops that should be returned
   */
  nStops: number,
  /**
   * which station within `line` to base the computation on
   */
  fromStation: string
): string[] {
  const stationIndex = line.stations.indexOf(fromStation);

  if (stationIndex === -1) {
    throw new Error(`Station ${fromStation} not found on line ${line.name}.`);
  }

  if (direction === Direction.Forward) {
    return line.stations.slice(stationIndex + 1, stationIndex + 1 + nStops);
  } else if (direction === Direction.Backward) {
    const start = Math.max(0, stationIndex - nStops);
    return line.stations.slice(start, stationIndex).reverse();
  } else {
    throw new Error("Invalid direction specified.");
  }
}
