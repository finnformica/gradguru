"use client";

import {
  Autocomplete,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
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
import { useState } from "react";
import BlogPost from "./BlogPost";

type addBlogProps = {
  onSubmitBlog: (data: IBlog) => void;
  defaultValues?: IBlog;
};

const CrudBlog = ({ onSubmitBlog, defaultValues }: addBlogProps) => {
  // TODO: react-quill throwing error with SSR
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const [reviewBlog, setReviewBlog] = useState(false);

  const dv2 = {
    title: "",
    summary: "",
    tag: "",
    content: "",
    heroPhoto: null,
  };

  const { control, handleSubmit, reset, setValue, watch, getValues } =
    useForm<IBlog>({
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

  const renderFormInputs = () => (
    <Stack direction={"column"} spacing={2} pt={5}>
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
        name="tag"
        control={control}
        rules={{ required: false }}
        render={({ field, fieldState: { error } }: any) => (
          <Autocomplete
            id="tag"
            fullWidth
            value={field.value}
            options={tagOptions}
            onChange={(_, data) => {
              setValue("tag", data);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Tag" size="small" error={!!error} />
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
      <Button
        variant="contained"
        onClick={() => {
          window.scrollTo(0, 0); // scroll to top of page
          setReviewBlog(true);

          // prevent <br> tags from constantly being added
          setValue(
            "content",
            getValues("content").replace(/(<p><br><\/p>)+/g, "<p><br></p>")
          );
        }}
      >
        Review
      </Button>
    </Stack>
  );

  const renderReview = () => (
    <Box>
      <Typography variant="h4" color="error" py={2}>
        Review Blog
      </Typography>
      <BlogPost {...getValues()} />
      <Stack direction="row" spacing={2} py={2}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            window.scrollTo(0, 0);
            setReviewBlog(false);
          }}
        >
          Edit
        </Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Stack>
    </Box>
  );

  if (!session) return <LoadingScreen />;

  return (
    <Container maxWidth="md">
      <form
        onSubmit={handleSubmit((data: any) => {
          setReviewBlog(false);
          onSubmit(data);
        })}
      >
        {!reviewBlog ? renderFormInputs() : renderReview()}
      </form>
    </Container>
  );
};

export default CrudBlog;
