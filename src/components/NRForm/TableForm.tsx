import { Box, Button, Stack, Typography } from "@mui/material";

import { EditableTable, TableQuestionElement } from ".";
import { ITableForm, IGraphForm, tableQuestion } from "./types";

interface TableFormProps {
  form: ITableForm;
  setForm: (newForm: ITableForm | IGraphForm) => void;
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
        <Button
          variant="contained"
          onClick={() => {
            console.log(form);
          }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default TableForm;
