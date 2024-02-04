"use client";

import { useState } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { SJTScenarioState } from "../types";
import SJTForm from "../SJTForm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  height: "90vh",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

const SJTModal = ({
  open,
  setOpen,
  ...question
}: {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
} & SJTScenarioState) => {
  const [form, setForm] = useState(question);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(form);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 3,
          }}
        >
          <Typography variant="h4">Edit SJT question</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <SJTForm form={form} setForm={setForm} handleSubmit={handleSubmit} />
      </Box>
    </Modal>
  );
};

export default SJTModal;
