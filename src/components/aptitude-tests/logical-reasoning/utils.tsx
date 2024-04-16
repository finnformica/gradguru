import crypto from "crypto";
import { getBytes, ref, uploadBytes } from "firebase/storage";
import _ from "lodash";
import Image from "next/image";

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
  North,
  Park,
  Pentagon,
  Person,
  Sailing,
  Square,
  Star,
  Water,
  WbSunny,
} from "@mui/icons-material";
import { Typography } from "@mui/material";

import { storage } from "lib/firebase/config";
import { CellData, Grid } from "types";
import { endpoints } from "utils/axios";
import { getFileExtension } from "utils/format-string";
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
      return (
        <Image
          src={URL.createObjectURL(cell.value as File)}
          width={0}
          height={0}
          alt={cell.value.name}
          style={{
            width: `${cell.size}%`,
            height: `${cell.size}%`,
            overflow: "hidden",
            transform: `rotate(${cell.rotation}deg)`,
          }}
        />
      );
    default:
      return cell.value;
  }
};

export const mapNestedArrayToObject = (array: Grid[]) => {
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
  const array: Grid[] = [];

  Object.keys(obj).forEach((key) => {
    const subArray: any[] = [];
    Object.keys(obj[key]).forEach((subKey) => {
      subArray.push(obj[key][subKey]);
    });

    array.push(subArray);
  });

  return array;
};

export const uploadImagesToStorage = async (data: Grid[], folder: string) => {
  // iterate over each grid cell and upload any images to storage, store the id
  data.forEach((grid) => {
    grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.type === "image") {
          const randomId = crypto.randomBytes(8).toString("hex");
          const extension = getFileExtension(cell.value.name);
          const filename = randomId + (extension ? `.${extension}` : "");

          const path = `${endpoints.storage.aptitudeTests("logical-reasoning")}/${folder}/${filename}`;
          const _ref = ref(storage, path);

          uploadBytes(_ref, cell.value as File);

          cell.value = path;
        }
      });
    });
  });

  return data;
};

export const downloadImagesFromStorage = async (data: Grid[]) => {
  // iterate over each grid cell and upload any images to storage, store the id
  const res = await Promise.all(
    data.map(async (grid) => {
      return await Promise.all(
        grid.map(async (row) => {
          return await Promise.all(
            row.map((cell) => {
              if (cell.type === "image") {
                const path = cell.value as string;

                const _ref = ref(storage, path);

                return getBytes(_ref).then((bytes) => ({
                  ...cell,
                  value: new File([bytes], path),
                }));
              }

              return cell;
            })
          );
        })
      );
    })
  );

  return res;
};
