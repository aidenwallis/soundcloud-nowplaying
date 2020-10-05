import {createMuiTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import {blue} from "@material-ui/core/colors";
import * as React from "react";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: blue["A200"],
    },
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", Noto Color Emoji',
  },
});

interface Props {
  children: React.ReactNode;
}

export const MuiBase: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};
