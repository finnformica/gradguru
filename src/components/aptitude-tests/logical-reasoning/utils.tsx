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
  North,
} from "@mui/icons-material";
import { Typography } from "@mui/material";

import _ from "lodash";

import { CellData, Grid } from "types";
import { gridDefaultCell } from "./constants";

export const mapIcon = ({
  value,
  color = "black",
  rotation = 0,
  size,
}: {
  value: string;
  color: string;
  rotation: number;
  size: number;
}) => {
  const sx = { color, transform: `rotate(${rotation}deg)`, fontSize: size };

  if (!value) return null;

  switch (value.toLowerCase()) {
    case "arrow":
      return <North sx={sx} />;
    case "plane":
      return <AirplanemodeActive sx={sx} />;
    case "face":
      return <Face sx={sx} />;
    case "tree":
      return <Park sx={sx} />;
    case "circle":
      return <Circle sx={sx} />;
    case "square":
      return <Square sx={sx} />;
    case "pentagon":
      return <Pentagon sx={sx} />;
    case "hexagon":
      return <Hexagon sx={sx} />;
    case "star":
      return <Star sx={sx} />;
    case "clock":
      return <AccessAlarm sx={sx} />;
    case "person":
      return <Person sx={sx} />;
    case "cookie":
      return <Cookie sx={sx} />;
    case "grass":
      return <Grass sx={sx} />;
    case "anchor":
      return <Anchor sx={sx} />;
    case "boat":
      return <Sailing sx={sx} />;
    case "house":
      return <Home sx={sx} />;
    case "water":
      return <Water sx={sx} />;
    case "mountain":
      return <Landscape sx={sx} />;
    case "castle":
      return <Fort sx={sx} />;
    case "sun":
      return <WbSunny sx={sx} />;
    case "forest":
      return <Forest sx={sx} />;
    case "moon":
      return <Brightness2 sx={sx} />;
    case "triangle":
      return <ChangeHistory sx={sx} />;
    default:
      return null;
  }
};

export const initialiseSquareGrid = (numRows: number): Grid => {
  const emptyRow = _.range(1, numRows + 1).map((row) =>
    gridDefaultCell(numRows, "square")
  );
  const grid = _.range(1, numRows + 1).map((r) => emptyRow);

  return grid;
};

export const initialiseTriangleGrid = (numRows: number) => {
  const rows = _.range(1, numRows + 1).map((row) => row);
  const grid = rows.map((row) =>
    _.range(row * 2 - 1).map((num) => gridDefaultCell(numRows, "triangle"))
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
            fontSize: cell.size,
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

export const mapNestedArrayToObject = (array: any[]) => {
  const obj: any = {};

  array.forEach((item, index) => {
    const subObj: any = {};
    item.forEach((subItem: any, subIndex: number) => {
      subObj[subIndex] = subItem;
    });

    obj[index] = subObj;
  });

  return obj;
};

export const mapObjectToNestedArray = (obj: any) => {
  const array: any[] = [];

  Object.keys(obj).forEach((key) => {
    const subArray: any[] = [];
    Object.keys(obj[key]).forEach((subKey) => {
      subArray.push(obj[key][subKey]);
    });

    array.push(subArray);
  });

  return array;
};
