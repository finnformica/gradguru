import { Box, Container } from "@mui/material";
import Image from "next/image";

import { HeroSubtitle } from "./HeroTitles";
import BigTitle from "../Titles/BigTitle";

const Hero = () => {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          gap: 4,
          alignItems: "center",
          mt: { xs: 4, md: 10 },
        }}
      >
        <Box sx={{ width: { xs: "90%", md: "30%" } }}>
          <BigTitle>
            Empower Your Graduate Journey and Land Your Dream Job
          </BigTitle>
          <HeroSubtitle>
            Unleash your potential with comprehensive coaching and resources to
            secure the perfect graduate job after university.
          </HeroSubtitle>
        </Box>
        <Box
          sx={{
            border: "1.5px solid #CFA284",
            borderRadius: "8px",
            mt: { xs: 4, md: 0 },
          }}
        >
          <Image
            src="/imgs/hero.png"
            alt="Graduate coaching example"
            width={500}
            height={300}
            style={{
              objectFit: "cover",
              borderRadius: "8px",
              transform: "translateY(-10px) translateX(16px) scale(1.015)",
            }}
            priority
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Hero;
