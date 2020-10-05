import {
  CircularProgress,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import {Route, Switch} from "react-router-dom";
import {Alert, AlertType} from "../../../../../../components/alert";
import {Overlay} from "../../../../../../types/models/overlay";
import {OverlaysCreateButton} from "../overlays-create-button";
import {OverlaysDeleteModal} from "../overlays-delete-modal";
import {OverlaysEmpty} from "../overlays-empty";
import {OverlaysItem} from "../overlays-item";
import {OverlaysModal} from "../overlays-modal";

interface Props {
  error: string;
  loading: boolean;
  overlays: Overlay[];
}

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    paddingTop: theme.spacing(3),
  },
  loader: {
    textAlign: "center",
  },
}));

export const DashboardOverlaysComponent: React.FunctionComponent<Props> = (
  props: Props,
) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Overlays
      </Typography>
      <Typography variant="body2">
        Below are all overlays that you have created, remember overlay URLs
        should be kept secret and not shared.
      </Typography>
      <div className={classes.content}>
        {props.overlays.length && !!props.error && (
          <Alert
            gutterBottom
            type={AlertType.Danger}
            message={{
              title: "Failed to load overlays",
              description: props.error,
            }}
          />
        )}
        {props.overlays.length > 0 && (
          <>
            <OverlaysCreateButton />
            {props.overlays.map((overlay) => (
              <OverlaysItem key={overlay.id} overlay={overlay} />
            ))}
          </>
        )}
        {props.loading && (
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        )}
        {!props.loading && props.overlays.length === 0 && <OverlaysEmpty />}
      </div>
      <Switch>
        <Route path="/dashboard/overlays/new" component={OverlaysModal} />
        <Route
          path="/dashboard/overlays/delete/:overlayId"
          component={OverlaysDeleteModal}
        />
      </Switch>
    </div>
  );
};
