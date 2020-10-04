import {ListItem, ListItemText, makeStyles, Theme} from "@material-ui/core";
import * as React from "react";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: "300px",
    display: "block",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
  },
  linkItem: {
    color: theme.palette.text.primary,
    textDecoration: "none",
    display: "block",
    "&:not(:last-child)": {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
  listItem: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  listItemText: {
    fontWeight: theme.typography.fontWeightBold,
  },
  linkItemActive: {
    backgroundColor: theme.palette.background.paper,
    "& > div:hover": {
      background: "transparent",
    },
  },
}));

interface NavItem {
  label: string;
  linkTo: string;
}

const links: NavItem[] = [
  {
    label: "Dashboard",
    linkTo: "/dashboard",
  },
  {
    label: "Overlays",
    linkTo: "/overlays",
  },
];

export const DashboardSidebar: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <aside className={classes.container}>
      {links.map((link) => (
        <NavLink
          to={link.linkTo}
          key={link.linkTo}
          className={classes.linkItem}
          activeClassName={classes.linkItemActive}
        >
          <ListItem button disableGutters className={classes.listItem}>
            <ListItemText
              primary={link.label}
              classes={{primary: classes.listItemText}}
            />
          </ListItem>
        </NavLink>
      ))}
    </aside>
  );
};
