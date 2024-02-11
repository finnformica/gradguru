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

const GmatForm = ({ form, setForm }: GmatFormProps) => {
  return (
    <>
      <Typography variant="h5" pt={2} pb={1}>
        Question
      </Typography>
      <TextField
        label="Question"
        fullWidth
        multiline
        value={form.question}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setForm({ ...form, question: event.target.value })
        }
      />
      <Typography variant="h5" pt={2} pb={1}>
        Explanation
      </Typography>
      <TextField
        label="Explanation"
        fullWidth
        multiline
        value={form.explanation}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setForm({ ...form, explanation: event.target.value })
        }
      />
      <Box pt={2}>
        <InputLabel sx={{ pb: 1 }}>Explanation preview</InputLabel>
        <ClientWrapper>
          <MathJax hideUntilTypeset={"first"}>{form.explanation}</MathJax>
        </ClientWrapper>
      </Box>

      <Typography variant="h5" pt={2} pb={1}>
        Answer
      </Typography>
      <Stack direction="row" spacing={2}>
        <TextField
          label="Answer"
          fullWidth
          multiline
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ float: "right", mt: 2 }}
      >
        Submit
      </Button>
    </>
  );
};

export default GmatForm;
