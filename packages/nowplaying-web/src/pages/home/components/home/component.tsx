import {Button, darken, makeStyles, Theme, Typography} from "@material-ui/core";
import cx from "classnames";
import * as React from "react";
import {LogoSVG} from "../../../../components/logo-svg";
import {config} from "../../../../config";
import {Color} from "../../../../types/enums/color";

const LOGIN_URL = config.api.baseUrl + "v1/auth/twitch/redirect";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    position: "fixed",
    overflowY: "auto",
    display: "flex",
    alignItems: "center",
  },
  content: {
    margin: "auto",
  },
  logo: {
    height: "40px",
    marginBottom: theme.spacing(6),
  },
  bold: {
    fontWeight: theme.typography.fontWeightBold,
  },
  login: {
    backgroundColor: Color.TwitchPurple,
    "&:hover": {
      backgroundColor: darken(Color.TwitchPurple, 0.2),
    },
  },
}));

export const HomeComponent: React.FunctionComponent = () => {
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    window.location.href = LOGIN_URL;
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Typography align="center" component="div">
          <LogoSVG className={classes.logo} />
          <Typography variant="h4" gutterBottom className={classes.bold}>
            SoundCloud: Now Playing
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            A Twitch Tool created by Aiden Wallis
          </Typography>
          <Button
            variant="contained"
            size="large"
            disableElevation
            color="primary"
            onClick={handleClick}
            className={cx(classes.bold, classes.login)}
          >
            Login with Twitch
          </Button>
        </Typography>
      </div>
    </div>
  );
};
