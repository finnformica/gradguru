"use client";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { style } from "./styles";

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
    <div>
      <Modal open={open} aria-labelledby="modal-modal-title">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text Editor
          </Typography>
          <TextField
            label="Enter Your Text here"
            minRows={20}
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
    </div>
  );
};

export default TextModal;
