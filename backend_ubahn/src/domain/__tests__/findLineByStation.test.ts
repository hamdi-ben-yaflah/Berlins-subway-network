import { LineType } from "../LineType";
import { findLineByStation } from "../utils/findLineByStation";

describe("findLineByStation", () => {
  const lines = [
    {
      name: "Line1",
      stations: ["Station1", "Station2", "Station3"],
      color: "#ff0000",
      type: LineType.Linear,
    },
    {
      name: "Line2",
      stations: ["Station4", "Station5", "Station6"],
      color: "#ff0000",
      type: LineType.Linear,
    },
    {
      name: "Line3",
      stations: ["Station7", "Station8", "Station9"],
      color: "#ff0000",
      type: LineType.Linear,
    },
  ];

  it("returns the correct line when station is found", () => {
    const station = "Station5";

    const result = findLineByStation(lines, station);

    expect(result).toEqual(lines[1]);
  });

  it("returns undefined when station is not found", () => {
    const station = "StationX";

    const result = findLineByStation(lines, station);

    expect(result).toBeUndefined();
  });
});
