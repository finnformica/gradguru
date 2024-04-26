"use client";

import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { IHirevueQuestion } from "types/hirevue";

const options = ["Personal", "Leadership", "Kindness", "Teamwork"];

type HirevueQuestionAdminFormProps = {
  onSubmit: (data: any) => void;
  defaultValues?: IHirevueQuestion;
};

const HirevueQuestionAdminForm = ({
  onSubmit,
  defaultValues,
}: HirevueQuestionAdminFormProps) => {
  const { handleSubmit, control, setValue } = useForm<IHirevueQuestion>({
    defaultValues: defaultValues || {
      question: "",
      explanation: "",
      modelAnswer: "",
      type: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} py={2}>
        <Controller
          name="type"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }: any) => (
            <Autocomplete
              id="type"
              sx={{ width: 200 }}
              value={field.value}
              options={options}
              onChange={(_, data) => setValue("type", data)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Type"
                  size="small"
                  error={!!error}
                  helperText={!!error && "Question type is required"}
                />
              )}
            />
          )}
        />

        <Controller
          name="question"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              {...field}
              label="Question"
              error={!!error}
              helperText={!!error && "Question is required"}
            />
          )}
        />

        <Controller
          name="explanation"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              {...field}
              label="Explanation"
              error={!!error}
              multiline
              minRows={4}
              helperText={!!error && "Explanation is required"}
            />
          )}
        />

        <Controller
          name="modelAnswer"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              {...field}
              label="Modal Answer"
              error={!!error}
              multiline
              minRows={4}
              helperText={!!error && "Answer is required"}
            />
          )}
        />
      </Stack>
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default HirevueQuestionAdminForm;
