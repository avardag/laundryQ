import { createTheme, ThemeOptions } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const themeOptions = {
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {},
};
// const theme = createTheme(themeOptions);
const theme = createTheme();

export default theme;
