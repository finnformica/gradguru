"use client";

import { Typography } from "@mui/material";
import _ from "lodash";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import { createQuestion } from "api/tests";

import { LRQuestionForm } from "components/aptitude-tests/logical-reasoning";
import {
  initialiseSquareGrid,
  mapNestedArrayToObject,
} from "components/aptitude-tests/logical-reasoning/utils";

const INIT_NUM_ROWS = 4;

const AddLRQuestion = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { control, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      type: "complete-the-sequence",
      question: "",
      explanation: "",
      answer: "",
      grid: {
        border: { inner: true, outer: true },
        questionMark: "",
        template: "linear",
        type: "square",
        rows: INIT_NUM_ROWS,
        data: _.range(4).map(() => initialiseSquareGrid(INIT_NUM_ROWS)),
        options: _.range(4).map(() => initialiseSquareGrid(INIT_NUM_ROWS)),
      },
    },
  });

  const onSubmit = (data: any) => {
    data.grid.data = mapNestedArrayToObject(data.grid.data);
    data.grid.options = mapNestedArrayToObject(data.grid.options);

    createQuestion("logical-reasoning", data)
      .then(() => enqueueSnackbar("LR question added"))
      .catch((err) => console.log(err))
      .finally(() => reset());
  };

  return (
    <>
      <Typography variant="h4" pb={2}>
        Add Logical Reasoning question
      </Typography>
      <LRQuestionForm
        onSubmit={onSubmit}
        control={control}
        watch={watch}
        handleSubmit={handleSubmit}
        setValue={setValue}
      />
    </>
  );
};

export default AddLRQuestion;
