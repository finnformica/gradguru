"use client";

import {
  Box,
  Button,
  Container,
  Input,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { useSnackbar } from "notistack";
import { addFormData } from "./types";
import { blogStorage, postBlog } from "api/blog";
import { LoadingScreen } from "components/global-components";
import { useSession } from "next-auth/react";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ],
};

const tagOptions = ["Finance", "Jobs", "Education", "Loose Cannon"];

const AddBlog = () => {
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const [mdxDoc, setMdxDox] = useState("");
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      summary: "",
      tags: "",
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      setImageUpload(files[0]);
      enqueueSnackbar("Image Selected");
    } else {
      enqueueSnackbar("No file selected.", { variant: "error" });
    }
  };

  if (!session?.user) {
    return <LoadingScreen />;
  }
  const { user } = session;

  const onSubmit = (data: addFormData) => {
    if (!imageUpload) {
      return enqueueSnackbar("No here image selected.", { variant: "error" });
    }
    let imageId;
    let blogSlug;
    blogStorage(imageUpload, data.title).then((res) => {
      ({ imageId, blogSlug } = res);
      postBlog(null, {
        ...data,
        author: user.name,
        date: new Date().toDateString(),
        authorId: user.id,
        imageId: imageId,
        slug: blogSlug,
      })
        .then(() => enqueueSnackbar("Blog card has been added"))
        .catch((e) =>
          enqueueSnackbar(`Error adding the blog card: ${e.message}`, {
            variant: "error",
          })
        )
        .finally(() => {
          reset();
          setImageUpload(null);
        });
    });
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"column"} spacing={2} py={5}>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({
              field: { onChange, value },
              fieldState: { error },
            }: any) => (
              <TextField
                onChange={onChange}
                value={value}
                label={"Blog Title"}
                error={!!error}
                helperText={!!error && "A title is required"}
                size="small"
              />
            )}
          />
          <Controller
            name="tags"
            control={control}
            rules={{ required: true }}
            render={({
              field: { onChange, value },
              fieldState: { error },
            }: any) => (
              <TextField
                label="Tags"
                size="small"
                select
                fullWidth
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={!!error && "A Tag is required"}
              >
                {tagOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="summary"
            control={control}
            rules={{ required: true }}
            render={({
              field: { onChange, value },
              fieldState: { error },
            }: any) => (
              <TextField
                label={"Summary"}
                onChange={onChange}
                error={!!error}
                helperText={!!error && "A Summary is required"}
                value={value}
                size="small"
              />
            )}
          />

          <Input type={"file"} onChange={handleImageChange} />

          <Box
            sx={{
              border: "1px solid black",
              minHeight: 200,
              p: 2,
              borderRadius: "4px",
            }}
          >
            <ReactQuill
              theme="snow"
              value={mdxDoc}
              onChange={setMdxDox}
              // modules={modules}
            />
          </Box>
          <Button size="small" type="submit">
            Add
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default AddBlog;
