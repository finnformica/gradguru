"use client";

import _ from "lodash";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";

import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { createTest, getQuestions, patchQuestion } from "api/tests";
import { LoadingScreen } from "components/global-components";
import { useEffect, useState } from "react";

const SJT_QUESTIONS_PER_TEST = 4;

const AddSJTTest = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [questions, setQuestions] = useState<any[]>([]);
  const { control, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getQuestions("situational-judgement");
      setQuestions(res);
    };

    fetchData();
  }, []);

  const onSubmit = async (data: any) => {
    const uniqueQuestions: string[] = _.uniq(Object.values(data));

    if (uniqueQuestions.length < SJT_QUESTIONS_PER_TEST) {
      enqueueSnackbar(
        "Duplicatations detected, please select unique questions.",
        { variant: "error" }
      );
      return;
    }

    createTest("situational-judgement", { questions: uniqueQuestions })
      .then((id) => {
        // add testId to each question
        uniqueQuestions.forEach((question) =>
          patchQuestion(question, "situational-judgement", { testId: id })
        );
      })
      .then(() => enqueueSnackbar("Test created successfully"))
      .catch((error) =>
        enqueueSnackbar(`Error creating test: ${error}`, { variant: "error" })
      )
      .finally(() => reset()); // TODO: autcomplete label not resetting
  };

  if (!questions) return <LoadingScreen />;

  const options = questions
    .filter((question) => !question.testId)
    .map((question) => ({
      id: question.id,
      label: question.scenario || "No scenario",
    }));

  return (
    <>
      <Typography variant="h4" pb={2}>
        Create Situational Judgement Test
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} pb={2}>
          {_.range(SJT_QUESTIONS_PER_TEST).map((i) => (
            <Controller
              key={i}
              name={i.toString()}
              control={control}
              rules={{ required: true }}
              render={({ field: { value }, fieldState: { error } }) => (
                <Autocomplete
                  fullWidth
                  value={value}
                  options={options}
                  onChange={(_, data) => setValue(i.toString(), data.id)}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={`Question ${i + 1}`}
                      error={!!error}
                      helperText={!!error && "Question is required"}
                    />
                  )}
                />
              )}
            />
          ))}
        </Stack>
        <Button variant="contained" type="submit">
          Create
        </Button>
      </form>
    </>
  );
};

export default AddSJTTest;
