import Image from "next/image";
import { Box, BoxProps } from "@mui/material";

const NavbarLogo = ({ sx }: { sx?: BoxProps }) => {
  return (
    <Box sx={sx}>
      <Image
        src="/logos/big-logo.png"
        alt="Graduate coaching logo"
        style={{
          objectFit: "cover",
        }}
        width={150}
        height={32}
        priority
      />
    </Box>
  );
};

export default NavbarLogo;
