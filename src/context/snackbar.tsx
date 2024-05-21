"use client";

import { IconButton, BoxProps } from "@mui/material";
import { SnackbarProvider, closeSnackbar } from "notistack";

import { Iconify } from "components/global";

type SnackbarIconProps = {
  icon: string;
  colour: BoxProps["color"];
};

const SnackbarIcon = ({ icon, colour }: SnackbarIconProps) => (
  <Iconify color={`${colour}.main`} width={25} sx={{ mr: 1.25 }} icon={icon} />
);

export const iconVariants = {
  success: <SnackbarIcon icon="ep:success-filled" colour="success" />,
  error: <SnackbarIcon icon="ic:round-error" colour="error" />,
  info: <SnackbarIcon icon="ic:round-info" colour="info" />,
  warning: <SnackbarIcon icon="ic:round-warning" colour="warning" />,
};

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
        backgroundColor: "#FFFFFF",
        color: "black",
        boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.15)",
        paddingLeft: "16px",
        paddingRight: "16px",
        borderRadius: "8px",
      }}
      action={(snackbarId) => (
        <IconButton
          sx={{ color: "grey" }}
          onClick={() => closeSnackbar(snackbarId)}
        >
          <Iconify icon="fluent:dismiss-12-filled" width={14} />
        </IconButton>
      )}
    >
      {children}
    </SnackbarProvider>
  );
};

export default SnackbarContext;
