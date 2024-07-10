"use client";

import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";

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
  handleClose,
  children,
}: {
  title: string;
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
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
