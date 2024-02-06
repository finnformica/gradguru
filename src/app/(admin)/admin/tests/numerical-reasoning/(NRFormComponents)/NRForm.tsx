import React from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

import { TableForm } from ".";

import {
  IGmatForm,
  IGraphForm,
  ITableForm,
  gmatForm,
  graphForm,
  tableForm,
} from "./types";

type NRFormProps = {
  form: ITableForm | IGraphForm | IGmatForm;
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
