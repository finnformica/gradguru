"use client";

import { Add } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { createHirevueQuestion } from "api/drills";

import {
  AddHirevueTypeModal,
  HirevueQuestionAdminForm,
} from "components/drills/hirevue";
import { useSnackbar } from "notistack";
import { useState } from "react";

const AddHirevueQuestion = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [typeModalOpen, setTypeModalOpen] = useState(false);

  const onSubmit = async (data: any) => {
    return createHirevueQuestion("consulting", data)
      .then(() => enqueueSnackbar("Question added"))
      .catch(() =>
        enqueueSnackbar("Failed to add question", { variant: "error" })
      );
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Add Hirevue Question</Typography>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => setTypeModalOpen(true)}
        >
          Add Type
        </Button>
      </Stack>

      <HirevueQuestionAdminForm onSubmit={onSubmit} />

      <AddHirevueTypeModal
        open={typeModalOpen}
        handleClose={() => setTypeModalOpen(false)}
        setOpen={setTypeModalOpen}
      />
    </>
  );
};

export default AddHirevueQuestion;
