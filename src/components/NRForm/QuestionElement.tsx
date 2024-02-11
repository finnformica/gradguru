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

import {
  IGraphForm,
  IGraphQuestion,
  ITableForm,
  ITableQuestion,
} from "./types";

type TableQuestionElementProps = {
  form: ITableForm | IGraphForm;
  setForm: (newForm: ITableForm | IGraphForm) => void;
  index: number;
  question: ITableQuestion | IGraphQuestion;
};

export const TableQuestionElement = ({
  form,
  setForm,
  index,
  question,
}: TableQuestionElementProps) => {
  const answerOptions = [
    "Multiple",
    "Ratio",
    "Percentage",
    "Number",
    "Currency",
  ];

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
              value={
                form.questions[index][
                  key as keyof (ITableQuestion | IGraphQuestion)
                ]
              }
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
                    ? {
                        ...q,
                        answer: { ...question.answer, type: e.target.value },
                      }
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
          {form.questions[index].answer.type === "multiple" ? (
            <>
              <Select
                value={
                  (form.questions[index].answer.value as { type: string }).type
                }
                size="small"
                sx={{ ml: 1 }}
                onChange={(e: SelectChangeEvent) => {
                  setForm({
                    ...form,
                    questions: form.questions.map((q, k) => {
                      return k === index
                        ? {
                            ...q,
                            answer: {
                              ...question.answer,
                              value: { type: e.target.value },
                            },
                          }
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
                          questions: form.questions.map((q, k) => {
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
                          }),
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
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
