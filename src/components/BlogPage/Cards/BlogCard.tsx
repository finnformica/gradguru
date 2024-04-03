import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import { initializeApp } from "firebase/app";

import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { config } from "lib/firebase/config";
import { useEffect, useState } from "react";

const app = initializeApp(config);

type BlogCardProps = {
  author: string;
  content: string;
  created: number;
  imageId: string;
  slug: string;
  summary: string;
  tags: string;
  title: string;
  borderColor: string;
};

const BlogCard = ({
  author,
  content,
  created,
  imageId,
  slug,
  summary,
  tags,
  title,
  borderColor,
}: BlogCardProps) => {
  // Create a reference with an initial file path and name

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

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        {imageUrl ? (
          <CardMedia
            component="img"
            height="140"
            image={imageUrl}
            alt={imageId}
          />
        ) : (
          <Skeleton variant="rectangular" width={210} height={118} />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {summary}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {tags}
        </Button>
      </CardActions>
    </Card>

    // <Box
    //   sx={{
    //     display: "flex",
    //     mx: "10px",
    //     px: "20px",
    //     py: "50px",
    //     justifyContent: "space-between",
    //     borderBottom: `1px solid ${borderColor}`,
    //     "&:hover": {
    //       cursor: "pointer",
    //     },
    //   }}
    // >
    //   <Box>
    //     <Box id={slug} sx={{ display: "flex", gap: 1 }}>
    //       <Typography fontSize={14} fontWeight={400}>
    //         {author}
    //       </Typography>
    //       <Typography fontSize={14}>|</Typography>
    //       <Typography
    //         fontSize={14}
    //         fontWeight={400}
    //         sx={{ color: "rgb(107, 107, 107)" }}
    //       >
    //         {created}
    //       </Typography>
    //     </Box>
    //     <Typography variant="h5" fontWeight={700} fontSize={20}>
    //       {title}
    //     </Typography>
    //     <Typography>{summary}</Typography>
    //     <Box sx={{ display: "flex", mt: "20px", gap: 1 }}>
    //       <Typography
    //         fontSize={13}
    //         fontWeight={400}
    //         sx={{
    //           backgroundColor: "lightgrey",
    //           py: "1px",
    //           px: "6px",
    //           borderRadius: "16px",
    //         }}
    //       >
    //         {tags}
    //       </Typography>
    //     </Box>
    //   </Box>
    // </Box>
  );
};

export default BlogCard;
