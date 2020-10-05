import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import * as React from "react";
import {Overlay} from "../../../../../../types/models/overlay";

interface Props {
  error: string;
  loading: boolean;
  overlay?: Overlay;
  onCreate(name: string): void;
  onClose(): void;
}

export const OverlaysModalComponent: React.FunctionComponent<Props> = (
  props: Props,
) => {
  const [name, setName] = React.useState(props.overlay?.name ?? "");
  const [nameError, setNameError] = React.useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (!event.target.value.trim()) {
      return setNameError("You must enter a valid name.");
    }

    nameError && setNameError("");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name.trim()) {
      props.onCreate(name);
    }
  };

  return (
    <Dialog fullWidth maxWidth="xs" open onClose={props.onClose}>
      <DialogTitle>{props.overlay ? "Edit" : "Create"} Overlay</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label="Name"
            helperText={
              nameError || "Name this overlay something that's useful to you."
            }
            onChange={handleNameChange}
            value={name}
            disabled={props.loading}
            error={!!nameError}
            autoFocus
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button
            type="submit"
            color="primary"
            disabled={!!nameError || props.loading}
          >
            Sav{props.loading ? "ing.." : "e"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
