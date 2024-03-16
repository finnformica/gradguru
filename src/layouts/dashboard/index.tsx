import React from "react";
import { Box } from "@mui/material";
import DashboardHeader from "./header";
import NavMini from "layouts/dashboard/sidebar/nav-mini";

const drawerWidth = 80;
const appBarHeight = 72;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardHeader height={appBarHeight} />
      <NavMini width={drawerWidth} />
      <Box
        component="main"
        pl={`${drawerWidth + 16}px`}
        pt={`${appBarHeight + 24}px`}
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default DashboardLayout;
