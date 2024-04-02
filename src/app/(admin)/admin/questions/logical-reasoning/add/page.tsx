"use client";

import { Typography } from "@mui/material";

import { LRQuestionForm } from "components/aptitude-tests/logical-reasoning";

const AddLRQuestion = () => {
  const onSubmit = (data: any) => {
    console.log("LR question submitted", data);
  };

  return (
    <>
      <Typography variant="h4" pb={2}>
        Add Logical Reasoning question
      </Typography>
      <LRQuestionForm onSubmit={onSubmit} />
    </>
  );
};

export default AddLRQuestion;
