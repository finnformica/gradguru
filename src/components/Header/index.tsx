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
import Link from "next/link";

import { pages } from "../../constants";

type NavLinkProps = {
  children: React.ReactNode;
  href: string;
};

const NavLink = ({ children, href }: NavLinkProps) => {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        color: href === "/" ? "black" : "grey",
      }}
    >
      {children}
    </Link>
  );
};

const Header = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ background: "transparent", boxShadow: "none", p: 2 }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ m: 0, backgroundColor: "#FFF" }}>
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

              <Box
                sx={{ display: "flex", flexDirection: "row", gap: 4, pl: 4 }}
              >
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
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
