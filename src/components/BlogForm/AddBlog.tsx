import { Input, Stack, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddBlog = () => {
  return (
    <form>
      <Stack direction={"column"} spacing={2}>
        <TextField label={"Blog Title"} />
        <TextField label={"Summary"} />
        <Input type={"file"} />
        <ReactQuill theme="snow" />
      </Stack>
    </form>
  );
};

export default AddBlog;
