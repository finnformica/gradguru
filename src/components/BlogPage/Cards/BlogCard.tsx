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
  author: string;
  body: string;
  date: string;
  tags: string;
  title: string;
  read_time: number;
  id: string;
};

const BlogCard = ({
  borderColor,
  author,
  body,
  date,
  tags,
  title,
  read_time,
  id,
}: BlogCard) => {
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
          <AuthorTitle>{author}</AuthorTitle>
          <Typography fontSize={14}>|</Typography>
          <DateTitle>{date}</DateTitle>
        </Box>
        <CardTitle>{title}</CardTitle>
        <Typography>{body}</Typography>
        <Box sx={{ display: "flex", mt: "20px", gap: 1 }}>
          <TagPill>{tags}</TagPill>
          <Typography fontSize={14}>|</Typography>
          <ReadTimeText>{read_time}</ReadTimeText>
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
