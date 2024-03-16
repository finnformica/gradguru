import { AppBar, Box, Toolbar } from "@mui/material";

import AuthButton from "./AuthButton";

const DashboardHeader = ({ height }: { height: number }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "#FFF",
        boxShadow: "none",
        px: 4,
        height: `${height}px`,
      }}
    >
      <Toolbar sx={{ backgroundColor: "#FFF", my: "auto" }} disableGutters>
        <Box display="flex" alignItems="center" flexGrow={1} />

        <AuthButton />
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
