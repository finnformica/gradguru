import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, Stack, Typography } from "@mui/material";

import { ITableGraphQuestion, ITableQuestion } from "types";
import { EditableTable, TableQuestionElement } from ".";
import { tableQuestion } from "./constants";

interface TableFormProps {
  form: ITableQuestion;
  setForm: (newForm: ITableGraphQuestion) => void;
}

const TableForm = ({ form, setForm }: TableFormProps) => {
  return (
    <>
      <EditableTable form={form} setForm={setForm} />
      <Typography variant="h5" pt={3}>
        Questions
      </Typography>
      {form.questions.map((question, index) => (
        <TableQuestionElement
          form={form}
          setForm={setForm}
          index={index}
          key={index}
          question={question}
        />
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
        }}
      >
        <Stack spacing={2} direction={"row"}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            disabled={form.questions.length >= 4}
            onClick={() =>
              setForm({
                ...form,
                questions: [...form.questions, tableQuestion],
              })
            }
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
                questions: [
                  ...form.questions.slice(0, form.questions.length - 1),
                ],
              })
            }
          >
            Remove question
          </Button>
        </Stack>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </>
  );
};

export default TableForm;
