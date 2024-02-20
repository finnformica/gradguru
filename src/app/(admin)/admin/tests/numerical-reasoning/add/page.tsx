"use client";

import { useState } from "react";
import { Typography } from "@mui/material";

import { useAlert } from "@/context/adminAlert";

import { NRForm } from "@/components/NRForm";
import {
  INRForm,
  tableForm,
  graphForm,
  gmatForm,
} from "@/components/NRForm/types";
import { LoadingWrapper } from "@/components/Global";

const AddNR = () => {
  const { setAlertState } = useAlert();
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<INRForm>({
    ...tableForm,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=nr-consulting`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    if (response.status === 200) {
      setAlertState({
        message: "Numerical reasoning question added",
        severity: "success",
        open: true,
      });
      setForm(
        form.type === "table"
          ? tableForm
          : form.type === "graph"
          ? graphForm
          : gmatForm
      );
    } else {
      setAlertState({
        message: "Uh oh! Error occurred :(",
        severity: "error",
        open: true,
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Typography variant="h4" pb={2}>
        Add Numerical Reasoning question
      </Typography>
      <LoadingWrapper loading={loading}>
        <NRForm form={form} setForm={setForm} handleSubmit={handleSubmit} />
      </LoadingWrapper>
    </>
  );
};

export default AddNR;
