import { Typography } from "@mui/material";
import React from "react";

type SmallTitleProps = {
  children: React.ReactNode;
  sx?: any;
};

const SmallTitle = ({ children, ...props }: SmallTitleProps) => {
  return (
    <Typography {...props} variant="h5" fontWeight={500} fontSize={28}>
      {children}
    </Typography>
  );
};

export default SmallTitle;
