import { createTheme, ThemeOptions } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const themeOptions = {
  palette: {
    primary: {
      light: "#748293",
      main: "#485665",
      dark: "#1f2d3b",
      contrastText: "#fff",
    },
    secondary: {
      light: "#9af1ff",
      main: "#66becc",
      dark: "#2f8e9b",
      contrastText: "#000",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {},
  overrides: {
    // MuiButton: {},
  },
};
const theme = createTheme(themeOptions);
// const theme = createTheme();

export default theme;
