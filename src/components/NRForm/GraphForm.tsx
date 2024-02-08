import React from "react";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
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
      <Select
        value={form.graph}
        label="Chart type"
        onChange={(e: SelectChangeEvent) =>
          setForm({ ...form, graph: e.target.value as IGraphForm["graph"] })
        }
        size="small"
      >
        <MenuItem value="bar">Bar chart</MenuItem>
        <MenuItem value="line">Line graph</MenuItem>
        <MenuItem value="pie">Pie chart</MenuItem>
      </Select>
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
      </Box>
      <Button variant="outlined" onClick={() => console.log(form)}>
        Log form
      </Button>
    </>
  );
};

export default GraphForm;
