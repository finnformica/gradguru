import { useState } from "react";

import { Alert, AlertTitle } from "@mui/material";
import { AlertState } from "@/components/globalTypes";

type UserAlertProps = {
  state: AlertState;
  setState: (state: AlertState) => void;
};

const UserAlert = ({ setState, state }: UserAlertProps) => {
  return (
    <Alert
      severity={state.severity}
      onClose={() => setState({ ...state, open: false })}
      variant="filled"
      sx={{
        opacity: state.open ? 1 : 0,
        transition: "all 0.5s ease-in-out",
        position: "fixed",
        zIndex: state.open ? 1000 : -1,
        top: 20,
        left: 0,
        right: 0,
        m: "auto",
        width: "50%",
        maxWidth: 300,
      }}
    >
      <AlertTitle>{state.title}</AlertTitle>
      {state.message}
    </Alert>
  );
};

export default UserAlert;
