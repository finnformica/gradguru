"use client";

import { useState } from "react";
import { Typography } from "@mui/material";

import NRForm from "../NRForm";
import { IGmatForm, IGraphForm, ITableForm, tableForm } from "../types";

const AddNR = () => {
  const [form, setForm] = useState<IGmatForm | IGraphForm | ITableForm>({
    ...tableForm,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("form submitted", form);
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
