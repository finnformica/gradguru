import {
  AccessAlarm,
  AirplanemodeActive,
  Anchor,
  Brightness2,
  Circle,
  Cookie,
  Face,
  Forest,
  Fort,
  Grass,
  Hexagon,
  Home,
  Landscape,
  Park,
  Pentagon,
  Person,
  Sailing,
  Square,
  Star,
  Water,
  WbSunny,
} from "@mui/icons-material";

import _ from "lodash";

import { CellData } from "types";

export const applyGridBorders = ({
  row,
  col,
  numRows,
  innerGrid,
  showBorders,
  borderSize = "1px",
}: {
  row: number;
  col: number;
  numRows: number;
  innerGrid: boolean;
  showBorders: boolean;
  borderSize?: string;
}) => ({
  border: innerGrid ? `${borderSize} solid black` : "none",
  borderTop:
    row === 0 && showBorders ? `calc(2 * ${borderSize}) solid black` : "auto",
  borderLeft:
    col === 0 && showBorders ? `calc(2 * ${borderSize}) solid black` : "auto",
  borderBottom:
    row === numRows - 1 && showBorders
      ? `calc(2 * ${borderSize}) solid black`
      : "auto",
  borderRight:
    col === numRows - 1 && showBorders
      ? `calc(2 * ${borderSize}) solid black`
      : "auto",
});

export const squareSizeMapping: { [key: number]: string } = {
  4: "60px",
  3: "80px",
  2: "120px",
  1: "240px",
};

export const mapIcon = (
  icon: any,
  color: string = "black",
  rot: number = 0
) => {
  const sx = { color, transform: `rotate(${rot}deg)` };
  const fontSize = "large";

  switch (icon.toLowerCase()) {
    case "plane":
      return <AirplanemodeActive sx={sx} fontSize={fontSize} />;
    case "face":
      return <Face sx={sx} fontSize={fontSize} />;
    case "tree":
      return <Park sx={sx} fontSize={fontSize} />;
    case "circle":
      return <Circle sx={sx} fontSize={fontSize} />;
    case "square":
      return <Square sx={sx} fontSize={fontSize} />;
    case "pentagon":
      return <Pentagon sx={sx} fontSize={fontSize} />;
    case "hexagon":
      return <Hexagon sx={sx} fontSize={fontSize} />;
    case "star":
      return <Star sx={sx} fontSize={fontSize} />;
    case "clock":
      return <AccessAlarm sx={sx} fontSize={fontSize} />;
    case "person":
      return <Person sx={sx} fontSize={fontSize} />;
    case "cookie":
      return <Cookie sx={sx} fontSize={fontSize} />;
    case "grass":
      return <Grass sx={sx} fontSize={fontSize} />;
    case "anchor":
      return <Anchor sx={sx} fontSize={fontSize} />;
    case "boat":
      return <Sailing sx={sx} fontSize={fontSize} />;
    case "house":
      return <Home sx={sx} fontSize={fontSize} />;
    case "water":
      return <Water sx={sx} fontSize={fontSize} />;
    case "mountain":
      return <Landscape sx={sx} fontSize={fontSize} />;
    case "castle":
      return <Fort sx={sx} fontSize={fontSize} />;
    case "sun":
      return <WbSunny sx={sx} fontSize={fontSize} />;
    case "forest":
      return <Forest sx={sx} fontSize={fontSize} />;
    case "moon":
      return <Brightness2 sx={sx} fontSize={fontSize} />;
    default:
      return null;
  }
};

export const squareGridDefaultCell: CellData = {
  type: "text",
  value: "",
  color: "#000",
  rotation: 0,
};

export const initialiseSquareGrid = (numRows: number) => {
  const emptyRow = _.range(1, numRows + 1).map((row) => squareGridDefaultCell);
  const grid = _.range(1, numRows + 1).map((r) => emptyRow);
  return grid;
};
