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

import { icons, gridDefaultCell, colors } from "./constants";
import { Grid, GridCoord } from "types";

const updateGrid = (
  grid: Grid,
  setGrid: (newGrid: Grid) => void,
  coord: GridCoord,
  value: {}
) => {
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
  grid: Grid;
  setGrid: (grid: Grid) => void;
  coord: GridCoord;
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

const ColorDropdown = ({
  grid,
  setGrid,
  coord,
  type = "color",
}: InputProps & { type: "color" | "backgroundColor" }) => {
  return (
    <TextField
      label="Color"
      select
      size="small"
      value={grid[coord.row][coord.col][type]}
      onChange={(e) =>
        updateGrid(grid, setGrid, coord, { [type]: e.target.value })
      }
      sx={{ width: 200 }}
    >
      {colors.map((color) => (
        <MenuItem key={color.label} value={color.value}>
          {color.label}
        </MenuItem>
      ))}
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
      options={icons}
      value={grid[coord.row][coord.col].value}
      onChange={(e, value) =>
        updateGrid(grid, setGrid, coord, { type: "icon", value })
      }
      isOptionEqualToValue={(option, value) => option === value}
      renderInput={(params) => (
        <TextField {...params} label="Icon" size="small" sx={{ width: 200 }} />
      )}
    />
  );
};

export const MenuContent = ({
  grid,
  setGrid,
  coord,
  type,
}: InputProps & { type: "square" | "triangle" }) => {
  const [menuDisplay, setMenuDisplay] = useState("menu");
  const numRows = grid.length;

  switch (menuDisplay) {
    case "text":
      return (
        <Stack spacing={2} mx={1}>
          <TextMenu grid={grid} setGrid={setGrid} coord={coord} />
          <ColorDropdown
            grid={grid}
            setGrid={setGrid}
            coord={coord}
            type="color"
          />
          <RotationInput grid={grid} setGrid={setGrid} coord={coord} />
          <MenuItem onClick={() => setMenuDisplay("menu")}>
            <ListItemText secondary="View options" />
          </MenuItem>
        </Stack>
      );
    case "icon":
      return (
        <Stack spacing={2} mx={1}>
          <IconMenu grid={grid} setGrid={setGrid} coord={coord} />
          <ColorDropdown
            grid={grid}
            setGrid={setGrid}
            coord={coord}
            type="color"
          />
          <RotationInput grid={grid} setGrid={setGrid} coord={coord} />
          <MenuItem onClick={() => setMenuDisplay("menu")}>
            <ListItemText secondary="View options" />
          </MenuItem>
        </Stack>
      );
    case "background":
      return (
        <Stack spacing={2} mx={1}>
          <ColorDropdown
            grid={grid}
            setGrid={setGrid}
            coord={coord}
            type="backgroundColor"
          />
          <MenuItem onClick={() => setMenuDisplay("menu")}>
            <ListItemText secondary="View options" />
          </MenuItem>
        </Stack>
      );
    case "image":
      return null; // TODO: Implement image rendering
    case "menu":
      return (
        <>
          <MenuItem onClick={() => setMenuDisplay("text")}>Text</MenuItem>
          <MenuItem onClick={() => setMenuDisplay("icon")}>Icon</MenuItem>
          <MenuItem onClick={() => setMenuDisplay("background")}>
            Background
          </MenuItem>
          <MenuItem onClick={() => setMenuDisplay("image")} disabled>
            Image
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() =>
              updateGrid(grid, setGrid, coord, gridDefaultCell(numRows, type))
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
