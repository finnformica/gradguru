"use client";

import { Button, useTheme } from "@mui/material";

type SquareButtonProps = {
  children: React.ReactNode;
  borderRadius?: string;
  sx?: object;
  href?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
};

const SquareButton = ({
  children,
  borderRadius,
  ...props
}: SquareButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      {...props}
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: "#FFF",
        px: 4,
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          opacity: 0.8,
        },
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};

export default SquareButton;
