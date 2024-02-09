import { Typography } from "@mui/material";
import React from "react";

type ReadTimeProps = {
  children: React.ReactNode;
  sx?: any;
};

const ReadTimeText = ({ children, ...props }: ReadTimeProps) => {
  return (
    <Typography fontSize={13} fontWeight={400}>
      {children} min read
    </Typography>
  );
};

export default ReadTimeText;
