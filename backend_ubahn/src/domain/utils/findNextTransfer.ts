import { Line } from "../Line";

export function findNextTransfer(currentLine: Line, targetLine: Line) {
  // Simplified: just find the first common station between the current line and target line
  const commonStations = currentLine.stations.filter((station) =>
    targetLine.stations.includes(station)
  );
  if (commonStations.length > 0) {
    return {
      station: commonStations[0], // This would ideally be the closest one, needs more logic (Graph traversal, Dijkstra's algorithm)
      newLine: targetLine,
    };
  }
  return null;
}
