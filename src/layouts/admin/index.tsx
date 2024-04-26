"use client";

import Image from "next/image";
import React, { useState } from "react";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, Theme, styled } from "@mui/material/styles";

import {
  Box,
  CssBaseline,
  List,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import AuthButton from "layouts/auth-button";

import { useRouter } from "next/navigation";
import ListCollapse from "./list-collapse";
import ListCollapseItem from "./list-collapse-item";
import { sidebarSections } from "./sidebar-sections";

const drawerWidth = 240;
const appBarHeight = 72;

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
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  height: appBarHeight,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
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

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        height: `calc(100vh - ${appBarHeight}px)`,
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          background: "transparent",
          backdropFilter: "blur(10px)",
          pr: 4,
          pl: 1,
          height: `${appBarHeight}px`,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ my: "auto" }} disableGutters>
          <Stack
            flexGrow={1}
            alignItems="center"
            direction="row"
            justifyContent="flex-start"
          >
            <Image
              src="/logos/small-logo.png"
              alt="Gradguru logo"
              width={55}
              height={55}
              priority
              style={{
                display: "block",
                cursor: "pointer",
                marginBottom: "6px",
              }}
              onClick={() => router.push("/admin")}
            />
            <Typography pl={2} variant="h5" fontWeight={500}>
              Gradguru Admin Panel
            </Typography>
          </Stack>

          <AuthButton />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <DrawerHeader />
        <List sx={{ p: 0 }}>
          {sidebarSections.map((section, key) =>
            section.children ? (
              <ListCollapse key={key} section={section} />
            ) : (
              <ListCollapseItem key={key} section={section} />
            )
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
