import { Box, Typography, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{ backgroundColor: theme.palette.secondary.dark, minHeight: "20vh" }}
    >
      <Typography
        variant="body2"
        sx={{ maxWidth: "60%", color: "#FFF" }}
      ></Typography>
    </Box>
  );
};

export default Footer;
