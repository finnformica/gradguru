import { Typography, SxProps } from "@mui/material";
import React from "react";

type CardTitleProps = {
  children: React.ReactNode;
  sx?: any;
};

const CardTitle = ({ children, ...props }: CardTitleProps) => {
  return (
    <Typography {...props} variant="h5" fontWeight={700} fontSize={20}>
      {children}
    </Typography>
  );
};

export default CardTitle;
