import { Typography } from "@mui/material";
import NewCard from "components/BlogForm/NewCard";
import NewPost from "components/BlogForm/NewPost";

const page = () => {
  return (
    <>
      <Typography variant="h4" pb={2}>
        Add blog post
      </Typography>
      <Typography variant="h5" pb={2}>
        Card Details
      </Typography>
      <NewCard />
      <Typography variant="h5" py={2}>
        Blog Builder
      </Typography>
      <NewPost />
    </>
  );
};

export default page;
