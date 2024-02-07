import {
  Box,
  Select,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  Stack,
} from "@mui/material";

import { ITableForm, ITableQuestion } from "./types";

type TableQuestionElementProps = {
  form: ITableForm;
  setForm: (newForm: ITableForm) => void;
  index: number;
  question: ITableQuestion;
};

export const TableQuestionElement = ({
  form,
  setForm,
  index,
  question,
}: TableQuestionElementProps) => {
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
        {Object.keys(question)
          .filter((q) => q !== "answer")
          .map((key, i) => (
            <TextField
              label={`${key.charAt(0).toUpperCase() + key.slice(1)} ${
                index + 1
              }`}
              value={form.questions[index][key as keyof ITableQuestion]}
              key={i}
              required
              multiline
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
        <Box>
          <InputLabel sx={{ pb: 0.5 }}>Answer type</InputLabel>
          <Select
            value={form.questions[index].answer.type}
            size="small"
            label="Answer type"
            sx={{ mb: 1 }}
            onChange={(e: SelectChangeEvent) => {
              setForm({
                ...form,
                questions: form.questions.map(
                  (q: ITableQuestion, k: number) => {
                    return k === index
                      ? {
                          ...q,
                          answer: { ...question.answer, type: e.target.value },
                        }
                      : q;
                  }
                ),
              });
            }}
          >
            {["Multiple", "Ratio", "Percentage", "Number"].map(
              (name, index) => (
                <MenuItem value={name.toLowerCase()} key={index}>
                  {name}
                </MenuItem>
              )
            )}
          </Select>
          {form.questions[index].answer.type === "multiple" ? (
            <>
              <InputLabel sx={{ pb: 0.5 }}>
                Provide ratio answer in form 1:3 or numeric answer only for
                other types
              </InputLabel>
              <Stack spacing={2} direction={"row"}>
                {form.data.rows.map((row: any, i: number) => {
                  const columns =
                    form.data.columns.length > 0 ? form.data.columns : [];

                  const fieldName =
                    (columns[0] as { field?: string })?.field || "";
                  return (
                    <TextField
                      label={row[fieldName]}
                      required
                      key={i}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          questions: form.questions.map(
                            (q: ITableQuestion, k: number) => {
                              return k === index
                                ? {
                                    ...q,
                                    answer: {
                                      ...q.answer,
                                      value: {
                                        ...(q.answer.value as {}),
                                        [row[fieldName]]: e.target.value,
                                      },
                                    },
                                  }
                                : q;
                            }
                          ),
                        });
                      }}
                    />
                  );
                })}
              </Stack>
            </>
          ) : (
            <>
              <InputLabel sx={{ pb: 0.5 }}>
                {form.questions[index].answer.type === "ratio"
                  ? "Provide answer in form 1:3"
                  : "Provide numeric answer only"}
              </InputLabel>
              <TextField
                label={`Answer ${index + 1}`}
                value={form.questions[index].answer.value}
                required
                onChange={(e) => {
                  setForm({
                    ...form,
                    questions: form.questions.map(
                      (q: ITableQuestion, k: number) => {
                        return k === index
                          ? {
                              ...q,
                              answer: { ...q.answer, value: e.target.value },
                            }
                          : q;
                      }
                    ),
                  });
                }}
              />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
