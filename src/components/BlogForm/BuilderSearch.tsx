"use client";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Container,
  IconButton,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";

const BlogBlocks = ["Text", "Image", "Video", "Table"];

const BuilderSearch = () => {
  const theme = useTheme();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      addingBlock: "",
    },
  });

  const onsubmit = () => {
    console.log("value");
  };
  return (
    <Stack direction="row" spacing={5} alignItems={"center"}>
      <Container maxWidth="xs">
        <form>
          <Controller
            name="addingBlock"
            control={control}
            rules={{ required: true }}
            render={({
              field: { onChange, value },
              fieldState: { error },
            }: any) => (
              <TextField
                select
                onChange={onChange}
                value={value}
                error={!!error}
                helperText={!!error && "Title is required"}
                fullWidth
                label="What would you like to add?"
                sx={{ my: 2 }}
              >
                {BlogBlocks.map((block) => (
                  <MenuItem key={block} value={block}>
                    {block}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </form>
      </Container>

      <IconButton
        sx={{ borderRadius: 5, backgroundColor: theme.palette.primary.main }}
        onClick={onsubmit}
      >
        <Box
          sx={{
            display: "flex",
            p: 1,
            gap: 2,
          }}
        >
          <Typography color={"white"}>Add</Typography>
          <AddIcon sx={{ color: "white" }} />
        </Box>
      </IconButton>
    </Stack>
  );
};

export default BuilderSearch;
