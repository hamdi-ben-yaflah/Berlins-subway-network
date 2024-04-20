import React from "react";
import Select from "react-select";
import { Line } from "../types/Line";

type LineSelectorProps = {
  lines: Line[];
  onSelectLine: (lineName: string) => void;
};

function LineSelector({ lines, onSelectLine }: LineSelectorProps) {
  const options = lines.map((line) => ({
    value: line.name,
    label: line.name,
    color: line.color,
  }));

  const colorStyles = {
    option: (styles: any, { data }: any) => ({ ...styles, color: data.color }),
    singleValue: (styles: any, { data }: any) => ({
      ...styles,
      color: data.color,
    }),
  };

  return (
    <Select
      options={options}
      styles={colorStyles}
      onChange={(option) => onSelectLine(option!.value)}
    />
  );
}

export default LineSelector;
