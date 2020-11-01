import React, { useState, Component, useEffect } from "react";
import Modal from "Shared/Modal";
import style from "./style.module.scss";
import Button from "Shared/Button";
import Stepper from "../../Proposals/EditModal/strepper";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import axios from "axios";
import Budget from "Shared/Budget";
import { Link } from "react-router-dom";
import RightAlignedTimeline from "../../Proposals/EditModal/timeline";
import Alert from "@material-ui/lab/Alert";
import CircularIndeterminate from "../../Proposals/EditModal/Loader";
import {
  FormControl,
  Card,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { URL, UpdateProposal } from "../../const";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import HighlightOffSharpIcon from "@material-ui/icons/HighlightOffSharp";



const useStyles = makeStyles((theme) =>
  createStyles({
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
      },
      "& .MuiFormLabel-root": {
        fontSize: "12px",
      },
      "& .MuiFormHelperText-root": {
        fontSize: "10px",
      },
    },
    countryPicker: {
      "& .MuiInputBase-input": {
        width: "100px",
        fontSize: "12px",
      },
      "& .MuiFormLabel-root": {
        fontSize: "12px",
      },
      "& .MuiFormHelperText-root": {
        fontSize: "10px",
      },
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
    margin: {
      "& .MuiInputBase-root": {
        fontSize: "12px",
        width: "auto",
      },
      "& .MuiFormLabel-root": {
        fontSize: "12px",
      },
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "25ch",
    },
    txt: {
      color: "#2680EB",
      fontSize: "14px",
      fontWeight: "bold",
      marginLeft: "3px",
    },
    txt1: {
      fontSize: "12px",
      fontWeight: "bold",
    },
    descriptionTxt: {
      marginTop: "5px",
      color: "#818181",
      fontSize: "10px",
      textAlign: "start",
    },
    icon: {
      height: "20px",
      width: "20px",
      fontSize: "40px",
      color: "#2680EB",
    },
    card: {
      minWidth: 275,
      height: "80px",
      padding: "5px",
    },
    milestone: {
      cursor: "pointer",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      textAlign: "center",
      alignItems: "center",
      padding: "10px 0",
    },
    flexRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      textAlign: "center",
      alignItems: "center",
    },
    cardGap: {
      margin: "10px 0",
    },
    deleteTxt: {
      cursor: "pointer",
      color: "#D43737",
      marginLeft: "5px",
      fontSize: "20px",
    },
    updateTxt: {
      cursor: "pointer",
      color: "#32CD32",
      marginLeft: "5px",
      fontSize: "12px",
    },
  })
);

const EditModal = (props: any) => {
  console.log("check propso now", props);
  const [state, setState] = useState({
    firstName: props.proposal.firstName,
    lastName: props.proposal.lastName,
    name: props.proposal.name,
    country: props.proposal.country,
    email: props.proposal.email,
    description: props.proposal.description,
    githubLink: props.proposal.githubLink,
    budget: props.proposal.budget,
    purpose: props.proposal.purpose,
    importance: props.proposal.importance,
    fundsUsage: props.proposal.fundsUsage,
    personalExperience: props.proposal.personalExperience,
    experiencedYear: props.proposal.experiencedYear,
    duration: props.proposal.duration,
    collateral: props.proposal.collateral,
    reward: props.proposal.reward,
    numioAddress: props.user.numioAddress,
    milestone: props.proposal.milestone,
  });
  const [milestoneDetails, setMilestoneDetails] = useState({
    task: "",
    description: "",
    estimatedDays: "",
    numberOfDevelopers: "",
    milestoneCost: "",
  });
  const [addMilestones, setAddMilestones] = useState(false);
  const [proposalValue, setProposalValue]: any = useState([]);
  const [testValue, setTestValue]: any = useState([]);
  const [fieldRequired, setFieldRequired]: any = useState(false);
  const [linkValidation, setLinkValidation]: any = useState(false);
  const [emailValid, setEmailValid]: any = useState(false);
  const [stepperStep, setStepperStep]: any = useState(0);
  const [milestoneCount, setMilestoneCount]: any = useState(1);
  const [errorFlag, setErrorFlag] = useState(false);
  const [proposalSubmittedFlag, setproposalSubmittedFlag] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [apiFailFlag, setApiFailFlag] = useState(false);
  const [disableInputs, setDisableInputs] = useState(false);
  const [ethereumNetworkError, setEthereumNetworkError] = useState(false);
  const [milestoneSelected, setMilestoneSelected] = useState(0);
  const [j, setJ] = useState(0);

  const classes = useStyles();

  useEffect(() => {}, []);

  const handleClickNext = (e: any) => {
    let {
      firstName,
      lastName,
      name,
      country,
      email,
      githubLink,
      // fundsUsage,
      purpose,
      importance,
      // personalExperience,
      experiencedYear,
      duration,
      // reward,
      collateral,
    } = state;
    if (
      j == 0 &&
      (!firstName || !lastName || !email || !name || !githubLink || !country)
    ) {
      setFieldRequired(true);
      return;
    } else {
      let emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      let checkLink: any = githubLink.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      );
      if (emailValid == null) {
        setEmailValid(true);
        return;
      } else {
        setEmailValid(false);
      }
      if (checkLink == null) {
        setLinkValidation(true);
        return;
      } else {
        setLinkValidation(false);
      }
    }
    if (
      j == 1 &&
      (!purpose ||
        !importance ||
        // !fundsUsage ||
        // !personalExperience ||
        !experiencedYear ||
        !collateral)
    ) {
      setFieldRequired(true);
      return;
    }
    setFieldRequired(false);
    setStepperStep((prevActiveStep: any) => Number(prevActiveStep) + 1);
    if (showLoader) {
      return null;
    } else if (j < 3) {
      if (j == 1 && state.milestone.length != 0) {
        setJ(j + 2);
      } else {
        setJ(j + 1);
      }
    } else {
      console.log("In Else");
    }
  };

  const handleMilestoneBack = () => {
    if (state.milestone.length != 0) {
      setJ(3);
    } else {
      setJ(2);
    }
  };

  useEffect(() => {
    console.log("Hello");
  });
  const handleClickBack = (e: any) => {
    if (stepperStep > 0) {
      setStepperStep((prevActiveStep: any) => prevActiveStep - 1);
    }
    if (showLoader) {
      return null;
    } else if (j == 0) {
      console.log("Cannot go back");
    } else {
      if (state.milestone.length != 0 && j == 3) {
        setJ(j - 2);
      } else if (j == 4) {
        setMilestoneDetails({
          task: "",
          description: "",
          estimatedDays: "",
          numberOfDevelopers: "",
          milestoneCost: "",
        });
        setJ(j - 1);
      } else {
        setJ(j - 1);
      }
    }
  };

  const _onChangeMilestoneValue = (value: any, name: any) => {
    if (
      name == "milestoneCost" ||
      name == "estimatedDays" ||
      name == "numberOfDevelopers"
    ) {
      if (value < 0 || value.toString().length > 6) {
        return;
      }
    }
    setMilestoneDetails({ ...milestoneDetails, [name]: value });
  };

  const ProjectName = () => {
    return (
      <>
        <div
          style={{
            margin: "10px 0px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextField
            error={state.firstName.length == 0 && fieldRequired}
            label="First Name"
            contentEditable={false}
            className={classes.submitText}
            style={{ width: "200px" }}
            id="outlined-error-helper-text"
            value={state.firstName}
            variant="outlined"
            helperText={
              state.firstName.length == 0 && fieldRequired
                ? `First Name is required.`
                : false
            }
          />
          <TextField
            error={state.lastName.length == 0 && fieldRequired}
            label="Last Name"
            id="outlined-error-helper-text"
            style={{ width: "200px" }}
            className={classes.submitText}
            variant="outlined"
            value={state.lastName}
            helperText={
              state.lastName.length == 0 && fieldRequired
                ? `Last Name is required.`
                : false
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            margin: "10px 0px",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="outlined-error-helper-text"
            label="Title"
            error={state.name.length == 0 && fieldRequired}
            className={classes.submitText}
            style={{ width: "200px" }}
            value={state.name}
            helperText={
              state.name.length == 0 && fieldRequired
                ? `Title is required.`
                : false
            }
            variant="outlined"
          />
          <TextField
            error={state.country.length == 0 && fieldRequired}
            label="Country"
            value={state.country}
            style={{ width: "200px" }}
            id="outlined-error-helper-text"
            helperText={
              state.country.length == 0 && fieldRequired
                ? `Country is required.`
                : false
            }
            className={classes.submitText}
            variant="outlined"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <FormControl
            error
            fullWidth
            className={classes.margin}
            variant="outlined"
          >
            <TextField
              error={(state.email.length == 0 && fieldRequired) || emailValid}
              label="Email"
              value={state.email}
              id="outlined-error-helper-text"
              helperText={
                state.email.length == 0 && fieldRequired
                  ? `Email is required.`
                  : emailValid
                  ? "Email is not valid"
                  : false
              }
              className={classes.submitText}
              variant="outlined"
            />
          </FormControl>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            margin: "10px 0px",
          }}
        >
          <FormControl
            error
            fullWidth
            className={classes.margin}
            variant="outlined"
          >
            <TextField
              error={
                (state.githubLink.length == 0 && fieldRequired) ||
                linkValidation
              }
              label="Github Link"
              value={state.githubLink}
              id="outlined-error-helper-text"
              helperText={
                state.githubLink.length == 0 && fieldRequired
                  ? `Github Link is required.`
                  : linkValidation
                  ? "Github Link is not valid"
                  : false
              }
              className={classes.submitText}
              variant="outlined"
            />
          </FormControl>
        </div>
      </>
    );
  };

  const ProjectDetails = () => {
    return (
      <>
        <div
          style={{
            margin: "10px 0px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <FormControl
            error
            fullWidth
            className={classes.margin}
            variant="outlined"
          >
            <TextField
              error={state.purpose.length == 0 && fieldRequired}
              label="Purpose to use Phoenix-Dao funds"
              value={state.purpose}
              id="outlined-error-helper-text"
              helperText={
                state.purpose.length == 0 && fieldRequired
                  ? `Purpose is required.`
                  : false
              }
              className={classes.submitText}
              variant="outlined"
            />
          </FormControl>
        </div>
        {/* <div
          style={{
            margin: "10px 0px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <FormControl
            error
            fullWidth
            className={classes.margin}
            variant="outlined"
          >
            <TextField
              multiline
              rows={1}
              error={state.fundsUsage.length == 0 && fieldRequired}
              label="Reason for using funds"
              value={state.fundsUsage}
              id="outlined-error-helper-text"
              helperText={
                state.fundsUsage.length == 0 && fieldRequired
                  ? `Reason is required.`
                  : false
              }
              className={classes.submitText}
              variant="outlined"
            />
          </FormControl>
        </div> */}
        <div
          style={{
            margin: "10px 0px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <FormControl
            error
            fullWidth
            className={classes.margin}
            variant="outlined"
          >
            <TextField
              multiline
              rows={1}
              error={state.importance.length == 0 && fieldRequired}
              label="Importance of Proposal"
              value={state.importance}
              id="outlined-error-helper-text"
              helperText={
                state.importance.length == 0 && fieldRequired
                  ? `Importance of proposal is required.`
                  : false
              }
              className={classes.submitText}
              variant="outlined"
            />
          </FormControl>
        </div>
        <div
          style={{
            margin: "10px 0px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextField
            error={state.experiencedYear.length == 0 && fieldRequired}
            label={
              fieldRequired && state.experiencedYear.length == 0
                ? false
                : "Experience"
            }
            className={classes.submitText}
            type="number"
            id="outlined-error-helper-text"
            style={{ width: "200px" }}
            value={state.experiencedYear}
            variant="outlined"
            helperText={
              state.experiencedYear.length == 0 && fieldRequired
                ? `Experienced is required.`
                : false
            }
          />
          <TextField
            error={state.budget.length == 0 && fieldRequired}
            label={fieldRequired && state.budget.length == 0 ? false : "Budget"}
            className={classes.submitText}
            style={{ width: "200px" }}
            type="number"
            id="outlined-error-helper-text"
            value={state.budget}
            variant="outlined"
            helperText={
              state.budget.length == 0 && fieldRequired
                ? `Budget is required.`
                : false
            }
          />
        </div>
        <div
          style={{
            margin: "10px 0px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextField
            error={state.collateral.length == 0 && fieldRequired}
            label={
              fieldRequired && state.collateral.length == 0
                ? false
                : "Collateral"
            }
            className={classes.submitText}
            style={{ width: "100%" }}
            type="number"
            id="outlined-error-helper-text"
            value={state.collateral}
            variant="outlined"
            helperText={
              state.collateral.length == 0 && fieldRequired
                ? `Collateral is required.`
                : false
            }
          />
          {/* <TextField
            error={state.reward.length == 0 && fieldRequired}
            label={fieldRequired && state.reward.length == 0 ? false : "Reward"}
            className={classes.submitText}
            type="number"
            style={{ width: "200px" }}
            id="outlined-error-helper-text"
            value={state.reward}
            variant="outlined"
            helperText={
              state.reward.length == 0 && fieldRequired
                ? `Reward is required.`
                : false
            }
          /> */}
        </div>
        <div
          style={{
            margin: "10px 0px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <FormControl
            error
            fullWidth
            className={classes.margin}
            variant="outlined"
          >
            <TextField
              multiline
              rows={2}
              error={state.description.length == 0 && fieldRequired}
              label="Description"
              value={state.description}
              id="outlined-error-helper-text"
              helperText={
                state.description.length == 0 &&
                fieldRequired &&
                `Description is required.`
              }
              className={classes.submitText}
              variant="outlined"
            />
          </FormControl>
        </div>
        {/* <div
          style={{
            margin: "10px 0px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <FormControl
            error
            fullWidth
            className={classes.margin}
            variant="outlined"
          >
            <TextField
              multiline
              rows={2}
              error={state.personalExperience.length == 0 && fieldRequired}
              label={
                fieldRequired && state.personalExperience.length == 0
                  ? false
                  : "Peronsal Experience"
              }
              value={state.personalExperience}
              id="outlined-error-helper-text"
              helperText={
                state.personalExperience.length == 0 &&
                fieldRequired &&
                `Peronsal Experience is required.`
              }
              className={classes.submitText}
              variant="outlined"
            />
          </FormControl>
        </div> */}
      </>
    );
  };

  const MilestonesDescription = () => {
    return (
      <>
        <div
          style={{
            margin: "10px 0px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="outlined-error-helper-text"
            error={milestoneDetails.task.length == 0 && fieldRequired}
            style={{ width: "200px" }}
            onChange={(e) => _onChangeMilestoneValue(e.target.value, "task")}
            helperText={
              milestoneDetails.task.length == 0 &&
              fieldRequired &&
              `Title is required.`
            }
            label="Title"
            className={classes.submitText}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            style={{ width: "200px" }}
            error={milestoneDetails.estimatedDays.length == 0 && fieldRequired}
            label={
              fieldRequired && milestoneDetails.estimatedDays.length == 0
                ? false
                : "Estimated Days"
            }
            type="number"
            onChange={(e) =>
              _onChangeMilestoneValue(e.target.value, "estimatedDays")
            }
            className={classes.submitText}
            value={milestoneDetails.estimatedDays}
            variant="outlined"
            helperText={
              milestoneDetails.estimatedDays.length == 0 &&
              fieldRequired &&
              `Estimated days are required.`
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            margin: "10px 0px",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="outlined-basic"
            style={{ width: "200px" }}
            label={
              fieldRequired && milestoneDetails.numberOfDevelopers.length == 0
                ? false
                : "Developers Working"
            }
            type="number"
            onChange={(e) =>
              _onChangeMilestoneValue(e.target.value, "numberOfDevelopers")
            }
            error={
              milestoneDetails.numberOfDevelopers.length == 0 && fieldRequired
            }
            className={classes.submitText}
            value={milestoneDetails.numberOfDevelopers}
            helperText={
              milestoneDetails.numberOfDevelopers.length == 0 &&
              fieldRequired &&
              `Number of developers are required.`
            }
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            error={milestoneDetails.milestoneCost.length == 0 && fieldRequired}
            value={milestoneDetails.milestoneCost}
            type="number"
            label={
              fieldRequired && milestoneDetails.milestoneCost.length == 0
                ? false
                : "Milestone Cost"
            }
            onChange={(e) =>
              _onChangeMilestoneValue(e.target.value, "milestoneCost")
            }
            style={{ width: "200px" }}
            className={classes.submitText}
            variant="outlined"
            helperText={
              milestoneDetails.milestoneCost.length == 0 &&
              fieldRequired &&
              `Cost is required.`
            }
          />
        </div>
        <div
          style={{
            margin: "10px 0px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <FormControl
            error
            fullWidth
            className={classes.margin}
            variant="outlined"
          >
            <TextField
              multiline
              rows={4}
              error={milestoneDetails.description.length == 0 && fieldRequired}
              label="Description"
              value={milestoneDetails.description}
              onChange={(e) =>
                _onChangeMilestoneValue(e.target.value, "description")
              }
              id="outlined-error-helper-text"
              helperText={
                milestoneDetails.description.length == 0 &&
                fieldRequired &&
                `Description is required.`
              }
              className={classes.submitText}
              variant="outlined"
            />
          </FormControl>
        </div>
      </>
    );
  };

  const projectMilestones = () => {
    return (
      <>
        {state.milestone.length != 0 &&
          state.milestone.map((item: any, index: number) => {
            return (
              <div className={classes.cardGap}>
                <Card className={classes.card}>
                  <div className={classes.flexRow}>
                    <Typography className={classes.txt1}>
                      {item.task}
                    </Typography>
                    <Typography className={classes.txt1}>
                      {item.estimatedDays} (days)
                    </Typography>
                  </div>
                  <div className={classes.flexRow}>
                    <Typography className={classes.descriptionTxt}>
                      {item.description}
                    </Typography>
                  </div>
                </Card>
              </div>
            );
          })}
      </>
    );
  };

  return (
    <div>
      <div>
        <Modal
          title={props.type}
          className={style.modal}
          styleFlag="proposalModal"
          activeSteps={stepperStep}
          showStepper={true}
          actions={
            <div>
              <div style={{ display: "block" }}>
                {j == 2 ? (
                  <>
                    <Button
                      disabled={disableInputs}
                      style={{ marginTop: "10px" }}
                      onClick={handleMilestoneBack}
                    >
                      Back
                    </Button>
                  </>
                ) : (
                  <>
                    {j < 2 ? (
                      <Button
                        disabled={disableInputs}
                        primary
                        onClick={(e: any) => handleClickNext(e)}
                      >
                        Next
                      </Button>
                    ) : j == 4 ? (
                      false
                    ) : (
                      false
                    )}
                    <Button
                      disabled={disableInputs}
                      style={{ marginTop: "10px" }}
                      onClick={(e: any) => handleClickBack(e)}
                    >
                      Back
                    </Button>
                  </>
                )}
              </div>
            </div>
          }
          close={props.close}
        >
          {addMilestones ? (
            MilestonesDescription()
          ) : (
            <>
              {j == 0 && ProjectName()}
              {j == 1 && ProjectDetails()}
              {j == 2 && MilestonesDescription()}
              {j == 3 && projectMilestones()}
            </>
          )}
        </Modal>
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  user: state.userDetails.user,
  network: state.layoutReducer.network,
});

export default connect(mapStateToProps)(EditModal);
