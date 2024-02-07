import React from "react";
import { Select, MenuItem, SelectChangeEvent, InputLabel } from "@mui/material";

import { TableForm } from ".";

import { INRForm, gmatForm, graphForm, tableForm } from "./types";

type NRFormProps = {
  form: INRForm;
  setForm: any;
  handleSubmit: any;
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
      <InputLabel>Type of question</InputLabel>
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
    </form>
  );
};

export default NRForm;
