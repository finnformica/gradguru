import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { MathJax } from "better-react-mathjax";

import { ClientWrapper } from "components/global-components";
import { IGmatForm, answerOptions } from "./types";
import { textFieldInputValidation, renderHelperText } from "./utils";

type GmatFormProps = {
  form: IGmatForm;
  setForm: (form: IGmatForm) => void;
};

const InputContainer = ({ children }: { children: React.ReactNode }) => (
  <Stack spacing={1}>{children}</Stack>
);

const GmatForm = ({ form, setForm }: GmatFormProps) => {
  return (
    <Stack spacing={2} pt={2}>
      <InputContainer>
        <Typography variant="h5">Question</Typography>
        <TextField
          label="Question"
          fullWidth
          multiline
          required
          value={form.question}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, question: event.target.value })
          }
        />
      </InputContainer>
      <InputContainer>
        <Typography variant="h5">Explanation</Typography>
        <TextField
          label="Explanation"
          fullWidth
          multiline
          required
          value={form.explanation}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, explanation: event.target.value })
          }
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>Explanation preview</InputLabel>
        <ClientWrapper>
          <MathJax hideUntilTypeset={"first"}>{form.explanation}</MathJax>
        </ClientWrapper>
      </InputContainer>

      <InputContainer>
        <Typography variant="h5">Answer</Typography>
        <Typography variant="body2">
          {typeof form.answer === "string" ? form.answer : null}
        </Typography>
        <Stack spacing={2} direction={"row"}>
          <Select
            value={form.answer.type}
            size="small"
            label="Answer type"
            sx={{ mb: 1 }}
            onChange={(e: SelectChangeEvent) => {
              setForm({
                ...form,
                answer: {
                  ...form.answer,
                  type: e.target.value as IGmatForm["answer"]["type"],
                },
              });
            }}
          >
            {answerOptions.map((name, index) => (
              <MenuItem value={name.toLowerCase()} key={index}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Answer"
            required
            helperText={renderHelperText(form.answer.type)}
            type={textFieldInputValidation(form.answer.type)}
            // sx={{ width: "100px" }}
            value={form.answer.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setForm({
                ...form,
                answer: { ...form.answer, value: event.target.value },
              })
            }
          />
          <TextField
            label="Unit"
            // sx={{ width: "100px" }}
            value={form.answer.unit}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setForm({
                ...form,
                answer: { ...form.answer, unit: event.target.value },
              })
            }
          />
        </Stack>
      </InputContainer>
      <Box>
        <Button type="submit" variant="contained" sx={{ float: "right" }}>
          Submit
        </Button>
      </Box>
    </Stack>
  );
};

export default GmatForm;
