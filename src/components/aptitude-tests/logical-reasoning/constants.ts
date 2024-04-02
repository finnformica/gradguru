import { SvgIconOwnProps } from "@mui/material";
import { CellData } from "types";

export const icons = [
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
  3: "80px",
  2: "120px",
  1: "240px",
};
