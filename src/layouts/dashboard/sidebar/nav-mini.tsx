"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Box } from "@mui/material";

import { NavItems } from "./nav-items";

const NavMini = ({ width }: { width: number }) => {
  const router = useRouter();

  return (
    <Box
      position="fixed"
      component="nav"
      sx={{
        height: "100vh",
        width: `${width}px`,
        zIndex: (theme) => theme.zIndex.appBar + 1,
        pt: 1.5,
        px: 0.5,
        borderRight: (theme) => `1px dashed ${theme.palette.divider}`,
        backdropFilter: "blur(10px)",
      }}
    >
      <Image
        src="/logos/small-logo.png"
        alt="Gradguru logo"
        width={55}
        height={55}
        priority
        style={{ margin: "0 auto 2rem", display: "block", cursor: "pointer" }}
        onClick={() => router.push("/dashboard")}
      />

      <NavItems />
    </Box>
  );
};

export default NavMini;
