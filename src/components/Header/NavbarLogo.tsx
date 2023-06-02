import { Typography, useTheme } from "@mui/material";

const NavbarLogo = () => {
  const theme = useTheme();

  return (
    <Typography
      variant="h3"
      fontWeight={400}
      sx={{
        color: theme.palette.primary.main,
        letterSpacing: 2,
        mx: { xs: "auto", md: 0 },
      }}
    >
      gradguru
    </Typography>
  );
};

export default NavbarLogo;
