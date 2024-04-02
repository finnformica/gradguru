"use client";

import _ from "lodash";

import { Box, Menu, Stack } from "@mui/material";
import { MenuContent } from "./grid-menu";
import { useState } from "react";
import { gridDefaultCell } from "./constants";
import { renderCell } from "./utils";
import { CellData } from "types";

// fill triangle - different colors
// add different shapes inside each triangle segment - different colors
// reset button to clear all grid cells

const NUM_ROWS = 4;
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

const TriangleGrid = () => {
  const rows = _.range(1, NUM_ROWS + 1).map((row) => row);
  const grid = rows.map((row) =>
    _.range(row * 2 - 1).map((num) => gridDefaultCell("small"))
  );

  const [gridState, setGridState] = useState(grid);
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
      <Stack direction="column">
        {gridState.map((row, rowIndex) => (
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
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuContent grid={gridState} setGrid={setGridState} coord={coord} />
      </Menu>
    </>
  );
};

export default TriangleGrid;
