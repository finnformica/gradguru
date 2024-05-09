"use client";
import React from "react";
import NavMini from "layouts/dashboard/sidebar/nav-mini";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Box,
  CSSObject,
  CssBaseline,
  List,
  Stack,
  Theme,
  styled,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";

import DashboardHeader from "./header";
import { NavItems } from "./sidebar/nav-items";
import AuthButton from "layouts/auth-button";

const appBarHeight = 72;
const drawerWidth = 80;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  height: appBarHeight,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: drawerWidth,
});

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        PaperProps={{
          sx: { borderRight: (theme) => `1px dashed ${theme.palette.divider}` },
        }}
      >
        <DrawerHeader>
          <Image
            src="/logos/small-logo.png"
            alt="Gradguru logo"
            width={55}
            height={55}
            priority
            style={{
              margin: "0 auto",
              display: "block",
              cursor: "pointer",
            }}
            onClick={() => router.push("/dashboard")}
          />
        </DrawerHeader>
        <Stack
          direction={"column"}
          justifyContent={"space-between"}
          textAlign={"center"}
          height={"92%"}
        >
          <List>
            <NavItems />
          </List>
          <AuthButton />
        </Stack>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
