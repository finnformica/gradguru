import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { ITableGraphQuestion, ITableGraphScenario } from "types";
import { answerOptions } from "./constants";
import { renderHelperText, textFieldInputValidation } from "./utils";

type TableQuestionElementProps = {
  form: ITableGraphQuestion;
  setForm: (newForm: ITableGraphQuestion) => void;
  index: number;
  question: ITableGraphScenario;
};

export const TableQuestionElement = ({
  form,
  setForm,
  index,
  question,
}: TableQuestionElementProps) => {
  const generateUniqueKeys = (form: any) => {
    const columns = form.data.columns.length > 0 ? form.data.columns : [];

    const fieldName = (columns[0] as { field?: string })?.field || "";

    return Array.from(
      new Set(form.data.rows.map((row: any) => row[fieldName]))
    );
  };

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
          .sort()
          .reverse()
          .map((key, i) => (
            <TextField
              label={`${key.charAt(0).toUpperCase() + key.slice(1)} ${
                index + 1
              }`}
              value={form.questions[index][key as keyof ITableGraphScenario]}
              key={i}
              required
              multiline
              onChange={(e) => {
                setForm({
                  ...form,
                  questions: form.questions.map((q, k) => {
                    if (k === index) {
                      return { ...q, [key]: e.target.value };
                    }
                    return q;
                  }),
                });
              }}
            />
          ))}
        <Box>
          <InputLabel sx={{ pb: 0.5 }}>Answer type</InputLabel>
          <Stack spacing={2} direction={"row"}>
            <Select
              value={form.questions[index].answer.type}
              size="small"
              label="Answer type"
              sx={{ mb: 1 }}
              onChange={(e: SelectChangeEvent) => {
                setForm({
                  ...form,
                  questions: form.questions.map((q, k) => {
                    return k === index
                      ? ({
                          ...q,
                          answer: { ...question.answer, type: e.target.value },
                        } as ITableGraphScenario)
                      : q;
                  }),
                });
              }}
            >
              {answerOptions.map((name, index) => (
                <MenuItem value={name.toLowerCase()} key={index}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            {form.questions[index].answer.type === "multiple" && (
              <Select
                value={form.questions[index].answer.type2}
                size="small"
                sx={{ ml: 1 }}
                onChange={(e: SelectChangeEvent) => {
                  setForm({
                    ...form,
                    questions: form.questions.map((q, k) => {
                      return k === index
                        ? ({
                            ...q,
                            answer: {
                              ...question.answer,
                              type2: e.target.value,
                            },
                          } as ITableGraphScenario)
                        : q;
                    }),
                  });
                }}
              >
                {answerOptions
                  .filter((a) => a !== "Multiple")
                  .map((name, index) => (
                    <MenuItem value={name.toLowerCase()} key={index}>
                      {name}
                    </MenuItem>
                  ))}
              </Select>
            )}
          </Stack>
          <Stack spacing={2} direction={"row"} pt={3}>
            {form.questions[index].answer.type === "multiple" ? (
              generateUniqueKeys(form).map((row: any, i: number) => {
                const rowValues = form.questions[index].answer.value as {
                  [key: string]: ITableGraphScenario;
                };

                return (
                  <TextField
                    label={row}
                    required
                    key={i}
                    value={rowValues[row]}
                    helperText={renderHelperText(
                      form.questions[index].answer.type2
                    )}
                    type={textFieldInputValidation(
                      form.questions[index].answer.type2
                    )}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        questions: form.questions.map((q, k) => {
                          return k === index
                            ? {
                                ...q,
                                answer: {
                                  ...q.answer,
                                  value: {
                                    ...(q.answer.value as {}),
                                    [row]: e.target.value,
                                  },
                                },
                              }
                            : q;
                        }),
                      });
                    }}
                  />
                );
              })
            ) : (
              <TextField
                label={`Answer ${index + 1}`}
                value={form.questions[index].answer.value}
                helperText={renderHelperText(form.questions[index].answer.type)}
                type={textFieldInputValidation(
                  form.questions[index].answer.type
                )}
                required
                onChange={(e) => {
                  setForm({
                    ...form,
                    questions: form.questions.map((q, k) => {
                      return k === index
                        ? {
                            ...q,
                            answer: { ...q.answer, value: e.target.value },
                          }
                        : q;
                    }),
                  });
                }}
              />
            )}

            <TextField
              label="Unit"
              helperText="e.g. £, kg, BTU; leave blank if none"
              value={form.questions[index].answer.unit}
              type="text"
              sx={{ ml: 2 }}
              onChange={(e) => {
                setForm({
                  ...form,
                  questions: form.questions.map((q, k) => {
                    return k === index
                      ? {
                          ...q,
                          answer: { ...q.answer, unit: e.target.value },
                        }
                      : q;
                  }),
                });
              }}
            />
          </Stack>
        </Box>
      </Box>
    </>
  );
};
