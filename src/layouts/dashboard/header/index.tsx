import { AppBar, Box, Toolbar } from "@mui/material";

import AuthButton from "./auth-button";

const DashboardHeader = ({ height }: { height: number }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "transparent",
        backdropFilter: "blur(10px)",
        px: 4,
        height: `${height}px`,
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar sx={{ my: "auto" }} disableGutters>
        <Box display="flex" alignItems="center" flexGrow={1} />

        <AuthButton />
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
