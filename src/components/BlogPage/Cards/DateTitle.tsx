import { Typography } from "@mui/material";
import React from "react";

type dataTitleProps = {
  children: React.ReactNode;
  sx?: any;
};

const DateTitle = ({ children, ...props }: dataTitleProps) => {
  return (
    <Typography
      fontSize={14}
      fontWeight={400}
      sx={{ color: "rgb(107, 107, 107)" }}
    >
      {children}
    </Typography>
  );
};

export default DateTitle;
