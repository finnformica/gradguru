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
} from "@mui/material";
import { useAuth } from "../../context/auth";

import MenuButton from "./MenuButton";
import NavLinks from "./NavLinks";
import NavbarLogo from "./NavbarLogo";
import AuthButton from "./AuthButton";

import UserAlert from "../Global/UserAlert";

import { AlertState } from "../../components/globalTypes";
import SquareButton from "../Buttons/SquareButton";

const Header = () => {
  const { user, handleGoogleLogin } = useAuth();
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
        background: "transparent",
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
                <SquareButton>Login</SquareButton>
              </Link>
            ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
