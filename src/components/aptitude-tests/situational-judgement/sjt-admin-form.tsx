import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, Divider, Stack, TextField } from "@mui/material";

import { ISJScenario } from "types";
import QuestionElement from "./sjt-form-question-element";
import { initialQuestion } from "./constants";

type SJTFormProps = {
  form: ISJScenario;
  setForm: (value: ISJScenario) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const SJTForm = ({ form, setForm, handleSubmit }: SJTFormProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Scenario (if applicable)"
        multiline
        minRows={4}
        onChange={(e) => setForm({ ...form, scenario: e.target.value })}
        value={form.scenario}
      />
      <Stack spacing={2} my={2}>
        <Divider />
        {form.questions.map((_, index) => (
          <QuestionElement
            key={index}
            index={index}
            form={form}
            setForm={setForm}
          />
        ))}
        <Divider />
      </Stack>
      <Stack spacing={2} direction={"row"} justifyContent={"space-between"}>
        <Stack spacing={2} direction={"row"}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() =>
              setForm({
                ...form,
                questions: [...form.questions, initialQuestion],
              })
            }
            disabled={form.questions.length >= 3}
          >
            Add question
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<RemoveIcon />}
            disabled={form.questions.length <= 1}
            onClick={() =>
              setForm({
                ...form,
                questions: form.questions.slice(0, -1),
              })
            }
          >
            Remove question
          </Button>
        </Stack>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default SJTForm;