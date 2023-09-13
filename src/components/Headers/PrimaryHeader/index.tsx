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
import AuthButton from "./AuthButton";

import UserAlert from "@/components/Global/UserAlert";

import { AlertState } from "@/components/globalTypes";
import SquareButton from "@/components/Buttons/SquareButton";

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
          {!isMobile &&
            (!!user ? (
              <AuthButton />
            ) : (
              <Link href="/login">
                <SquareButton>
                  {loading ? (
                    <CircularProgress size="1.5rem" sx={{ color: "#FFF" }} />
                  ) : (
                    "Login"
                  )}
                </SquareButton>
              </Link>
            ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default PrimaryHeader;
