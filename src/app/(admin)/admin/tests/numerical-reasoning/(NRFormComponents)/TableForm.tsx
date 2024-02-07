"use client";

import { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { EditableTable } from ".";
import { TableQuestionElement } from ".";

import { ITableForm, tableQuestion } from "./types";

interface TableFormProps {
  form: ITableForm;
  setForm: (newForm: ITableForm) => void;
}

const TableForm = ({ form, setForm }: TableFormProps) => {
  const [columnNames, setColumnNames] = useState<string[]>([""]);

  return (
    <>
      <Typography variant="h5" pt={3}>
        Column names
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          py: 2,
        }}
      >
        {columnNames.map((name, index) => (
          <TextField
            size="small"
            label={`Column ${index + 1}`}
            required
            key={index}
            value={name}
            onChange={(e) => {
              const newColumnNames = [...columnNames];
              newColumnNames[index] = e.target.value;
              setColumnNames(newColumnNames);
            }}
          />
        ))}
      </Box>
      <Stack spacing={2} direction={"row"}>
        <Button
          variant="outlined"
          onClick={() => {
            setColumnNames([...columnNames, ""]);
          }}
        >
          Add
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() =>
            setColumnNames(columnNames.splice(0, columnNames.length - 1))
          }
        >
          Delete
        </Button>
      </Stack>
      <Typography variant="h5" pt={3}>
        Data input
      </Typography>
      <EditableTable columnNames={columnNames} form={form} setForm={setForm} />
      <Typography variant="h5" pt={3}>
        Questions
      </Typography>
      {form.questions.map((question, index) => (
        <TableQuestionElement
          form={form}
          setForm={setForm}
          index={index}
          key={index}
          question={question}
        />
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
        }}
      >
        <Stack spacing={2} direction={"row"}>
          <Button
            variant="outlined"
            disabled={form.questions.length >= 4}
            onClick={() =>
              setForm({
                ...form,
                questions: [...form.questions, tableQuestion],
              })
            }
          >
            Add question
          </Button>
          <Button
            variant="outlined"
            color="error"
            disabled={form.questions.length <= 1}
            onClick={() =>
              setForm({
                ...form,
                questions: [
                  ...form.questions.slice(0, form.questions.length - 1),
                ],
              })
            }
          >
            Remove question
          </Button>
        </Stack>
        <Button
          variant="contained"
          sx={{ color: "white" }}
          onClick={() => {
            console.log(form);
          }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default TableForm;
