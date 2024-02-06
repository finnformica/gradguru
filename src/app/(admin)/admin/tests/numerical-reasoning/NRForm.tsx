import React, { useState } from "react";
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Stack,
  TextField,
  Button,
  Typography,
} from "@mui/material";

import FullFeaturedCrudGrid from "./EditableTable";

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
  const [columnNames, setColumnNames] = useState<string[]>([""]);
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

      {form.type === "table" && (
        <>
          <Typography variant="h6" pt={3}>
            Column names
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              py: 2,
            }}
          >
            {columnNames.map((name, index) => (
              <TextField
                size="small"
                label={`Column ${index + 1}`}
                key={index}
                value={name}
                onChange={(e) => {
                  const newColumnNames = [...columnNames];
                  newColumnNames[index] = e.target.value;
                  setColumnNames(newColumnNames);
                }}
              />
            ))}
          </Box>
          <Stack spacing={2} direction={"row"}>
            <Button
              variant="outlined"
              onClick={() => {
                setColumnNames([...columnNames, ""]);
              }}
            >
              Add
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() =>
                setColumnNames(columnNames.splice(0, columnNames.length - 1))
              }
            >
              Delete
            </Button>
          </Stack>
          <Typography variant="h6" pt={3}>
            Data input
          </Typography>
          <FullFeaturedCrudGrid
            columnNames={columnNames}
            form={form}
            setForm={setForm}
          />
        </>
      )}
    </form>
  );
};

export default NRForm;
