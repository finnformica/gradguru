"use client";

import {
  Autocomplete,
  Box,
  Button,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingScreen } from "components/global-components";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IBlog } from "types/blog";
import AddingHeroImage from "./AddingHeroImage";
import { modules, tagOptions } from "./constants";

type addBlogProps = {
  onSubmitBlog: (data: IBlog) => void;
  defaultValues?: IBlog;
};

const CrudBlog = ({ onSubmitBlog, defaultValues }: addBlogProps) => {
  // TODO: react-quill throwing error with SSR
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();

  const dv2 = {
    title: "",
    summary: "",
    tags: "",
    content: "",
    heroPhoto: null,
  };

  const { control, handleSubmit, reset, setValue, watch } = useForm<IBlog>({
    defaultValues: defaultValues || dv2,
  });

  const blogHeroPhoto = watch("heroPhoto");

  const handleClearChange = () => {
    setValue("heroPhoto", null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      setValue("heroPhoto", files[0]);
    } else {
      enqueueSnackbar("No file selected.", { variant: "error" });
    }
  };

  const onSubmit = (data: IBlog) => {
    onSubmitBlog(data);
    reset();
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

          {blogHeroPhoto ? (
            <AddingHeroImage
              handleClearChange={handleClearChange}
              photoFile={blogHeroPhoto as File}
            />
          ) : (
            <Controller
              name="heroPhoto"
              control={control}
              rules={{ required: true }}
              render={({ field: { value }, fieldState: { error } }: any) => (
                <TextField
                  type={"file"}
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

export default CrudBlog;
