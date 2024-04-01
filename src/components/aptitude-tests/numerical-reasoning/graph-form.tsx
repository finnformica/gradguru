import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
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

import { BarChart, LineChart, PieChart } from "components/charts";

import { IGraphQuestion, ITableGraphQuestion } from "types";
import { EditableTable } from "./editable-table";
import { TableQuestionElement } from "./nr-form-question-element";
import { graphQuestion } from "./constants";

interface GraphFormProps {
  form: IGraphQuestion;
  setForm: (newForm: ITableGraphQuestion) => void;
}

const GraphForm = ({ form, setForm }: GraphFormProps) => {
  return (
    <>
      <EditableTable form={form} setForm={setForm} />
      <InputLabel sx={{ pb: 0.5 }}>Chart type</InputLabel>
      <Stack direction="row" spacing={2} pb={2}>
        <Select
          value={form.graph}
          label="Chart type"
          required
          onChange={(e: SelectChangeEvent) =>
            setForm({
              ...form,
              graph: e.target.value as IGraphQuestion["graph"],
            })
          }
          size="small"
        >
          <MenuItem value="bar">Bar chart</MenuItem>
          <MenuItem value="line">Line graph</MenuItem>
          <MenuItem value="pie">Pie chart</MenuItem>
        </Select>
        <TextField
          required
          size="small"
          label="Chart title"
          value={form.data.labels?.title}
          sx={{ width: "30%" }}
          onChange={(e) =>
            setForm({
              ...form,
              data: {
                ...form.data,
                labels: { ...form.data.labels, title: e.target.value },
              },
            })
          }
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        {(form.graph === "bar" || form.graph === "line") && (
          <>
            <Button
              variant="outlined"
              size="large"
              onClick={() =>
                setForm({
                  ...form,
                  data: { ...form.data, pivot: !form.data.pivot },
                })
              }
            >
              Pivot data
            </Button>
            {["x", "y"].map((axis) => (
              <TextField
                required
                size="small"
                key={axis}
                label={`${axis.toUpperCase()}-axis label`}
                value={
                  form.data.labels?.[axis as keyof typeof form.data.labels]
                }
                sx={{ width: "30%" }}
                onChange={(e) =>
                  setForm({
                    ...form,
                    data: {
                      ...form.data,
                      labels: { ...form.data.labels, [axis]: e.target.value },
                    },
                  })
                }
              />
            ))}
          </>
        )}
      </Stack>
      <Box
        sx={{
          width: "100%",
          height: 500,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 4,
        }}
      >
        {form.graph === "pie" && <PieChart data={form.data} />}
        {form.graph === "bar" && <BarChart data={form.data} />}
        {form.graph === "line" && <LineChart data={form.data} />}
      </Box>
      <Typography variant="h5" pb={2}>
        Scenario
      </Typography>
      <TextField
        required
        multiline
        label="Scenario"
        fullWidth
        value={form.scenario}
        onChange={(e) => setForm({ ...form, scenario: e.target.value })}
        sx={{ pb: 3 }}
      />

      <Typography variant="h5">Questions</Typography>
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
            startIcon={<AddIcon />}
            onClick={() =>
              setForm({
                ...form,
                questions: [...form.questions, graphQuestion],
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

export default GraphForm;
