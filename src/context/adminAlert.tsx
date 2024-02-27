"use client";

import { Alert } from "@mui/material";
import { useContext, createContext, useState, useEffect } from "react";

type AlertState = {
  message: string;
  open: boolean;
  severity: "success" | "info" | "warning" | "error";
};

export interface AlertContextType {
  alertState: AlertState;
  setAlertState: (alert: AlertState) => void;
}

const AlertContext = createContext<AlertContextType | null>(null);

const AlertComponent = ({ alertState, setAlertState }: AlertContextType) => {
  useEffect(() => {
    if (alertState?.open) {
      const timer = setTimeout(() => {
        setAlertState({ ...alertState, open: false });
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [alertState, setAlertState]);

  return (
    <Alert
      severity={alertState?.severity}
      variant="filled"
      onClose={() => setAlertState({ ...alertState, open: false })}
      sx={{
        position: "fixed",
        zIndex: 9999,
        top: 20,
        right: 20,
        transition: "all 0.5s ease-in-out",
        opacity: alertState?.open ? 1 : 0,
        visibility: alertState?.open ? "visible" : "hidden",
      }}
    >
      {alertState?.message}
    </Alert>
  );
};

export const AlertContextProvider = ({ children }: any) => {
  const [alertState, setAlertState] = useState<AlertState>({
    message: "",
    open: false,
    severity: "success",
  });
  const value = { alertState, setAlertState };

  return (
    <AlertContext.Provider value={value}>
      <AlertComponent alertState={alertState} setAlertState={setAlertState} />
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertContext) as AlertContextType;
};
