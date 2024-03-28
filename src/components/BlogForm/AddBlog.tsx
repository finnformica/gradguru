"use client";

import {
  Box,
  Button,
  Container,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { blogStorage, postBlog } from "api/blog";
import { LoadingScreen } from "components/global-components";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import { addFormData } from "./types";
import { modules } from "./modulesRQ";

const tagOptions = ["Finance", "Jobs", "Education"];

const AddBlog = () => {
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const [content, setContent] = useState("");
  const [heroPhoto, setHeroPhoto] = useState<File | null>(null);
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
      setHeroPhoto(files[0]);
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
    if (!heroPhoto) {
      return enqueueSnackbar("No here image selected.", { variant: "error" });
    }
    let imageId;
    let blogSlug;

    blogStorage(heroPhoto, data.title).then((res) => {
      ({ imageId, blogSlug } = res);
      postBlog(blogSlug, {
        ...data,
        author: user.name,
        date: new Date().toDateString(),
        imageId: imageId,
        slug: blogSlug,
        content: content,
      })
        .then(() => enqueueSnackbar("Blog card has been added"))
        .catch((e) =>
          enqueueSnackbar(`Error adding the blog card: ${e.message}`, {
            variant: "error",
          })
        )
        .finally(() => {
          reset();
          setHeroPhoto(null);
          setContent("");
        });
    });
  };

  // const onSubmit = (data: addFormData) => {
  //   console.log(data.heroPhoto);
  // };

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

          <TextField type={"file"} size="small" onChange={handleImageChange} />

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
              value={content}
              onChange={(newValue) => setContent(newValue)}
              modules={modules}
            />
          </Box>
          <Button
            // size="small"
            type="submit"
            variant="contained"
            color="primary"
          >
            submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default AddBlog;