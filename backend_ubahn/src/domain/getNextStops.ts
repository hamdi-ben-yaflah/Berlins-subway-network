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

  if (line.type === LineType.Cyclic && direction === Direction.Backward) {
    throw new Error("Backward direction is not supported for cyclic lines.");
  }

  let nextStops: string[] = [];
  switch (direction) {
    case Direction.Forward:
      if (line.type === LineType.Cyclic) {
        for (let i = 1; i <= nStops; i++) {
          let nextIndex = (stationIndex + i) % line.stations.length;
          nextStops.push(line.stations[nextIndex]);
        }
      } else {
        nextStops = line.stations.slice(
          stationIndex + 1,
          stationIndex + 1 + nStops
        );
      }
      break;
    case Direction.Backward:
      const start = Math.max(0, stationIndex - nStops);
      nextStops = line.stations.slice(start, stationIndex).reverse();
      break;
    default:
      throw new Error(`Invalid direction: ${direction}`);
  }

  return nextStops;
}
