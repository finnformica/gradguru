import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";

import { GmatForm, GraphForm, TableForm } from ".";

import { INRQuestion } from "types";
import { gmatForm, graphForm, tableForm } from "./constants";

type NRFormProps = {
  form: INRQuestion;
  setForm: (form: INRQuestion) => void;
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
        throw new Error("Invalid form type");
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
