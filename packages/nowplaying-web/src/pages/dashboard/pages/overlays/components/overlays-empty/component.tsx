import {makeStyles, Paper, Theme, Typography} from "@material-ui/core";
import * as React from "react";
import {OverlaysCreateButton} from "../overlays-create-button";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(3),
    textAlign: "center",
  },
  buttonWrapper: {
    paddingTop: theme.spacing(2),
  },
}));

export const OverlaysEmpty: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.container}>
      <Typography variant="h5" gutterBottom>
        <strong>No overlays found</strong>
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Create an overlay to get started.
      </Typography>
      <div className={classes.buttonWrapper}>
        <OverlaysCreateButton />
      </div>
    </Paper>
  );
};
