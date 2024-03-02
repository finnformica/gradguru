"use client";

import { useState } from "react";

import { Typography } from "@mui/material";
import { useSnackbar } from "notistack";

import { SJTScenarioForm, initialForm } from "@/components/SJTForm/types";

import { postSJTTest } from "@/api/tests";
import { SJTForm } from "@/components/SJTForm";
import { LoadingScreen } from "@/components/global-components";

const AddSJT = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<SJTScenarioForm>({ ...initialForm });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    postSJTTest(null, form)
      .then(() => enqueueSnackbar("SJT question added"))
      .catch(() =>
        enqueueSnackbar("Uh oh! Error occurred :(", { variant: "error" })
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

export default AddSJT;
