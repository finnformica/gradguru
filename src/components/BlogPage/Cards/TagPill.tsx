import { Typography } from "@mui/material";
import React from "react";

type TagPillProps = {
  children: React.ReactNode;
  sx?: any;
};

const TagPill = ({ children, ...props }: TagPillProps) => {
  return (
    <Typography
      fontSize={13}
      fontWeight={400}
      sx={{
        backgroundColor: "lightgrey",
        py: "1px",
        px: "6px",
        borderRadius: "16px",
      }}
    >
      {children}
    </Typography>
  );
};

export default TagPill;
