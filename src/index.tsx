import React from "react";
import ReactDOM from "react-dom";

import MomentUtils from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { colors } from "./colors";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const theme = createTheme({
  palette: {
    primary: {
      light: colors.base,
      main: colors.base,
      dark: colors.base,
      contrastText: "#fff",
    },
    secondary: {
      light: colors.primary,
      main: colors.primary,
      dark: colors.primary,
      contrastText: "#fff",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={MomentUtils}>
        <App />
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
