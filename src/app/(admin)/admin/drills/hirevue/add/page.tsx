"use client";

import { Typography } from "@mui/material";

import { HirevueQuestionAdminForm } from "components/drills/hirevue";

const AddHirevueQuestion = () => {
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <Typography variant="h4">Add Hirevue Question</Typography>

      <HirevueQuestionAdminForm onSubmit={onSubmit} />
    </>
  );
};

export default AddHirevueQuestion;
