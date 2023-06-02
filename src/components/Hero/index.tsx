import { Box, useTheme } from "@mui/material";
import Image from "next/image";

import { HeroTitle, HeroSubtitle } from "./HeroTitles";

const Hero = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", gap: 4, alignItems: "center", mt: 4 }}>
      <Box sx={{ width: "50%" }}>
        <HeroTitle text="Empower Your Graduate Journey and Land Your Dream Job" />
        <HeroSubtitle
          text="Unleash your potential with comprehensive coaching and resources to
          secure the perfect graduate job after university."
        />
      </Box>
      <Box>
        <Image
          src="/imgs/hero.png"
          alt="Graduate coaching example"
          width={500}
          height={300}
          style={{
            objectFit: "contain",
            borderRadius: "8px",
            // border: "2px solid #CFA284",
          }}
          priority
        />
      </Box>
    </Box>
  );
};

export default Hero;
