import React from "react";
import { Box } from "@mui/material";
import NavMini from "layouts/dashboard/sidebar/nav-mini";

const drawerWidth = 80;
const horizontalPadding = 48;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavMini width={drawerWidth} />
      <Box
        component="main"
        display="flex"
        flexDirection="column"
        flexGrow={1}
        pt={2.5}
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
