"use client";

import _ from "lodash";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";

import {
  Autocomplete,
  Button,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { createTest, getQuestions, patchQuestion } from "api/tests";
import { useEffect, useState } from "react";
import { Grid, GridTemplate, GridType, ILRQuestion } from "types";

const getOptionLabel = (option: LRQuestionInfo) =>
  `${option.question} - ${option.type} • ${option.grid} grid • ${option.rows} row${option.rows > 1 ? "s" : ""} • ${option.template} template`;

type LRQuestionInfo = {
  id: string;
  question: string;
  type: GridType;
  grid: Grid;
  rows: number;
  template: GridTemplate;
};

const OptionItem = ({
  option,
  props: { key, ...props },
}: {
  option: LRQuestionInfo;
  props: any;
}) => (
  <ListItem {...props}>
    <ListItemText
      primary={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography>{option.question}</Typography>
          <Typography variant="caption" color="text.secondary">
            {option.type}
          </Typography>
        </Stack>
      }
      secondary={`${option.grid} grid • ${option.rows} row${option.rows > 1 ? "s" : ""} • ${option.template} template`}
    />
  </ListItem>
);

const LR_QUESTIONS_PER_TEST = 10;

const AddLRTest = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [questions, setQuestions] = useState<ILRQuestion[]>([]);
  const { control, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    // add event listener on firestore collection
    const unsubscribe = getQuestions("logical-reasoning", setQuestions);

    // remove event listener on unmount
    return () => unsubscribe();
  }, []);

  const onSubmit = async (data: any) => {
    const uniqueQuestions: string[] = _.uniq(Object.values(data.questions));

    if (uniqueQuestions.length < LR_QUESTIONS_PER_TEST) {
      enqueueSnackbar(
        "Duplicatations detected, please select unique questions.",
        { variant: "error" }
      );
      return;
    }

    createTest("logical-reasoning", { ...data })
      .then((id) => {
        // add testId to each question
        uniqueQuestions.forEach((question) =>
          patchQuestion("logical-reasoning", question, { testId: id })
        );
      })
      .then(() => enqueueSnackbar("Test created successfully"))
      .catch((error) =>
        enqueueSnackbar(`Error creating test: ${error}`, { variant: "error" })
      )
      .finally(() => reset()); // TODO: autcomplete label not resetting
  };

  const options = questions
    .filter((question) => !question.testId)
    .map((question) => ({
      id: question.id,
      question: question.question,
      type: _.startCase(question.type),
      grid: _.startCase(question.grid.type),
      rows: question.grid.rows,
      template: _.startCase(question.grid.template),
    }));

  return (
    <>
      <Typography variant="h4" pb={2}>
        Create Logical Reasoning Test
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} pb={2}>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                size="small"
                label="Name"
                error={!!error}
                helperText={!!error && "Name is required"}
              />
            )}
          />
          {_.range(LR_QUESTIONS_PER_TEST).map((i) => (
            <Controller
              key={i}
              name={`questions.${i.toString()}`}
              control={control}
              rules={{ required: true }}
              render={({ field: { value }, fieldState: { error } }) => (
                <Autocomplete
                  fullWidth
                  value={value}
                  options={options}
                  onChange={(_, data) =>
                    setValue(`questions.${i.toString()}`, data.id)
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionLabel={(option) => getOptionLabel(option)}
                  renderOption={(props, option) => (
                    <OptionItem option={option} props={props} key={option.id} />
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
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

export default AddLRTest;
