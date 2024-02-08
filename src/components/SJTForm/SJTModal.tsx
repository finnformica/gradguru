"use client";

import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  Popper,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useAlert } from "@/context/adminAlert";

import { SJTScenarioState } from "./types";
import SJTForm from "./SJTForm";

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
  const { setAlertState } = useAlert();
  const [form, setForm] = useState<SJTScenarioState>(question);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const openPopper = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleDelete = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=sjt-consulting&document=${form.id}`,
      {
        method: "DELETE",
      }
    );

    if (response.status !== 200) {
      setAlertState({
        message: "Uh oh! Error occurred :(",
        open: true,
        severity: "error",
      });
    } else {
      setAlertState({
        message: "SJT question deleted",
        open: true,
        severity: "success",
      });
      handleClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/firebase/document?collection=sjt-consulting&document=${form.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    if (response.status !== 200) {
      setAlertState({
        message: "Uh oh! Error occurred :(",
        open: true,
        severity: "error",
      });
    } else {
      setAlertState({
        message: "SJT question updated",
        open: true,
        severity: "success",
      });
      setOpen(false);
    }
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
          <Stack direction="row" spacing={4}>
            <Typography variant="h4">Edit SJT question</Typography>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleClick}
            >
              Delete
            </Button>
            <Popper
              id={id}
              open={openPopper}
              anchorEl={anchorEl}
              sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
            >
              <Paper sx={{ p: 1, borderRadius: 1 }}>
                <Typography pb={2} variant="h6">
                  Are you sure?
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color={"error"}
                    onClick={handleDelete}
                  >
                    Confirm
                  </Button>
                  <Button
                    onClick={handleClick}
                    variant="outlined"
                    color={"error"}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Paper>
            </Popper>
          </Stack>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <SJTForm form={form} setForm={setForm} handleSubmit={handleSubmit} />
      </Box>
    </Modal>
  );
};

export default SJTModal;
