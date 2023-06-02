import { Typography } from "@mui/material";
import React from "react";

type SmallTitleProps = {
  children: React.ReactNode;
};

const SmallTitle = ({ children }: SmallTitleProps) => {
  return (
    <Typography variant="h5" fontWeight={500} fontSize={28}>
      {children}
    </Typography>
  );
};

export default SmallTitle;
