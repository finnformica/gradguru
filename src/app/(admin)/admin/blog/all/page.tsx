"use client";
import { TextField } from "@mui/material";
import React from "react";

const page = () => {
  const consoleLog = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => console.log(e.target.value);

  return (
    <TextField
      fullWidth
      label="Author"
      onChange={consoleLog}
      multiline
      minRows={1}
    />
  );
};

export default page;
