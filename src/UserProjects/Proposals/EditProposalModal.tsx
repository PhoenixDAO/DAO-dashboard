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
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, Theme } from "@material-ui/core/styles";

const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    fontSize: 11,
  },
}))(Tooltip);

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
  const [valueSmaller, setValueSmaller] = useState(false);

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="standard" {...props} />;
  }
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
      fundsUsage,
      purpose,
      importance,
      personalExperience,
      experiencedYear,
      budget,
      description,
      duration,
      reward,
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
        !fundsUsage ||
        !personalExperience ||
        !budget ||
        !description ||
        !experiencedYear ||
        !collateral)
    ) {
      setFieldRequired(true);
      return;
    }
    setFieldRequired(false);
    if (
      collateral == "0" ||
      reward == "0" ||
      experiencedYear == "0" ||
      personalExperience == "0"
    ) {
      setValueSmaller(true);
      return;
    } else {
      setValueSmaller(false);
    }
    setStepperStep((prevActiveStep: any) => Number(prevActiveStep) + 1);
    if (showLoader) {
      return null;
    } else if (j < 3) {
      console.log("cehck this one now", j, state.milestone.length);
      if (j == 1 && state.milestone.length != 0) {
        setJ(j + 2);
      } else {
        setJ(j + 1);
      }
    } else {
      console.log("In Else");
    }
  };
  const handleClickUpdateMilestone = (e: any) => {
    let {
      task,
      numberOfDevelopers,
      estimatedDays,
      description,
      milestoneCost,
    } = milestoneDetails;
    if (
      !task ||
      !estimatedDays ||
      !description ||
      !milestoneCost ||
      !numberOfDevelopers
    ) {
      setFieldRequired(true);
      return;
    } else {
      setFieldRequired(false);
    }
    let array: any = state.milestone;
    array[milestoneSelected] = milestoneDetails;

    setState({ ...state, ["milestone"]: array });
    setMilestoneDetails({
      task: "",
      description: "",
      estimatedDays: "",
      numberOfDevelopers: "",
      milestoneCost: "",
    });
    setAddMilestones(false);
    setJ(3);
  };
  const AddMilestone = () => {
    let {
      task,
      numberOfDevelopers,
      estimatedDays,
      description,
      milestoneCost,
    } = milestoneDetails;
    if (
      !task ||
      !estimatedDays ||
      !description ||
      !milestoneCost ||
      !numberOfDevelopers
    ) {
      setFieldRequired(true);
      return;
    } else {
      setFieldRequired(false);
    }
    if (
      milestoneDetails.milestoneCost == "0" ||
      milestoneDetails.estimatedDays == "0" ||
      milestoneDetails.numberOfDevelopers == "0"
    ) {
      setValueSmaller(true);
      return;
    } else {
      setValueSmaller(false);
    }
    let array: any = state.milestone;
    array.push(milestoneDetails);
    setState({ ...state, ["milestone"]: array });
    setMilestoneDetails({
      task: "",
      description: "",
      estimatedDays: "",
      numberOfDevelopers: "",
      milestoneCost: "",
    });
    setAddMilestones(false);
    setJ(3);
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

  const handleSubmit = async () => {
    try {
      if (state.milestone.length == 0) {
        setFieldRequired(true);
        return;
      } else {
        setFieldRequired(false);
      }
      let totalDays = 0;
      let daysInNumber;
      let timeInSeconds;
      let showStepper = true;
      if (showLoader) {
        return null;
      } else {
        try {
          state.milestone.map((item: any) => {
            daysInNumber = parseInt(item.days);
            totalDays = totalDays + daysInNumber;
          });
          setStepperStep((prevActiveStep: any) => Number(prevActiveStep) + 1);
          setDisableInputs(true);
          setErrorFlag(false);
          setApiFailFlag(false);
          setEthereumNetworkError(false);
          timeInSeconds = totalDays * 86400;
          console.log("Token from props", props.user.numioAddress);
          setShowLoader(true);
          setErrorFlag(false);
          state.numioAddress = props.user.numioAddress;

          const get: any = await axios.put(
            `${URL}${UpdateProposal}${props.proposal._id}`,
            state,
            {
              headers: {
                Authorization: `Bearer ${props.user.token}`,
              },
            }
          );
          setDisabled(!disabled);
          totalDays = 0;
          setproposalSubmittedFlag(true);
          setShowLoader(false);
          setErrorFlag(false);
          props.close();
          props.openSnackbar(
            "Your Proposal was updated successfully !",
            "success"
          );
          props.renderAgain();
        } catch (err) {
          setShowLoader(false);
          setApiFailFlag(true);
          if (err.response && err.response.data && err.response.data.result) {
            props.openSnackbar(err.response.data.result, "error");
          } else {
            props.openSnackbar("Oops something went wrong", "error");
          }
        }
      }
    } catch (e) {}
  };

  const _onChange = (value: any, name: any) => {
    if (props.proposal.status != "Pending") {
      return;
    }
    if (
      name == "experiencedYear" ||
      name == "duration" ||
      name == "collateral" ||
      name == "budget"
    ) {
      if (value < 0 || value.toString().length > 6) {
        return;
      }
    }
    if (
      (name == "name" && value.length > 30) ||
      (name == "firstName" && value.length > 30) ||
      (name == "lastName" && value.length > 30) ||
      (name == "country" && value.length > 30)
    ) {
      return;
    }
    if (
      (name == "purpose" ||
        name == "fundsUsage" ||
        name == "importance" ||
        name == "description" ||
        name == "personalExperience") &&
      value.length > 300
    ) {
      return;
    }
    setState({ ...state, [name]: value });
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
    console.log("check value now", value, name, value.length);
    if (
      (name == "task" && value.length > 30) ||
      (name == "description" && value.length > 300)
    ) {
      return;
    }
    console.log("setting value");
    setMilestoneDetails({ ...milestoneDetails, [name]: value });
  };

  const deleteMilestone = (index: any) => {
    let array = state.milestone;
    array.splice(index, 1);
    setState({ ...state, ["milestone"]: array });
    if (array.length == 0) {
      setJ(2);
    }
  };

  const OnAddMilestone = () => {
    setJ(2);
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
          <LightTooltip title="First name" placement="bottom" arrow>
            <TextField
              error={state.firstName.length == 0 && fieldRequired}
              label="First Name"
              onChange={(e) => _onChange(e.target.value, "firstName")}
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
          </LightTooltip>
          <LightTooltip title="Last name" placement="bottom" arrow>
            <TextField
              error={state.lastName.length == 0 && fieldRequired}
              label="Last Name"
              onChange={(e) => _onChange(e.target.value, "lastName")}
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
          </LightTooltip>
        </div>
        <div
          style={{
            display: "flex",
            margin: "10px 0px",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <LightTooltip title="Project title" placement="bottom" arrow>
            <TextField
              id="outlined-error-helper-text"
              label="Title"
              error={state.name.length == 0 && fieldRequired}
              onChange={(e) => _onChange(e.target.value, "name")}
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
          </LightTooltip>
          <LightTooltip title="Your country name" placement="bottom" arrow>
            <TextField
              error={state.country.length == 0 && fieldRequired}
              label="Country"
              value={state.country}
              style={{ width: "200px" }}
              onChange={(e) => _onChange(e.target.value, "country")}
              id="outlined-error-helper-text"
              helperText={
                state.country.length == 0 && fieldRequired
                  ? `Country is required.`
                  : false
              }
              className={classes.submitText}
              variant="outlined"
            />
          </LightTooltip>
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
            <LightTooltip title="Email address" placement="bottom" arrow>
              <TextField
                error={(state.email.length == 0 && fieldRequired) || emailValid}
                label="Email"
                value={state.email}
                onChange={(e) => _onChange(e.target.value, "email")}
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
            </LightTooltip>
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
            <LightTooltip title="Github repository link for the project" placement="bottom" arrow>
              <TextField
                error={
                  (state.githubLink.length == 0 && fieldRequired) ||
                  linkValidation
                }
                label="Github Link"
                value={state.githubLink}
                onChange={(e) => _onChange(e.target.value, "githubLink")}
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
            </LightTooltip>
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
            <LightTooltip title="Why do you propose to use DAO funds" placement="bottom" arrow>
              <TextField
                error={state.purpose.length == 0 && fieldRequired}
                label="Purpose to use Phoenix-Dao funds"
                value={state.purpose}
                onChange={(e) => _onChange(e.target.value, "purpose")}
                id="outlined-error-helper-text"
                helperText={
                  state.purpose.length == 0 && fieldRequired
                    ? `Purpose is required.`
                    : false
                }
                className={classes.submitText}
                variant="outlined"
              />
            </LightTooltip>
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
          <FormControl
            error
            fullWidth
            className={classes.margin}
            variant="outlined"
          >
            <LightTooltip title="Describe in detail what the funds will be used for" placement="bottom" arrow>
              <TextField
                multiline
                rows={1}
                error={state.fundsUsage.length == 0 && fieldRequired}
                label="Reason for using funds"
                value={state.fundsUsage}
                onChange={(e) => _onChange(e.target.value, "fundsUsage")}
                id="outlined-error-helper-text"
                helperText={
                  state.fundsUsage.length == 0 && fieldRequired
                    ? `Reason is required.`
                    : false
                }
                className={classes.submitText}
                variant="outlined"
              />
            </LightTooltip>
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
          <FormControl
            error
            fullWidth
            className={classes.margin}
            variant="outlined"
          >
            <LightTooltip title="Why is your proposal important for the PhoenixDAO ecosystem?" placement="bottom" arrow>
              <TextField
                multiline
                rows={1}
                error={state.importance.length == 0 && fieldRequired}
                label="Importance of Proposal"
                value={state.importance}
                onChange={(e) => _onChange(e.target.value, "importance")}
                id="outlined-error-helper-text"
                helperText={
                  state.importance.length == 0 && fieldRequired
                    ? `Importance of proposal is required.`
                    : false
                }
                className={classes.submitText}
                variant="outlined"
              />
            </LightTooltip>
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
          <LightTooltip title="How many years of experience do you have in this field?" placement="bottom" arrow>
            <TextField
              error={
                (state.experiencedYear.length == 0 && fieldRequired) ||
                (valueSmaller && state.experiencedYear == "0")
              }
              inputProps={{ inputmode: "numeric", pattern: "[0-9]*" }}
              label={
                (fieldRequired && state.experiencedYear.length == 0) ||
                (valueSmaller && state.experiencedYear == "0")
                  ? false
                  : "Experience"
              }
              onChange={(e) => _onChange(e.target.value, "experiencedYear")}
              className={classes.submitText}
              type="number"
              id="outlined-error-helper-text"
              style={{ width: "200px" }}
              value={state.experiencedYear}
              variant="outlined"
              helperText={
                state.experiencedYear.length == 0 && fieldRequired
                  ? `Experienced is required.`
                  : valueSmaller && state.experiencedYear == "0"
                  ? "Value must be greater than 0"
                  : false
              }
            />
          </LightTooltip>

          <LightTooltip title="Budget required for your proposal" placement="bottom" arrow>
            <TextField
              error={
                (state.budget.length == 0 && fieldRequired) ||
                (valueSmaller && state.budget == "0")
              }
              label={
                (fieldRequired && state.budget.length == 0) ||
                (valueSmaller && state.budget == "0")
                  ? false
                  : "Budget"
              }
              onChange={(e) => _onChange(e.target.value, "budget")}
              className={classes.submitText}
              style={{ width: "200px" }}
              type="number"
              id="outlined-error-helper-text"
              value={state.budget}
              variant="outlined"
              helperText={
                state.budget.length == 0 && fieldRequired
                  ? `Budget is required.`
                  : valueSmaller && state.budget == "0"
                  ? "Value must be greater than 0"
                  : false
              }
            />
          </LightTooltip>
        </div>
        <div
          style={{
            margin: "10px 0px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <LightTooltip title="The amount of PHEONIX required to submit the proposal" placement="bottom" arrow>
            <TextField
              error={
                (state.collateral.length == 0 && fieldRequired) ||
                (valueSmaller && state.collateral == "0")
              }
              label={
                (fieldRequired && state.collateral.length == 0) ||
                (valueSmaller && state.collateral == "0")
                  ? false
                  : "Collateral"
              }
              style={{width:"100%"}}
              onChange={(e) => _onChange(e.target.value, "collateral")}
              className={classes.submitText}
              type="number"
              id="outlined-error-helper-text"
              value={state.collateral}
              variant="outlined"
              helperText={
                state.collateral.length == 0 && fieldRequired
                  ? `Collateral is required.`
                  : valueSmaller && state.collateral == "0"
                  ? "Value must be greater than 0"
                  : false
              }
            />
          </LightTooltip>
          {/* <LightTooltip title="tooltip" placement="bottom" arrow>
            <TextField
              error={
                (state.reward.length == 0 && fieldRequired) ||
                (valueSmaller && state.reward == "0")
              }
              label={
                (fieldRequired && state.reward.length == 0) ||
                (valueSmaller && state.reward == "0")
                  ? false
                  : "Reward"
              }
              onChange={(e) => _onChange(e.target.value, "reward")}
              className={classes.submitText}
              type="number"
              style={{ width: "200px" }}
              id="outlined-error-helper-text"
              value={state.reward}
              variant="outlined"
              helperText={
                state.reward.length == 0 && fieldRequired
                  ? `Reward is required.`
                  : valueSmaller && state.reward == "0"
                  ? "Value must be greater than 0"
                  : false
              }
            />
          </LightTooltip> */}
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
            <LightTooltip title="Briefly describe your proposal" placement="bottom" arrow>
              <TextField
                multiline
                rows={2}
                error={state.description.length == 0 && fieldRequired}
                label="Description"
                value={state.description}
                onChange={(e) => _onChange(e.target.value, "description")}
                id="outlined-error-helper-text"
                helperText={
                  state.description.length == 0 && fieldRequired
                    ? `Description is required.`
                    : "maximum upto 300 characters"
                }
                className={classes.submitText}
                variant="outlined"
              />
            </LightTooltip>
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
          <FormControl
            error
            fullWidth
            className={classes.margin}
            variant="outlined"
          >
            <LightTooltip title="Describe your experience and why you are the best candidate to submit this proposal" placement="bottom" arrow>
              <TextField
                multiline
                rows={2}
                error={state.personalExperience.length == 0 && fieldRequired}
                label={
                  fieldRequired && state.personalExperience.length == 0
                    ? false
                    : "Personal Experience"
                }
                value={state.personalExperience}
                onChange={(e) =>
                  _onChange(e.target.value, "personalExperience")
                }
                id="outlined-error-helper-text"
                helperText={
                  state.personalExperience.length == 0 && fieldRequired
                    ? `Peronsal Experience is required.`
                    : "maximum upto 300 characters"
                }
                className={classes.submitText}
                variant="outlined"
              />
            </LightTooltip>
          </FormControl>
        </div>
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
          <LightTooltip title="Title of milestone" placement="bottom" arrow>
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
          </LightTooltip>

          <LightTooltip title="Estimated days required for completion of milestone" placement="bottom" arrow>
            <TextField
              id="outlined-basic"
              style={{ width: "200px" }}
              error={
                (milestoneDetails.estimatedDays.length == 0 && fieldRequired) ||
                (valueSmaller && milestoneDetails.estimatedDays == "0")
              }
              label={
                (fieldRequired && milestoneDetails.estimatedDays.length == 0) ||
                (valueSmaller && milestoneDetails.estimatedDays == "0")
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
                milestoneDetails.estimatedDays.length == 0 && fieldRequired
                  ? `EstimatedDays are required.`
                  : valueSmaller && milestoneDetails.estimatedDays == "0"
                  ? "Value must be greater than 0"
                  : false
              }
            />
          </LightTooltip>
        </div>
        <div
          style={{
            display: "flex",
            margin: "10px 0px",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <LightTooltip title="Number of developers working on milestone" placement="bottom" arrow>
            <TextField
              id="outlined-basic"
              style={{ width: "200px" }}
              error={
                (milestoneDetails.numberOfDevelopers.length == 0 &&
                  fieldRequired) ||
                (valueSmaller && milestoneDetails.numberOfDevelopers == "0")
              }
              label={
                (fieldRequired &&
                  milestoneDetails.numberOfDevelopers.length == 0) ||
                (valueSmaller && milestoneDetails.numberOfDevelopers == "0")
                  ? false
                  : "Developers Working"
              }
              type="number"
              onChange={(e) =>
                _onChangeMilestoneValue(e.target.value, "numberOfDevelopers")
              }
              className={classes.submitText}
              value={milestoneDetails.numberOfDevelopers}
              helperText={
                milestoneDetails.numberOfDevelopers.length == 0 && fieldRequired
                  ? `Developers working are required.`
                  : valueSmaller && milestoneDetails.numberOfDevelopers == "0"
                  ? "Value must be greater than 0"
                  : false
              }
              variant="outlined"
            />
          </LightTooltip>
          <LightTooltip title="Cost of milestone" placement="bottom" arrow>
            <TextField
              id="outlined-basic"
              error={
                (milestoneDetails.milestoneCost.length == 0 && fieldRequired) ||
                (valueSmaller && milestoneDetails.milestoneCost == "0")
              }
              label={
                (fieldRequired && milestoneDetails.milestoneCost.length == 0) ||
                (valueSmaller && milestoneDetails.milestoneCost == "0")
                  ? false
                  : "Milestone Cost"
              }
              value={milestoneDetails.milestoneCost}
              type="number"
              onChange={(e) =>
                _onChangeMilestoneValue(e.target.value, "milestoneCost")
              }
              style={{ width: "200px" }}
              className={classes.submitText}
              variant="outlined"
              helperText={
                milestoneDetails.description.length == 0 && fieldRequired
                  ? `Description is required.`
                  : "maximum upto 300 characters"
              }
            />
          </LightTooltip>
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
            <LightTooltip title="Briefly describe the milestone" placement="bottom" arrow>
              <TextField
                multiline
                rows={4}
                error={
                  milestoneDetails.description.length == 0 && fieldRequired
                }
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
            </LightTooltip>
          </FormControl>
        </div>
      </>
    );
  };

  const onSelectMilestone = (index: number) => {
    setMilestoneSelected(index);
    setMilestoneDetails(state.milestone[index]);
    setJ(4);
  };

  const projectMilestones = () => {
    return (
      <>
        {props.proposal.status=="Pending" && <div onClick={OnAddMilestone} className={classes.milestone}>
          <AddIcon className={classes.icon} />
          <p className={classes.txt}>Add Milestones</p>
        </div>}
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
                    {props.proposal.status=="Pending" && <> <Typography
                      onClick={(e) => onSelectMilestone(index)}
                      className={classes.updateTxt}
                    >
                      Update
                    </Typography>
                    <HighlightOffSharpIcon
                      onClick={(e) => deleteMilestone(index)}
                      className={classes.deleteTxt}
                    /></>}
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

  const updateMilestone = () => {
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
            value={milestoneDetails.task}
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
            value={milestoneDetails.estimatedDays}
            type="number"
            onChange={(e) =>
              _onChangeMilestoneValue(e.target.value, "estimatedDays")
            }
            className={classes.submitText}
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
            value={milestoneDetails.numberOfDevelopers}
            type="number"
            onChange={(e) =>
              _onChangeMilestoneValue(e.target.value, "numberOfDevelopers")
            }
            error={
              milestoneDetails.numberOfDevelopers.length == 0 && fieldRequired
            }
            className={classes.submitText}
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
            type="number"
            label={
              fieldRequired && milestoneDetails.milestoneCost.length == 0
                ? false
                : "Milestone Cost"
            }
            value={milestoneDetails.milestoneCost}
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
              onChange={(e) =>
                _onChangeMilestoneValue(e.target.value, "description")
              }
              value={milestoneDetails.description}
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

  return ( 
    <div>
      <div>
        <Modal
          title="Update Proposal"
          className={style.modal}
          activeSteps={stepperStep}
          showStepper={true}
          actions={
            <div>
              <div style={{ display: "block" }}>
                {j == 2 ? (
                  <>
                    <Button
                      disabled={disableInputs}
                      primary
                      style={{ marginTop: "10px" }}
                      onClick={AddMilestone}
                    >
                      Add Milestone
                    </Button>
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
                      <Button
                        disabled={disableInputs}
                        primary
                        onClick={(e: any) => handleClickUpdateMilestone(e)}
                      >
                        Update Milestone
                      </Button>
                    ) : props.proposal.status=="Pending" && (
                      <Button
                        primary
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        {showLoader ? (
                          <CircularProgress size={12} />
                        ) : (
                          <p>Update</p>
                        )}
                      </Button>
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
              {j == 4 && updateMilestone()}
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
