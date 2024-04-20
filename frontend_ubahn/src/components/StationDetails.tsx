import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "../types/Line";

type StationDetailsProps = {
  station: string;
  line: Line | null;
};

function StationDetails({ station, line }: StationDetailsProps) {
  const [accessibleLines, setAccessibleLines] = useState<Line[]>([]);
  const [nextStops, setNextStops] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccessibleLines = axios.get(
      `http://localhost:8080/lines/${line?.name}/stations/${station}/accessible-lines`
    );
    const fetchNextStops = axios.get(
      `http://localhost:8080/lines/${line?.name}/stations/${station}/next-stops`
    );

    axios
      .all([fetchAccessibleLines, fetchNextStops])
      .then(
        axios.spread((accessibleLinesRes, nextStopsRes) => {
          setAccessibleLines(accessibleLinesRes.data);
          setNextStops(nextStopsRes.data);
        })
      )
      .catch((error) => {
        console.error("Error fetching station details:", error);
        setError("Failed to fetch station details. Please try again later.");
      });
  }, [station, line]);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {accessibleLines.length > 0 ? (
        <>
          <h3>Accessible Lines from {station}:</h3>
          <ul>
            {accessibleLines.map((l) => (
              <li key={l.name} style={{ color: l.color }}>
                {l.name}
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {nextStops.length > 0 ? (
        <>
          <h3>Next 3 stops from {station}:</h3>
          <ul>
            {nextStops.map((stop) => (
              <li key={stop}>{stop}</li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}

export default StationDetails;
