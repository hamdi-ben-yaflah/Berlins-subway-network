export enum LineType {
  Linear = "linear",
  Cyclic = "cyclic",
}

export interface Line {
  name: string;
  color: string;
  type: LineType;
  stations: string[];
}
