import {
  Box,
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

import { getDownloadURL, getStorage, ref } from "firebase/storage";

import { useEffect, useState } from "react";
import { IBlogCard } from "../../types/blog";

const BlogCard = ({
  author,
  created,
  imageId,
  slug,
  summary,
  tags,
  title,
}: IBlogCard) => {
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
    <Card sx={{ width: 800 }}>
      <Link color="inherit" underline="none" href={`/blog/${slug}`}>
        <CardActionArea sx={{ p: 2 }}>
          <CardHeader
            sx={{ pl: 3 }}
            title={
              <Stack direction={"row"} gap={1}>
                <Typography variant="body2">{author}</Typography>
                <Typography variant="body2">·</Typography>
                <Typography variant="body2" color={"text.secondary"}>
                  {date}
                </Typography>
              </Stack>
            }
          />
          <Stack direction="row" justifyContent={"space-around"}>
            <CardContent>
              <Typography variant="h6" sx={{ pb: 1 }}>
                {title}
              </Typography>
              <Box
                sx={{
                  width: 500,
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
        </CardActionArea>
      </Link>
      <CardActions sx={{ p: 3, pl: 4 }}>
        <Stack direction={"row"} gap={2} sx={{ alignContent: "center" }}>
          <Chip label={tags} variant="outlined" color="primary" />
        </Stack>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
