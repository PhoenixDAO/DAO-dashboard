import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import style from "./style.module.scss";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      border: "1px solid #E0E0E0",
    },
    heading: {
      // fontSize: theme.typography.pxToRem(15),
      fontSize: "15px",
      fontWeight: theme.typography.fontWeightRegular,
    },
    text: {
      fontSize: "14px",

    },
  })
);

export default function SimpleAccordion(milestone: any, i: number) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ fontSize: "16px" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'center' }}
        >
          <div className={style.modalStepNumber}>{milestone.i + 1}</div>

          <Typography className={classes.heading}>
            {milestone.milestone.task}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.text}>
            {milestone.milestone.description}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
