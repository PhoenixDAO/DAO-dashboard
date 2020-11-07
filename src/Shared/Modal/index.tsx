import React, { forwardRef } from "react";
import cn from "classnames";
import style from "./style.module.scss";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import { Grid } from "@material-ui/core";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/core/styles";

type Props = {
  children: React.ReactNode;
  className?: string;
  title?: string;
  actions?: React.ReactNode;
  close: () => any;
  reward?: any;
  styleFlag?: any;
  showSnackBar?: any;
  activeSteps?: any;
  showStepper?: any;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    modalWrap: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100,
      backdropFilter: "blur(3px)",
      background: "rgba(0, 0, 0, 0.36)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      padding: "15px",
      "& .MuiTypography-body2": { fontSize: "12px", width: "auto" },
      "& .MuiStepIcon-root.MuiStepIcon-active": {
        color: "#EA8604",
        width: "25px",
        height: "25px",
        fontSize: "10px",
      },
      "& .MuiStepIcon-text": {
        fontSize: "12px",
      },
      "& .MuiStepIcon-root": {
        color: "#EA8604",
        width: "25px",
        height: "25px",
        fontSize: "10px",
      },
    },
    submitText: {
      "& .MuiInputBase-root": {
        fontSize: "12px",
        width: "auto",
        // height: "30px",
        margin: "0px 5px",
      },
      "& .MuiFormLabel-root": {
        fontSize: "12px",
      },
      // "& ..MuiInput-underline:before": {
      //   borderBottom: "5px solid rgba(0, 0, 0, 0.42)",
      // },
    },
    root: {
      width: "100%",
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
  })
);

function getSteps() {
  return ["Proposal Details", "Proposal Description", "Proposal Milestones"];
}

export default ({
  children,
  className,
  title,
  actions,
  close,
  styleFlag,
  showSnackBar,
  activeSteps,
  showStepper,
}: Props) => {
  const handleClick = ({ target }: any) => {
    console.log("handle click", target.className);
    let checkClassName = target.className;
    if (
      target.className === style.modalWrap ||
      //target.className === checkClassName
      target.className ===
        "MuiGrid-root style_modalWrap__fAu8M MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-12 MuiGrid-grid-lg-12"
    ) {
      close();
      console.log("handle click 2");
    }
  };

  const classes = useStyles();
  const steps = getSteps();
  return (
    <div>
      {styleFlag == "stakeModal" ? (
        <div className={style.modalWrap} onClick={handleClick}>
          <div className={cn(style.stakeModal, className)}>
            <div>
              <div className={style.closeButton} onClick={close} />
              {title && <div className={style.title}>{title}</div>}
              <div>{children}</div>
              {actions && <div className={style.actions}>{actions}</div>}
            </div>
          </div>
        </div>
      ) : styleFlag == "UpvoteModal" ? (
        <Grid
          lg={12}
          sm={12}
          xs={12}
          md={12}
          className={style.modalWrap}
          onClick={handleClick}
        >
          <div className={cn(style.modal, className)}>
            <div className={style.closeButton} onClick={close} />
            {title && <div className={style.title2}>{title}</div>}
            {showStepper && (
              <Stepper
                className={classes.text}
                activeStep={activeSteps}
                alternativeLabel
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}
            <div>{children}</div>
            {actions && <div className={style.actions}>{actions}</div>}
          </div>
        </Grid>
      ) : styleFlag == "ActiveProjects" ? (
        <Grid
          lg={12}
          sm={12}
          xs={12}
          md={12}
          className={style.modalWrap}
          onClick={handleClick}
        >
          <div className={cn(style.modal, className)}>
            <div className={style.closeButton} onClick={close} />
            {title && <div className={style.title4}>{title}</div>}
            {showStepper && (
              <Stepper
                className={classes.text}
                activeStep={activeSteps}
                alternativeLabel
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}
            <div>{children}</div>
            {actions && <div className={style.actions}>{actions}</div>}
          </div>
        </Grid>
      ) : styleFlag == "proposalModal" ? (
        <Grid
          lg={12}
          sm={12}
          xs={12}
          md={12}
          className={style.modalWrap}
          onClick={handleClick}
        >
          <div className={cn(style.modal, className)}>
            <div className={style.closeButton} onClick={close} />
            {title && <div className={style.title5}>{title}</div>}
            {showStepper && (
              <Stepper
                className={classes.text}
                activeStep={activeSteps}
                alternativeLabel
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}
            <div>{children}</div>
            {actions && <div className={style.actions}>{actions}</div>}
          </div>
        </Grid>
      ) : (
        <Grid
          lg={12}
          sm={12}
          xs={12}
          md={12}
          className={style.modalWrap}
          onClick={handleClick}
        >
          <div className={cn(style.modal, className)}>
            <div className={style.closeButton} onClick={close} />
            {title && <div className={style.title}>{title}</div>}
            {showStepper && (
              <Stepper
                className={classes.text}
                activeStep={activeSteps}
                alternativeLabel
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}
            <div>{children}</div>
            {actions && <div className={style.actions}>{actions}</div>}
          </div>
        </Grid>
      )}
    </div>
  );
};
