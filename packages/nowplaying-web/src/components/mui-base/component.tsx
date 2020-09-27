import {createMuiTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import * as React from "react";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  typography: {
    fontFamily: "proxima-nova, sans-serif",
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
