"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  useTheme,
} from "@mui/material";

import SquareButton from "../Buttons/SquareButton";
import NavLink from "./NavLink";

import { pages } from "../../constants";

const Header = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="xl">
      <AppBar
        position="static"
        sx={{
          background: "transparent",
          boxShadow: "none",
          py: 2,
          m: 0,
        }}
      >
        <Toolbar sx={{ backgroundColor: "#FFF", px: 0 }}>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h3"
              fontWeight={400}
              sx={{ color: theme.palette.primary.main, letterSpacing: 2 }}
            >
              gradguru
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "row", gap: 4, pl: 4 }}>
              {pages.map((page, key: number) => (
                <NavLink href={page.route} key={key}>
                  <Typography variant="body1" fontWeight={500}>
                    {page.name}
                  </Typography>
                </NavLink>
              ))}
            </Box>
          </Box>
          <SquareButton>Log in</SquareButton>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Header;
