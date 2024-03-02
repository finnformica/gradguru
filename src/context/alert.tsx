"use client";

import { Alert } from "@mui/material";
import { useContext, createContext, useState, useEffect } from "react";

type AlertState = {
  message: string;
  open: boolean;
  severity: "success" | "info" | "warning" | "error";
  persist?: boolean;
};

interface AlertComponentType {
  alertState: AlertState;
  setAlertState: (alert: AlertState) => void;
}

interface AlertContextType extends AlertComponentType {
  showAlert: (
    message: string,
    severity: "success" | "info" | "warning" | "error",
    persist?: boolean
  ) => void;
}

const AlertContext = createContext<AlertContextType | null>(null);

const AlertComponent = ({ alertState, setAlertState }: AlertComponentType) => {
  useEffect(() => {
    if (!alertState.persist) {
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

const AlertContextProvider = ({ children }: any) => {
  const [alertState, setAlertState] = useState<AlertState>({
    message: "",
    open: false,
    severity: "success",
  });

  const showAlert = (
    message: string,
    severity: "success" | "info" | "warning" | "error",
    persist?: boolean
  ) => {
    setAlertState({
      message,
      open: true,
      severity,
      persist: persist ? persist : severity === "error",
    });
  };
  const value = { alertState, setAlertState, showAlert };

  return (
    <AlertContext.Provider value={value}>
      <AlertComponent setAlertState={setAlertState} alertState={alertState} />
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertContext) as AlertContextType;
};

export default AlertContextProvider;
