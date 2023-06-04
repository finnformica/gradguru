import { Button, useTheme } from "@mui/material";

type SquareButtonProps = {
  children: React.ReactNode;
  borderRadius?: string;
  sx?: object;
  href?: string;
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
      onClick={props.onClick}
      href={props.href}
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
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};

export default SquareButton;
