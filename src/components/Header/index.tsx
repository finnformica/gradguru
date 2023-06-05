"use client";

import { AppBar, Toolbar, Box, Container } from "@mui/material";

import SquareButton from "../Buttons/SquareButton";
import NavLinks from "./NavLinks";
import NavbarLogo from "./NavbarLogo";
import NavMenu from "./NavMenu";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: "transparent",
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
          <SquareButton
            sx={{
              px: { xs: 2, md: 4 },
              display: { xs: "none", sm: "block" },
            }}
          >
            Sign up
          </SquareButton>
          <NavMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
