import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

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
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
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
