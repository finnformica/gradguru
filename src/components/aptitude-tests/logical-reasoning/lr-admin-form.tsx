"use client";

import { Button, Card, MenuItem, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import SquareGrid from "./square-grid";
import TriangleGrid from "./triangle-grid";

type LRQuestionFormProps = {
  onSubmit: (data: any) => void;
};

const LRQuestionForm = ({ onSubmit }: LRQuestionFormProps) => {
  const { control, handleSubmit } = useForm();

  const testSubmit = (data: any) => {
    console.log("LR question submitted", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(testSubmit)}>
        <Controller
          name="grid.type"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              select
              {...field}
              sx={{ width: 200 }}
              label="Grid type"
              size="small"
              error={!!error}
              helperText={!!error && "Grid type is required"}
            >
              <MenuItem value="triangle">Triangle</MenuItem>
              <MenuItem value="square">Square</MenuItem>
            </TextField>
          )}
        />

        <Controller
          name="grid.template"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              select
              {...field}
              sx={{ width: 200 }}
              label="Template"
              size="small"
              error={!!error}
              helperText={!!error && "Template is required"}
            >
              <MenuItem value="3x3">3 x 3</MenuItem>
              <MenuItem value="5x1">5 x 1</MenuItem>
              <MenuItem value="4x1">4 x 1</MenuItem>
              <MenuItem value="3x1">3 x 1</MenuItem>
            </TextField>
          )}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>

      <Stack direction="column" spacing={2}>
        <Card sx={{ p: 2 }}>
          <TriangleGrid />
        </Card>
        <Card sx={{ p: 2 }}>
          <SquareGrid numRows={4} />
        </Card>
      </Stack>
    </>
  );
};

export default LRQuestionForm;
