"use client";

import { useState } from "react";

import { Button, TextField, Divider, Typography, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import QuestionElement from "./QuestionElement";

import { FormState } from "./types";

import { useAlert } from "@/context/adminAlert";

const initialQuestion = {
  type: "multiple" as "rank" | "multiple",
  question: "",
  options: ["", "", "", "", ""],
  explanation: "",
  answer: "1",
};

const initialForm = {
  scenario: "",
  questions: [initialQuestion],
};

const AdminSJT = () => {
  const { setAlertState } = useAlert();
  const [form, setForm] = useState<FormState>({ ...initialForm });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
  };

  return (
    <>
      <Typography variant="h4" pb={2}>
        Add SJT question
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Scenario (if applicable)"
          multiline
          minRows={4}
          onChange={(e) => setForm({ ...form, scenario: e.target.value })}
        />
        <Stack spacing={2} my={2}>
          <Divider />
          {form.questions.map((_, index) => (
            <QuestionElement
              key={index}
              index={index}
              form={form}
              setForm={setForm}
            />
          ))}
          <Divider />
        </Stack>
        <Stack spacing={2} direction={"row"} justifyContent={"space-between"}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() =>
              setForm({
                ...form,
                questions: [...form.questions, initialQuestion],
              })
            }
          >
            Add question
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ color: "white" }}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default AdminSJT;
