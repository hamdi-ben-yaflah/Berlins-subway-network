import React from "react";
import { Line } from "../types/Line";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

type StationListProps = {
  line: Line;
  onSelectStation: (station: string) => void;
};

const useStyles = makeStyles({
  listItem: {
    backgroundColor: "#fff",
    color: "#000",
    "&:hover": {
      backgroundColor: (props: StationListProps) => props.line.color,
    },
  },
});

function StationList(props: StationListProps) {
  const { line, onSelectStation } = props;
  const classes = useStyles(props);

  return (
    <List component='nav' aria-label='main mailbox folders'>
      {line.stations.map((station) => (
        <ListItem
          button
          key={station}
          onClick={() => onSelectStation(station)}
          className={classes.listItem}>
          <ListItemText primary={station} />
        </ListItem>
      ))}
    </List>
  );
}

export default StationList;
