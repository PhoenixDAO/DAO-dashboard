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
import { URL, UpdateProposal, Proposal } from "../../const";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import HighlightOffSharpIcon from "@material-ui/icons/HighlightOffSharp";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, Theme } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ContractInit from "../../config/contractsInit";
import Web3 from "web3";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import { countries } from "../../api/countries/contentConstants";
import cn from "classnames";
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
        borderRadius: "7px",
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
      width: "151px",
      [theme.breakpoints.up("xs")]: {
        width: "138px",
      },
      [theme.breakpoints.down("xs")]: {
        width: "50px",
      },
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
      fontSize: "12px",
      display: "inline",
      height: "30%",
    },
    updateTxt: {
      cursor: "pointer",
      color: "#32CD32",
      marginLeft: "5px",
      fontSize: "12px",
      display: "inline",
      paddingRight: "7px",
    },
    txt2: {
      fontSize: "12px",
      fontWeight: "bold",
      display: "inline",
      paddingRight: "7px",
    },
    heading: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      // fontSize: theme.typography.pxToRem(15),
      fontSize: "10px",
      fontWeight: theme.typography.fontWeightRegular,
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

    delete: {
      fontSize: "23px",
      color: "lightgray",
      padding: "0px",
      textAlign: "right",
      display: "inline",
    },

    firstfields: {
      "& .MuiSelect-iconOutlined": {
        right: "7px",
        top: "5px",
        fontSize: "41px",
        color: "#4C42FF",
      },
      "& .MuiInputBase-input": {
        fontFamily: ["ProximaNova", "sans-serif"],
      },
      "& .MuiInputBase-root": {
        fontSize: "12px",
        width: "auto",
        borderRadius: "7px",
        [theme.breakpoints.down("xs")]: {
          marginRight: "0px !important",
        },
      },
      "& .MuiFormLabel-root": {
        fontSize: "12px",
        fontFamily: ["ProximaNova", "sans-serif"],
      },
      "& .MuiFormHelperText-root": {
        fontSize: "10px",
      },
      [theme.breakpoints.down("xl")]: {
        width: "490px",
      },
      [theme.breakpoints.up("lg")]: {
        width: "480px",
      },
      [theme.breakpoints.down("lg")]: {
        //   width: "223px",
        width: "370px",
      },
      [theme.breakpoints.down("md")]: {
        //    width: "167px",
        width: "263px",
      },
      [theme.breakpoints.down("xs")]: {
        //    width: "165px",
        marginRight: "0px",
        width: "100%",
        marginTop: "10px",
      },
      [theme.breakpoints.up("xs")]: {
        width: "160px",
      },
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
    // fundsUsage: props.proposal.fundsUsage,
    // personalExperience: props.proposal.personalExperience,
    experiencedYear: props.proposal.experiencedYear,
    duration: props.proposal.duration,
    collateral: props.proposal.collateral,
    reward: props.proposal.reward,
    numioAddress: props.user.numioAddress,
    milestone: props.proposal.milestone,
    userProfession: props.proposal.userProfession,
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
  const [milestoneDaysTotal, setMilestoneDaysTotal] = useState(0);
  const [phoenixPrice, setPhoenixPrice] = useState(0);
  const [amountInDollars, setAmountInDollars] = useState(0);

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="standard" {...props} />;
  }
  const [j, setJ] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    console.log("props", props);
  }, []);

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
      budget,
      description,
      // duration,
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
      // let checkLink:any = githubLink.match(/(http(s)?:\/\/)?(www.)?(github.com\/)([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
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
        // !budget ||
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
      // reward == "0" ||
      experiencedYear == "0"
      // || personalExperience == "0"
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

  const getPHNXPrice = async () => {
    console.log("hello", milestoneDetails);
    // const phnxResponse = await axios.get(
    //   "https://min-api.cryptocompare.com/data/price?fsym=PHNX&tsyms=USD",
    //   {
    //     headers: {
    //       authorization:
    //         "fa0d2d3f3cf441a5b5b2fa9f31e6638a996d72ad938c7c5f978cf9b1dba8a656",
    //     },
    //   }
    // );

    const phnxResponse = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=phoenixdao&vs_currencies=usd"
    )
      .then((res) => {
        res.json().then((_res) => {
          // totalCap += _res.market_data.market_cap.usd;
          console.log("Res ===>", _res.phoenixdao.usd);
          let firstMilestoneValue: any = parseInt(
            milestoneDetails.milestoneCost
          );
          // setPhoenixPrice(_res.phoenixdao.usd * milestoneDetails.milestoneCost);
          if (firstMilestoneValue) {
            setAmountInDollars(_res.phoenixdao.usd * firstMilestoneValue);
          } else {
            setAmountInDollars(0);
          }
          // console.log("success! XIO", _res.market_data.market_cap.usd);
        });
      })
      .catch((err) => {
        console.warn("ERROR", err);
      });
    // const phnxPrice: any = phnxResponse.data.USD;

    // setPhoenixPrice(phnxPrice);
    // console.log("phnx price ----->>", phnxPrice);
    console.log("phnx response ----->>", phnxResponse);
    console.log("qwe", Number(milestoneDetails.milestoneCost));
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
    getPHNXPrice();
    console.log("In edit proposal modal", props.proposal);
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
  let totalMilestoneCost = 0;
  let totalMilestonesDays = 0;

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

          state.milestone.map((item: any) => {
            let tempDays = Number(item.estimatedDays);
            let tempCost = Number(item.milestoneCost);
            totalMilestoneCost = totalMilestoneCost + tempCost;
            totalMilestonesDays = totalMilestonesDays + tempDays;
          });

          console.log("Total milestone cost", totalMilestoneCost);

          let temp: any = await ContractInit.init();
          console.log("Updating on blockchain");
          console.log("address sd", props.user.numioAddress);
          const onSubmit = await (
            await ContractInit.phoenixProposalContract()
          )?.methods
            .updateProposal(
              // Web3.utils.toWei(state.budget.toString()),
              Web3.utils.toWei(totalMilestoneCost.toString()),
              totalMilestonesDays * 86400,
              //36000,
              Web3.utils.toWei(state.collateral.toString()),
              state.milestone.length,
              props.proposal._id
            )
            .send({
              // from: props.user.numioAddress,
              from: temp.address,
            })
            .then(async (receipt: any) => {
              console.log("recepet", receipt);
              console.log("recept hash", receipt.transactionHash);
              const get: any = await axios.put(
                `${URL}${UpdateProposal}${props.proposal._id}`,
                state,
                {
                  headers: {
                    Authorization: `Bearer ${props.user.token}`,
                  },
                }
              );

              const get2 = await axios.put(
                `${URL}${Proposal}${props.proposal._id}`,
                {
                  status: "Pending",
                },
                {
                  headers: {
                    Authorization: `Bearer ${props.user.token}`,
                  },
                }
              );
            });

          setDisabled(!disabled);
          totalDays = 0;
          setproposalSubmittedFlag(true);

          setShowLoader(false);
          setErrorFlag(false);
          props.close();
          if (props.proposal.status == "Pending") {
            console.log("In if");
            props.openSnackbar("Your proposal was submitted successfully !");
          } else {
            console.log(
              "In else",
              props.proposal.counter,
              props.proposal.status
            );
            props.openSnackbar(
              `Your Proposal was updated successfully! You have used ${
                props.proposal.counter + 1
              } out of 3 chances`,
              "success"
            );
          }

          props.renderAgain();
        } catch (err) {
          console.log("Error here", err);
          setShowLoader(false);
          setApiFailFlag(true);
          setDisableInputs(false);
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
    console.log("In on change value", value);
    console.log("In on change proposal status", props);
    if (
      props.proposal.status != "Pending" &&
      props.proposal.status != "Fail" &&
      props.proposal.status != "Rejected"
    ) {
      console.log("In if");
      return;
    }

    if (
      value < -1 ||
      (value.toString().length > 2 && name == "numberOfDevelopers")
    ) {
      return;
    }
    if (
      value < -1 ||
      (value.toString().length > 3 && name == "estimatedDays")
    ) {
      return;
    }

    if (
      value < -1 ||
      (value.toString().length > 2 && name == "experiencedYear")
    ) {
      return;
    }

    if (name == "collateral") {
      return;
    }

    if (
      // name == "experiencedYear" ||
      name == "duration" ||
      // name == "collateral" ||
      name == "budget"
    ) {
      var reg = new RegExp("^[0-9]+$");
      let test = reg.test(value);
      if (!test && value.length != 0) return;
      if (value < -1 || value.toString().length > 6) {
        return;
      }
    }
    if (name == "firstName" || name == "lastName" || name == "email") {
      return;
    }
    // if (
    //   (name == "name" && value.length > 30) ||
    //   (name == "firstName" && value.length > 30) ||
    //   (name == "lastName" && value.length > 30) ||
    //   (name == "country" && value.length > 30)
    // ) {
    //   return;
    // }
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
    if (name == "milestoneCost") {
      console.log("I if onChangeMilestone", value, name);
      setAmountInDollars(phoenixPrice * value);
    }
    if (
      name == "milestoneCost" ||
      name == "estimatedDays" ||
      name == "numberOfDevelopers"
    ) {
      var reg = new RegExp("^[0-9]+$");
      let test = reg.test(value);
      if (!test && value.length != 0) return;
      if (
        value < -1 ||
        (value.toString().length > 2 && name == "numberOfDevelopers")
      ) {
        return;
      }
      if (
        value < -1 ||
        (value.toString().length > 3 && name == "estimatedDays")
      ) {
        return;
      }

      if (
        value < -1 ||
        (value.toString().length > 6 && name == "milestoneCost")
      ) {
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
    if (showLoader) {
      return;
    }
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
              className={classes.firstfields}
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
              className={classes.firstfields}
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
                    ? "Email is not valid."
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
            margin: "10px 0px",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* <LightTooltip title="Project title" placement="bottom" arrow>
            <TextField
              id="outlined-error-helper-text"
              label="Title"
              error={state.name.length == 0 && fieldRequired}
              onChange={(e) => _onChange(e.target.value, "name")}
              className={classes.firstfields}
              value={state.name}
              helperText={
                state.name.length == 0 && fieldRequired
                  ? `Title is required.`
                  : false
              }
              variant="outlined"
            />
          </LightTooltip> */}

          <FormControl
            //error
            variant="outlined"
            className={classes.firstfields}
          >
            <InputLabel
              id={
                state.userProfession.length == 0 && fieldRequired
                  ? "demo-simple-select-error-label"
                  : "demo-simple-select-outlined-label"
              }
            >
              {state.userProfession.length == 0 && fieldRequired ? (
                <div style={{ color: "red" }}>Profession</div>
              ) : (
                <div>Profession</div>
              )}
            </InputLabel>

            <Select
              error={state.userProfession.length == 0 && fieldRequired}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={state.userProfession}
              onChange={(e) => _onChange(e.target.value, "userProfession")}
              label={"Profession"}
              style={{ marginRight: "5px" }}
            >
              <MenuItem style={{ fontSize: "12px" }} value={"Engineer"}>
                Engineer
              </MenuItem>
              <MenuItem style={{ fontSize: "12px" }} value={"Developer"}>
                Developer
              </MenuItem>
              <MenuItem style={{ fontSize: "12px" }} value={"Project Manager"}>
                Project Manager
              </MenuItem>
              <MenuItem style={{ fontSize: "12px" }} value={"Other"}>
                Other
              </MenuItem>
            </Select>
            <FormHelperText style={{ color: "red" }}>
              {state.userProfession.length == 0 && fieldRequired
                ? "Profession is required"
                : null}
            </FormHelperText>
          </FormControl>
          {/* <LightTooltip title="Your country name" placement="bottom" arrow>
            <TextField
              error={state.country.length == 0 && fieldRequired}
              label="Country"
              value={state.country}
              onChange={(e) => _onChange(e.target.value, "country")}
              id="outlined-error-helper-text"
              helperText={
                state.country.length == 0 && fieldRequired
                  ? `Country is required.`
                  : false
              }
              className={classes.firstfields}
              variant="outlined"
            />
          </LightTooltip> */}
          <FormControl error variant="outlined" className={classes.firstfields}>
            <InputLabel
              id={
                state.country.length == 0 && fieldRequired
                  ? "demo-simple-select-error-label"
                  : "demo-simple-select-outlined-label"
              }
            >
              {state.country.length == 0 && fieldRequired ? (
                <div style={{ color: "red" }}>Country</div>
              ) : (
                <div style={{ color: "#838383" }}>Country</div>
              )}
            </InputLabel>

            <Select
              error={state.country.length == 0 && fieldRequired}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={state.country}
              onChange={(e) => _onChange(e.target.value, "country")}
              label={"Country"}
            >
              {countries.map(({ label }, index, country: any) => {
                return (
                  <MenuItem
                    style={{ fontSize: "12px" }}
                    key={index}
                    value={label}
                  >
                    {label}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>
              {state.country.length == 0 && fieldRequired
                ? "Country is required"
                : null}
            </FormHelperText>
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
            <LightTooltip
              title="Github repository link for the project"
              placement="bottom"
              arrow
            >
              <TextField
                error={
                  (state.githubLink.length == 0 && fieldRequired) ||
                  linkValidation
                }
                label="Github link"
                value={state.githubLink}
                onChange={(e) => _onChange(e.target.value, "githubLink")}
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
        <div className={style.inputDiv}>
          <div
            style={{
              margin: "10px 0px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/* <div className={style.columnDiv}> */}
            <FormControl
              error
              fullWidth
              className={classes.margin}
              variant="outlined"
            >
              <LightTooltip title="Project name" placement="bottom" arrow>
                <TextField
                  id="outlined-error-helper-text"
                  label="Project Name"
                  style={{ marginRight: "5px" }}
                  error={state.name.length == 0 && fieldRequired}
                  onChange={(e) => _onChange(e.target.value, "name")}
                  className={classes.submitText}
                  value={state.name}
                  helperText={
                    state.name.length == 0 && fieldRequired ? (
                      <p style={{ color: "#f44336" }}>
                        Project name is required
                      </p>
                    ) : (
                      false
                    )
                  }
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
              <LightTooltip
                title="Why do you propose to use DAO funds"
                placement="bottom"
                arrow
              >
                <TextField
                  multiline
                  rows={7}
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
              <LightTooltip
                title="Why is your proposal important for the PhoenixDAO ecosystem and what problem does your proposal solve?"
                placement="bottom"
                arrow
              >
                <TextField
                  multiline
                  rows={7}
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
            <LightTooltip
              title="How many years of experience do you have in this field?"
              placement="bottom"
              arrow
            >
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
                    : "Experience in years"
                }
                style={{ marginRight: "5px" }}
                onChange={(e) => _onChange(e.target.value, "experiencedYear")}
                id="outlined-error-helper-text"
                className={classes.firstfields}
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

            <LightTooltip
              title="The amount of PHNX required to submit the proposal."
              placement="bottom"
              arrow
            >
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
                onChange={(e) => _onChange(e.target.value, "collateral")}
                className={classes.firstfields}
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

            {/* <LightTooltip
            title="Budget required for your proposal"
            placement="bottom"
            arrow
          >
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
          </LightTooltip> */}
          </div>
          {/* <div
          style={{
            margin: "10px 0px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        > */}

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
          {/* </div> */}
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
              <LightTooltip
                title="Briefly describe your proposal."
                placement="bottom"
                arrow
              >
                <TextField
                  multiline
                  rows={7}
                  error={state.description.length == 0 && fieldRequired}
                  label="Description"
                  value={state.description}
                  onChange={(e) => _onChange(e.target.value, "description")}
                  id="outlined-error-helper-text"
                  helperText={
                    state.description.length == 0 && fieldRequired
                      ? `Description is required.`
                      : ""
                  }
                  className={classes.submitText}
                  variant="outlined"
                />
              </LightTooltip>
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
            <LightTooltip
              title="Describe your experience and why you are the best candidate to submit this proposal"
              placement="bottom"
              arrow
            >
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
        </div> */}
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
              className={classes.firstfields}
              onChange={(e) => _onChangeMilestoneValue(e.target.value, "task")}
              helperText={
                milestoneDetails.task.length == 0 &&
                fieldRequired &&
                `Title is required.`
              }
              label="Title"
              variant="outlined"
            />
          </LightTooltip>

          <LightTooltip
            title="Estimated days required for completion of milestone"
            placement="bottom"
            arrow
          >
            <TextField
              id="outlined-basic"
              className={classes.firstfields}
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
              onChange={(e) =>
                _onChangeMilestoneValue(e.target.value, "estimatedDays")
              }
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
          <LightTooltip
            title="Number of developers working on milestone"
            placement="bottom"
            arrow
          >
            <TextField
              id="outlined-basic"
              className={classes.firstfields}
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
              onChange={(e) =>
                _onChangeMilestoneValue(e.target.value, "numberOfDevelopers")
              }
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
                  : `PHNX grant request ${amountInDollars}$`
              }
              value={milestoneDetails.milestoneCost}
              onChange={(e) =>
                _onChangeMilestoneValue(e.target.value, "milestoneCost")
              }
              className={classes.firstfields}
              variant="outlined"
              helperText={
                milestoneDetails.description.length == 0 && fieldRequired
                  ? `Milestone cost is required.`
                  : null
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
            <LightTooltip
              title="Briefly describe the milestone."
              placement="bottom"
              arrow
            >
              <TextField
                multiline
                rows={7}
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
    // console.log("Stepper step --->", stepperStep);
    // setStepperStep(stepperStep + 1);
    setMilestoneSelected(index);
    setMilestoneDetails(state.milestone[index]);
    setJ(4);
  };

  const projectMilestones = () => {
    return (
      <>
        {/* {props.proposal.status == "Pending" && (
          <div onClick={OnAddMilestone} className={classes.milestone}>
            <AddIcon className={classes.icon} />
            <p className={classes.txt}>Add Milestones</p>
          </div>
        )} */}
        {props.proposal.status == "Pending" ||
        props.proposal.status == "Rejected" ||
        props.proposal.status == "Fail" ? (
          <div onClick={OnAddMilestone} className={classes.milestone}>
            <AddIcon className={classes.icon} />
            <p className={classes.txt}>Add Milestones</p>
          </div>
        ) : null}
        <div
          style={{ overflowY: "auto", height: "200px", marginBottom: "5px" }}
        >
          {state.milestone.length != 0 &&
            state.milestone.map((item: any, index: number) => {
              return (
                <div className={classes.root1}>
                  <Accordion>
                    <AccordionSummary
                      // expandIcon={<ExpandMoreIcon/>}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <div className={classes.heading}>
                        <div className={classes.txt1}>{item.task}</div>
                        <div style={{ display: "inline" }}>
                          <div className={classes.txt2}>
                            {item.estimatedDays} (days)
                          </div>
                          {props.proposal.status == "Rejected" ||
                          props.proposal.status == "Fail" ||
                          props.proposal.status == "Pending" ? (
                            <>
                              {" "}
                              <Typography
                                onClick={(e) =>
                                  showLoader ? null : onSelectMilestone(index)
                                }
                                className={classes.updateTxt}
                              >
                                Update
                              </Typography>
                              <div
                                onClick={(e) =>
                                  showLoader ? null : deleteMilestone(index)
                                }
                                className={classes.deleteTxt}
                              >
                                <DeleteOutline className={classes.delete} />
                              </div>
                            </>
                          ) : null}
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
              );
            })}
        </div>
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
            className={classes.firstfields}
            onChange={(e) => _onChangeMilestoneValue(e.target.value, "task")}
            helperText={
              milestoneDetails.task.length == 0 &&
              fieldRequired &&
              `Title is required.`
            }
            label="Title"
            value={milestoneDetails.task}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            className={classes.firstfields}
            error={milestoneDetails.estimatedDays.length == 0 && fieldRequired}
            label={
              fieldRequired && milestoneDetails.estimatedDays.length == 0
                ? false
                : "Estimated Days"
            }
            value={milestoneDetails.estimatedDays}
            onChange={(e) =>
              _onChangeMilestoneValue(e.target.value, "estimatedDays")
            }
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
            className={classes.firstfields}
            label={
              fieldRequired && milestoneDetails.numberOfDevelopers.length == 0
                ? false
                : "Developers Working"
            }
            value={milestoneDetails.numberOfDevelopers}
            onChange={(e) =>
              _onChangeMilestoneValue(e.target.value, "numberOfDevelopers")
            }
            error={
              milestoneDetails.numberOfDevelopers.length == 0 && fieldRequired
            }
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
            label={
              fieldRequired && milestoneDetails.milestoneCost.length == 0
                ? false
                : `PHNX grant request ${amountInDollars}$`
            }
            value={milestoneDetails.milestoneCost}
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
              rows={7}
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
                      // primary
                      style={{
                        marginTop: "10px",
                        backgroundColor: "#4C42FF",
                        color: "white",
                      }}
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
                        // primary
                        style={{ backgroundColor: "#4c42ff", color: "white" }}
                        onClick={(e: any) => handleClickNext(e)}
                      >
                        Next
                      </Button>
                    ) : j == 4 ? (
                      <Button
                        disabled={disableInputs}
                        // primary
                        onClick={(e: any) => handleClickUpdateMilestone(e)}
                        style={{ backgroundColor: "#4c42ff", color: "white" }}
                      >
                        Done
                      </Button>
                    ) : props.proposal.status == "Rejected" ||
                      props.proposal.status == "Pending" ||
                      props.proposal.status == "Fail" ? (
                      <Button
                        // primary
                        style={{ backgroundColor: "#4c42ff", color: "white" }}
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        {showLoader ? (
                          <CircularProgress
                            style={{ color: "white" }}
                            size={12}
                          />
                        ) : (
                          <p>
                            {" "}
                            {props.proposal.status == "Pending"
                              ? "Update"
                              : "Re-Submit"}{" "}
                          </p>
                        )}
                      </Button>
                    ) : null}
                    {/* <Button
                      disabled={disableInputs}
                      style={{ marginTop: "10px" }}
                      onClick={(e: any) => handleClickBack(e)}
                    >
                      Back
                    </Button> */}
                    <div className={style.backText}>
                      <i
                        onClick={disableInputs ? undefined : handleClickBack}
                        style={{ color: "#4C42FF", paddingTop: "3px" }}
                        className={cn(style.testing, "fas fa-arrow-left fa-2x")}
                      ></i>
                      <h4
                        onClick={disableInputs ? undefined : handleClickBack}
                        className={style.testing}
                        style={{
                          color: "#4c42ff",
                          fontSize: "20px",
                          paddingLeft: "8px",
                        }}
                      >
                        Back
                      </h4>
                    </div>
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
