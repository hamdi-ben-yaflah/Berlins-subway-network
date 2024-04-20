import { Line } from "../Line";

export function findLineByStation(allLines: Line[], station: string) {
  return allLines.find((line) => line.stations.includes(station));
}
