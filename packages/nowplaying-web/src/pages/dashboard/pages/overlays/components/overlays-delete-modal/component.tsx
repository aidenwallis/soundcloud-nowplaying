import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import {Alert, AlertType} from "../../../../../../components/alert";
import {Overlay} from "../../../../../../types/models/overlay";

interface Props {
  error: string;
  loading: boolean;
  overlay: Overlay;
  onDelete(): void;
  onClose(): void;
}

export const OverlaysDeleteModalComponent: React.FunctionComponent<Props> = (
  props: Props,
) => {
  return (
    <Dialog open maxWidth="sm" fullWidth onClose={props.onClose}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        {!!props.error && (
          <Alert
            gutterBottom
            type={AlertType.Danger}
            message={{
              title: "Failed to delete overlay",
              description: props.error,
            }}
          />
        )}
        <Typography variant="body1" paragraph>
          Are you sure you want to delete this overlay? This will immediately
          disable the overlay from receiving any updates and cannot be undone.
        </Typography>
        <Typography variant="body1">
          You are attempting to delete <strong>{props.overlay.name}</strong>.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} disabled={props.loading}>
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={props.onDelete}
          disabled={props.loading}
        >
          Delet{props.loading ? "ing..." : "e"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
