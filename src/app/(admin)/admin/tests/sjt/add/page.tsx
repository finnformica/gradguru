"use client";

import { useState } from "react";

import { Typography } from "@mui/material";

import { SJTScenarioState, initialForm } from "@/components/SJTForm/types";

import { useAlert } from "@/context/adminAlert";
import { SJTForm } from "@/components/SJTForm";
import { LoadingWrapper } from "@/components/Global";

const AddSJT = () => {
  const { setAlertState } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<SJTScenarioState>({ ...initialForm });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=sjt-consulting`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    if (response.status !== 200) {
      setAlertState({
        message: "Uh oh! Error occurred :(",
        open: true,
        severity: "error",
      });
    } else {
      setAlertState({
        message: "SJT question added",
        open: true,
        severity: "success",
      });
      setForm({ ...initialForm });
    }

    setLoading(false);
  };

  return (
    <>
      <Typography variant="h4" pb={2}>
        Add SJT question
      </Typography>
      <LoadingWrapper loading={loading}>
        <SJTForm form={form} setForm={setForm} handleSubmit={handleSubmit} />
      </LoadingWrapper>
    </>
  );
};

export default AddSJT;
