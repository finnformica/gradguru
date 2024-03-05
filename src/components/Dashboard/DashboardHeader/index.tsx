"use client";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import AuthButton from "./AuthButton";
import MenuButton from "./MenuButton";
import NavbarLogo from "./NavbarLogo";
import NavLinks from "./NavLinks";

const DashboardHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="static"
      sx={{
        background: "#FFF",
        boxShadow: "none",
        py: 2,
        mb: 4,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ backgroundColor: "#FFF" }} disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <NavbarLogo />
            <NavLinks />
          </Box>

          {isMobile && <MenuButton />}
          {!isMobile && <AuthButton />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default DashboardHeader;
