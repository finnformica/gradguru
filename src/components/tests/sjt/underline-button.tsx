import { Box, Button, ButtonProps, SxProps } from "@mui/material";

interface UnderlineButtonProps extends ButtonProps {
  label: string;
  onClick?: () => void;
  sx?: SxProps;
  type?: "submit" | "button";
}

const UnderlineButton = ({
  label,
  onClick,
  sx,
  type = "button",
  ...props
}: UnderlineButtonProps) => (
  <Box>
    <Button
      disableFocusRipple
      disableRipple
      type={type}
      onClick={onClick}
      sx={{
        textDecoration: "underline",
        backgroundColor: "transparent",
        "&:hover": { backgroundColor: "transparent" },
        p: 0,
        ...sx,
      }}
      {...props}
    >
      {label}
    </Button>
  </Box>
);

export default UnderlineButton;
