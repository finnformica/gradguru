"use client";
import { useState } from "react";
import { AppBar, Toolbar, Box, Container } from "@mui/material";

import SquareButton from "../Buttons/SquareButton";
import NavLinks from "./NavLinks";
import NavbarLogo from "./NavbarLogo";
import NavMenu from "./NavMenu";

import UserAlert from "../Global/UserAlert";

import { subscribe } from "../../utils/subscribe";
import { AlertState } from "../../types";

const Header = () => {
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
            <NavMenu />
            <NavbarLogo />

            <NavLinks />
          </Box>
          <SquareButton
            onClick={() =>
              subscribe("finnformica@gmail.com", setAlertState, alertState)
            }
          >
            Sign up
          </SquareButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
