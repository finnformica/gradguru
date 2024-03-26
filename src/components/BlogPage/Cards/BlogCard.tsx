import { Box, Typography } from "@mui/material";
import Image from "next/image";

type BlogCardProps = {
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
}: BlogCardProps) => {
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
          <Typography fontSize={14} fontWeight={400}>
            {author}
          </Typography>
          <Typography fontSize={14}>|</Typography>
          <Typography
            fontSize={14}
            fontWeight={400}
            sx={{ color: "rgb(107, 107, 107)" }}
          >
            {date}
          </Typography>
        </Box>
        <Typography variant="h5" fontWeight={700} fontSize={20}>
          {title}
        </Typography>
        <Typography>{body}</Typography>
        <Box sx={{ display: "flex", mt: "20px", gap: 1 }}>
          <Typography
            fontSize={13}
            fontWeight={400}
            sx={{
              backgroundColor: "lightgrey",
              py: "1px",
              px: "6px",
              borderRadius: "16px",
            }}
          >
            {tags}
          </Typography>
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
