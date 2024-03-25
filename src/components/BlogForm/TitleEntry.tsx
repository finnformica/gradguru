"use client";
import {
  Container,
  Typography,
  TextField,
  Box,
  Button,
  useTheme,
  Stack,
} from "@mui/material";
import { LoadingScreen } from "components/global-components";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const TitleEntry = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { data: session } = useSession();
  //   const [title, setTitle] = useState<String | null>(null);

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

  const onSubmit = () => console.log("hellow world");

  return (
    // <div>Hello world</div>
    <Container maxWidth="sm" sx={{ height: "100%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alightContent: "center",
            textAlign: "center",
            height: "100%",
            gap: 4,
            border: "1px solid red",
          }}
        >
          <Typography variant="h4">Please enter a title</Typography>
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
              "&:hover": { background: theme.palette.primary.dark },
            }}
          >
            Add
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default TitleEntry;
