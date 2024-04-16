import { CellData, GridType } from "types";

export const colors = [
  { label: "Black", value: "#000" },
  { label: "Red", value: "#ef5350" },
  { label: "Blue", value: "#1e88e5" },
  { label: "Green", value: "#4caf50" },
  { label: "White", value: "#FFF" },
];

export const gridDefaultCell = (
  numRows: number = 4,
  gridType: GridType
): CellData => ({
  type: "text",
  value: "",
  color: "#000",
  rotation: 0,
  backgroundColor: "#FFF",
  size: fontSizeMapping(numRows, gridType),
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

export const fontSizeMapping = (numRows: number, gridType: GridType) => {
  if (gridType === "square") {
    switch (numRows) {
      case 4:
        return 40;
      case 3:
        return 44;
      case 2:
        return 60;
      case 1:
        return 90;
      default:
        return 28;
    }
  } else if (gridType === "triangle") {
    return 20;
  } else {
    throw new Error("Invalid grid type");
  }
};

export const iconToComponentMapping: { [key: string]: any } = {
  arrow: "mingcute:arrow-up-fill",
  plane: "mdi:airplane",
  face: "material-symbols:face",
  tree: "fa-solid:tree",
  palmtree: "mdi:palm-tree",
  cactus: "tabler:cactus-filled",
  acorn: "ph:acorn-fill",
  circle: "ic:baseline-circle",
  triangle: "icon-park-solid:triangle",
  square: "ic:round-square",
  diamond: "icon-park-solid:diamond-two",
  pentagon: "ic:round-pentagon",
  hexagon: "ic:round-hexagon",
  ocatgon: "ph:octagon-fill",
  star: "ic:round-star",
  heart: "iconoir:heart-solid",
  clock: "icon-park-outline:alarm-clock",
  person: "material-symbols:person",
  glasses: "fluent-mdl2:glasses",
  cookie: "material-symbols:cookie",
  grass: "ic:baseline-grass",
  anchor: "material-symbols:anchor",
  boat: "ic:round-sailing",
  house: "ic:round-home",
  water: "ic:baseline-water",
  mountain: "ic:round-landscape",
  castle: "ic:round-fort",
  sun: "ion:sunny",
  forest: "ic:round-forest",
  moon: "solar:moon-bold",
  club: "bi:suit-club-fill",
  ant: "f7:ant-fill",
  alien: "mdi:alien",
};
