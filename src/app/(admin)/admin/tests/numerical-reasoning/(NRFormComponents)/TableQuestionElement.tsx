import { Box, TextField, Typography } from "@mui/material";

import { ITableQuestion } from "./types";

export const TableQuestionElement = ({
  form,
  setForm,
  index,
  question,
}: any) => {
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
