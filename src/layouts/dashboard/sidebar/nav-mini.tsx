"use client";

import { List, Stack } from "@mui/material";

import AuthButton from "layouts/auth-button";
import { NavItems } from "./nav-items";

const NavMini = () => {
  return (
    <Stack
      height="100%"
      justifyContent="space-between"
      alignItems="center"
      pb={2}
    >
      <List>
        <NavItems />
      </List>
      <AuthButton />
    </Stack>
  );
};

export default NavMini;
