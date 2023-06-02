import { Button, useTheme } from "@mui/material";

type SquareButtonProps = {
  children: React.ReactNode;
  borderRadius?: string;
};

const SquareButton = ({ children, borderRadius }: SquareButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      sx={{
        backgroundColor: theme.palette.primary.main,
        borderRadius: borderRadius ? borderRadius : theme.shape.borderRadius,

        color: "#FFF",
        px: 4,
        transition: "all 0.3s ease-in-out",

        "&:hover": {
          backgroundColor: theme.palette.primary.main,
          opacity: 0.8,
        },
      }}
    >
      {children}
    </Button>
  );
};

export default SquareButton;