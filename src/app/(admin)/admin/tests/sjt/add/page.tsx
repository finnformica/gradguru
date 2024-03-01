"use client";

import { useState } from "react";

import { Typography } from "@mui/material";

import { SJTScenarioForm, initialForm } from "@/components/SJTForm/types";

import { postSJTTest } from "@/api/tests";
import { SJTForm } from "@/components/SJTForm";
import { LoadingScreen } from "@/components/global-components";
import { useAlert } from "@/context/alert";

const AddSJT = () => {
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<SJTScenarioForm>({ ...initialForm });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    postSJTTest(null, form)
      .then(() => showAlert("SJT question added", "success"))
      .catch(() => showAlert("Uh oh! Error occurred :(", "error"))
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
