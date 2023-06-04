"use client";

import {
  Container,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import BigTitle from "../Titles/BigTitle";

const WelcomeVideo = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          border: "1.5px solid #CFA284",
          borderRadius: "8px",
          mt: { xs: 4, md: 0 },
          mx: "auto",
        }}
      >
        {!isMediumScreen ? (
          <Image
            src="/imgs/learn-more/welcome-video.png"
            alt="gradguru welcome video"
            width={700}
            height={400}
            style={{
              objectFit: "cover",
              borderRadius: "8px",
              transform: "translateY(-10px) translateX(16px) scale(1.015)",
            }}
          />
        ) : (
          <Image
            src="/imgs/learn-more/welcome-video.png"
            alt="gradguru welcome video"
            width={!isMobile ? 450 : 300}
            height={!isMobile ? 250 : 170}
            style={{
              objectFit: "cover",
              borderRadius: "8px",
              transform: "translateY(-10px) translateX(16px) scale(1.015)",
            }}
          />
        )}
      </Box>
      <BigTitle sx={{ pt: 4 }}>Welcome to your Free Resume Course</BigTitle>
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          mb: 4,
        }}
      >
        The only toolkit you need to secure interviews at McKinsey, Bain, and
        BCG.
      </Typography>
    </Container>
  );
};

export default WelcomeVideo;
