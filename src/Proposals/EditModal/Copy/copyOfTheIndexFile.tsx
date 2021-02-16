import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import React, { useState, useEffect } from "react";
import Modal from "Shared/Modal";
import style from "./style.module.scss";
import Button from "Shared/Button";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import axios from "axios";
import { connect } from "react-redux";
import Web3 from "web3";
import {
  URL,
  Proposal,
  DeleteProposal,
  createTransaction,
} from "../../../const";
import ContractInit from "../../../config/contractsInit";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, Theme } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

import { ethereumNetwork } from "../../../const";

import {
  FormControl,
  Card,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
// import ContractInit from "../config/contractsInit"

//var isGitUrl = require("is-git-url");

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
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
        width: "275px",
      },

      [theme.breakpoints.up("lg")]: {
        width: "274px",
      },
      [theme.breakpoints.down("lg")]: {
        width: "223px",
      },
      [theme.breakpoints.down("md")]: {
        width: "167px",
      },
      [theme.breakpoints.down("xs")]: {
        width: "165px",
      },
      [theme.breakpoints.up("xs")]: {
        width: "160px",
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
    dialogueText: {
      "& .MuiTypography-h6": {
        fontSize: "16px",
      },
      "& .MuiDialogContentText-root": {
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
        padding: "8px 0 14px 0",
        alignItems: "center",
        justifyContent: "space-around",
      },
    },
    dialogueButton: {
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
      minWidth: "100px",
    },
  })
);

const EditModal = (props: any) => {
  const [state, setState] = useState({
    firstName: props.user.first_name,
    lastName: props.user.last_name,
    name: "",
    country: "",
    email: props.user.email,
    description: "",
    githubLink: "",
    budget: "",
    purpose: "",
    importance: "",
    // fundsUsage: "",
    // personalExperience: "",
    experiencedYear: "",
    duration: "",
    collateral: "10",
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
  const [milestoneDaysTotal, setMilestoneDaysTotal] = useState(0);
  const [phoenixPrice, setPhoenixPrice] = useState(0);
  const [amountInDollars, setAmountInDollars] = useState(0);
  const [deleteProposalId, setDeleteProposalId] = useState("");
  const [txHashFromMetaMask, setTxHashFromMetaMask] = useState(0);
  const [openDialogueState, setOpenDialogueState] = useState(false);

  // const [totalMilestonesDays, setTotalMilestonesDays] = useState(0);

  // const [totalMilestoneCost, setTotalMilestoneCost] = useState(0);

  const openDialogue = (e: any) => {
    e.preventDefault();
    setOpenDialogueState(true);
  };
  const handleDialogue = (result: boolean) => {
    setOpenDialogueState(false);
    if (result) {
      handleSubmit();
    }
  };

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="standard" {...props} />;
  }

  let totalMilestonesDays: any = 0;
  let totalMilestoneCost: any = 0;

  const [j, setJ] = useState(0);

  const classes = useStyles();

  // Get PHNX pries and push into balances result
  const phnx = {};
  const getPHNXPrice = async () => {
    console.log("hello");
    const phnxResponse = await axios.get(
      "https://min-api.cryptocompare.com/data/price?fsym=PHNX&tsyms=USD",
      {
        headers: {
          authorization:
            "fa0d2d3f3cf441a5b5b2fa9f31e6638a996d72ad938c7c5f978cf9b1dba8a656",
        },
      }
    );
    const phnxPrice: any = phnxResponse.data.USD;

    setPhoenixPrice(phnxPrice);
    console.log("----->>", phnxPrice);
    console.log("----->>", phnxResponse);
    console.log("qwe", Number(milestoneDetails.milestoneCost));
  };
  // console.log('PHNX :', phnxPrice);
  // phnx.name = 'Phnx';
  // phnx.usd = phnxPrice;
  // conversionRates.push(phnx);

  useEffect(() => {
    getPHNXPrice();
  }, []);

  const handleClickNext = (e: any) => {
    let http: any = state.githubLink.split("http://");
    let https: any = state.githubLink.split("https://");
    console.log("http", http, http.length);
    console.log("https", https, https.length);
    let link = "";
    if (http.length == 2) {
      link = http[1];
      console.log("match1", http[1], link);
    } else {
      link = https[1];
      console.log("match2", https[1], link);
    }
    console.log("check slack now", link);
    // setState({ ...state, ["githubLink"]: stat });
    // if (slicedHttps == "https://") {
    //   console.log("Slice the githubLink hhtps");
    //   const checkHttp = githubLink.substring(9);
    //   console.log("Http", checkHttp);
    //   setState({ ...state, ["githubLink"]: checkHttp });
    // }

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
      // let checkLink: any = githubLink.match(
      //   /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      // );
      if (link == undefined) {
        link = state.githubLink;
      }
      let checkLink =
        link.split("github.com/").length > 1 &&
        link.split("github.com/")[0] === "";
      console.log("Link check", checkLink);
      // console.log("githubLink.split(github.com/)",githubLink.split("github.com/"),checkLink)
      // let checkLink = temp.length>1 && temp[0]=="";
      // let checkLink: any = githubLink.match(
      //   /github.com\/([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      // );
      if (emailValid == null) {
        setEmailValid(true);
        return;
      } else {
        setEmailValid(false);
      }
      if (!checkLink) {
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

  const AddMilestone = () => {
    setAmountInDollars(0);
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

    //console.log("Check array milestoneCost", array.milestoneCost);
    console.log("check state", state);
    array.map((item: any) => {
      console.log(item.estimatedDays);
      let tempDays = Number(item.estimatedDays);
      let tempCost = Number(item.milestoneCost);
      totalMilestoneCost = totalMilestoneCost + tempCost;
      totalMilestonesDays = totalMilestonesDays + tempDays;
    });

    // setState({ ...state, ["duration"]: totalMilestonesDays });

    console.log("working");
    console.log("Check array", totalMilestonesDays);
    console.log("check array cost", totalMilestoneCost);

    totalMilestonesDays = totalMilestonesDays.toString();
    totalMilestoneCost = totalMilestoneCost.toString();

    setState({
      ...state,
      ["budget"]: totalMilestoneCost,
      ["milestone"]: array,
      ["duration"]: totalMilestonesDays,
    });

    //console.log("check state", state);

    setMilestoneDaysTotal(totalMilestonesDays);
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
  console.log("check state", state);

  const handleMilestoneBack = () => {
    console.log("Back Button Click", state.milestone);
    if (state.milestone.length != 0) {
      console.log("if");
      setJ(3);
    } else {
      console.log("else", j);
      setJ(1);
    }
  };

  const handleClickBack = (e: any) => {
    if (stepperStep > 0) {
      console.log("In if 1");
      setStepperStep((prevActiveStep: any) => prevActiveStep - 1);
    }
    if (showLoader) {
      console.log("In if 2");
      return null;
    } else if (j == 0) {
      console.log("In else if");
      console.log("Cannot go back");
    } else {
      console.log("In else");
      if (state.milestone.length != 0 && j == 3) {
        setJ(j - 2);
      } else {
        setJ(j - 1);
      }
    }
  };

  const submitProposalOnBlockchain = async (id: any) => {
    console.log("000000000000000000000000000000000000", id);
    let temp: any = await ContractInit.init();
    console.log("address sd", props.user.numioAddress);
    const onSubmit = await (
      await ContractInit.phoenixProposalContract()
    )?.methods
      .submitProposal(
        Web3.utils.toWei(state.budget),
        milestoneDaysTotal * 86400,
        //36000,
        Web3.utils.toWei(state.collateral),
        state.milestone.length,
        id
      )
      .send({
        // from: props.user.numioAddress,
        from: temp.address,
      })
      .then(async (receipt: any) => {
        console.log("recepet", receipt);
        console.log("recept hash", receipt.transactionHash);
        setTxHashFromMetaMask(receipt.transactionHash);
        props.getTxHashFromMetaMask(receipt);
        let body = {
          TxHash: receipt.transactionHash,
          type: "Proposal",
          numioAddress: props.user.numioAddress,
          Id: id,
        };

        const get = await axios.post(`${URL}${createTransaction}`, body, {
          headers: {
            Authorization: `Bearer ${props.user.token}`,
          },
        });
      })
      .catch(async (err: any) => {
        console.log("err", err);
        console.log("in error block", err);
        const get = await axios.delete(`${URL}${DeleteProposal}${id}`, {
          data: { numioAddress: props.user.numioAddress },
          headers: {
            Authorization: `Bearer ${props.user.token}`,
          },
        });
        setDeleteProposalId("");
        setShowLoader(false);
        throw err;
        props.openSnackbar("Oops! Something went wrong 1", "error");
      });
    // .on("transactionHash", (hash: any) => {
    //   // hash of tx
    //   console.log("tranasction hash", hash);
    // })
    // .on("confirmation", async function (
    //   confirmationNumber: any,
    //   receipt: any
    // ) {
    //   if (confirmationNumber === 1) {
    //     console.log(
    //       "confirmed now, console receipt",
    //       receipt.transactionHash
    //     );
    //     let body = {
    //       TxHash: receipt.transactionHash,
    //       type: "Proposal",
    //       numioAddress: props.user.numioAddress,
    //       Id: id,
    //     };
    //     const get = await axios.post(`${URL}${createTransaction}`, body, {
    //       headers: {
    //         Authorization: `Bearer ${props.user.token}`,
    //       },
    //     });
    //   }
    // })
    // .on("error", async function (error: any) {
    //   console.log("in error block", error);
    //   const get = await axios.delete(`${URL}${DeleteProposal}${id}`, {
    //     data: { numioAddress: props.user.numioAddress },
    //     headers: {
    //       Authorization: `Bearer ${props.user.token}`,
    //     },
    //   });
    // setDeleteProposalId("");
    // setShowLoader(false);
    // props.openSnackbar("Oops! Something went wrong 1", "error");
    // });
  };

  const handleSubmit = async () => {
    console.log("submit", state);
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
      if (temp.network != ethereumNetwork) {
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
          props.openDialogue();
          // props.openSnackbar(
          //   "Your Proposal was submittted successfully !",
          //   "success"
          // );
        } catch (err) {
          let temp: any = await ContractInit.init();
          console.log("network", temp);
          console.log("check error nowsdasdsdasdasdasdsda", err);
          setShowLoader(false);
          setApiFailFlag(true);
          if (err.response && err.response.data && err.response.data.result) {
            console.log("Failed", err.response.data.result);

            props.openSnackbar(err.response.data.result.message, "error");
          } else {
            props.openSnackbar("Oops! Something went wrong ", "error");
          }
          console.log(err.status);
          console.log(err.message);
        }
      }
    } catch (e) {
      let temp: any = await ContractInit.init();
      console.log("network", temp);
      console.log("check error nowsdasdsdasdasdasdsda", e);
      setShowLoader(false);
      setApiFailFlag(true);

      // const get = await axios.delete(`${URL}${DeleteProposal}${deleteProposalId}`, {
      //   data: { numioAddress: props.user.numioAddress },
      //   headers: {
      //     Authorization: `Bearer ${props.user.token}`,
      //   },
      // });
      setDeleteProposalId("");
      if (e.response && e.response.data && e.response.data.result) {
        console.log("Failed", e.response.data.result);
        props.openSnackbar(e.response.data.result.message, "error");
      } else {
        const get = await axios.delete(
          `${URL}${DeleteProposal}${deleteProposalId}`,
          {
            data: { numioAddress: props.user.numioAddress },
            headers: {
              Authorization: `Bearer ${props.user.token}`,
            },
          }
        );
        setDeleteProposalId("");
        setShowLoader(false);
        props.openSnackbar("Oops! Something went wrong ", "error");
      }
      console.log("======e", e);
    }
  };

  const _onChange = (value: any, name: any) => {
    // console.log("check now", value);
    // const checkHttp = value.substring(7);
    // console.log("Check Http", checkHttp);
    // console.log("name", name);
    // const slicedHttp = value.slice(0, 4);
    // // console.log("check Http", slicedHttp);
    // if (slicedHttp == "http") {
    //   console.log("Slice the value http");
    //   const checkHttp = value.substring(7);
    //   console.log("Http", checkHttp);
    //   setState({ ...state, ["githubLink"]: checkHttp });
    // }
    // if (slicedHttp == "https") {
    //   console.log("Slice the value hhtps");
    //   const checkHttp = value.substring(9);
    //   console.log("Http", checkHttp);
    //   setState({ ...state, ["githubLink"]: checkHttp });
    // }
    if (
      name == "experiencedYear" ||
      name == "duration" ||
      name == "collateral" ||
      name == "budget"
    ) {
      var reg = new RegExp("^[0-9]+$");
      let test = reg.test(value);
      if (!test && value.length != 0) return;
      if (value < -1 || value.toString().length > 6) {
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
      var reg = new RegExp("^[0-9]+$");
      let test = reg.test(value);
      if (!test && value.length != 0) return;
      if (value < -1 || value.toString().length > 6) {
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
    if (name == "milestoneCost") {
      let tempValue: any = (value * phoenixPrice).toFixed(4);
      console.log(tempValue);
      setAmountInDollars(tempValue);
    }
  };

  const OnAddMilestone = () => {
    if (showLoader) {
      console.log("In if 2");
      return null;
    }
    setJ(2);
  };

  const deleteMilestone = (index: any) => {
    console.log("In delete ");
    if (showLoader) {
      console.log("In if 2");
      return null;
    }
    let array = state.milestone;

    // totalMilestonesDays =
    //   totalMilestonesDays - state.milestone[i].estimatedDays;
    // totalMilestoneCost = totalMilestoneCost - state.milestone[i].milestoneCost;
    // console.log("check state", state);

    totalMilestoneCost = state.budget;
    totalMilestonesDays = state.duration;

    array.map((item: any, i: number) => {
      console.log(item.estimatedDays);
      let tempDays = Number(item.estimatedDays);
      let tempCost = Number(item.milestoneCost);
      if (i == index) {
        totalMilestoneCost = totalMilestoneCost - tempCost;
        totalMilestonesDays = totalMilestonesDays - tempDays;
      }
    });

    // setState({ ...state, ["duration"]: totalMilestonesDays });

    console.log("working");
    console.log("Check array", totalMilestonesDays);
    console.log("check array cost", totalMilestoneCost);

    totalMilestonesDays = totalMilestonesDays.toString();
    totalMilestoneCost = totalMilestoneCost.toString();

    array.splice(index, 1);
    console.log("check new array", array);

    setState({
      ...state,
      ["budget"]: totalMilestoneCost,
      ["milestone"]: array,
      ["duration"]: totalMilestonesDays,
    });

    // setState({ ...state, ["milestone"]: array });
    if (array.length == 0) {
      setJ(2);
    }
    console.log("State here", state);
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
              style={{ marginRight: "5px" }}
              // onChange={(e) => _onChange(e.target.value, "firstName")}
              className={classes.firstfields}
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
          </LightTooltip>
          <LightTooltip title="Last name" placement="bottom" arrow>
            <TextField
              error={state.lastName.length == 0 && fieldRequired}
              label="Last Name"
              // onChange={(e) => _onChange(e.target.value, "lastName")}
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
                // onChange={(e) => _onChange(e.target.value, "email")}
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
                InputProps={{
                  readOnly: true,
                }}
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
          <LightTooltip title="Project title" placement="bottom" arrow>
            <TextField
              id="outlined-error-helper-text"
              label="Title"
              style={{ marginRight: "5px" }}
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
          </LightTooltip>
          <LightTooltip title="Your country name" placement="bottom" arrow>
            <TextField
              error={state.country.length == 0 && fieldRequired}
              label="Country"
              value={state.country}
              className={classes.firstfields}
              onChange={(e) => _onChange(e.target.value, "country")}
              id="outlined-error-helper-text"
              helperText={
                state.country.length == 0 && fieldRequired
                  ? `Country is required.`
                  : false
              }
              variant="outlined"
            />
          </LightTooltip>
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
            <LightTooltip title="github.com/" placement="bottom" arrow>
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
                // InputProps={{
                //   startAdornment: <InputAdornment position="start"></InputAdornment>,
                // }}
                // style={{fontSize:"16px"}}
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
            <LightTooltip
              title="Why are you proposing to request PhoenixDAO funds?"
              placement="bottom"
              arrow
            >
              <TextField
                error={state.purpose.length == 0 && fieldRequired}
                label="Purpose to use PhoenixDAO funds"
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
              title="Describe in detail what the funds will be used for"
              placement="bottom"
              arrow
            >
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
            <LightTooltip
              title="Why is your proposal important for the PhoenixDAO ecosystem and what problem does your proposal solve?"
              placement="bottom"
              arrow
            >
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
              onChange={(e) => _onChange(e.target.value, "experiencedYear")}
              className={classes.firstfields}
              style={{ marginRight: "5px" }}
              id="outlined-error-helper-text"
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
              //  onChange={(e) => _onChange(e.target.value, "collateral")}
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
              InputProps={{
                readOnly: true,
              }}
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
        >
          
          <LightTooltip title="tooltip" placement="bottom" arrow>
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
          </LightTooltip>
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
            <LightTooltip
              title="Briefly describe your proposal."
              placement="bottom"
              arrow
            >
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
                    : "Maximum up to 300 characters."
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
            {/* <LightTooltip
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
              </LightTooltip> */}
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
              style={{ marginRight: "5px" }}
              onChange={(e) => _onChangeMilestoneValue(e.target.value, "task")}
              helperText={
                milestoneDetails.task.length == 0 &&
                fieldRequired &&
                `Title is required.`
              }
              label="Title"
              className={classes.firstfields}
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
              className={classes.firstfields}
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
              className={classes.firstfields}
              style={{ marginRight: "5px" }}
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
                  : `Cost in PHNX ${amountInDollars}$`
              }
              value={milestoneDetails.milestoneCost}
              onChange={(e) =>
                _onChangeMilestoneValue(e.target.value, "milestoneCost")
              }
              className={classes.firstfields}
              variant="outlined"
              helperText={
                milestoneDetails.description.length == 0 && fieldRequired
                  ? `Description is required.`
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
                // helperText={
                //   milestoneDetails.description.length == 0 &&
                //   fieldRequired &&
                //   `Description is required.`
                // }
                helperText={
                  milestoneDetails.description.length == 0 && fieldRequired
                    ? `Description is required.`
                    : "Maximum up to 300 characters."
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
        {/* <div onClick={OnAddMilestone} className={classes.milestone}>
            <AddIcon className={classes.icon} />
            <p className={classes.txt}>Add Milestones</p>
          </div> */}
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
                      <div>
                        <div className={classes.txt2}>
                          {item.estimatedDays} (days)
                        </div>
                        <div
                          onClick={(e) => deleteMilestone(index)}
                          className={classes.deleteTxt}
                        >
                          <DeleteOutline className={classes.delete} />
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
        onClose={() => handleDialogue(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className={classes.dialogueText}
      >
        <DialogTitle
          className={classes.dialogueText}
          id="alert-dialog-slide-title"
        >
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent className={classes.dialogueText}>
          <DialogContentText
            className={classes.dialogueText}
            id="alert-dialog-slide-description"
          >
            Submitting the proposal will send the approval request to the admin.
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogueText}>
          <Button
            className={classes.dialogueButton}
            onClick={() => handleDialogue(false)}
            color="primary"
          >
            Disagree
          </Button>
          <Button
            className={classes.dialogueButton}
            onClick={() => handleDialogue(true)}
            color="primary"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <div>
          <Modal
            title="Submit a Proposal"
            styleFlag="proposalModal"
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
                        <div>
                          <Button onClick={OnAddMilestone} secondary>
                            Add Milestone
                          </Button>

                          <Button
                            primary
                            style={{ marginTop: "10px" }}
                            // disabled={showLoader}
                            onClick={
                              (e: any) => (!showLoader ? openDialogue(e) : null)
                              // handleSubmit()
                            }
                          >
                            {showLoader ? (
                              <CircularProgress size={12} color="inherit" />
                            ) : (
                              <p>Submit</p>
                            )}
                          </Button>
                        </div>
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
