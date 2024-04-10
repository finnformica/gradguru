import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "lib/firebase/config";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IBlogPage } from "../../types/blog";

const DEFAULT_FONT_SIZE = 14;

const BlogPost = ({
  content,
  author,
  created,
  imageId,
  slug,
  summary,
  tags,
  title,
}: IBlogPage) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    const pathReference = ref(storage, `blog/${slug}/${imageId}`);
    getDownloadURL(pathReference)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        setImageUrl(null);
      });
  }, [slug, imageId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        textAlign: "left",
      }}
    >
      <Typography variant="h3">{title}</Typography>
      <Typography variant="body1" sx={{ textAlign: "justify" }}>
        {summary}
      </Typography>

      <Stack direction={"row"}>
        <Stack direction={"column"}>
          <Typography>{author}</Typography>
          <Stack direction={"row"} gap={1} sx={{ color: "rgb(107, 107, 107)" }}>
            <Typography fontSize={DEFAULT_FONT_SIZE}>{tags}</Typography>
            <Typography fontSize={DEFAULT_FONT_SIZE}>·</Typography>
            <Typography fontSize={DEFAULT_FONT_SIZE}>5 min read</Typography>
            <Typography fontSize={DEFAULT_FONT_SIZE}>·</Typography>
            <Typography fontSize={DEFAULT_FONT_SIZE}>
              {new Date(created).toDateString()}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      {imageUrl ? (
        <Box sx={{ textAlign: "center" }}>
          <Image
            src={imageUrl}
            width={400}
            height={300}
            alt="blog image"
            style={{ borderRadius: "16px" }}
          />
        </Box>
      ) : (
        <Skeleton variant="rectangular" width={400} height={300} />
      )}

      {content ? (
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          style={{ textAlign: "justify" }}
        />
      ) : (
        <Typography>No Content Found</Typography>
      )}
    </Box>
  );
};

export default BlogPost;
