"use client";

import { useState } from "react";

import { Box, Menu, Stack } from "@mui/material";

import { CellData, Grid, GridCoord } from "types";

import { squareSizeMapping } from "./constants";
import { MenuContent } from "./grid-menu";
import { renderCell } from "./utils";

type SquareElementProps = {
  cell: CellData;
  innerGrid: boolean;
  size: string;
  onClick: any;
  children: React.ReactNode;
};

const SquareElement = ({
  size,
  onClick,
  cell,
  innerGrid,
  children,
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
        backgroundColor: `${cell.backgroundColor}`,
        border: innerGrid ? `1px solid black` : "none",
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
  grid: Grid;
  setGrid?: (grid: Grid) => void;
};

const SquareGrid = ({
  numRows = 1,
  innerGrid = true,
  showBorders = true,
  grid,
  setGrid,
}: SquareGridProps) => {
  const size = squareSizeMapping[numRows];
  const [coord, setCoord] = useState<GridCoord>({
    row: 0,
    col: 0,
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    coord: GridCoord
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
            border: showBorders ? "1px solid black" : "none",
          }}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <SquareElement
                key={colIndex}
                size={size}
                innerGrid={innerGrid}
                cell={cell}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  handleClick(e, { row: rowIndex, col: colIndex })
                }
              >
                {renderCell(cell)}
              </SquareElement>
            ))
          )}
        </Box>
      </Stack>
      {setGrid && (
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuContent grid={grid} setGrid={setGrid} coord={coord} />
        </Menu>
      )}
    </>
  );
};

export default SquareGrid;
