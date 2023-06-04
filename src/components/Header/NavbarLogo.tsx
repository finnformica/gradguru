import { useTheme, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const NavbarLogo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Link
      href="/"
      style={{
        margin: isMobile ? "0 auto" : "0",
        paddingRight: isMobile ? "0" : "1rem",
      }}
    >
      <Image
        src="/big-logo.png"
        alt="Graduate coaching logo"
        style={{
          objectFit: "cover",
        }}
        width={310}
        height={70}
        priority
      />
    </Link>
  );
};

export default NavbarLogo;
