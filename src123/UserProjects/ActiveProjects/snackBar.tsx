import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

export default function SimpleAlerts() {
  const classes = useStyles();
  console.log("In alert");
  return (
    <div className={classes.root}>
      <Alert variant="filled" severity="error">
        Status Error. The status of the milestone is incorrect.
      </Alert>
    </div>
  );
}
