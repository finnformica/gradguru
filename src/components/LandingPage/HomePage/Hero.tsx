"use client";

import Image from "next/image";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import SquareButton from "components/LandingPage/Buttons/SquareButton";
import ArrowButton from "components/LandingPage/Buttons/ArrowButton";
import BigTitle from "components/LandingPage/Titles/BigTitle";

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
          <Typography variant="body1">
            Unleash your potential with comprehensive coaching and resources to
            secure the perfect graduate job after university.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, pt: 4 }}>
            <SquareButton href="/courses">Explore courses</SquareButton>
            <ArrowButton
              href="/learn-more"
              style={{ textTransform: "uppercase" }}
            >
              Learn more
            </ArrowButton>
          </Box>
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
            width={!isMobile ? 500 : 300}
            height={!isMobile ? 300 : 200}
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
