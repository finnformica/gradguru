"use client"; // needed for useform
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { postBlog } from "../../api/blog";
import { useSession } from "next-auth/react";
import { DataProps } from "./types";

const NewPost = () => {
  const { data: session } = useSession();
  const user = session?.user.name as string;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      author: "",
      title: "",
      body: "",
      date: "",
      tags: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit((formdata) => {
        AddAndSubmit(formdata, user);
      })}
    >
      <Typography variant="h6" sx={{ mb: "20px" }}>
        {user}
      </Typography>
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

        <Button type="submit" variant="contained" sx={{ mb: "20px" }}>
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default NewPost;

const AddAndSubmit = (data: DataProps, user: string) => {
  let postDate = new Date().toDateString();
  data.author = user;
  data.date = postDate;
  postBlog(null, data);
};
