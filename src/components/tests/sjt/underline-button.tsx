import { Box, Button, SxProps } from "@mui/material";

const UnderlineButton = ({
  label,
  onClick,
  sx,
}: {
  label: string;
  onClick?: () => void;
  sx?: SxProps;
}) => (
  <Box>
    <Button
      disableFocusRipple
      disableRipple
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
