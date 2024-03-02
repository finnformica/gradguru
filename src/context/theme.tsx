"use client";

import { ThemeProvider, createTheme } from "@mui/material";

// default 8px scaling factor
const spacing = 8;

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
  spacing,
  shape: {
    borderRadius: 2.5,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
        contained: {
          color: "white",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          [`& fieldset`]: {
            borderRadius: "8px",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
  },
});

const GradguruThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default GradguruThemeProvider;
