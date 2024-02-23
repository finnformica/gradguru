"use client";

import Link from "next/link";
import { Typography, useTheme } from "@mui/material";

import StraightIcon from "@mui/icons-material/Straight";

type ArrowButtonProps = {
  children: React.ReactNode;
  href: string;
  style?: object;
};

const ArrowIcon = () => {
  return <StraightIcon sx={{ color: "#000", transform: "rotate(90deg)" }} />;
};

const ArrowButton = ({ children, href, ...props }: ArrowButtonProps) => {
  const theme = useTheme();
  return (
    <Link
      href={href}
      style={{
        color: theme.palette.secondary.main,
        ...props.style,
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
      }}
    >
      <Typography variant="body1" sx={{ pr: 1, fontSize: 12, fontWeight: 500 }}>
        {children}
      </Typography>
      <ArrowIcon />
    </Link>
  );
};

export default ArrowButton;
