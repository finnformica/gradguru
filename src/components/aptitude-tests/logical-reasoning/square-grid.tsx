"use client";

import { useState } from "react";

import { Delete } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Menu,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { CellData } from "types";

import { MenuContent } from "./square-grid-menu";
import {
  applyGridBorders,
  initialiseSquareGrid,
  mapIcon,
  squareSizeMapping,
} from "./utils";

const renderCell = (cell: CellData) => {
  if (!cell || !cell.value) return null;

  switch (cell.type) {
    case "text":
      return (
        <Typography
          sx={{
            color: cell.color,
            fontSize: 28,
            fontWeight: 500,
            transform: `rotate(${cell.rotation}deg)`,
          }}
        >
          {cell.value.toUpperCase()}
        </Typography>
      );
    case "icon":
      return mapIcon(cell.value, cell.color, cell.rotation);
    case "image":
      return null; // TODO: Implement image rendering
    default:
      return cell.value;
  }
};

type SquareElementProps = {
  col: number;
  row: number;
  size: string;
  innerGrid: boolean;
  showBorders: boolean;
  children: React.ReactNode;
  numRows: number;
  onClick?: any;
};

const SquareElement = ({
  children,
  size,
  onClick,
  ...grid
}: SquareElementProps) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: size,
        height: size,
        cursor: "pointer",
        display: "grid",
        placeItems: "center",
        transition: "background-color 0.3s ease-out",
        ...applyGridBorders({ ...grid }),
        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" },
      }}
    >
      {children}
    </Box>
  );
};

type SquareGridProps = {
  numRows?: number;
  innerGrid?: boolean;
  showBorders?: boolean;
};

const SquareGrid = ({
  numRows = 1,
  innerGrid = true,
  showBorders = true,
}: SquareGridProps) => {
  const size = squareSizeMapping[numRows];
  const [gridState, setGridState] = useState(initialiseSquareGrid(numRows));
  const [coord, setCoord] = useState({
    row: 0,
    col: 0,
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    coord: any
  ) => {
    setAnchorEl(event.currentTarget);
    setCoord(coord);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${numRows}, ${size})`,
          }}
        >
          {gridState.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <SquareElement
                key={colIndex}
                col={colIndex}
                row={rowIndex}
                size={size}
                innerGrid={innerGrid}
                numRows={numRows}
                showBorders={showBorders}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  handleClick(e, { row: rowIndex, col: colIndex })
                }
              >
                {renderCell(cell)}
              </SquareElement>
            ))
          )}
        </Box>

        <Stack justifyContent="center">
          <Tooltip title="Reset grid">
            <IconButton
              onClick={() => setGridState(initialiseSquareGrid(numRows))}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuContent grid={gridState} setGrid={setGridState} coord={coord} />
      </Menu>
    </>
  );
};

export default SquareGrid;
