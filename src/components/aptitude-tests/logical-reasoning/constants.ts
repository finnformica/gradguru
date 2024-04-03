import { SvgIconOwnProps } from "@mui/material";
import { CellData } from "types";

export const icons = [
  "Circle",
  "Triangle",
  "Square",
  "Pentagon",
  "Hexagon",
  "Star",
  "Plane",
  "Face",
  "Person",
  "Tree",
  "Forest",
  "Grass",
  "Mountain",
  "Sun",
  "Moon",
  "Clock",
  "Cookie",
  "Anchor",
  "Boat",
  "Water",
  "House",
  "Castle",
];

export const colors = [
  { label: "Black", value: "#000" },
  { label: "Red", value: "#ef5350" },
  { label: "Blue", value: "#1e88e5" },
  { label: "Green", value: "#4caf50" },
  { label: "White", value: "#FFF" },
];

export const gridDefaultCell = (
  size: SvgIconOwnProps["fontSize"] = "large"
): CellData => ({
  type: "text",
  value: "",
  color: "#000",
  rotation: 0,
  backgroundColor: "#FFF",
  size,
});

export const squareSizeMapping: { [key: number]: string } = {
  4: "60px",
  3: "60px",
  2: "85px",
  1: "150px",
};

export const numericToAlphaMapping: { [key: number]: string } = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
  6: "G",
  7: "H",
  8: "I",
  9: "J",
};

export const alphaToNumericMapping: { [key: string]: number } = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9,
};

export const fontSizeMapping = (fontSize: SvgIconOwnProps["fontSize"]) => {
  switch (fontSize) {
    case "small":
      return 20;
    case "medium":
      return 24;
    case "large":
      return 28;
    default:
      return 28;
  }
};
