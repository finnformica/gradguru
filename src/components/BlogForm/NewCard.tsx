"use client"; // needed for useform
import {
  Box,
  Button,
  Container,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { postBlog } from "api/blog";
import { fileStorage } from "lib/firebase/utils";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { endpoints } from "utils/axios";
import { LoadingScreen } from "../global-components";
import { tagOptions } from "./blogArrays";
import { DataProps } from "./types";

const NewCard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      desc: "",
      tags: "",
    },
  });

  const [imageUpload, setImageUpload] = useState<File | null>(null);

  if (!session?.user) {
    return <LoadingScreen />;
  }
  const { user } = session;

  const onSubmit = (data: DataProps) => {
    if (!imageUpload) {
      return enqueueSnackbar("No file selected.", { variant: "error" });
    }
    const imageId = fileStorage(imageUpload, endpoints.admin.storage.blog)
      .then(() => enqueueSnackbar("Image Uploaded"))
      .catch(() =>
        enqueueSnackbar("Image Upload Failed", {
          variant: "error",
        })
      )
      .finally(() => setImageUpload(null));

    postBlog(null, {
      ...data,
      author: user.name,
      date: new Date().toDateString(),
      authorId: user.id,
      imageId: imageId,
    })
      .then(() => enqueueSnackbar("Blog Card has been added"))
      .catch((e) =>
        enqueueSnackbar(`Error adding the blog card: ${e.message}`, {
          variant: "error",
        })
      )
      .finally(() => reset());
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      setImageUpload(files[0]);
      enqueueSnackbar("Image Selected");
    } else {
      enqueueSnackbar("No file selected.", { variant: "error" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={2} py={2}>
        <Box
          sx={{
            display: "flex column",
            flex: "space-between",
            border: "solid black 2px",
            borderRadius: "14px",
          }}
        >
          <Container>
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
                  sx={{ my: "10px" }}
                />
              )}
            />

            <Controller
              name="desc"
              control={control}
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }: any) => (
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  minRows={5}
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={!!error && "Body text is required"}
                  size="small"
                  sx={{ my: "10px" }}
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
                  select
                  fullWidth
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={!!error && "A Tag is required"}
                  size="small"
                  sx={{ my: "10px" }}
                >
                  {tagOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Container>
        </Box>

        <input type="file" onChange={handleImageChange} />

        <Button type="submit" variant="contained" sx={{ mb: "20px" }}>
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default NewCard;
