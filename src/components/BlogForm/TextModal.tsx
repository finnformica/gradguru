"use client";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { style } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { textOptions } from "./blogArrays";

type TextModelProps = {
  active: boolean;
};

const TextModal = ({ active }: TextModelProps) => {
  const [open, setOpen] = React.useState(true);
  const makeOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log("Text Model");
  if (active) {
    makeOpen;
  }
  const theme = useTheme();
  return (
    <form>
      <Modal open={open} aria-labelledby="modal-modal-title">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text Editor
          </Typography>
          <TextField
            select
            fullWidth
            label="Select"
            helperText="Please select a text type"
            id="text-type"
            sx={{ mt: 2 }}
          >
            {textOptions.map((text) => (
              <MenuItem key={text.name} value={text.name}>
                <Typography variant={text.style}>{text.name}</Typography>
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Enter Your Text here"
            minRows={15}
            multiline
            fullWidth
            sx={{ mt: 2 }}
          ></TextField>
          <Stack direction="row" gap={2} justifyContent={"space-between"}>
            <Button
              sx={{
                mt: 2,
                background: theme.palette.primary.main,
                color: "white",
                "&:hover": { background: theme.palette.primary.dark },
              }}
            >
              Add
            </Button>
            <Button
              sx={{
                mt: 2,
                background: "rgb(200, 0, 0)",
                color: "white",
                "&:hover": { background: "rgb(255, 0, 0)" },
              }}
              onClick={handleClose}
            >
              Close
            </Button>
          </Stack>
        </Box>
      </Modal>
    </form>
  );
};

export default TextModal;
