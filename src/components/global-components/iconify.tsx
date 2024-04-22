"use client";

import { Icon } from "@iconify/react";
import { Box } from "@mui/material";

const Iconify = ({ icon, width = 20, sx, ...other }: any) => (
  <Box
    component={Icon as any}
    className="component-iconify"
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
);

export default Iconify;
