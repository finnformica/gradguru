import { Typography, SxProps } from "@mui/material";
import React from "react";

type DataTitleProps = {
  children: React.ReactNode;
  sx?: any;
};

const DateTitle = ({ children, ...props }: DataTitleProps) => {
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
