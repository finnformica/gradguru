import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "lib/firebase/config";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IBlog } from "./types";

const chosenFontSize = 14;

const BlogPost = ({
  author,
  created,
  imageId,
  slug,
  content,
  tags,
  title,
}: IBlog) => {
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
        px: 8,
        textAlign: "left",
      }}
    >
      <Typography variant="h3">{title}</Typography>
      <Stack direction={"row"}>
        <Stack direction={"column"}>
          <Typography>{author}</Typography>
          <Stack direction={"row"} gap={1} sx={{ color: "rgb(107, 107, 107)" }}>
            <Typography fontSize={chosenFontSize}>{tags}</Typography>
            <Typography fontSize={chosenFontSize}>·</Typography>
            <Typography fontSize={chosenFontSize}>5 min read</Typography>
            <Typography fontSize={chosenFontSize}>·</Typography>
            <Typography fontSize={chosenFontSize}>
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
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <Typography>No Content Found</Typography>
      )}
    </Box>
  );
};

export default BlogPost;
