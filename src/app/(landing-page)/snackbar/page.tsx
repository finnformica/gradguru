"use client";

import { Button, Container } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";

const SnackbarButtons = () => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Container maxWidth="lg" sx={{ margin: "auto" }}>
      <Button
        onClick={() => enqueueSnackbar("success", { variant: "success" })}
      >
        Success
      </Button>
      <Button onClick={() => enqueueSnackbar("error", { variant: "error" })}>
        error
      </Button>
      <Button
        onClick={() => enqueueSnackbar("warning", { variant: "warning" })}
      >
        warning
      </Button>
      <Button onClick={() => enqueueSnackbar("info", { variant: "info" })}>
        info
      </Button>
    </Container>
  );
};

export default SnackbarButtons;
