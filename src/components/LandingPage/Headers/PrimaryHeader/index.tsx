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
import { useState } from "react";

import MenuButton from "./MenuButton";
import NavLinks from "./NavLinks";
import NavbarLogo from "./NavbarLogo";

import UserAlert from "@/components/LandingPage/UserAlert";

import SquareButton from "@/components/LandingPage/Buttons/SquareButton";
import { AlertState } from "@/components/globalTypes";

const PrimaryHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    severity: "success",
    title: "",
    message: "",
  });

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
        <UserAlert state={alertState} setState={setAlertState} />
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
