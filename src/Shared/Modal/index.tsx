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
import Cancel from "@material-ui/icons/Cancel";

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
  stepper?: React.ReactNode;
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
    firstStepper: {
      borderTop: "solid",
      borderTopWidth: "thick",
      borderImageSource:
        "linear-gradient(90deg,rgb(76,66,255)35% ,rgb(105,100,187)24%)",
    },
    secondStepper: {
      borderTop: "solid",
      borderTopWidth: "thick",
      borderImageSource:
        "linear-gradient(90deg,rgb(76,66,255)66% ,rgb(105,100,187)34%)",
    },
    thirdStepper: {
      borderTop: "solid",
      borderTopWidth: "thick",
      borderTopColor: "rgb(76,66,255)",
    },
  })
);

function getSteps() {
  return [
    "Proposal Details",
    "Proposal Description",
    "Proposal Milestones",
    "Proposal Submission",
  ];
}
function getStepsDescription() {
  return [
    "  Hey there 👋, tell us more about yourself and your project.",
    "Tell us more about your proposal, give details of what you hope to achieve and your experience.",
    "Give us an in-depth concept about your milestones and how you plan to achieve them.",
    "Take a glance through your proposal."
  ];
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
  stepper,
  showStepper,
}: Props) => {
  const handleClick = (e: any) => {
    console.log("eee", e.target.id);
    console.log("handle click", e.target.className);
    let checkClassName = e.target.className;
    if (
      e.target.id == "adminModal" ||
      e.target.id == "activeProjectsModal" ||
      e.target.id == "upvoteModal" ||
      e.target.className === style.modalWrap ||
      e.target.className ===
      "MuiGrid-root style_modalWrap__fAu8M MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-12 MuiGrid-grid-lg-12"
    ) {
      close();
      console.log("handle click 2");
    }
  };

  const classes = useStyles();
  const steps = getSteps();
  const stepsDescription = getStepsDescription();
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
          id={"upvoteModal"}
          onClick={(e) => handleClick(e)}
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
          id={"activeProjectsModal"}
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
        //  onClick={handleClick}
        >
          <div
            className={cn(
              style.modal1,
              className,
              activeSteps == 1
                ? classes.secondStepper
                : activeSteps == 0
                  ? classes.firstStepper
                  : classes.thirdStepper
            )}
          >
            <div
              className={cn(
                activeSteps == 3 ? style.submissionModal : style.proposalModal
              )}
            >
              <div className={style.hoverEffect} onClick={close}>
                <i
                  className={cn("fa fa-times fa-1x", style.cross)}
                  onClick={close}
                ></i>
              </div>
              {title && (
                <div className={style.proposalHeader}>
                  <div className={style.title5}>{title}</div>
                  <div style={{ display: "flex" }} className={style.stepperDiv}>
                    {stepper}
                    {activeSteps !== 3 ?
                      <div className={style.stepper}>
                        <div className={style.stepperCircle}>
                          <h3 className={style.stepperNumber}>
                            {activeSteps + 1}
                          </h3>
                        </div>{" "}

                        <div className={style.headerText}>
                          {steps[activeSteps]}
                        </div>
                      </div>
                      : null
                    }
                  </div>
                </div>
              )}
              <Grid
                lg={5}
                sm={8}
                xs={12}
                md={6}
                className={style.modalText}
                style={{ fontSize: "14px", marginBottom: "20px" }}
              >
                {stepsDescription[activeSteps]}
              </Grid>
              <div>{children}</div>
            </div>
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
                  id={"adminModal"}
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
