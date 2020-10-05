import {Button} from "@material-ui/core";
import {Add as AddIcon} from "@material-ui/icons";
import * as React from "react";
import {Link} from "react-router-dom";

export const OverlaysCreateButton: React.FunctionComponent = () => {
  return (
    <Button
      component={Link}
      color="primary"
      to="/dashboard/overlays/new"
      disableElevation
      startIcon={<AddIcon />}
      variant="contained"
    >
      Create
    </Button>
  );
};
