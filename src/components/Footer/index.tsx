"use client";

import { useMediaQuery, useTheme } from "@mui/material";

import MobileFooter from "./MobileFooter";
import NormalFooter from "./NormalFooter";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <footer
      style={{
        backgroundColor: theme.palette.secondary.dark,
        marginTop: "auto",
      }}
    >
      {!isMobile ? <NormalFooter /> : <MobileFooter />}
    </footer>
  );
};

export default Footer;
