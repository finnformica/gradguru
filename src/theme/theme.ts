import { createTheme } from "@mui/material";

export const theme = createTheme({
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
});

export default theme;
