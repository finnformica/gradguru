"use client";

import { useState } from "react";

import {
  Autocomplete,
  Divider,
  IconButton,
  InputAdornment,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import { Clear } from "@mui/icons-material";
import { Grid, GridCoord, GridType } from "types";
import { colors, gridDefaultCell, icons } from "./constants";

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

const ColorMenu = ({
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

const TextInput = ({ grid, setGrid, coord }: InputProps) => {
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

const ImageInput = ({ grid, setGrid, coord }: InputProps) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      updateGrid(grid, setGrid, coord, {
        type: "image",
        value: files[0],
        size: 100, // 100% of cell size
      });
    }
  };

  const handleImageDelete = () => {
    updateGrid(grid, setGrid, coord, { type: "file", value: null });
  };

  return grid[coord.row][coord.col].value ? (
    <Stack
      direction={"row"}
      spacing={2}
      width={250}
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography pl={1}>
        {grid[coord.row][coord.col].value?.name || "Image name is empty"}
      </Typography>
      <Tooltip title="Clear image">
        <IconButton onClick={handleImageDelete}>
          <Clear />
        </IconButton>
      </Tooltip>
    </Stack>
  ) : (
    <TextField type="file" size="small" onChange={handleImageChange} />
  );
};

const SizeInput = ({ grid, setGrid, coord }: InputProps) => {
  return (
    <TextField
      label="Size"
      type="number"
      size="small"
      value={grid[coord.row][coord.col].size}
      onChange={(e) =>
        updateGrid(grid, setGrid, coord, { size: e.target.value })
      }
      InputProps={{
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
      }}
    />
  );
};

export const MenuContent = ({
  grid,
  setGrid,
  coord,
  type,
}: InputProps & { type: GridType }) => {
  const [menuDisplay, setMenuDisplay] = useState("menu");
  const numRows = grid.length;

  switch (menuDisplay) {
    case "text":
      return (
        <Stack spacing={2} mx={1}>
          <TextInput grid={grid} setGrid={setGrid} coord={coord} />
          <ColorMenu grid={grid} setGrid={setGrid} coord={coord} type="color" />
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
          <ColorMenu grid={grid} setGrid={setGrid} coord={coord} type="color" />
          <RotationInput grid={grid} setGrid={setGrid} coord={coord} />
          <MenuItem onClick={() => setMenuDisplay("menu")}>
            <ListItemText secondary="View options" />
          </MenuItem>
        </Stack>
      );
    case "background":
      return (
        <Stack spacing={2} mx={1}>
          <ColorMenu
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
      return (
        <Stack mx={1} spacing={2}>
          <ImageInput grid={grid} setGrid={setGrid} coord={coord} />
          <RotationInput grid={grid} setGrid={setGrid} coord={coord} />
          <SizeInput grid={grid} setGrid={setGrid} coord={coord} />
          <MenuItem onClick={() => setMenuDisplay("menu")}>
            <ListItemText secondary="View options" />
          </MenuItem>
        </Stack>
      );
    case "menu":
      return (
        <>
          <MenuItem onClick={() => setMenuDisplay("text")}>Text</MenuItem>
          <MenuItem onClick={() => setMenuDisplay("icon")}>Icon</MenuItem>
          <MenuItem onClick={() => setMenuDisplay("background")}>
            Background
          </MenuItem>
          <MenuItem onClick={() => setMenuDisplay("image")}>Image</MenuItem>
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
