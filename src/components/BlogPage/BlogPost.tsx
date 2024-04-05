import { Box, Stack, Typography } from "@mui/material";
import { IBlog } from "./types";

const BlogPost = ({
  author,
  created,
  imageId,
  slug,
  summary,
  tags,
  title,
}: IBlog) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid red",
        gap: 4,
        px: 8,
        textAlign: "left",
      }}
    >
      <Typography variant="h3">{title}</Typography>
      <Stack direction={"row"}>
        <Stack direction={"column"}>
          <Typography>{author}</Typography>
          <Typography>{new Date(created).toDateString()}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BlogPost;
