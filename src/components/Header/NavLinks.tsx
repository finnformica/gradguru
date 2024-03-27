"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Box, Typography } from "@mui/material";

import { pages } from "./pages";

type NavLinkProps = {
  children: React.ReactNode;
  href: string;
  active: boolean;
};

const NavLink = ({ children, href, active }: NavLinkProps) => {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        color: active ? "black" : "grey",
      }}
    >
      {children}
    </Link>
  );
};

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        flexDirection: "row",
        gap: { xs: 2, lg: 6 },
        pl: 4,
      }}
    >
      {pages.map((page, key: number) => (
        <NavLink href={page.route} key={key} active={pathname === page.route}>
          <Typography variant="body1" fontWeight={500}>
            {page.name}
          </Typography>
        </NavLink>
      ))}
    </Box>
  );
};

export default NavLinks;
