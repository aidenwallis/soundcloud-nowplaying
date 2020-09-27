import {
  AppBar,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import {DashboardToolbarUser} from "../dashboard-toolbar-user";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold,
  },
  left: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
  },
  button: {
    marginLeft: theme.spacing(3),
  },
}));

export const DashboardToolbar: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <AppBar elevation={2} position="static">
      <Toolbar>
        <div className={classes.left}>
          <Typography variant="h6" className={classes.title}>
            SoundCloud: Now Playing
          </Typography>
        </div>
        <DashboardToolbarUser />
      </Toolbar>
    </AppBar>
  );
};
