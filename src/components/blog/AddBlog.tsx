"use client";

import {
  Autocomplete,
  Box,
  Button,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AddingHeroImage from "./AddingHeroImage";
import { modules, tagOptions } from "./constants";
import { LoadingScreen } from "components/global-components";
import { IBlog } from "types/blog";

type addBlogProps = {
  onSubmitBlog: (data: IBlog) => Promise<void>;
};

const AddBlog = ({ onSubmitBlog }: addBlogProps) => {
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const [heroPhoto, setHeroPhoto] = useState<File | null>(null);

  const { control, handleSubmit, reset, setValue } = useForm<IBlog>({
    defaultValues: {
      title: "",
      summary: "",
      tags: "",
      content: "",
      blogHeroPhoto: null,
    },
  });

  const handleClearChange = () => {
    setHeroPhoto(null);
    setValue("blogHeroPhoto", null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      setHeroPhoto(files[0]);
      setValue("blogHeroPhoto", files[0]);
    } else {
      enqueueSnackbar("No file selected.", { variant: "error" });
    }
  };

  const onSubmit = (data: IBlog) => {
    onSubmitBlog(data).finally(() => {
      reset();
      setHeroPhoto(null);
    });
  };

  if (!session) return <LoadingScreen />;

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
                label={"Title"}
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

          {heroPhoto ? (
            <AddingHeroImage
              handleClearChange={handleClearChange}
              photoFile={heroPhoto}
            />
          ) : (
            <Controller
              name="blogHeroPhoto"
              control={control}
              rules={{ required: true }}
              render={({ field: { value }, fieldState: { error } }: any) => (
                <TextField
                  type={"file"}
                  value={value}
                  error={!!error}
                  helperText={!!error && "A hero image is required"}
                  size="small"
                  onChange={handleImageChange}
                />
              )}
            />
          )}
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

          <Box>
            <Controller
              name="content"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }: any) => (
                <ReactQuill
                  theme="snow"
                  value={value}
                  onChange={onChange}
                  modules={modules}
                />
              )}
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
