import {fade, makeStyles, Theme, Typography} from "@material-ui/core";
import * as React from "react";

export enum AlertType {
  Success = "success",
  Danger = "danger",
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderLeftWidth: 2,
    borderLeftStyle: "solid",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  },
  gutterBottom: {
    marginBottom: theme.spacing(2),
  },
  [AlertType.Danger]: {
    borderColor: theme.palette.secondary.main,
    backgroundColor: fade(theme.palette.secondary.main, 0.2),
  },
  [AlertType.Success]: {
    borderColor: theme.palette.primary.main,
    backgroundColor: fade(theme.palette.primary.main, 0.2),
  },
}));

interface Props {
  type: AlertType;
  gutterBottom?: boolean;
  message: {
    title: string;
    description?: string;
  };
}

export const Alert: React.FunctionComponent<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <div
      className={[
        classes.container,
        classes[props.type],
        props.gutterBottom ? classes.gutterBottom : null,
      ]
        .filter((i) => i)
        .join(" ")}
      role="alert"
    >
      <Typography variant="subtitle1">
        <strong>{props.message.title}</strong>
      </Typography>
      {!!props.message.description && (
        <Typography variant="subtitle2">{props.message.description}</Typography>
      )}
    </div>
  );
};
