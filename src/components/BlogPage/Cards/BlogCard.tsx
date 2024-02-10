import { Box, Typography } from "@mui/material";
import React from "react";
import AuthorTitle from "./AuthorTitle";
import DateTitle from "./DateTitle";
import TagPill from "./TagPill";
import ReadTimeText from "./ReadTimeText";
import CardTitle from "./CardTitle";
import Image from "next/image";

type BlogCard = {
  borderColor: string;
  Author: string;
  Body: string;
  Date: string;
  Tags: string;
  Title: string;
  "Read Time": number;
  id: string;
};

const BlogCard = ({ borderColor, ...props }: BlogCard) => {
  return (
    <Box
      sx={{
        display: "flex",
        mx: "10px",
        px: "20px",
        py: "50px",
        justifyContent: "space-between",
        borderBottom: `1px solid ${borderColor}`,
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <AuthorTitle>Ken Dixon</AuthorTitle>
          <Typography fontSize={14}>|</Typography>
          <DateTitle>Feb 02, 2024</DateTitle>
        </Box>
        <CardTitle>Title</CardTitle>
        <Typography>
          Under the moon's gentle glow, whispers rustle through the silent
          woods. Shadows dance, painting the earth in mystic hues. Night's
          creatures stir, and the world holds its breath in anticipation.
        </Typography>
        <Box sx={{ display: "flex", mt: "20px", gap: 1 }}>
          <TagPill>Tags</TagPill>
          <Typography fontSize={14}>|</Typography>
          <ReadTimeText>5</ReadTimeText>
        </Box>
      </Box>
      <Image
        src={"/imgs/blog/testImage.jpg"}
        width={150}
        height={150}
        alt="Image for blog card"
      ></Image>
    </Box>
  );
};

export default BlogCard;
