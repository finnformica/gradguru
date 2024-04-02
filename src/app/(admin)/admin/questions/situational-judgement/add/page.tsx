"use client";

import { useState } from "react";

import { Typography } from "@mui/material";
import { useSnackbar } from "notistack";

import { createQuestion } from "api/tests";
import { SJTForm } from "components/aptitude-tests/situational-judgement";
import { initialForm } from "components/aptitude-tests/situational-judgement/constants";
import { LoadingScreen } from "components/global-components";
import { ISJScenario } from "types";

const AddSJTQuestion = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ISJScenario>({ ...initialForm });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    createQuestion("situational-judgement", form)
      .then(() => enqueueSnackbar("SJT question added"))
      .catch((err) =>
        enqueueSnackbar(`Something went wrong - ${err.statusText}`, {
          variant: "error",
        })
      )
      .finally(() => {
        setForm({ ...initialForm });
        setLoading(false);
      });
  };

  if (!form || loading) return <LoadingScreen />;

  return (
    <>
      <Typography variant="h4" pb={2}>
        Add SJT question
      </Typography>
      <SJTForm form={form} setForm={setForm} handleSubmit={handleSubmit} />
    </>
  );
};

export default AddSJTQuestion;
