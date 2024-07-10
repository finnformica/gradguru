"use client";

import _ from "lodash";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";
import { useState } from "react";

import { Add } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

import { createBlog } from "api/blog";
import { AddBlogTagModal } from "components/blog";
import { LoadingScreen } from "components/global";
import { useSession } from "context/user";
import { fileStorage } from "lib/firebase/utils";
import { IBlog } from "types/blog";
import { endpoints } from "utils/axios";

// react-quill throwing error with SSR
const CrudBlog = dynamic(() => import("components/blog/CrudBlog"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

const calculateReadTime = (text: string) => {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  return Math.ceil(minutes);
};

const removeEmojis = (text: string) =>
  text.replace(
    /[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2580-\u27BF]|\uD83E[\uDD10-\uDDFF]|/g,
    ""
  );

const sanitiseSlug = (text: string) =>
  removeEmojis(text).replace(/[^\w\s]/gi, ""); // remove special characters

const AddBlogForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSession();
  const [tagModal, setTagModal] = useState(false);

  const onSubmit = (data: IBlog): void => {
    if (!user?.displayName || !data.heroPhoto) {
      enqueueSnackbar("Invalid data, please try again.", { variant: "error" });
      return;
    }

    const { displayName: author } = user;
    const { heroPhoto, title, ...payload } = data;

    const slug = _.kebabCase(sanitiseSlug(title));

    fileStorage(heroPhoto as File, `${endpoints.storage.blog}/${slug}`).then(
      (heroPhoto) => {
        const strippedContent = payload.content.replace(/<[^>]*>?/gm, "");

        createBlog(slug, {
          ...payload,
          title,
          author,
          heroPhoto: heroPhoto,
          slug,
          readTime: calculateReadTime(strippedContent),
          created: Date.now(),
        })
          .then(() => enqueueSnackbar("Blog has been added"))
          .catch((e) =>
            enqueueSnackbar(`Error adding the blog: ${e.message}`, {
              variant: "error",
            })
          );
      }
    );
  };

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
