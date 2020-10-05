import {Button, Tooltip} from "@material-ui/core";
import {Add as AddIcon} from "@material-ui/icons";
import * as React from "react";
import {Link} from "react-router-dom";

interface Props {
  limitReached: boolean;
}

export const OverlaysCreateButtonComponent: React.FunctionComponent<Props> = (
  props: Props,
) => {
  const content = (
    <Button
      component={Link}
      color="primary"
      to="/dashboard/overlays/new"
      disableElevation
      disabled={props.limitReached}
      startIcon={<AddIcon />}
      variant="contained"
    >
      Create
    </Button>
  );
  return props.limitReached ? (
    <Tooltip title="You cannot create more than 10 overlays.">
      {content}
    </Tooltip>
  ) : (
    content
  );
};
