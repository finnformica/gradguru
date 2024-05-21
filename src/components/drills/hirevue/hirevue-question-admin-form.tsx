"use client";

import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { getHirevueQuestionTypes } from "api/drills";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IHirevueQuestion } from "types/hirevue";

type HirevueQuestionAdminFormProps = {
  onSubmit: (data: any) => Promise<string | number>;
  defaultValues?: IHirevueQuestion;
};

const HirevueQuestionAdminForm = ({
  onSubmit,
  defaultValues,
}: HirevueQuestionAdminFormProps) => {
  const [options, setOptions] = useState([]);

  const { handleSubmit, control, setValue, reset } = useForm<IHirevueQuestion>({
    defaultValues: defaultValues || {
      question: "",
      explanation: "",
      modelAnswer: "",
      type: "",
    },
  });

  useEffect(() => {
    const fetchTypes = async () => {
      const res = await getHirevueQuestionTypes("consulting");
      setOptions(res?.types || []);
    };

    fetchTypes();
  }, []);

  const submitWithReset = (data: any) => onSubmit(data).finally(() => reset());

  return (
    <form onSubmit={handleSubmit(submitWithReset)}>
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
