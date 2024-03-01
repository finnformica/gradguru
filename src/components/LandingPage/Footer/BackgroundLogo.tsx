import { Box } from "@mui/material";
import Image from "next/image";

const BackgroundLogo = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        height: "100%",
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
