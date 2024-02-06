import React, { useState } from "react";
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Stack,
  TextField,
  Button,
  Typography,
} from "@mui/material";

import FullFeaturedCrudGrid from "./EditableTable";

import {
  IGmatForm,
  IGraphForm,
  ITableForm,
  ITableQuestion,
  gmatForm,
  graphForm,
  tableForm,
} from "./types";

type NRFormProps = {
  form: ITableForm | IGraphForm | IGmatForm;
  setForm: any;
  handleSubmit: any;
};

const QuestionElement = ({ form, setForm, index, question }: any) => {
  return (
    <>
      <Typography variant="h6" pt={3} pb={1}>
        Question {index + 1}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {Object.keys(question).map((key, i) => (
          <TextField
            label={`${key.charAt(0).toUpperCase() + key.slice(1)} ${index + 1}`}
            value={form.questions[index][key]}
            key={i}
            onChange={(e) => {
              setForm({
                ...form,
                questions: form.questions.map(
                  (q: ITableQuestion, k: number) => {
                    if (k === index) {
                      return { ...q, [key]: e.target.value };
                    }
                    return q;
                  }
                ),
              });
            }}
          />
        ))}
      </Box>
    </>
  );
};

const NRForm = ({ form, setForm, handleSubmit }: NRFormProps) => {
  const [columnNames, setColumnNames] = useState<string[]>([""]);
  const handleChange = (event: SelectChangeEvent) => {
    switch (event.target.value) {
      case "table":
        setForm({ ...tableForm });
        break;
      case "graph":
        setForm({ ...graphForm });
        break;
      case "gmat":
        setForm({ ...gmatForm });
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select
        value={form.type}
        label="Type"
        onChange={handleChange}
        size="small"
      >
        <MenuItem value="table">Table</MenuItem>
        <MenuItem value="graph">Graph</MenuItem>
        <MenuItem value="gmat">Gmat</MenuItem>
      </Select>

      {form.type === "table" && (
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
          <FullFeaturedCrudGrid
            columnNames={columnNames}
            form={form}
            setForm={setForm}
          />
          <Typography variant="h5" pt={3}>
            Questions
          </Typography>
          {form.questions.map((question, index) => (
            <QuestionElement
              form={form}
              setForm={setForm}
              index={index}
              question={question}
            />
          ))}
          <Button
            variant="outlined"
            disabled={form.questions.length >= 4}
            onClick={() =>
              setForm({
                ...form,
                questions: [
                  ...form.questions,
                  {
                    question: "",
                    explanation: "",
                    answer: "",
                  },
                ],
              })
            }
          >
            Add question
          </Button>
          <Button
            variant="outlined"
            color="error"
            disabled={form.questions.length <= 0}
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
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => {
              console.log(form);
            }}
          >
            Log form
          </Button>
        </>
      )}
    </form>
  );
};

export default NRForm;
