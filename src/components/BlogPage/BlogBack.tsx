import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BlogBack = () => {
  return (
    <Button sx={{ my: 2 }} href="/blog">
      <ArrowBackIcon />
      Back
    </Button>
  );
};

export default BlogBack;
