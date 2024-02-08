import React from "react";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  TextField,
} from "@mui/material";

import { BarChart, PieChart } from "@/components/Charts";

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
      <Box>
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
        {form.graph === "bar" && (
          <>
            <Button
              variant="outlined"
              size="large"
              sx={{ mx: 2 }}
              onClick={() =>
                setForm({
                  ...form,
                  data: { ...form.data, pivot: !form.data.pivot },
                })
              }
            >
              Pivot data
            </Button>
            <TextField
              label="Y-axis label"
              size="small"
              sx={{ width: "50%" }}
              required
              value={form.data.labels?.y}
              onChange={(e) =>
                setForm({
                  ...form,
                  data: {
                    ...form.data,
                    labels: { ...form.data.labels, y: e.target.value },
                  },
                })
              }
            />
          </>
        )}
      </Box>
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
      </Box>
      <Button variant="outlined" onClick={() => console.log(form)}>
        Log form
      </Button>
    </>
  );
};

export default GraphForm;
