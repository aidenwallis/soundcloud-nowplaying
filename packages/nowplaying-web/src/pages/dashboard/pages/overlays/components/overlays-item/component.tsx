import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {Delete as DeleteIcon} from "@material-ui/icons";
import * as React from "react";
import {Link} from "react-router-dom";
import {Overlay} from "../../../../../../types/models/overlay";

interface Props {
  overlay: Overlay;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  openButton: {
    marginRight: theme.spacing(1),
  },
}));

export const OverlaysItem: React.FunctionComponent<Props> = ({
  overlay,
}: // ...props
Props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.container} elevation={0}>
      <Grid container spacing={2} alignItems="center">
        <Grid item sm xs={12} zeroMinWidth>
          <Typography variant="h6" gutterBottom>
            {overlay.name}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            <strong>
              {new Intl.DateTimeFormat(undefined, {
                hour12: true,
                month: "short",
                year: "numeric",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }).format(new Date(overlay.createdAt))}
            </strong>
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            component={Link}
            to={`/dashboard/overlays/${overlay.id}`}
            className={classes.openButton}
          >
            Open
          </Button>
          <Tooltip title="Delete Overlay">
            <IconButton
              component={Link}
              to={`/dashboard/overlays/delete/${overlay.id}`}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Paper>
  );
};
