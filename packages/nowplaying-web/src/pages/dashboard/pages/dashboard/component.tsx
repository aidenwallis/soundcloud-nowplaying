import {makeStyles, Paper, Theme, Typography} from "@material-ui/core";
import * as React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold,
  },
  paper: {
    padding: theme.spacing(3),
  },
}));

export const DashboardPage: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={0}>
      <Typography variant="h5" gutterBottom className={classes.title}>
        Setup the extension
      </Typography>
      <Typography variant="body1" paragraph>
        In order for us to obtain your currently playing state from SoundCloud,
        you must install the browser extension that tracks your SoundCloud
        activity.
      </Typography>
      <Typography variant="body2">
        <em>
          <strong>
            Please note that due to the nature of how this system has to
            function in order to relay your now playing state, when you install
            the browser extension your SoundCloud activity will always be
            tracked for as long as you have the extension installed. We do not
            log any other activity aside from what you listen to in order to
            power your overlay, and do not have access to log data from any
            other website you visit that isn't on SoundCloud.
          </strong>
        </em>
      </Typography>
    </Paper>
  );
};
