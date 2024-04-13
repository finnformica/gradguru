"use client";

import {
  Autocomplete,
  Box,
  Button,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { addBlog, blogStorage, deleteBlogStorage } from "api/blog";
import { LoadingScreen } from "components/global-components";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "lib/firebase/config";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import { BlogForm, IBlogPage } from "../../types/blog";
import AddingHeroImage from "./AddingHeroImage";
import HeroStringImage from "./HeroStringImage";
import { modules } from "./constants";

const tagOptions = ["Finance", "Jobs", "Education"];

type addBlogProps = {
  storedBlog?: IBlogPage;
  handleClose?: () => void;
};

const CreateBlog = ({ storedBlog, handleClose }: addBlogProps) => {
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const [content, setContent] = useState("");
  const [heroPhoto, setHeroPhoto] = useState<File | string | null>(null);

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
        setHeroPhoto(url);
      })
      .catch((error) => {
        setHeroPhoto(null);
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

    const authorName = user.name ? user.name : "Error";

    if (storedBlog && handleClose) {
      if (typeof heroPhoto === "string") {
        addBlog(storedBlog.slug, {
          ...data,
          author: authorName,
          imageId: storedBlog.imageId,
          slug: storedBlog.slug,
          content: content,
        })
          .then(() => enqueueSnackbar("Blog card has been updated"))
          .catch((e) =>
            enqueueSnackbar(`Error updating the blog card: ${e.message}`, {
              variant: "error",
            })
          )
          .finally(() => {
            handleClose();
            setHeroPhoto(null);
            setContent("");
          });
      }
      if (heroPhoto instanceof File) {
        let imageId;
        let blogSlug;
        deleteBlogStorage(storedBlog.imageId, storedBlog.slug).then(() =>
          blogStorage(heroPhoto, data.title).then((res) => {
            ({ imageId, blogSlug } = res);
            addBlog(blogSlug, {
              ...data,
              author: authorName,
              imageId: imageId,
              slug: blogSlug,
              content: content,
            })
              .then(() => enqueueSnackbar("Blog card has been updated"))
              .catch((e) =>
                enqueueSnackbar(`Error updating the blog card: ${e.message}`, {
                  variant: "error",
                })
              )
              .finally(() => {
                handleClose();
                setHeroPhoto(null);
                setContent("");
              });
          })
        );
      }
    }

    if (heroPhoto instanceof File && !storedBlog) {
      let imageId;
      let blogSlug;

      blogStorage(heroPhoto, data.title).then((res) => {
        ({ imageId, blogSlug } = res);
        addBlog(blogSlug, {
          ...data,
          author: authorName,
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
    }
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
          {typeof heroPhoto === "string" ? (
            <HeroStringImage
              handleClearChange={handleClearChange}
              ImageUrl={heroPhoto}
              blogSlug={storedBlog?.slug}
            />
          ) : heroPhoto instanceof File ? (
            <AddingHeroImage
              handleClearChange={handleClearChange}
              photoFile={heroPhoto}
            />
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

export default CreateBlog;
