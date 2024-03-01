"use client";

import { useState } from "react";
import { Typography } from "@mui/material";

import { useAlert } from "@/context/alert";

import { NRForm } from "@/components/NRForm";
import {
  INRForm,
  tableForm,
  graphForm,
  gmatForm,
} from "@/components/NRForm/types";
import { LoadingScreen } from "@/components/global";

const AddNR = () => {
  const { showAlert } = useAlert();
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
      showAlert("Numerical reasoning question added", "success");
      setForm(
        form.type === "table"
          ? tableForm
          : form.type === "graph"
            ? graphForm
            : gmatForm
      );
    } else {
      showAlert("Uh oh! Error occurred :(", "error");
    }

    setLoading(false);
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

export default AddNR;
