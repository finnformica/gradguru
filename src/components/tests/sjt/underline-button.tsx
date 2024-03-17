import { Box, Button, SxProps } from "@mui/material";

const UnderlineButton = ({
  label,
  onClick,
  sx,
  type = "button",
}: {
  label: string;
  onClick?: () => void;
  sx?: SxProps;
  type?: "submit" | "button";
}) => (
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
    >
      {label}
    </Button>
  </Box>
);

export default UnderlineButton;
