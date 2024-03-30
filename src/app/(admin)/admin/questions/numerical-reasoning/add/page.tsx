"use client";

import { useState } from "react";
import { Typography } from "@mui/material";
import { useSnackbar } from "notistack";

import { NRForm } from "components/NRForm";
import {
  INRForm,
  tableForm,
  graphForm,
  gmatForm,
} from "components/NRForm/types";
import { LoadingScreen } from "components/global-components";
import { postNRTest } from "api/tests";

const AddNRQuestion = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<INRForm>({
    ...tableForm,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    postNRTest(null, form)
      .then(() => {
        enqueueSnackbar("Numerical reasoning question added");

        switch (form.type) {
          case "table":
            setForm(tableForm);
            break;
          case "graph":
            setForm(graphForm);
            break;
          case "gmat":
            setForm(gmatForm);
            break;
          default:
            throw new Error("Invalid form type");
        }
      })
      .catch((err) =>
        enqueueSnackbar(`Something went wrong - ${err.statusText}`, {
          variant: "error",
        })
      )
      .finally(() => setLoading(false));
  };

  if (!form || loading) return <LoadingScreen />;

  return (
    <>
      <Typography variant="h4" pb={2}>
        Add Numerical Reasoning question
      </Typography>
      <NRForm form={form} setForm={setForm} handleSubmit={handleSubmit} />
    </>
  );
};

export default AddNRQuestion;