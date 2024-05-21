"use client";

import { IconButton } from "@mui/material";
import { Iconify } from "components/global";
import { iconVariants } from "components/snackbar/variants";

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
        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
        paddingLeft: "16px",
        paddingRight: "16px",
      }}
      action={(snackbarId) => (
        <IconButton
          sx={{ color: "grey" }}
          onClick={() => closeSnackbar(snackbarId)}
        >
          <Iconify icon="fluent:dismiss-12-filled" height="16" />
        </IconButton>
      )}
    >
      {children}
    </SnackbarProvider>
  );
};

export default SnackbarContext;
