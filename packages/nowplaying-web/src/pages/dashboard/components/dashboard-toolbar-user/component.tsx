import {Avatar, IconButton, Menu, MenuItem} from "@material-ui/core";
import * as React from "react";
import {AuthenticatedUser} from "../../../../types/models/user";

interface Props {
  user: AuthenticatedUser;
}

export const DashboardToolbarUserComponent: React.FunctionComponent<Props> = ({
  user,
}: Props) => {
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const handleClose = () => setAnchor(null);

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <Avatar src={user.avatar} alt={user.displayName} />
      </IconButton>
      <Menu anchorEl={anchor} open={!!anchor} onClose={handleClose}>
        <MenuItem>Log out</MenuItem>
      </Menu>
    </>
  );
};
