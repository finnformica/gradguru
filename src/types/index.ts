export type AlertState = {
  open: boolean;
  severity: "success" | "info" | "warning" | "error" | undefined;
  message: string;
  title: string;
};
