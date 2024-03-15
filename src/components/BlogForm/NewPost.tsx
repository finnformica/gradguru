"use client"; // needed for useform
import { Button, Stack, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { postBlog } from "@/api/blog";
import { LoadingScreen } from "../global-components";
import { DataProps } from "./types";
import { storage } from "@/firebase/config";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const NewPost = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      body: "",
      tags: "",
    },
  });
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      setImageUpload(files[0]);
    } else {
      console.error("No file selected.");
    }
  };

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `blog/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      enqueueSnackbar("Image has been added");
    });
  };

  if (!session?.user) {
    return <LoadingScreen />;
  }
  const { user } = session;

  const onSubmit = (data: DataProps) => {
    postBlog(null, {
      ...data,
      author: user.name,
      date: new Date().toDateString(),
      authorId: user.id,
    })
      .then(() => enqueueSnackbar("Post has been added"))
      .catch((e) => enqueueSnackbar(`Error adding the post: ${e.message}`))
      .finally(() => reset());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={2} py={2}>
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({
            field: { onChange, value },
            fieldState: { error },
          }: any) => (
            <TextField
              fullWidth
              label="Title"
              multiline
              minRows={1}
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={!!error && "Title is required"}
              size="small"
            />
          )}
        />

        <Controller
          name="body"
          control={control}
          rules={{ required: true }}
          render={({
            field: { onChange, value },
            fieldState: { error },
          }: any) => (
            <TextField
              fullWidth
              label="Body"
              multiline
              minRows={5}
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={!!error && "Body text is required"}
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
              fullWidth
              label="Tags"
              multiline
              minRows={1}
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={!!error && "A Tag is required"}
              size="small"
            />
          )}
        />

        <input type="file" onChange={handleImageChange} />

        <button onClick={uploadImage}>Upload Image</button>

        <Button type="submit" variant="contained" sx={{ mb: "20px" }}>
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default NewPost;
