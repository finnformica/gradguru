"use client";

import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#75C046",
    },
    secondary: {
      main: "#CFA284",
      light: "#F3F2E7",
      dark: "#302117",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 3,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "white",
        },
      },
    },
  },
});

type GradguruThemeProviderProps = {
  children: React.ReactNode;
};

const GradguruThemeProvider = ({ children }: GradguruThemeProviderProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default GradguruThemeProvider;
