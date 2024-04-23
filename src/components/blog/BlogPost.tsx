"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "lib/firebase/config";

import { IBlog } from "types/blog";

import "./styles.css";

const BlogPost = ({
  content,
  author,
  created,
  heroPhoto,
  slug,
  summary,
  tags,
  title,
  readTime,
}: IBlog) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const pathReference = ref(storage, `blog/${slug}/${heroPhoto}`);
    getDownloadURL(pathReference)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        setImageUrl(null);
      });
  }, [slug, heroPhoto]);

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
          <Stack direction={"row"} gap={1}>
            <Typography variant="body2">{tags}</Typography>
            <Typography variant="body2">·</Typography>
            <Typography variant="body2">{readTime} min read</Typography>
            <Typography variant="body2">·</Typography>
            <Typography variant="body2" color={"text.secondary"}>
              {new Date(created || "").toDateString()}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            width={400}
            height={300}
            alt="Blog image"
            style={{
              borderRadius: "16px",
              objectFit: "cover",
            }}
          />
        ) : (
          <Skeleton variant="rectangular" width={400} height={300} />
        )}
      </Box>

      {content ? (
        <Box>
          <div className="blog" dangerouslySetInnerHTML={{ __html: content }} />
        </Box>
      ) : (
        <Typography>No Content Found</Typography>
      )}
    </Box>
  );
};

export default BlogPost;
