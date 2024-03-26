import { Box, Button, Dialog, Stack, Typography } from "@mui/material";

type ConfirmationDialogProps = {
  title: string;
  open: boolean;
  confirmText?: string;
  onClose: () => void;
  onSubmit: () => void;
};

const ConfirmationDialog = ({
  title,
  open,
  confirmText,
  onClose,
  onSubmit,
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">{title}</Typography>
        <Stack spacing={2} direction="row" justifyContent="flex-end" mt={4}>
          <Button variant="contained" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={onSubmit}>
            {confirmText || "Confirm"}
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default ConfirmationDialog;
