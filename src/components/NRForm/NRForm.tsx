import React from "react";
import { Select, MenuItem, SelectChangeEvent, InputLabel } from "@mui/material";

import { TableForm, GraphForm, GmatForm } from ".";

import { NRQuestion, gmatForm, graphForm, tableForm } from "./types";

type NRFormProps = {
  form: NRQuestion;
  setForm: (form: NRQuestion) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const NRForm = ({ form, setForm, handleSubmit }: NRFormProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    switch (event.target.value) {
      case "table":
        setForm({ ...tableForm });
        break;
      case "graph":
        setForm({ ...graphForm });
        break;
      case "gmat":
        setForm({ ...gmatForm });
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputLabel sx={{ pb: 0.5 }}>Type of question</InputLabel>
      <Select
        value={form.type}
        label="Type"
        onChange={handleChange}
        size="small"
      >
        <MenuItem value="table">Table</MenuItem>
        <MenuItem value="graph">Graph</MenuItem>
        <MenuItem value="gmat">Gmat</MenuItem>
      </Select>
      {form.type === "table" && <TableForm form={form} setForm={setForm} />}
      {form.type === "graph" && <GraphForm form={form} setForm={setForm} />}
      {form.type === "gmat" && <GmatForm form={form} setForm={setForm} />}
    </form>
  );
};

export default NRForm;
