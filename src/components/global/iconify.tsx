"use client";

import { Icon } from "@iconify/react";
import { Box, BoxProps } from "@mui/material";

const Iconify = ({
  icon,
  width = 20,
  sx,
  ...other
}: BoxProps & { icon: string }) => (
  <Box
    component={Icon as any}
    className="component-iconify"
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
);

export default Iconify;
