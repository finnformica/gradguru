"use client";

import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";

import { Add } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

import { blogStorage, createBlog } from "api/blog";
import { AddBlogTagModal, CrudBlog } from "components/blog";
import { LoadingScreen } from "components/global";
import { IBlog } from "types/blog";
import { useState } from "react";

const calculateReadTime = (text: string) => {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  return Math.ceil(minutes);
};

const AddBlogForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();
  const [tagModal, setTagModal] = useState(false);

  const onSubmit = (data: IBlog): void => {
    if (!session?.user?.name || !data.heroPhoto) return;

    const { name: author } = session.user;
    const { heroPhoto, ...payload } = data;

    blogStorage(heroPhoto as File, data.title).then((res) => {
      const { imageId, blogSlug } = res;

      const strippedContent = payload.content.replace(/<[^>]*>?/gm, "");

      createBlog(blogSlug, {
        ...payload,
        author,
        heroPhoto: imageId,
        slug: blogSlug,
        readTime: calculateReadTime(strippedContent),
        created: Date.now(),
      })
        .then(() => enqueueSnackbar("Blog has been added"))
        .catch((e) =>
          enqueueSnackbar(`Error adding the blog: ${e.message}`, {
            variant: "error",
          })
        );
    });
  };

  if (!session?.user) return <LoadingScreen />;

  return (
    <>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" gutterBottom>
          Add New Blog Post
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Add />}
          size="medium"
          onClick={() => setTagModal(true)}
        >
          Update Tags
        </Button>
      </Stack>
      <CrudBlog onSubmitBlog={onSubmit} />

      <AddBlogTagModal
        open={tagModal}
        handleClose={() => setTagModal(false)}
        setOpen={setTagModal}
      />
    </>
  );
};

export default AddBlogForm;
