import { Button } from "@mui/material";

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
  return (
    <Button
      href={href}
      sx={{ color: "#CFA284", ...props.sx }}
      endIcon={<ArrowIcon />}
    >
      {children}
    </Button>
  );
};

export default ArrowButton;
