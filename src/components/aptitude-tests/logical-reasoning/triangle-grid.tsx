"use client";

import { useState } from "react";

import { Box, Menu, Stack } from "@mui/material";

import { CellData, Grid, GridCoord } from "types";
import { MenuContent } from "./grid-menu";
import { renderCell } from "./utils";

const TRIANGLE_SIZE = "60px";

const TriangleCell = ({
  children,
  index,
  onClick,
  cell,
}: {
  children: React.ReactNode;
  index: number;
  onClick?: any;
  cell: CellData;
}) => (
  <Box
    onClick={onClick}
    sx={{
      display: "grid",
      placeItems: "center",
      width: TRIANGLE_SIZE,
      height: TRIANGLE_SIZE,
      margin: `0 calc(-1 * ${TRIANGLE_SIZE} / 4)`,
      backgroundColor: "black",
      transition: "background-color 0.3s ease-out",
      cursor: "pointer",
      clipPath:
        index % 2 === 0
          ? "polygon(50%   0%, 0% 100%, 100% 100%)"
          : "polygon(50% 100%, 0%   0%, 100%   0%)",
      "&:hover:before": {
        backgroundColor: "#DFDFDF",
      },

      "&:before": {
        content: '""',
        width: `calc(${TRIANGLE_SIZE} * 0.98)`,
        height: `calc(${TRIANGLE_SIZE} * 0.98)`,
        position: "absolute",
        backgroundColor: `${cell.backgroundColor}`,
        transition: "background-color 0.3s ease-out",
        zIndex: -1,
        clipPath:
          index % 2 === 0
            ? "polygon(50%   0%, 0% 100%, 100% 100%)"
            : "polygon(50% 100%, 0%   0%, 100%   0%)",
      },
    }}
  >
    {children}
  </Box>
);

type TriangleGridProps = {
  numRows?: number;
  grid: Grid;
  setGrid?: (grid: Grid) => void;
};

const TriangleGrid = ({ numRows = 4, grid, setGrid }: TriangleGridProps) => {
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
    <Box mx={2} px={1}>
      <Stack direction="row" spacing={1}>
        <Stack direction="column">
          {grid.map((row, rowIndex) => (
            <Box key={rowIndex} display="flex" justifyContent="center">
              {row.map((cell, colIndex) => (
                <TriangleCell
                  key={colIndex}
                  index={colIndex}
                  cell={cell}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleClick(e, { row: rowIndex, col: colIndex })
                  }
                >
                  {renderCell(cell)}
                </TriangleCell>
              ))}
            </Box>
          ))}
        </Stack>
      </Stack>
      {setGrid && (
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuContent
            grid={grid}
            setGrid={setGrid}
            coord={coord}
            type="triangle"
          />
        </Menu>
      )}
    </Box>
  );
};

export default TriangleGrid;
