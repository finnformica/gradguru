"use client";

import { Delete } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { blogStorage, postBlog } from "api/blog";
import { LoadingScreen } from "components/global-components";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import { modules } from "./constants";
import { BlogForm, IBlogPage } from "../../types/blog";
import { getDownloadURL, ref } from "firebase/storage";
import { set } from "lodash";
import { storage } from "lib/firebase/config";

const tagOptions = ["Finance", "Jobs", "Education"];

type addBlogProps = {
  storedBlog?: IBlogPage;
};

const AddBlog = ({ storedBlog }: addBlogProps) => {
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const [content, setContent] = useState("");
  const [heroPhoto, setHeroPhoto] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const deafultText = storedBlog ? storedBlog.content : "";
    setContent(deafultText);
    if (!storedBlog) return;
    const pathReference = ref(
      storage,
      `blog/${storedBlog.slug}/${storedBlog.imageId}`
    );
    getDownloadURL(pathReference)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        setImageUrl(null);
      });
  }, []);

  const deafultTitle = storedBlog ? storedBlog.title : "";
  const deafultSummary = storedBlog ? storedBlog.summary : "";
  const deafulTags = storedBlog ? storedBlog.tags : "";

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      title: deafultTitle,
      summary: deafultSummary,
      tags: deafulTags,
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      setHeroPhoto(files[0]);
    } else {
      enqueueSnackbar("No file selected.", { variant: "error" });
    }
  };

  const handleClearChange = () => {
    setHeroPhoto(null);
  };

  if (!session?.user) {
    return <LoadingScreen />;
  }
  const { user } = session;

  const onSubmit = (data: BlogForm) => {
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
            rules={{ required: false }}
            render={({ field, fieldState: { error } }: any) => (
              <Autocomplete
                id="tags"
                fullWidth
                value={field.value}
                options={tagOptions}
                onChange={(_, data) => {
                  setValue("tags", data);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tags"
                    size="small"
                    error={!!error}
                  />
                )}
              />
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
                multiline
                error={!!error}
                helperText={!!error && "A Summary is required"}
                value={value}
                size="small"
              />
            )}
          />

          {heroPhoto ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Image
                src={URL.createObjectURL(heroPhoto)}
                width={400}
                height={300}
                alt="Selected hero photo"
                style={{
                  borderRadius: "12px",
                }}
              />
              <Typography variant="body1">{heroPhoto.name}</Typography>
              <Tooltip title="Clear Image">
                <IconButton onClick={handleClearChange}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <TextField
              type={"file"}
              size="small"
              onChange={handleImageChange}
            />
          )}

          <Box>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={(newValue) => setContent(newValue)}
              modules={modules}
            />
          </Box>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default AddBlog;
