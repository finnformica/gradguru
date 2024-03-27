import { Typography } from "@mui/material";

import SmallTitle from "./SmallTitle";
import React from "react";

type ContainerTitleProps = {
  title: string;
  maxWidth?: string;
  children: React.ReactNode;
  sx?: object;
};

const ContainerTitle = ({ title, children, maxWidth }: ContainerTitleProps) => {
  return (
    <>
      <SmallTitle sx={{ textAlign: "center", pb: 2 }}>{title}</SmallTitle>
      <Typography
        variant="body2"
        fontWeight={300}
        sx={{ textAlign: "center", maxWidth: { maxWidth }, margin: "auto" }}
      >
        {children}
      </Typography>
    </>
  );
};

export default ContainerTitle;
