import React from "react";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  TextField,
  Stack,
} from "@mui/material";

import { BarChart, PieChart, LineChart } from "@/components/Charts";

import { IGraphForm, ITableForm } from "./types";
import { EditableTable } from "./EditableTable";

interface GraphFormProps {
  form: IGraphForm;
  setForm: (newForm: ITableForm | IGraphForm) => void;
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
            setForm({ ...form, graph: e.target.value as IGraphForm["graph"] })
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
        {form.graph === "bar" && (
          <BarChart
            data={{ ...form.data, pivot: form.data.pivot as boolean }}
          />
        )}
        {form.graph === "line" && <LineChart data={form.data} />}
      </Box>
      <Button variant="outlined" onClick={() => console.log(form)}>
        Log form
      </Button>
    </>
  );
};

export default GraphForm;
