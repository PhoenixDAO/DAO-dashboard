import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import React, { useState, useEffect } from "react";
import Modal from "Shared/Modal";
import style from "./style.module.scss";
import Button from "Shared/Button";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import axios from "axios";
import { connect } from "react-redux";
import Web3 from "web3";
import { URL, Proposal, DeleteProposal,createTransaction } from "../../const";
import ContractInit from "../../config/contractsInit";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, Theme } from "@material-ui/core/styles";

import {
  FormControl,
  Card,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
// import ContractInit from "../config/contractsInit"

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  close: () => any;
  setSnackBar: () => any;
};

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
        padding: "0px",
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

    descriptionTxt: {
      marginTop: "5px",
      color: "#818181",
      fontSize: "10px",
      textAlign: "start",
      // height: "35px",
      // overflowY: "scroll",
      // overflowX: "hidden",
      // display: "flex",
      // overflowWrap: "break-word",
      // maxWidth: "420px",
    },
    icon: {
      height: "20px",
      width: "20px",
      fontSize: "40px",
      color: "#2680EB",
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
    heading: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      // fontSize: theme.typography.pxToRem(15),
      fontSize: "10px",
      fontWeight: theme.typography.fontWeightRegular,
    },

    deleteTxt: {
      cursor: "pointer",
      fontSize: "12px",
      display: "inline",
      height: "30%",
    },
    delete: {
      fontSize: "23px",
      color: "lightgray",
      padding: "0px",
      textAlign: "right",
    },
    dialogueText:{
      "& .MuiTypography-h6":{
        fontSize: "16px",
      },
      "& .MuiDialogContentText-root" : {
        fontSize: "12px",
      },
      "& .MuiDialogTitle-root": {
        flex: "0 0 auto",
        margin: "0 0 5px 0",
        padding: "12px 24px 8px 24px",
        backgroundColor: "#EA8604",
        color: "#FFFFFF",
    },
    "& .MuiDialogActions-root": {
      flex: "0 0 auto",
    display: "flex",
    padding:"8px 0 14px 0",
    alignItems: "center",
    justifyContent: "space-around",
  }
    },
    dialogueButton:{
        border: "1px solid",
        cursor: "pointer",
        height: "32px",
        display: "flex",
        padding: "0 20rem",
        position: "relative",
        fontSize: "12px",
        transition: "0.2s",
        alignItems: "center",
        fontWeight: "bold",
        userWelect: "none",
        borderRadius: "5rem",
        justifyContent: "center",
        minWidth:"100px"
  }

  })
);

const EditModal = (props: any) => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    name: "",
    country: "",
    email: "",
    description: "",
    githubLink: "",
    budget: "",
    purpose: "",
    importance: "",
    fundsUsage: "",
    personalExperience: "",
    experiencedYear: "",
    duration: "1",
    collateral: "",
    reward: "1",
    numioAddress: props.user.numioAddress,
    txHash:
      "0x93D731e1" +
      Math.random() +
      "0x93D731e1" +
      Math.random() +
      "974e2B5686B282DabF4ec5471eDD86D9" +
      Math.random(),
    milestone: [],
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
  const [proposalsFromApi, setProposalsFromApi]: any = useState([{}]);
  const [handleMilestones, setHandleMilestones]: any = useState([1]);
  const [stepperStep, setStepperStep]: any = useState(0);
  const [milestoneCount, setMilestoneCount]: any = useState(1);
  const [errorFlag, setErrorFlag] = useState(false);
  const [proposalSubmittedFlag, setproposalSubmittedFlag] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [apiFailFlag, setApiFailFlag] = useState(false);
  const [disableInputs, setDisableInputs] = useState(false);
  const [valueSmaller, setValueSmaller] = useState(false);
  const [ethereumNetworkError, setEthereumNetworkError] = useState(false);
  const [deleteProposalId,setDeleteProposalId]=useState("");
  
  const [openDialogueState,setOpenDialogueState]=useState(false);

const openDialogue = (e:any) =>{
  e.preventDefault();
  setOpenDialogueState(true)
}
  const handleDialogue = (result:boolean)=>{

    setOpenDialogueState(false);
    if(result){
      handleSubmit();
    }
    
  }

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
    console.log("check array nowasdasdasdas", array);
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
      } else {
        setJ(j - 1);
      }
    }
  };

  const submitProposalOnBlockchain = async (id: any) => {
    console.log("000000000000000000000000000000000000", id);
    const onSubmit = await (
      await ContractInit.phoenixProposalContract()
    )?.methods
      .submitProposal(
        Web3.utils.toWei(state.reward),
        36000,
        Web3.utils.toWei(state.collateral),
        state.milestone.length,
        id
      )
      .send({
        from: props.user.numioAddress,
      })
      .on("transactionHash", (hash: any) => {
        // hash of tx
        console.log("tranasction hash", hash);
      })
      .on("confirmation", async function (confirmationNumber: any, receipt: any) {
        if (confirmationNumber === 1) {
          console.log("confirmed now, console receipt",receipt.transactionHash);
          let body={
            TxHash:receipt.transactionHash,
            type: "Proposal",
            numioAddress: props.user.numioAddress,
            Id: id
          }
          const get = await axios.post(`${URL}${createTransaction}`, body,
          {
            headers: {
              Authorization: `Bearer ${props.user.token}`,
            },
          });
        }
      })
      .on("error", async function (error: any) {
        console.log("in error block")
        const get = await axios.delete(`${URL}${DeleteProposal}${id}`, {
          data: { numioAddress: props.user.numioAddress },
          headers: {
            Authorization: `Bearer ${props.user.token}`,
          },
        });
        setDeleteProposalId("");
        setShowLoader(false);
        props.openSnackbar(
          "Ops! Something went wrong",
          "error"
        );
      });
  };

  const handleSubmit = async () => {
    try {
      if (state.milestone.length == 0) {
        setFieldRequired(true);
        return;
      } else {
        setFieldRequired(false);
      }
      let temp: any = await ContractInit.init();
    console.log("123", temp.network);
      // const networkResult: any = props.network;
      // console.log("111111111111111 ", networkResult);
      if (temp.network != "rinkeby") {
        setEthereumNetworkError(true);
        throw "Ethereum Network invalid !";
      }
      let totalDays = 0;
      let daysInNumber;
      let timeInSeconds;
      if (showLoader) {
        return null;
      } else {
        try {
          console.log("Collateral --->", state.collateral);
          handleMilestones.map((item: any) => {
            daysInNumber = parseInt(item.days);
            totalDays = totalDays + daysInNumber;
          });
          setStepperStep((prevActiveStep: any) => Number(prevActiveStep) + 1);
          console.log("In Else ,Calling Api", state);
          setDisableInputs(true);
          setErrorFlag(false);
          setApiFailFlag(false);
          setEthereumNetworkError(false);
          timeInSeconds = totalDays * 86400;
          console.log("Token from props", props.user.numioAddress);
          setShowLoader(true);
          setErrorFlag(false);
          console.log("One 111", timeInSeconds);
          state.numioAddress = props.user.numioAddress;
          const get: any = await axios.post(`${URL}${Proposal}`, state, {
            headers: {
              Authorization: `Bearer ${props.user.token}`,
            },
          });
          setDeleteProposalId(get.data.result._id);
          console.log("check numio address now", get.data.result);
          await submitProposalOnBlockchain(get.data.result._id);
          setDisabled(!disabled);
          totalDays = 0;
          setproposalSubmittedFlag(true);
          setShowLoader(false);
          setErrorFlag(false);
          console.log("CLose --->");
          props.close();
          props.openSnackbar(
            "Your Proposal was submittted successfully !",
            "success"
          );
        } catch (err) {
          console.log("check error nowsdasdsdasdasdasdsda", err);
          setShowLoader(false);
          setApiFailFlag(true);
          if (err.response && err.response.data && err.response.data.result) {
            console.log("Failed", err.response.data.result);
            props.openSnackbar(err.response.data.result.message, "error");
          } else {
            props.openSnackbar("Ops something went wrong", "error");
          }
          console.log(err.status);
          console.log(err.message);
        }
      }
    } catch (e) {
      console.log("check error nowsdasdsdasdasdasdsda", e);
      setShowLoader(false);
      setApiFailFlag(true);

      // const get = await axios.delete(`${URL}${DeleteProposal}${deleteProposalId}`, {
      //   data: { numioAddress: props.user.numioAddress },
      //   headers: {
      //     Authorization: `Bearer ${props.user.token}`,
      //   },
      // });
      setDeleteProposalId("")
      if (e.response && e.response.data && e.response.data.result) {
        console.log("Failed", e.response.data.result);
        props.openSnackbar(e.response.data.result.message, "error");
      } else {
        props.openSnackbar("Oops something went wrong", "error");
      }
      console.log("======e", e);
    }
  };

  const _onChange = (value: any, name: any) => {
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
      (name == "country" && value.length > 25)
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

  const OnAddMilestone = () => {
    setJ(2);
  };

  const deleteMilestone = (index: any) => {
    let array = state.milestone;
    array.splice(index, 1);
    console.log("check new array", array);
    setState({ ...state, ["milestone"]: array });
    if (array.length == 0) {
      setJ(2);
    }
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

  const projectMilestones = () => {
    return (
      <>
        <div onClick={OnAddMilestone} className={classes.milestone}>
          <AddIcon className={classes.icon} />
          <p className={classes.txt}>Add Milestones</p>
        </div>
        {state.milestone.length != 0 &&
          state.milestone.map((item: any, index) => {
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
                      <div className={classes.txt1}>
                        {item.estimatedDays} (days)
                      </div>
                      <div
                        onClick={(e) => deleteMilestone(index)}
                        className={classes.deleteTxt}
                      >
                        <DeleteOutline className={classes.delete} />
                      </div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className={classes.descriptionTxt}>
                      {item.description}
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                {/* <Typography className={classes.descriptionTxt}>

                      {item.description}
                    </Typography> */}
              </div>
            );
          })}
      </>
    );
  };

  return (
    <>
    <Dialog
        open={openDialogueState}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>handleDialogue(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className={classes.dialogueText}
      >
        <DialogTitle className={classes.dialogueText}id="alert-dialog-slide-title">{"Are you sure?"}</DialogTitle>
        <DialogContent className={classes.dialogueText}>
          <DialogContentText className={classes.dialogueText} id="alert-dialog-slide-description">
            Submitting the proposal will sent the approval request to admin
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogueText}>
        
          <Button className={classes.dialogueButton} onClick={()=>handleDialogue(false)} color="primary">
            Disagree
          </Button>
          <Button className={classes.dialogueButton} onClick={()=>handleDialogue(true)} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    <div>

      <div>
        
        <Modal
          title="Submit a Proposal"
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
                    ) : (
                      <Button
                        primary
                        // disabled={showLoader}
                        onClick={(e:any)=> 
                          !showLoader?openDialogue(e):null
                          // handleSubmit()
                        }
                      >
                        {showLoader ? (
                          <CircularProgress size={12} />
                        ) : (
                          <p>Submit</p>
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
            </>
          )}
        </Modal>
      </div>
    </div>
    </>
  );
};
const mapStateToProps = (state: any) => ({
  user: state.userDetails.user,
  network: state.layoutReducer.network,
});

export default connect(mapStateToProps)(EditModal);
