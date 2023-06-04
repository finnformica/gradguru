"use client";

import { Container, Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import BigTitle from "../Titles/BigTitle";

const WelcomeVideo = () => {
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
      </Box>
      <BigTitle
        sx={{
          py: 4,
        }}
      >
        Welcome to your Free Resume Course
      </BigTitle>
    </Container>
  );
};

export default WelcomeVideo;
