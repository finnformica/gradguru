"use client";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

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

const FormModalWrapper = ({
  title,
  open,
  anchorEl,
  onClose,
  handleDelete,
  handleClick,
  handleClose,
  children,
}: {
  title: string;
  open: boolean;
  anchorEl: null | HTMLElement;
  onClose: () => void;
  handleDelete: () => void;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
  children: React.ReactNode;
}) => {
  const openPopper = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <Modal open={open} onClose={onClose}>
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
            <Typography variant="h4">{title}</Typography>
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
        {children}
      </Box>
    </Modal>
  );
};

export default FormModalWrapper;
