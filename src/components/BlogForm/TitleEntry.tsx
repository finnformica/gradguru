"use client";
import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { postBlog } from "api/blog";
import { LoadingScreen } from "components/global-components";
import _ from "lodash";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";

const TitleEntry = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      date: "",
    },
  });

  if (!session?.user) {
    return <LoadingScreen />;
  }

  const { user } = session;

  const onSubmit = (data: { title: string }) => {
    const blogSlug = _.kebabCase(data.title);
    postBlog(blogSlug, {
      ...data,
      author: user.name,
      date: new Date().toDateString(),
    })
      .then(() => {
        enqueueSnackbar("Successfully created a new blog post");
      })
      .catch((e) =>
        enqueueSnackbar(`Failed to make a new blog post`, {
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
          <Typography variant="h4">Title</Typography>
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
                  label="New Title"
                  fullWidth
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={!!error && "Title is required"}
                />
              )}
            />
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};

export default TitleEntry;
