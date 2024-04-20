import { useEffect, useState } from "react";
import { Line } from "../types/Line";
import axios from "axios";
import LineSelector from "./LineSelector";
import StationList from "./StationList";
import { on } from "events";
import StationDetails from "./StationDetails";

/**
 * Fetches and lists the lines from the backend
 *
 * You should probably not use this component, it just serves as an example.
 */
export default function LinesList() {
  const [lines, setLines] = useState<Line[]>([]);
  const [selectedLine, setSelectedLine] = useState<Line | null>(null);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/lines")
      .then((response) => setLines(response.data))
      .catch((error) => {
        console.error("Error fetching lines:", error);
        setError("Failed to fetch lines. Please try again later.");
      });
  }, []);

  const onSelectLine = (lineName: string) => {
    const line = lines.find((line) => line.name === lineName);
    setSelectedLine(line || null);
    setSelectedStation(null);
  };

  const onSelectStation = (station: string) => {
    setSelectedStation(station || null);
  };

  return (
    <div>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          <LineSelector lines={lines} onSelectLine={onSelectLine} />
          {selectedLine ? (
            <StationList
              line={selectedLine}
              onSelectStation={onSelectStation}
            />
          ) : null}
          {selectedStation ? (
            <StationDetails station={selectedStation} line={selectedLine} />
          ) : null}
        </>
      )}
    </div>
  );
}
