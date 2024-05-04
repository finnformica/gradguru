"use client";

import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import MenuButton from "./MenuButton";
import NavLinks from "./NavLinks";
import NavbarLogo from "./NavbarLogo";
import { useRouter } from "next/navigation";

const PrimaryHeader = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="static"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "#FFF",
        boxShadow: "none",
        pt: 2,
      }}
    >
      <Container maxWidth="xl">
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
          {!isMobile && (
            <Button
              variant="contained"
              sx={{ px: 4 }}
              onClick={() => router.push("/sign-in")}
              disabled={process.env.NEXT_PUBLIC_VERCEL_ENV === "production"}
            >
              Sign in
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default PrimaryHeader;
