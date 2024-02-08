import { Typography } from "@mui/material";
import React from "react";

type cardTitleProps = {
  children: React.ReactNode;
  sx?: any;
};

const CardTitle = ({ children, ...props }: cardTitleProps) => {
  return (
    <Typography {...props} variant="h5" fontWeight={700} fontSize={20}>
      {children}
    </Typography>
  );
};

export default CardTitle;
