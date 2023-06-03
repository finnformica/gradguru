import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

const BackgroundLogo = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        overflow: "hidden",
        height: "100%",
        // backgroundColor: "red",
        top: 0,
        right: -80,
      }}
    >
      <Image
        src="/imgs/hat.png"
        alt="gradguru logo"
        width={700}
        height={600}
        style={{
          opacity: "15%",
          objectFit: "cover",
          transform: "translateY(-15%)",
        }}
      />
    </Box>
  );
};

export default BackgroundLogo;
