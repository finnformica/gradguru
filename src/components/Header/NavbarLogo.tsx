import { useTheme, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const NavbarLogo = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Link
      href="/"
      style={{
        margin: isMediumScreen ? "0 auto" : "0",
        paddingRight: isMediumScreen ? "0" : "1rem",
      }}
    >
      <Image
        src="/big-logo.png"
        alt="Graduate coaching logo"
        style={{
          objectFit: "cover",
        }}
        width={!isMobile ? 310 : 150}
        height={!isMobile ? 70 : 32}
        priority
      />
    </Link>
  );
};

export default NavbarLogo;
