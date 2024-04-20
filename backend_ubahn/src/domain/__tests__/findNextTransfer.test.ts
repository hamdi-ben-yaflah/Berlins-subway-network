import { Line } from "../Line";
import { LineType } from "../LineType";
import { findNextTransfer } from "../utils/findNextTransfer";

describe("findNextTransfer", () => {
  const currentLine: Line = {
    name: "currentLine",
    color: "#ff0000",
    type: LineType.Linear,
    stations: ["Station1", "Station2", "Station3", "Station4", "Station5"],
  };

  const targetLine: Line = {
    name: "targetLine",
    color: "#00ff00",
    type: LineType.Linear,
    stations: ["Station3", "Station4", "Station5", "Station6", "Station7"],
  };

  it("returns the first common station and target line when there is a common station", () => {
    const result = findNextTransfer(currentLine, targetLine);
    expect(result).toEqual({
      station: "Station3",
      newLine: targetLine,
    });
  });

  it("returns null when there is no common station", () => {
    const result = findNextTransfer(currentLine, {
      name: "otherLine",
      color: "#0000ff",
      type: LineType.Linear,
      stations: ["Station6", "Station7", "Station8", "Station9", "Station10"],
    });
    expect(result).toBeNull();
  });
});
