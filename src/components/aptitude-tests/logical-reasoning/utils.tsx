import {
  AccessAlarm,
  AirplanemodeActive,
  Anchor,
  Brightness2,
  ChangeHistory,
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
import { SvgIconOwnProps, Typography } from "@mui/material";

import _ from "lodash";

import { CellData, Grid } from "types";
import { fontSizeMapping, gridDefaultCell } from "./constants";

export const mapIcon = ({
  value,
  color = "black",
  rotation = 0,
  size = "large",
}: {
  value: string;
  color: string;
  rotation: number;
  size?: SvgIconOwnProps["fontSize"];
}) => {
  const sx = { color, transform: `rotate(${rotation}deg)` };
  const fontSize = size;

  if (!value) return null;

  switch (value.toLowerCase()) {
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
    case "triangle":
      return <ChangeHistory sx={sx} fontSize={fontSize} />;
    default:
      return null;
  }
};

export const initialiseSquareGrid = (numRows: number): Grid => {
  const emptyRow = _.range(1, numRows + 1).map((row) => gridDefaultCell());
  const grid = _.range(1, numRows + 1).map((r) => emptyRow);

  return grid;
};

export const initialiseTriangleGrid = (numRows: number) => {
  const rows = _.range(1, numRows + 1).map((row) => row);
  const grid = rows.map((row) =>
    _.range(row * 2 - 1).map((num) => gridDefaultCell("small"))
  );

  return grid;
};

export const renderCell = (cell: CellData) => {
  if (!cell || !cell.value) return null;

  switch (cell.type) {
    case "text":
      return (
        <Typography
          sx={{
            color: cell.color,
            fontSize: fontSizeMapping(cell.size),
            fontWeight: 500,
            transform: `rotate(${cell.rotation}deg)`,
          }}
        >
          {cell.value.toUpperCase()}
        </Typography>
      );
    case "icon":
      return mapIcon({ ...cell });
    case "image":
      return null; // TODO: Implement image rendering
    default:
      return cell.value;
  }
};
