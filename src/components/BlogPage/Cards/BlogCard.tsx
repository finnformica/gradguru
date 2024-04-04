import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Link,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { initializeApp } from "firebase/app";

import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { config } from "lib/firebase/config";
import { useEffect, useState } from "react";
import { inherits } from "util";

initializeApp(config);

type BlogCardProps = {
  author: string;
  created: number;
  imageId: string;
  slug: string;
  summary: string;
  tags: string;
  title: string;
};

const BlogCard = ({
  author,
  created,
  imageId,
  slug,
  summary,
  tags,
  title,
}: BlogCardProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const storage = getStorage();
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
    <Card sx={{ width: 500 }}>
      <Link color="inherit" underline="none">
        <CardActionArea>
          <CardHeader
            title={title}
            sx={{
              height: 50,
              overflow: "hidden",
            }}
          />
          <Stack direction="row">
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  width: 250,
                  height: 140,
                  textAlign: "justify",
                  overflow: "scroll",
                }}
              >
                {summary}
              </Typography>
            </CardContent>
            {imageUrl ? (
              <CardMedia
                component="img"
                height={140}
                image={imageUrl}
                alt={imageId}
                sx={{ pt: 2 }}
              />
            ) : (
              <Skeleton variant="rectangular" width={345} height={140} />
            )}
          </Stack>
        </CardActionArea>
        <CardActions>
          <Stack direction={"row"} gap={2} sx={{ alignContent: "center" }}>
            <Chip label={author} variant="outlined" color="primary"></Chip>
            <Chip label={tags} variant="outlined" color="primary" />
            <Chip label={date} variant="outlined" color="primary"></Chip>
          </Stack>
        </CardActions>
      </Link>
    </Card>
  );
};

export default BlogCard;
