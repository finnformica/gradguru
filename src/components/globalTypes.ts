export type TitleProps = {
  children: string;
  sx?: object;
};

export type AlertState = {
  open: boolean;
  severity: "success" | "info" | "warning" | "error" | undefined;
  message: string;
  title: string;
};
