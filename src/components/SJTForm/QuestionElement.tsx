"use client";

import { useState } from "react";

import {
  Box,
  Select,
  TextField,
  MenuItem,
  SelectChangeEvent,
  List,
  ListItem,
  Typography,
  Stack,
} from "@mui/material";

import { SJTQuestion, SJTScenarioForm } from "./types";

const QuestionElement = ({
  index,
  form,
  setForm,
}: {
  index: number;
  form: SJTQuestion | SJTScenarioForm;
  setForm: (newState: SJTQuestion | SJTScenarioForm) => void;
}) => {
  const [options, setOptions] = useState([1, 2, 3, 4, 5]);

  return (
    <>
      <Typography variant="h6" pt={2}>
        Question {index + 1}
      </Typography>
      <Box>
        <Stack spacing={2} direction={"row"} alignItems={"center"}>
          <Select
            id="question-type"
            autoWidth
            value={form.questions[index].type}
            size="small"
            required
            onChange={(e: SelectChangeEvent) =>
              setForm({
                ...form,
                questions: [
                  ...form.questions.slice(0, index),
                  {
                    ...form.questions[index],
                    type: e.target.value as "rank" | "multiple",
                  },
                  ...form.questions.slice(index + 1),
                ],
              })
            }
          >
            <MenuItem value={"rank"}>Rank order</MenuItem>
            <MenuItem value={"multiple"}>Multiple choice</MenuItem>
          </Select>
          {form.questions[index].type === "multiple" ? (
            <>
              <Select
                id="correct-answer"
                autoWidth
                size="small"
                variant="outlined"
                value={form.questions[index].answer}
                onChange={(e: SelectChangeEvent) =>
                  setForm({
                    ...form,
                    questions: [
                      ...form.questions.slice(0, index),
                      {
                        ...form.questions[index],
                        answer: e.target.value as string,
                      },
                      ...form.questions.slice(index + 1),
                    ],
                  })
                }
              >
                {options.map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Select the correct answer.
              </Typography>
            </>
          ) : (
            <Typography variant="body1" sx={{ mt: 1 }}>
              Rank answers in order with 1 being the most appropriate.
            </Typography>
          )}
        </Stack>
        <TextField
          fullWidth
          label="Question"
          size="small"
          sx={{ mt: 2 }}
          required
          multiline
          value={form.questions[index].question}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({
              ...form,
              questions: [
                ...form.questions.slice(0, index),
                {
                  ...form.questions[index],
                  question: e.target.value as string,
                },
                ...form.questions.slice(index + 1),
              ],
            })
          }
        />
        <List>
          {options.map((num, idx) => (
            <ListItem key={num}>
              <Typography variant="body1" pr={2}>
                {num}.
              </Typography>
              <TextField
                fullWidth
                required
                multiline
                label={`Option ${num}`}
                size="small"
                value={form.questions[index].options[idx]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm({
                    ...form,
                    questions: [
                      ...form.questions.slice(0, index),
                      {
                        ...form.questions[index],
                        options: [
                          ...form.questions[index].options.slice(0, idx),
                          e.target.value,
                          ...form.questions[index].options.slice(idx + 1),
                        ],
                      },
                      ...form.questions.slice(index + 1),
                    ],
                  })
                }
              />
            </ListItem>
          ))}
        </List>
        <TextField
          fullWidth
          label="Explanation"
          size="small"
          required
          multiline
          minRows={2}
          value={form.questions[index].explanation}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({
              ...form,
              questions: [
                ...form.questions.slice(0, index),
                {
                  ...form.questions[index],
                  explanation: e.target.value as string,
                },
                ...form.questions.slice(index + 1),
              ],
            })
          }
        />
      </Box>
    </>
  );
};

export default QuestionElement;
