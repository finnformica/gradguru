"use client";

import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import { iconVariants } from "components/snackbar/Variants";
import { SnackbarProvider, closeSnackbar } from "notistack";

const SnackbarContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      preventDuplicate
      variant="success"
      iconVariant={iconVariants}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      style={{
        fontFamily: "Roboto, sans-serif",
        backgroundColor: "#FFFF",
        color: "black",
      }}
      action={(snackbarId) => (
        <IconButton
          sx={{ color: "grey" }}
          onClick={() => closeSnackbar(snackbarId)}
        >
          <Icon icon="fluent:dismiss-12-filled" width="16" height="16" />
        </IconButton>
      )}
    >
      {children}
    </SnackbarProvider>
  );
};

export default SnackbarContext;
