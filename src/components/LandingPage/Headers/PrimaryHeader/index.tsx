"use client";
import { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "@/context/auth";

import MenuButton from "./MenuButton";
import NavLinks from "./NavLinks";
import NavbarLogo from "./NavbarLogo";

import UserAlert from "@/components/LandingPage/UserAlert";

import { AlertState } from "@/components/globalTypes";
import SquareButton from "@/components/LandingPage/Buttons/SquareButton";

const PrimaryHeader = () => {
  const { user, loading } = useAuth();
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
        py: 2,
        mb: 4,
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
            <Link href="/login">
              <SquareButton>Login</SquareButton>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default PrimaryHeader;
