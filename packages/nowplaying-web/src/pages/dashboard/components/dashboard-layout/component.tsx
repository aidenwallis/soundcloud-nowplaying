import {Container, Grid, makeStyles, Theme} from "@material-ui/core";
import * as React from "react";
import {DashboardSidebar} from "../dashboard-sidebar";
import {DashboardToolbar} from "../dashboard-toolbar";

interface Props {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    display: "flex",
    flexDirection: "column",
    // backgroundColor: theme.palette.background.paper,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
    minWidth: 0,
    minHeight: 0,
    overflowY: "auto",
  },
}));

export const DashboardLayout: React.FunctionComponent<Props> = (
  props: Props,
) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <DashboardToolbar />
      <div className={classes.content}>
        <Container>
          <Grid container spacing={4}>
            <Grid item>
              <DashboardSidebar />
            </Grid>
            <Grid item xs zeroMinWidth>
              {props.children}
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};
