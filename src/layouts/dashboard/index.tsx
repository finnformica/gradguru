import React from "react";
import { Box } from "@mui/material";
import DashboardHeader from "./header";
import NavMini from "layouts/dashboard/sidebar/nav-mini";

const drawerWidth = 80;
const appBarHeight = 72;
const horizontalPadding = 48;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardHeader height={appBarHeight} />
      <NavMini width={drawerWidth} />
      <Box
        component="main"
        display="flex"
        flexDirection="column"
        flexGrow={1}
        pt={`${appBarHeight + 24}px`}
        pr={`${horizontalPadding}px`}
        pl={`${drawerWidth + horizontalPadding}px`}
        maxWidth={`calc(100% - ${drawerWidth + horizontalPadding * 2}px)`}
      >
        {children}
      </Box>
    </>
  );
};

export default DashboardLayout;
