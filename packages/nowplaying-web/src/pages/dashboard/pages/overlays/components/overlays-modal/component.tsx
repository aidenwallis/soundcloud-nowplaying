import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import {FileCopy as FileCopyIcon} from "@material-ui/icons";
import * as React from "react";
import {getOverlayURL} from "../../../../../../helpers/get-overlay-url";
import {Overlay} from "../../../../../../types/models/overlay";

interface Props {
  error: string;
  loading: boolean;
  overlay?: Overlay;
  onSave(name: string): void;
  onClose(): void;
}

export const OverlaysModalComponent: React.FunctionComponent<Props> = (
  props: Props,
) => {
  const [name, setName] = React.useState(props.overlay?.name ?? "");
  const [nameError, setNameError] = React.useState("");
  const overlayURL = React.useRef<HTMLInputElement | null>(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (!event.target.value.trim()) {
      return setNameError("You must enter a valid name.");
    }

    nameError && setNameError("");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    name.trim()
      ? props.onSave(name)
      : setNameError("You must enter a valid name.");
  };

  const handleCopy = () => {
    if (!overlayURL.current) {
      return;
    }
    overlayURL.current.select();
    document.execCommand("copy");
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
            margin="normal"
          />
          {props.overlay && (
            <TextField
              label="Overlay URL"
              variant="outlined"
              inputRef={(r) => {
                overlayURL.current = r;
              }}
              onFocus={(e) => e.target.select()}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleCopy} size="small">
                      <FileCopyIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              margin="normal"
              helperText="The URL you should put into your streaming software."
              fullWidth
              value={getOverlayURL(props.overlay.id, props.overlay.password)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button
            type="submit"
            color="primary"
            disabled={
              !!nameError || props.loading || props.overlay?.name === name
            }
          >
            Sav{props.loading ? "ing.." : "e"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
