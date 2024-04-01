"use client";

import { useState } from "react";

import {
  Autocomplete,
  Divider,
  InputAdornment,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { mapIcon, squareGridDefaultCell } from "./utils";

const updateGrid = (grid: any, setGrid: any, coord: any, value: any) => {
  setGrid([
    ...grid.slice(0, coord.row),
    [
      ...grid[coord.row].slice(0, coord.col),
      { ...grid[coord.row][coord.col], ...value },
      ...grid[coord.row].slice(coord.col + 1),
    ],
    ...grid.slice(coord.row + 1),
  ]);
};

type InputProps = {
  grid: any;
  setGrid: (grid: any) => void;
  coord: any;
};

const RotationInput = ({ grid, setGrid, coord }: InputProps) => {
  return (
    <TextField
      label="Rotation"
      type="number"
      size="small"
      value={grid[coord.row][coord.col].rotation}
      onChange={(e) =>
        updateGrid(grid, setGrid, coord, { rotation: e.target.value })
      }
      InputProps={{
        endAdornment: <InputAdornment position="end">deg</InputAdornment>,
      }}
    />
  );
};

const ColorDropdown = ({ grid, setGrid, coord }: InputProps) => {
  return (
    <TextField
      label="Color"
      select
      size="small"
      value={grid[coord.row][coord.col].color}
      onChange={(e) =>
        updateGrid(grid, setGrid, coord, { color: e.target.value })
      }
      sx={{ mx: 1 }}
    >
      <MenuItem value="#000">Black</MenuItem>
      <MenuItem value="#ef5350">Red</MenuItem>
      <MenuItem value="#1e88e5">Blue</MenuItem>
      <MenuItem value="#4caf50">Green</MenuItem>
    </TextField>
  );
};

const TextMenu = ({ grid, setGrid, coord }: InputProps) => {
  return (
    <TextField
      label="Text"
      size="small"
      value={grid[coord.row][coord.col].value}
      onChange={(e) =>
        updateGrid(grid, setGrid, coord, {
          type: "text",
          value: e.target.value.toUpperCase(),
        })
      }
    />
  );
};

const IconMenu = ({ grid, setGrid, coord }: InputProps) => {
  return (
    <Autocomplete
      options={[
        "Plane",
        "Face",
        "Person",
        "Tree",
        "Forest",
        "Grass",
        "Mountain",
        "Sun",
        "Moon",
        "Circle",
        "Square",
        "Pentagon",
        "Hexagon",
        "Star",
        "Clock",
        "Cookie",
        "Anchor",
        "Boat",
        "Water",
        "House",
        "Castle",
      ]}
      value={grid[coord.row][coord.col].value}
      onChange={(e, value) =>
        updateGrid(grid, setGrid, coord, { type: "icon", value })
      }
      isOptionEqualToValue={(option, value) => option === value}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Icon"
          size="small"
          sx={{ width: 200 }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                {mapIcon(params.inputProps.value)}
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export const MenuContent = ({
  grid,
  setGrid,
  coord,
}: {
  grid: any;
  setGrid: (grid: any) => void;
  coord: any;
}) => {
  const [menuDisplay, setMenuDisplay] = useState("menu");

  switch (menuDisplay) {
    case "text":
      return (
        <Stack spacing={2} mx={1}>
          <TextMenu grid={grid} setGrid={setGrid} coord={coord} />
          <ColorDropdown grid={grid} setGrid={setGrid} coord={coord} />
          <RotationInput grid={grid} setGrid={setGrid} coord={coord} />
        </Stack>
      );
    case "icon":
      return (
        <Stack spacing={2} mx={1}>
          <IconMenu grid={grid} setGrid={setGrid} coord={coord} />
          <ColorDropdown grid={grid} setGrid={setGrid} coord={coord} />
          <RotationInput grid={grid} setGrid={setGrid} coord={coord} />
        </Stack>
      );
    case "image":
      return null; // TODO: Implement image rendering
    case "menu":
      return (
        <>
          <MenuItem onClick={() => setMenuDisplay("text")}>Text</MenuItem>
          <MenuItem onClick={() => setMenuDisplay("icon")}>Icon</MenuItem>
          <MenuItem onClick={() => setMenuDisplay("image")} disabled>
            Image
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() =>
              updateGrid(grid, setGrid, coord, squareGridDefaultCell)
            }
          >
            <ListItemText secondary="Clear cell" />
          </MenuItem>
        </>
      );
    default:
      return null;
  }
};
