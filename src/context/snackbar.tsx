"use client";

import { Icon } from "@iconify/react";
import { Cancel } from "@mui/icons-material";
import { IconButton, styled } from "@mui/material";
import {
  MaterialDesignContent,
  SnackbarProvider,
  closeSnackbar,
} from "notistack";

// declare module "notistack" {
//   interface VariantOverrides {
//     warning: false;
//     StyledMaterialDesignContent: true;
//   }
// }

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: "#FFFF",
    boxShadow: 0,
    color: "black",
    iconVariant: "mdi:airplane-tick",
  },
}));

type SnackbarDisplayedIconProps = {
  iconName: string;
};

const SnackbarDisplayedIcon = ({ iconName }: SnackbarDisplayedIconProps) => {
  <Icon icon={iconName} width="16" height="16" />;
};

const iconVariants = {
  success: <Icon icon="mdi:airplane-tick" width="32" height="32" />,
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
      Components={{ success: StyledMaterialDesignContent }}
      action={(snackbarId) => (
        <IconButton
          sx={{ color: "grey" }}
          onClick={() => closeSnackbar(snackbarId)}
        >
          <Cancel />
        </IconButton>
      )}
    >
      {children}
    </SnackbarProvider>
  );
};

export default SnackbarContext;
