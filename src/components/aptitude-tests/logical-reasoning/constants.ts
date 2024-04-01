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

export const squareGridDefaultCell: CellData = {
  type: "text",
  value: "",
  color: "#000",
  rotation: 0,
};

export const squareSizeMapping: { [key: number]: string } = {
  4: "60px",
  3: "80px",
  2: "120px",
  1: "240px",
};
