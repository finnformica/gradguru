import { Button, useTheme } from "@mui/material";

import StraightIcon from "@mui/icons-material/Straight";

type ArrowButtonProps = {
  children: React.ReactNode;
  href: string;
  sx?: object;
};

const ArrowIcon = () => {
  return <StraightIcon sx={{ color: "#000", transform: "rotate(90deg)" }} />;
};

const ArrowButton = ({ children, href, ...props }: ArrowButtonProps) => {
  const theme = useTheme();
  return (
    <Button
      href={href}
      sx={{ color: theme.palette.secondary.main, ...props.sx }}
      endIcon={<ArrowIcon />}
    >
      {children}
    </Button>
  );
};

export default ArrowButton;
