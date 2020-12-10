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
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
    root1: {
      width: "100%",
      border: "1px solid #E0E0E0",
      boxShadow: "0 0 6px #888888",
      "& .MuiSvgIcon-root": {
        fontSize: "20px",
        padding: "0px",
      },
      "& .MuiIconButton-root": {
        padding: "0px",
      },
      "& .MuiAccordionSummary-content": {
        justifyContent: "space-between",
        display: "flow-root",
      },
      justifyContent: "space-between",
      marginBottom: "7px",
    },
    txt1: {
      fontSize: "12px",
      fontWeight: "bold",
      display: "inline",
    },
    txt2: {
      fontSize: "12px",
      fontWeight: "bold",
      display: "inline",
      padding: "0px 20px",
    },
    heading: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      // fontSize: theme.typography.pxToRem(15),
      fontSize: "10px",
      fontWeight: theme.typography.fontWeightRegular,
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
    firstfields: {
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

      [theme.breakpoints.down("xl")]: {
        width: "191px",
      },

      [theme.breakpoints.up("lg")]: {
        width: "190px",
      },
      [theme.breakpoints.down("lg")]: {
        width: "192px",
      },
      [theme.breakpoints.down("md")]: {
        width: "191px",
      },
      [theme.breakpoints.down("xs")]: {
        width: "190px",
      },
      [theme.breakpoints.up("xs")]: {
        width: "160px",
      },
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
            className={classes.firstfields}
            style={{ marginRight: "5px" }}
            id="outlined-error-helper-text"
            value={state.firstName}
            variant="outlined"
            helperText={
              state.firstName.length == 0 && fieldRequired
                ? `First Name is required.`
                : false
            }
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            error={state.lastName.length == 0 && fieldRequired}
            label="Last Name"
            id="outlined-error-helper-text"
            className={classes.firstfields}
            variant="outlined"
            value={state.lastName}
            helperText={
              state.lastName.length == 0 && fieldRequired
                ? `Last Name is required.`
                : false
            }
            InputProps={{
              readOnly: true,
            }}
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
            className={classes.firstfields}
            style={{ marginRight: "5px" }}
            value={state.name}
            helperText={
              state.name.length == 0 && fieldRequired
                ? `Title is required.`
                : false
            }
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            error={state.country.length == 0 && fieldRequired}
            label="Country"
            value={state.country}
            id="outlined-error-helper-text"
            helperText={
              state.country.length == 0 && fieldRequired
                ? `Country is required.`
                : false
            }
            className={classes.firstfields}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
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
              InputProps={{
                readOnly: true,
              }}
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
              label="Github link"
              value={state.githubLink}
              id="outlined-error-helper-text"
              helperText={
                state.githubLink.length == 0 && fieldRequired
                  ? `Github link is required.`
                  : linkValidation
                  ? "Github link is not valid."
                  : false
              }
              className={classes.submitText}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
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
              InputProps={{
                readOnly: true,
              }}
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
              InputProps={{
                readOnly: true,
              }}
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
                : "Experience in years"
            }
            type="number"
            id="outlined-error-helper-text"
            //  className={classes.firstfields}
            className={classes.submitText}
            // style={{ marginRight: "5px" }}
            style={{ width: "100%" }}
            value={state.experiencedYear}
            variant="outlined"
            helperText={
              state.experiencedYear.length == 0 && fieldRequired
                ? `Experienced is required.`
                : false
            }
            InputProps={{
              readOnly: true,
            }}
          />
          {/* <TextField
            error={state.budget.length == 0 && fieldRequired}
            label={fieldRequired && state.budget.length == 0 ? false : "Budget"}
            className={classes.firstfields}
            style={{ marginRight: "5px" }}
            type="number"
            id="outlined-error-helper-text"
            value={state.budget}
            variant="outlined"
            helperText={
              state.budget.length == 0 && fieldRequired
                ? `Budget is required.`
                : false
            }
            InputProps={{
              readOnly: true,
            }}
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
            InputProps={{
              readOnly: true,
            }}
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
              InputProps={{
                readOnly: true,
              }}
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
            className={classes.firstfields}
            onChange={(e) => _onChangeMilestoneValue(e.target.value, "task")}
            helperText={
              milestoneDetails.task.length == 0 &&
              fieldRequired &&
              `Title is required.`
            }
            label="Title"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="outlined-basic"
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
            className={classes.firstfields}
            value={milestoneDetails.estimatedDays}
            variant="outlined"
            helperText={
              milestoneDetails.estimatedDays.length == 0 &&
              fieldRequired &&
              `Estimated days are required.`
            }
            InputProps={{
              readOnly: true,
            }}
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
            className={classes.firstfields}
            value={milestoneDetails.numberOfDevelopers}
            helperText={
              milestoneDetails.numberOfDevelopers.length == 0 &&
              fieldRequired &&
              `Number of developers are required.`
            }
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
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
            className={classes.firstfields}
            variant="outlined"
            helperText={
              milestoneDetails.milestoneCost.length == 0 &&
              fieldRequired &&
              `Cost is required.`
            }
            InputProps={{
              readOnly: true,
            }}
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
              InputProps={{
                readOnly: true,
              }}
            />
          </FormControl>
        </div>
      </>
    );
  };

  const projectMilestones = () => {
    return (
      <>
        <div
          style={{ overflowY: "auto", height: "264px", marginBottom: "5px" }}
        >
          {state.milestone.length != 0 &&
            state.milestone.map((item: any, index: number) => {
              return (
                <div className={classes.root1}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <div className={classes.heading}>
                        <div className={classes.txt1}>{item.task}</div>
                        <div>
                          <div className={classes.txt2}>
                            {item.estimatedDays} (days)
                          </div>
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className={classes.descriptionTxt}>
                        {item.description}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
                // <div className={classes.cardGap}>
                //   <Card className={classes.card}>
                //     <div className={classes.flexRow}>
                //       <Typography className={classes.txt1}>
                //         {item.task}
                //       </Typography>
                //       <Typography className={classes.txt1}>
                //         {item.estimatedDays} (days)
                //       </Typography>
                //     </div>
                //     <div className={classes.flexRow}>
                //       <Typography className={classes.descriptionTxt}>
                //         {item.description}
                //       </Typography>
                //     </div>
                //   </Card>
                // </div>
              );
            })}
        </div>
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
