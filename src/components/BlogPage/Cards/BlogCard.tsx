import { Box, Typography } from "@mui/material";
import AuthorTitle from "./AuthorTitle";
import DateTitle from "./DateTitle";
import TagPill from "./TagPill";
import CardTitle from "./CardTitle";
import Image from "next/image";

type propsBlogCard = {
  borderColor: string;
  author: string;
  body: string;
  date: string;
  tags: string;
  title: string;
  id: string;
};

const BlogCard = ({
  borderColor,
  author,
  body,
  date,
  tags,
  title,
  id,
}: propsBlogCard) => {
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
        <Box id={id} sx={{ display: "flex", gap: 1 }}>
          <AuthorTitle>{author}</AuthorTitle>
          <Typography fontSize={14}>|</Typography>
          <DateTitle>{date}</DateTitle>
        </Box>
        <CardTitle>{title}</CardTitle>
        <Typography>{body}</Typography>
        <Box sx={{ display: "flex", mt: "20px", gap: 1 }}>
          <TagPill>{tags}</TagPill>
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
