import { Box, Typography } from "@mui/material";

import NavLink from "./NavLink";

import { pages } from "./pages";

const NavLinks = () => {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        flexDirection: "row",
        gap: { xs: 2, lg: 6 },
        pl: 4,
      }}
    >
      {pages.map((page, key: number) => (
        <NavLink href={page.route} key={key}>
          <Typography variant="body1" fontWeight={500}>
            {page.name}
          </Typography>
        </NavLink>
      ))}
    </Box>
  );
};

export default NavLinks;
