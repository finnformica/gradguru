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

const NR_GRAPH_QUESTIONS_PER_TEST = 1;
const NR_TABLE_QUESTIONS_PER_TEST = 1;
const NR_GMAT_QUESTIONS_PER_TEST = 2;
const NR_QUESTIONS_PER_TEST =
  NR_GMAT_QUESTIONS_PER_TEST +
  NR_GRAPH_QUESTIONS_PER_TEST +
  NR_TABLE_QUESTIONS_PER_TEST;

type renderInputProps = {
  title: string;
  options: any[];
  numQuestions: number;
  control: any;
  setValue: (index: string, id: string) => void;
};

const renderInput = ({
  title,
  options,
  numQuestions,
  control,
  setValue,
}: renderInputProps) => (
  <>
    <Typography variant="h5" pb={2}>
      {title}
    </Typography>
    <Stack spacing={2} pb={2}>
      {_.range(numQuestions).map((i) => (
        <Controller
          key={i}
          name={`${title.toLowerCase()}.${i}`}
          control={control}
          rules={{ required: true }}
          render={({ field: { value }, fieldState: { error } }) => (
            <Autocomplete
              fullWidth
              value={value}
              options={options}
              onChange={(_, data) =>
                setValue(`${title.toLowerCase()}.${i}`, data.id)
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionKey={(option) => option.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={`${title} Question ${i + 1}`}
                  error={!!error}
                  helperText={!!error && "Question is required"}
                />
              )}
            />
          )}
        />
      ))}
    </Stack>
  </>
);

const AddNRTest = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [questions, setQuestions] = useState<any[]>([]);
  const { control, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getQuestions("numerical-reasoning");
      setQuestions(res);
    };

    fetchData();
  }, []);

  const onSubmit = async (data: any) => {
    const uniqueQuestions = _.uniq(Object.values(data).flat()) as string[];

    if (uniqueQuestions.length < NR_QUESTIONS_PER_TEST) {
      enqueueSnackbar(
        "Duplicatations detected, please select unique questions.",
        { variant: "error" }
      );
      return;
    }

    createTest("numerical-reasoning", { questions: data })
      .then((id) => {
        // add testId to each question
        uniqueQuestions.forEach((question) =>
          patchQuestion(question, "numerical-reasoning", { testId: id })
        );
      })
      .then(() => enqueueSnackbar("Test created successfully"))
      .catch((error) =>
        enqueueSnackbar(`Error creating test: ${error}`, { variant: "error" })
      )
      .finally(() => reset()); // TODO: autcomplete label not resetting
  };

  if (!questions) return <LoadingScreen />;

  const available = questions.filter((question) => !question.testId);

  const gmatOptions = available
    .filter((q) => q.type === "gmat")
    .map((question) => ({
      id: question.id,
      label: question.question || "No question",
    }));

  const graphOptions = available
    .filter((q) => q.type === "graph")
    .map((question) => ({
      id: question.id,
      label: question.scenario || "No scenario",
    }));

  const tableOptions = available
    .filter((q) => q.type === "table")
    .map((question) => ({
      id: question.id,
      label: question.questions[0].question,
    }));

  return (
    <>
      <Typography variant="h4" pb={2}>
        Create Numerical Reasoning Test
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderInput({
          title: "Table",
          options: tableOptions,
          numQuestions: NR_TABLE_QUESTIONS_PER_TEST,
          control,
          setValue,
        })}
        {renderInput({
          title: "Graph",
          options: graphOptions,
          numQuestions: NR_GRAPH_QUESTIONS_PER_TEST,
          control,
          setValue,
        })}
        {renderInput({
          title: "GMAT",
          options: gmatOptions,
          numQuestions: NR_GMAT_QUESTIONS_PER_TEST,
          control,
          setValue,
        })}
        <Button variant="contained" type="submit">
          Create
        </Button>
      </form>
    </>
  );
};

export default AddNRTest;
