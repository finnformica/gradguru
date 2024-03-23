import { TypographyProps } from "@mui/material";

type TextOptionsType = {
  style: TypographyProps["variant"];
  name: string;
};

const textOptions: TextOptionsType[] = [
  { style: "h4", name: "Large Heading" },
  { style: "h5", name: "Medium Heading" },
  { style: "h6", name: "Small Heading" },
  { style: "body1", name: "Body One" },
  { style: "body2", name: "Body Two" },
];

const menuItems = ["Text", "Video", "Picutre", "Table"];

const tagOptions = ["Finance", "Jobs", "Education", "Loose Cannon"];

export { menuItems, textOptions, tagOptions };
