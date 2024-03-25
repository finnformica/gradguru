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

  const onSubmit = (data: titleDataProps) =>
    console.log(_.kebabCase(data.title));

  return (
    // <div>Hello world</div>
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
