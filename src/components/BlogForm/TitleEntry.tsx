"use client";
import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { LoadingScreen } from "components/global-components";
import _ from "lodash";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import { titleDataProps } from "./types";
import { v4 as uuid } from "uuid";
import { postBlog } from "api/blog";

const TitleEntry = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      date: "",
    },
  });

  if (!session?.user) {
    return <LoadingScreen />;
  }

  const { user } = session;

  const onSubmit = (data: titleDataProps) => {
    const blogSlug = _.kebabCase(data.title);
    const blogPostId = blogSlug + uuid();
    console.log(_.kebabCase(blogPostId));
    postBlog(blogPostId, {
      ...data,
      author: user.name,
      slug: blogSlug,
      date: new Date().toDateString(),
    })
      .then(() =>
        enqueueSnackbar("Success! A new blog post has been initialised")
      )
      .catch((e) =>
        enqueueSnackbar(`Error! Unable to initialise new blog post`, {
          variant: "error",
        })
      );
  };

  return (
    <Container maxWidth="lg" sx={{ height: "100%", mt: 20 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction={"column"}
          spacing={4}
          sx={{
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h4">Please enter a title</Typography>
          <Stack
            direction={"row"}
            spacing={4}
            justifyContent={"space-around"}
            minWidth={"50%"}
          >
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }: any) => (
                <TextField
                  label="New Title..."
                  fullWidth
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={!!error && "Title is required"}
                ></TextField>
              )}
            />
            <Button
              type="submit"
              sx={{
                mt: 2,
                background: theme.palette.primary.main,
                color: "white",
                width: 10,
                "&:hover": { background: theme.palette.primary.dark },
              }}
            >
              Add
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};

export default TitleEntry;
