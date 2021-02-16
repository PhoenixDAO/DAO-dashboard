import React, { useState, useEffect } from "react";
import Modal from "Shared/Modal";
import Button from "Shared/Button";
import iconLike from "assets/images/icons/like.svg";
import style from "./style.module.scss";
import axios from "axios";
import { connect } from "react-redux";
import Collapse from "./collapse";
import Collapse2 from "../../collapsable2";
import spinner from "../../assets/spinner-black.svg";
import { CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { URL, Proposal, ProposalByStatus } from "../../const";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import { withStyles, Theme, makeStyles } from "@material-ui/core/styles";
import ContractInit from "../../config/contractsInit";

import { createStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
//import Web3 from "web3";
import Web3 from "web3";
import { ethereumNetwork, getProposalById } from "../../const";

const useStyles = makeStyles((theme) =>
  createStyles({
    dialogueText: {
      "& .MuiTypography-h6": {
        fontSize: "16px",
      },
      "& .MuiDialogContentText-root": {
        fontSize: "15px",
        color: "black",
        marginTop: "20px",
        marginBottom: "20px",
      },
      "& .MuiDialogTitle-root": {
        flex: "0 0 auto",
        margin: "0 0 5px 0",
        padding: "12px 24px 8px 24px",
        backgroundColor: "#EA8604",
        color: "#FFFFFF",
      },
      "& .MuiDialogActions-root": {
        marginTop: "20px",
        marginBottom: "20px",
        flex: "0 0 auto",
        display: "flex",
        padding: "8px 0 14px 0",
        alignItems: "center",
        justifyContent: "space-around",

        flexDirection: "column",
      },
      "& .MuiDialogContent-root": {
        overflowY: "auto",
        width: "85%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "6px",
        padding: "0",
        flex: "0 0 auto",
      },
      "& .MuiDialog-paperWidthSm": {
        maxWidth: "486px",
        maxHeight: "90vh",
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
    firstfields: {
      "& .MuiInputBase-root": {
        fontSize: "12px",
        // width: "100%",
        //  marginLeft: "24px",
      },
      "& .MuiFormLabel-root": {
        fontSize: "12px",
      },
      "& .MuiFormHelperText-root": {
        fontSize: "10px",
      },

      [theme.breakpoints.down("xl")]: {
        width: "188px",
      },

      [theme.breakpoints.up("lg")]: {
        width: "198px",
      },
      [theme.breakpoints.down("lg")]: {
        width: "198px",
      },
      [theme.breakpoints.down("md")]: {
        width: "165px",
      },
      [theme.breakpoints.down("xs")]: {
        width: "165px",
      },
      [theme.breakpoints.up("xs")]: {
        width: "160px",
      },
    },
    description: {
      [theme.breakpoints.down("sm")]: {
        width: "220px",
        "& .MuiInputBase-root": {
          fontSize: "18px",
          marginBottom: "10px",
          width: "220px",
        },
        "& .MuiFormLabel-root": {
          fontSize: "18px",
          fontWeight: "normal",
          color: "#EA8604",
          width: "max-content",
        },
        "& .MuiFormHelperText-root": {
          fontSize: "5px",
        },
      },
      [theme.breakpoints.up("sm")]: {
        width: "420px",

        "& .MuiInputBase-root": {
          fontSize: "18px",
          marginBottom: "10px",
          width: "420px",
        },
        "& .MuiFormLabel-root": {
          fontSize: "18px",
          fontWeight: "normal",
          color: "#EA8604",
        },
        "& .MuiFormHelperText-root": {
          fontSize: "5px",
        },
      },
      "& .MuiInputBase-root": {
        fontSize: "18px",

        marginBottom: "10px",
      },
      "& .MuiFormLabel-root": {
        fontSize: "18px",
        fontWeight: "normal",
        color: "#EA8604",
        width: "max-content",
      },
      "& .MuiFormHelperText-root": {
        fontSize: "10px",
      },
      "& .MuiOutlinedInput-inputMultiline": {
        padding: "0",
        fontSize: "13px",
      },
    },
  })
);

const checkAccounts = async () => {
  let temp = await ContractInit.init();
  console.log("Accounts testing", temp);
  console.log("Working");
};
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

const changeFormat = (date: any) => {
  date = new Date(date);
  return `${new Date(date.getTime()).getDate()}/${
    new Date(date.getTime()).getMonth() + 1
  }/${new Date(date.getTime()).getFullYear()}`;
};
const ProposalModal = (props: any) => {
  const [myLoading1, setMyLoading1] = useState(false);
  const [myLoading2, setMyLoading2] = useState(false);
  const [disable, setDisable] = useState(false);
  const [metaMaskRejectError, setMetaMaskRejectError] = useState(false);
  const [checkNetwork, setCheckNetwork] = useState(false);

  const checkAdmin = async (address: any) => {
    let value = await (await ContractInit.phoenixProposalContract())?.methods
      .isOwner(address)
      .call();
    console.log("network in checkAdmin");
    return value;
  };

  const checkBalance = async (address: any) => {
    let value = await (await ContractInit.initPhnxTokenContract())?.methods
      .balanceOf(address)
      .call();
    value = Web3.utils.fromWei(value);
    console.log("balance", value);
    console.log("balance collateral", props.collateral);
    //return value;
    if (value > props.collateral) {
      return true;
    } else {
      return false;
    }
  };

  const changeStatusOfProposal = async (
    id: any,
    index: any,
    status: any,
    resetData: any,
    close: any,
    stage: any
  ) => {
    try {
      let network = await ContractInit.init();
      console.log("network  ", network);

      let test = await checkBalance(props.proposalUSerNumioAddress);

      console.log("Testing", test);

      if (!test && status == "UpVote") {
        props.openSnackbar("Insufficient amount", "error");
        return null;
      }

      if (network.network != ethereumNetwork) {
        // setCheckNetwork(true);
        console.log("IN IF 1");
        //checkVar = true;
        props.openSnackbar("Netowrk must be Rinkeby", "error");
      } else {
        const checkingAdmin = await checkAdmin(network.address);
        console.log("network admin", checkingAdmin);
        console.log("network", network.network);

        if (checkingAdmin == false) {
          console.log("IN IF 2 ADMIN");
          props.openSnackbar("User is not the admin", "error");
        }

        // console.log("Checking ", props.proposalUserNumioAddress);
        //props.openSnackbar("hello", "success");
        else {
          console.log("IN ELSE");
          if (status == "UpVote") {
            setMyLoading1(true);
          } else {
            setMyLoading2(true);
          }
          setDisable(true);
          let temp: any = await ContractInit.init();
          console.log("temp 2", temp);

          if (status == "UpVote") {
            await blockChainFunction(props._id, 1, temp.address);
            const get = await axios.put(
              `${URL}${Proposal}${id}`,
              {
                status: status,
                stage: stage,
              },
              {
                headers: {
                  Authorization: `Bearer ${props.user.token}`,
                },
              }
            );
            props.openSnackbar("Proposal successfully accepted !", "success");
          } else {
            console.log("Testing", props);
            await blockChainFunction(props._id, 5, temp.address);
            if (metaMaskRejectError == false) {
              const get = await axios.put(
                `${URL}${Proposal}${id}`,
                {
                  status: status,
                  reasonForRejecting: proposalRejectionReason,
                  email: props.email,
                  proposalName: props.title,
                  createdAt: props.createdAt,
                },
                {
                  headers: {
                    Authorization: `Bearer ${props.user.token}`,
                  },
                }
              );
            }

            setMyLoading1(false);
            setMyLoading2(false);
            props.openSnackbar("Proposal successfully rejected !", "success");
          }
          resetData();
          props.close();
        }
      }
    } catch (err) {
      console.log("IN CATCH", err);
      console.log("In catch", err.responseCode);
      if (checkNetwork) {
        console.log("Network 2 ///", checkNetwork);
        console.log("error");
        props.openSnackbar("Network must be Rinkeby", "error");
      } else if (err == "Error: Request failed with status code 500") {
        props.openSnackbar(
          "Request has already been approved or rejected by other admin.",
          "error"
        );
        props.close();
        props.resetData();
      } else {
        //props.openSnackbar("Oops! Something went wrong", "error");
        props.openSnackbar("Transaction failed", "error");
        console.log("Error", err);
        setMyLoading1(false);
        setMyLoading2(false);
        props.close();
      }
    }
  };
  const blockChainFunction = async (id: any, status: any, fromAccount: any) => {
    console.log("From", fromAccount);
    let temp = await ContractInit.phoenixProposalContract();
    console.log("temp", temp);
    const value = await (await temp)?.methods
      .updateProposalStatus(id, status)
      .send({ from: fromAccount })
      .on("transactionHash", (hash: any) => {
        console.log(hash);
      })
      .on("confirmation", function (confirmationNumber: any, receipt: any) {
        if (confirmationNumber === 2) {
          console.log(receipt);
          console.log("Confirmed");
        }
      })
      .on("error", () => {
        console.log("Cancelled");
        setMetaMaskRejectError(true);
        props.close();
      });
  };
  const [milestones, setMilestones] = useState<any>({});
  const getProposalOfStatusAccepted = async () => {
    try {
      const get = await axios
        .post(
          `${URL}${ProposalByStatus}`,
          {
            status: "Accepted",
          },
          {
            headers: {
              Authorization: `Bearer ${props.user.token}`,
            },
          }
        )
        .then((value) => {
          let result: any = {};
          value.data.result.map((_value: any, i: number) => {
            result[_value._id] = {
              name: _value.name,
              milestone: _value.milestone
                .map((milestonee: any, index: any) => {
                  return { ...milestonee, index };
                })
                .filter((milestonee: any) => {
                  return milestonee.status === "Pending";
                }),
            };
          });
          setMilestones(result);
        });
    } catch (err) {}
  };
  const [testState, setTestState]: any = useState([]);
  let statusUpVote = "UpVote";
  let statusRejected = "Rejected";
  let tempBool = true;

  const classes = useStyles();
  type approvalState = {
    id: any;
    index: any;
    status: any;
    resetData: any;
    close: any;
  };

  const [openDialogueState, setOpenDialogueState] = useState(false);
  const [proposalRejectionReason, setProposalRejectionReason] = useState("");
  const [approvalState, setApprovalState] = useState<approvalState>({
    id: undefined,
    index: undefined,
    status: undefined,
    resetData: undefined,
    close: undefined,
  });
  const [dialogueMessage, setDialogueMessage] = useState("");

  const openDialogue = async (
    id: any,
    index: any,
    status: any,
    resetData: any,
    close: any
  ) => {
    // e.preventDefault();
    console.log("Props 1", id, index, status);
    console.log("props 2");
    if (status == statusUpVote) {
      setDialogueMessage(
        "On approving this you agree that this proposal fulfills the DAO initial voting criteria. The proposal will be moved in upvote section."
      );
    } else {
      setDialogueMessage(
        "On approving this you agree that this proposal do not fulfill the DAO initial voting criteria. The proposal will be removed and is not shown in upvote section."
      );
    }
    setApprovalState({ id, index, status, resetData, close });
    setOpenDialogueState(true);
  };
  const handleDialogue = async (result: boolean) => {
    // console.log(status);
    console.log("-----]]]", approvalState.status);
    if (
      result &&
      !proposalRejectionReason &&
      approvalState.status == "Rejected"
    ) {
      props.openSnackbar("Please provide the reason", "error");
      return true;
    }
    setOpenDialogueState(false);
    setDialogueMessage("");
    if (result) {
      await changeStatusOfProposal(
        approvalState.id,
        approvalState.index,
        approvalState.status,
        approvalState.resetData,
        approvalState.close,
        1
      );
    }
  };

  const handleProposalRejection = (e: any, status: any) => {
    console.log("abcdefg", e.target.value);
    setProposalRejectionReason(e.target.value);
  };

  useEffect(() => {
    console.log("123 Address", props);
    checkAccounts();
    checkBalance(props.proposalUSerNumioAddress);
    // setProposalRejectionReason("");
  });
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
          {"Are you sure ?"}
        </DialogTitle>
        <DialogContent className={classes.dialogueText}>
          <DialogContentText
            className={classes.dialogueText}
            id="alert-dialog-slide-description"
          >
            {dialogueMessage}
          </DialogContentText>
        </DialogContent>
        {approvalState.status == "Rejected" ? (
          <div className={style.dialogDiv}>
            <div style={{ textAlign: "center" }}>
              <TextField
                required
                multiline
                rows={6}
                variant="outlined"
                label="Reason"
                value={proposalRejectionReason}
                onChange={(e: any) => handleProposalRejection(e, "Rejected")}
                className={classes.firstfields}
                style={{ width: "85%", marginTop: "10px" }}
              />
            </div>
          </div>
        ) : // <input onChange={(e: any) => handleProposalRejection(e)} />
        null}

        <DialogActions className={classes.dialogueText}>
          <Button
            onClick={() => handleDialogue(false)}
            color="primary"
            style={{ color: "#EA8604", width: "85%", marginBottom: "9px" }}
          >
            Disagree
          </Button>
          <Button
            onClick={() => handleDialogue(true)}
            color="primary"
            style={{
              color: "white",
              backgroundColor: "#EA8604",
              width: "85%",
              marginLeft: "0px",
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <Modal
          title={props.title}
          close={props.close}
          actions={
            <>
              <Button
                primary
                outline
                icon={iconLike}
                disabled={
                  myLoading1 == true || myLoading2 == true ? true : false
                }
                onClick={() => {
                  if (disable == false) {
                    openDialogue(
                      props._id,
                      props.index,
                      statusUpVote,
                      props.resetData,
                      props.close
                    );
                  }
                }}
              >
                {myLoading1 ? <CircularProgress size={12} /> : props.button1}
              </Button>
              <Button
                primary
                disabled={
                  myLoading1 == true || myLoading2 == true ? true : false
                }
                onClick={() => {
                  if (disable == false) {
                    openDialogue(
                      props._id,
                      props.index,
                      statusRejected,
                      props.resetData,
                      props.close
                    );
                  }
                }}
              >
                {myLoading2 ? (
                  <CircularProgress size={12} style={{ color: "white" }} />
                ) : (
                  props.button2
                )}
              </Button>
            </>
          }
        >
          <div className={style.modalContent}>
            {console.log("Address", props.user.numioAddress)}
            <div className={style.modalBrief}>
              <div style={{ textAlign: "center", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "14px", color: "#EA8604" }}>
                    Budget
                  </span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <span>{props.budget}</span> <span>PHNX</span>
                </div>
              </div>
              <div style={{ textAlign: "center", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "14px", color: "#EA8604" }}>
                    Milestones
                  </span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <span>{props.milestones.length}</span>
                </div>
              </div>
              <div
                style={{
                  width: "80px",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <span style={{ fontSize: "14px", color: "#EA8604" }}>
                    Submitted
                  </span>
                </div>
                <span>(dd/mm/yyyy)</span>
                <div>{changeFormat(props.createdAt)}</div>
              </div>
            </div>
            <form className={classes.description} noValidate autoComplete="off">
              <TextField
                id="outlined-multiline-static"
                label="Project Description"
                multiline
                rows={3}
                defaultValue={props.description}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </form>
            <div className={style.modalSteps}>
              <h3
                style={{
                  fontSize: "16px",
                  marginBottom: "10px",
                  color: "#ea8604",
                  fontWeight: "normal",
                }}
              >
                Milestones
              </h3>
              <div
                style={{
                  height: "115px",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                {props.milestones.map((milestone: any, i: any) => {
                  return (
                    <div>
                      <Collapse milestone={milestone} i={i} />
                      <div className={style.modalStep}></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
const mapStateToProps = (state: any) => ({
  user: state.userDetails.user,
});
export default connect(mapStateToProps)(ProposalModal);
