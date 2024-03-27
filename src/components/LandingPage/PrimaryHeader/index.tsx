"use client";

import {
  AppBar,
  Box,
  Container,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";

import SquareButton from "components/LandingPage/Buttons/SquareButton";

import MenuButton from "./MenuButton";
import NavLinks from "./NavLinks";
import NavbarLogo from "./NavbarLogo";

const PrimaryHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="static"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "#FFF",
        boxShadow: "none",
        pt: 2,
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
          {!isMobile && (
            <Link href="/sign-in">
              <SquareButton>Login</SquareButton>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default PrimaryHeader;
