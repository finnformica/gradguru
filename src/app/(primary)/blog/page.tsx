"use client";
import React from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import CardTitle from "@/components/BlogPage/Cards/CardTitle";

const BlogPage = () => {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          mx: "80px",
          px: "20px",
          py: "50px",
          justifyContent: "space-between",
          border: "1px solid red",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography>Author</Typography>
            <Typography>|</Typography>
            <Typography>Date</Typography>
          </Box>
          <CardTitle>Title</CardTitle>
          <Typography>
            Under the moon's gentle glow, whispers rustle through the silent
            woods. Shadows dance, painting the earth in mystic hues. Night's
            creatures stir, and the world holds its breath in anticipation.
          </Typography>
          <Box sx={{ display: "flex", mt: "20px", gap: 1 }}>
            <Typography>Tag</Typography>
            <Typography>|</Typography>
            <Typography>read time</Typography>
          </Box>
        </Box>
        <Image
          src={"/imgs/blog/testImage.jpg"}
          width={150}
          height={150}
          alt="Image for blog card"
        ></Image>
      </Box>
    </Container>
  );
};

export default BlogPage;
