"use client";

import { useState } from "react";
import { Typography } from "@mui/material";

import { useAlert } from "@/context/adminAlert";

import { NRForm } from "@/components/NRForm";
import { INRForm, tableForm } from "@/components/NRForm/types";

const AddNR = () => {
  const { setAlertState } = useAlert();
  const [form, setForm] = useState<INRForm>({
    ...tableForm,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("form submitted", form);

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
      setForm({ ...tableForm });
    } else {
      setAlertState({
        message: "Uh oh! Error occurred :(",
        severity: "error",
        open: true,
      });
    }
  };

  return (
    <>
      <Typography variant="h4" pb={2}>
        Add Numerical Reasoning question
      </Typography>
      <NRForm form={form} setForm={setForm} handleSubmit={handleSubmit} />
    </>
  );
};

export default AddNR;
