"use client";

import { ThemeProvider } from "@mui/material";
import theme from "./theme";

type GradguruThemeProviderProps = {
  children: React.ReactNode;
};

const GradguruThemeProvider = ({ children }: GradguruThemeProviderProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default GradguruThemeProvider;
