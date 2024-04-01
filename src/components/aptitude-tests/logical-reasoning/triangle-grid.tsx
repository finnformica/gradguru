"use client";

import _ from "lodash";

import { Box, Stack } from "@mui/material";

// fill triangle - different colors
// add different shapes inside each triangle segment - different colors
// reset button to clear all grid cells

const NUM_ROWS = 4;
const TRIANGLE_SIZE = "60px";

const TriangleCell = ({
  children,
  index,
  onClick,
}: {
  children: React.ReactNode;
  index: number;
  onClick?: any;
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
        backgroundColor: "white",
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
  const rows = _.range(1, NUM_ROWS * 2, 2);

  return (
    <Stack direction="column">
      {rows.map((row) => (
        <Box key={row} display="flex" justifyContent="center">
          {_.range(row).map((col, i) => (
            <TriangleCell
              key={i}
              index={i}
              onClick={() => console.log("clicked", row, col)}
            >
              {col}
            </TriangleCell>
          ))}
        </Box>
      ))}
    </Stack>
  );
};

export default TriangleGrid;
