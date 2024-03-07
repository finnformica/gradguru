import { Button, Stack, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";
import AddBlogForm from "@/components/BlogForm/AddBlogForm";

const page = () => {
  return (
    <>
      <Typography variant="h4" pb={2}>
        Add blog post
      </Typography>
      <Typography variant="h5" pb={2}>
        Card Detials
      </Typography>
      <AddBlogForm />
      <Typography variant="h5" py={2}>
        Blog Details
      </Typography>
    </>
  );
};

export default page;
