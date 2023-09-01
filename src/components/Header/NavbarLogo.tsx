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
        paddingRight: isMediumScreen ? "0" : "1rem",
      }}
    >
      <Image
        src="/logos/big-logo.png"
        alt="Graduate coaching logo"
        style={{
          objectFit: "cover",
        }}
        width={!isMediumScreen ? 310 : 150}
        height={!isMediumScreen ? 70 : 32}
        priority
      />
    </Link>
  );
};

export default NavbarLogo;
