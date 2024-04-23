"use client";

import { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { getDownloadURL, ref } from "firebase/storage";

import { storage } from "lib/firebase/config";
import { useRouter } from "next/navigation";
import { IBlogCard } from "types/blog";

const BlogCard = ({
  author,
  created,
  imageId,
  slug,
  summary,
  tags,
  title,
}: IBlogCard) => {
  const router = useRouter();
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

  const date = new Date(created).toDateString();

  return (
    <Card>
      <CardActionArea
        sx={{ p: 1 }}
        onClick={() => router.push(`/blog/${slug}`)}
      >
        <Stack direction="row" justifyContent="space-between">
          <CardContent>
            <Typography variant="h6" sx={{ pb: 1 }}>
              {title}
            </Typography>
            <Box
              sx={{
                display: "-webkit-box",
                textAlign: "left",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
              }}
            >
              <Typography variant="body1">{summary}</Typography>
            </Box>
          </CardContent>
          {imageUrl ? (
            <CardMedia
              component="img"
              image={imageUrl}
              alt={imageId}
              sx={{
                mr: 1,
                mt: 2,
                objectFit: "cover",
                width: 200,
                height: 150,
                borderRadius: "16px",
              }}
            />
          ) : (
            <Skeleton variant="rectangular" width={200} height={150} />
          )}
        </Stack>
        <CardActions sx={{ mt: 1, px: 1.5 }}>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack direction={"row"} gap={1}>
              <Typography variant="body2">{author}</Typography>
              <Typography variant="body2">·</Typography>
              <Typography variant="body2" color={"text.secondary"}>
                {date}
              </Typography>
            </Stack>
            <Chip label={tags} variant="outlined" size="small" />
          </Stack>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default BlogCard;
