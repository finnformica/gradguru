import { useTheme, useMediaQuery } from "@mui/material";
import Image from "next/image";

const NavbarLogo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Image
      src="/big-logo.png"
      alt="Graduate coaching logo"
      style={{
        objectFit: "cover",
        margin: isMobile ? "0 auto" : "0",
        paddingRight: isMobile ? "0" : "1rem",
      }}
      width={310}
      height={70}
      priority
    />
  );
};

export default NavbarLogo;
