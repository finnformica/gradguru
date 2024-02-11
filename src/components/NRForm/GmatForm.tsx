import {
  Box,
  Button,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { MathJax } from "better-react-mathjax";

import { ClientWrapper } from "@/components/Global";
import { IGmatForm } from "./types";

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
        <Stack direction="row" spacing={2}>
          <TextField
            label="Answer"
            fullWidth
            multiline
            required
            value={form.answer.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setForm({
                ...form,
                answer: { ...form.answer, value: event.target.value },
              })
            }
          />
          <TextField
            label="Units (if applicable)"
            fullWidth
            multiline
            value={form.answer.units}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setForm({
                ...form,
                answer: { ...form.answer, units: event.target.value },
              })
            }
          />
        </Stack>
      </InputContainer>
      <Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ float: "right" }}
        >
          Submit
        </Button>
      </Box>
    </Stack>
  );
};

export default GmatForm;
