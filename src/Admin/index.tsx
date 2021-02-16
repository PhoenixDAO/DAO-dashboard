import React, { useEffect, useState } from "react";
import cn from "classnames";
import Card from "Shared/Card";
import Table from "Shared/AdminTable";
import style from "./style.module.scss";
import axios from "axios";
import { connect } from "react-redux";
import EditModal from "../Proposals/EditModal/index";
import AdminModal from "../Proposals/Modal/adminModal";
import AdminModal2 from "../Proposals/Modal/adminModal2";
import AdminModal3 from "../Proposals/Modal/adminModal3";
import { URL } from "../const";
import { Proposal, ByAdmin, ProposalByStatus } from "../const";
import { CircularProgress } from "@material-ui/core";
import Budget from "Shared/Budget";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "Shared/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { UpdateProposal } from "../const";

import { ethereumNetwork, getProposalById } from "../const";
import ContractInit from "../config/contractsInit";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="standard" {...props} />;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      width: "100%",
      backgroundColor: "#EA8604",
      color: "white",
      borderColor: "#EA8604",
      "&:hover": {
        textDecoration: "underline",
        //  color: "#0056b3",
        backgroundColor: "#EA8604",
        borderColor: "#EA8604",
      },
      position: "relative",
      height: "56rem",
      padding: "0 20rem",
      borderRadius: "5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "20rem",
      transition: ".2s",
      minWidth: "200rem",
      border: "1px solid",
      userSelect: "none",
      marginTop: "30rem",
    },
    root2: {
      "& .MuiSnackbarContent-root": {
        backgroundColor: "red",
        color: "white",
        fontSize: "10px",
      },
    },
    alert: {
      "& .MuiAlert-message": {
        fontSize: "12px",
        display: "flex",
        alignItem: "center",
      },
    },
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
        // marginLeft: "24px",
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
  })
);

type message = {
  message: string | undefined;
  severity: "error" | "success" | "warning" | "info" | undefined;
};
type approvalStateForDraw = {
  i: any;
  j: any;
  status: any;
  id: any;
  str: any;
};

type approvalStateForMilestone = {
  id: any;
  k: any;
  i: any;
  j: any;
  index: any;
  milestoneStatus: any;
  str: any;
  email: any;
  name: any;
};
const Admin = (props: any) => {
  const classes = useStyles();
  const [proposalsOfStatusPending, setProposalsOfStatusPending] = useState([]);

  const [proposalsOfStatusVoting, setProposalsOfStatusVoting] = useState([]);

  const [proposalsOfStatusDraw, setProposalsOfStatusDraw] = useState([]);
  const [testValue, setTestValue]: any = useState({});

  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [loading4, setLoading4] = useState(true);
  const [noData, setNoData] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [message, setMessage] = useState<message>({
    message: undefined,
    severity: undefined,
  });

  const [modalOpen, setModalOpen] = React.useState(false);

  const [openDialogueState, setOpenDialogueState] = useState(false);
  const [
    approvalStateForDraw,
    setApprovalStateForDraw,
  ] = useState<approvalStateForDraw>({
    i: undefined,
    j: undefined,
    status: undefined,
    id: undefined,
    str: undefined,
  });
  const [
    approvalStateForMilestone,
    setApprovalStateForMilestone,
  ] = useState<approvalStateForMilestone>({
    id: undefined,
    k: undefined,
    i: undefined,
    j: undefined,
    index: undefined,
    milestoneStatus: undefined,
    str: undefined,
    email: undefined,
    name: undefined,
  });
  const [dialogueMessage, setDialogueMessage] = useState("");
  const [dialogueNumber, setDialogueNumber] = useState<number | undefined>(
    undefined
  );

  const [reasonForRejecting, setReasonForRejecting] = useState("");

  const changeProposalStatusToCompleted = async (id: any) => {
    console.log("Change the status", id);
    const get = await axios
      .put(
        `${URL}${Proposal}${id}`,
        {
          status: "Completed",
        },
        {
          headers: {
            Authorization: `Bearer ${props.user.token}`,
          },
        }
      )
      .then((value: any) => console.log("CHange status"))
      .catch((err) => console.log(err));
  };

  const openDialogueForDraw = (
    i: number,
    j: number,
    status: any,
    id: any,
    str: string
  ) => {
    // e.preventDefault();
    setDialogueNumber(0);
    if (status == "Accepted") {
      setDialogueMessage(
        "On approving this you agree to accept this proposal and it will be moved to active project."
      );
    } else {
      setDialogueMessage(
        "On approving this you agree to reject this proposal and it will be marked as failed proposal."
      );
    }
    setApprovalStateForDraw({ i, j, status, id, str });
    setOpenDialogueState(true);
  };
  const handleDialogue = async (i: any, result: boolean) => {
    console.log("Props", props);
    console.log("Status", approvalStateForDraw);
    setOpenDialogueState(false);
    setDialogueNumber(undefined);
    setDialogueMessage("");

    // approvalStateForMilestone.id,
    // approvalStateForMilestone.k,
    // approvalStateForMilestone.i,
    // approvalStateForMilestone.j,
    // approvalStateForMilestone.index,
    // approvalStateForMilestone.milestoneStatus,
    // approvalStateForMilestone.str,
    // approvalStateForMilestone.email,
    // approvalStateForMilestone.name

    setTestValue((val: any) => ({
      ...val,
      [`${approvalStateForMilestone.k}${approvalStateForMilestone.id}${approvalStateForMilestone.index}${approvalStateForMilestone.str}`]: true,
    }));
    if (result) {
      if (i == 0) {
        // setTestValue[`0${i}Yes`];
        let temp = await ContractInit.phoenixProposalContract();

        let fromAccount = await (await ContractInit.init()).address;

        console.log("temp", temp);
        await (await temp)?.methods
          .updateProposalStatus(approvalStateForDraw.id, 3)
          .send({ from: fromAccount })
          .on("transactionHash", (hash: any) => {
            console.log(hash);
          })
          .on("confirmation", function (confirmationNumber: any, receipt: any) {
            if (confirmationNumber === 1) {
              console.log(receipt);
              console.log("Confirmed");
              changeProposalStatusForDraw(
                approvalStateForDraw.i,
                approvalStateForDraw.j,
                approvalStateForDraw.status,
                approvalStateForDraw.id,
                approvalStateForDraw.str
              );
            }
          })
          .on("error", () => {
            console.log("Cancelled");
            // setMetaMaskRejectError(true);
            // props.close();
          });

        // await changeProposalStatusForDraw(
        //   approvalStateForDraw.i,
        //   approvalStateForDraw.j,
        //   approvalStateForDraw.status,
        //   approvalStateForDraw.id,
        //   approvalStateForDraw.str
        // );
      } else {
        // console.log("hello", approvalStateForMilestone);
        // await changeMilestoneByAdmin(
        //   approvalStateForMilestone.id,
        //   approvalStateForMilestone.k,
        //   approvalStateForMilestone.i,
        //   approvalStateForMilestone.j,
        //   approvalStateForMilestone.index,
        //   approvalStateForMilestone.milestoneStatus,
        //   approvalStateForMilestone.str,
        //   approvalStateForMilestone.email,
        //   approvalStateForMilestone.name
        // );

        console.log("idd", approvalStateForMilestone);

        const result = await axios
          .get(`${URL}${getProposalById}${approvalStateForMilestone.id}`, {
            headers: {
              Authorization: `Bearer ${props.user.token}`,
            },
          })
          .then(async (result) => {
            console.log("answer result", result.data.result);
            const answer = result.data.result.milestone.filter(
              (value: any) => value.status == "Completed"
            );
            console.log("answer 1", answer.length);
            console.log("answer 2", result.data.result.milestone.length);

            if (
              answer.length == result.data.result.milestone.length - 1 &&
              approvalStateForMilestone.milestoneStatus == "Completed"
            ) {
              let temp = await ContractInit.phoenixProposalContract();

              let fromAccount = await (await ContractInit.init()).address;

              console.log("temp", temp);
              await (await temp)?.methods
                .updateProposalStatus(approvalStateForMilestone.id, 4)
                .send({ from: fromAccount })
                .on("transactionHash", (hash: any) => {
                  console.log(hash);
                })
                .on(
                  "confirmation",
                  async (confirmationNumber: any, receipt: any) => {
                    if (confirmationNumber === 1) {
                      console.log(receipt);
                      console.log("Confirmed");
                      // setTestValue((val: any) => ({
                      //   ...val,
                      //   [`${k}${id}${index}${str}`]: true,
                      // }));
                      await changeMilestoneByAdmin(
                        approvalStateForMilestone.id,
                        approvalStateForMilestone.k,
                        approvalStateForMilestone.i,
                        approvalStateForMilestone.j,
                        approvalStateForMilestone.index,
                        approvalStateForMilestone.milestoneStatus,
                        approvalStateForMilestone.str,
                        approvalStateForMilestone.email,
                        approvalStateForMilestone.name
                      );

                      // if (answer.length == 0) {
                      //   console.log("In answer length zero if");
                      if (
                        approvalStateForMilestone.milestoneStatus == "Completed"
                      ) {
                        await changeProposalStatusToCompleted(
                          approvalStateForMilestone.id
                        );
                      }
                    }
                  }
                )
                .on("error", () => {
                  console.log("Cancelled");

                  setTestValue((val: any) => ({
                    ...val,
                    [`${approvalStateForMilestone.k}${approvalStateForMilestone.id}${approvalStateForMilestone.index}${approvalStateForMilestone.str}`]: false,
                  }));

                  openSnackbar("Transaction rejected", "error");

                  // setMetaMaskRejectError(true);
                  // props.close();
                });
            } else {
              await changeMilestoneByAdmin(
                approvalStateForMilestone.id,
                approvalStateForMilestone.k,
                approvalStateForMilestone.i,
                approvalStateForMilestone.j,
                approvalStateForMilestone.index,
                approvalStateForMilestone.milestoneStatus,
                approvalStateForMilestone.str,
                approvalStateForMilestone.email,
                approvalStateForMilestone.name
              );
            }
          });
      }
    }
  };
  const openDialogueForMilestone = (
    id: any,
    k: number,
    i: any,
    j: any,
    index: any,
    milestoneStatus: any,
    str: string,
    email: string,
    name: string
  ) => {
    console.log("Opening...", email, name);
    // e.preventDefault();
    setDialogueNumber(1);
    if (milestoneStatus == "Completed") {
      setDialogueMessage(
        "On approving this you agree that you verified the project progress and this milestone is ready to be marked completed."
      );
    } else {
      setDialogueMessage(
        "On approving this you agree that you verified the project progress and this milestone is not completed."
      );
    }
    setApprovalStateForMilestone({
      id,
      k,
      i,
      j,
      index,
      milestoneStatus,
      str,
      email,
      name,
    });
    setOpenDialogueState(true);
  };

  const closeModal = () => setModalOpen(false);
  const [projectModalItem, setProjectModalItem] = React.useState<
    | {
        title: string;
        votes: [];
        reward: any;
        budget: any;
        milestoness: any;
        description: any;
        expirationDate: any;
        _id: any;
        openSnackbar: any;
        renderAgain: any;
        button1: any;
        button2: any;
        index: any;
        createdAt?: any;
        collateral: any;
        proposalUserNumioAddress: any;
        email: any;
      }
    | undefined
  >(undefined);

  const [projectModalItem2, setProjectModalItem2] = React.useState<
    | {
        title: string;
        votes: [];
        reward: any;
        budget: any;
        milestoness: any;
        description: any;
        votingDate: any;
        _id: any;
        // renderAgain: any;
        // styleFlag: string;
      }
    | undefined
  >(undefined);

  const [projectModalItem3, setProjectModalItem3] = React.useState<
    | {
        title: string;
        budget: any;
        milestoness: any;
        description: any;
        votingDate: any;
        githubLink: any;
        email: any;
        name: any;
      }
    | undefined
  >(undefined);

  const openSnackbar = (
    message: string,
    severity: "error" | "success" | "warning" | "info" | undefined
  ) => {
    setMessage({ message, severity });
    setShowSnackbar(true);
  };

  const renderAgain = async () => {
    await getProposalsOfStatusPending();
  };

  const changeMilestoneByAdmin = async (
    id: any,
    k: number,
    i: any,
    j: any,
    index: any,
    milestoneStatus: any,
    str: string,
    email: string,
    name: string
    //reasonForRejecting: any
  ) => {
    console.log("Reason ......", milestoneStatus);
    console.log("Reason", reasonForRejecting);
    console.log("Email", email);
    console.log("Name", name);
    if (!reasonForRejecting && milestoneStatus == "Incomplete") {
      openSnackbar("Please provide a reason", "error");
      return null;
    }
    try {
      setTestValue((val: any) => ({
        ...val,
        [`${k}${id}${index}${str}`]: true,
      }));
      const get = await axios
        .put(
          `${URL}${ByAdmin}${id}`,
          {
            status: milestoneStatus,
            index: index,
            numioAddress: props.user.numioAddress,
            reasonForRejecting: reasonForRejecting,
            email,
            name,
          },
          {
            headers: {
              Authorization: `Bearer ${props.user.token}`,
            },
          }
        )
        .then(async (value) => {
          setTestValue((val: any) => ({
            ...val,
            [`${k}${id}${index}${str}`]: false,
          }));
          if (milestoneStatus == "Completed") {
            openSnackbar(
              "Milestone successfully marked completed !",
              "success"
            );
          } else {
            openSnackbar(
              "Milestone successfully marked incomplete !",
              "success"
            );
          }

          await getProposalOfStatusAccepted();
        });
    } catch (err) {
      setTestValue((val: any) => ({
        ...val,
        [`${k}${id}${index}${str}`]: false,
      }));
      await getProposalOfStatusAccepted();
    }
  };

  const changeFormat = (date: any) => {
    date = new Date(date);
    return `${new Date(date.getTime()).getDate()}/${
      new Date(date.getTime()).getMonth() + 1
    }/${new Date(date.getTime()).getFullYear()}`;
  };

  useEffect(() => {
    console.log("world", props);
    getProposalsOfStatusPending();
    getProposalsOfStatusVoting();
    getProposalOfStatusAccepted();
    getProposalsOfStatusDraw();
    //  setReasonForRejecting("");
  }, []);

  const getProposalsOfStatusPending = async () => {
    try {
      const get = await axios
        .post(
          `${URL}${ProposalByStatus}`,

          {
            status: "Pending",
          },
          {
            headers: {
              Authorization: `Bearer ${props.user.token}`,
            },
          }
        )
        .then((value: any) => {
          setProposalsOfStatusPending(value.data.result);
          setLoading1(false);
        });
    } catch (err) {
      setProposalsOfStatusPending([]);
      setLoading1(false);
    }
  };

  const getProposalsOfStatusVoting = async () => {
    try {
      const get = await axios
        .post(
          `${URL}${ProposalByStatus}`,
          {
            status: "Voting",
          },
          {
            headers: {
              Authorization: `Bearer ${props.user.token}`,
            },
          }
        )
        .then((value) => {
          setProposalsOfStatusVoting(value.data.result);
          setLoading2(false);
        });
    } catch (err) {
      setProposalsOfStatusVoting([]);
      setLoading2(false);
    }
  };

  const getProposalsOfStatusDraw = async () => {
    try {
      const get = await axios
        .post(
          `${URL}${ProposalByStatus}`,
          {
            status: "Draw",
          },
          {
            headers: {
              Authorization: `Bearer ${props.user.token}`,
            },
          }
        )
        .then((value) => {
          setProposalsOfStatusDraw(value.data.result);
          setLoading4(false);
        });
    } catch (err) {
      setProposalsOfStatusDraw([]);
      setLoading4(false);
    }
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
              description: _value.description,
              budget: _value.budget,
              githubLink: _value.githubLink,
              votingDate: _value.votingDate,
              email: _value.email,
              milestone: _value.milestone
                .map((milestonee: any, index: any) => {
                  return { ...milestonee, index };
                })
                .filter((milestonee: any) => {
                  return milestonee.status === "Pending";
                }),
            };
          });
          Object.values(result).map((item: any) => {
            if (item.milestone.length > 0) setNoData(false);
          });
          console.log("Working", result);
          setMilestones(result);
          setLoading3(false);
        });
    } catch (err) {
      setLoading3(false);
    }
  };

  let milestoneStatus;

  const getLatestProposal = async (item: any, i: any) => {
    console.log("In", item._id);
    const result = await axios
      .get(`${URL}${getProposalById}${item._id}`, {
        headers: {
          Authorization: `Bearer ${props.user.token}`,
        },
      })
      .then((value: any) => {
        console.log("Status --->", value.data.result.status);
        if (value.data.result.status == "Pending") {
          return setProjectModalItem({
            title: item.name,
            reward: item.reward,
            budget: item.budget,
            milestoness: item.milestone,
            description: item.description,
            votes: item.votes,
            index: i,
            // Here we can show the createdAt date
            createdAt: item.createdAt,
            expirationDate: item.createdAt,
            _id: item._id,
            openSnackbar: openSnackbar,
            renderAgain: renderAgain,
            button1: "",
            button2: "",
            collateral: item.collateral,
            proposalUserNumioAddress: item.numioAddress,
            email: item.email,
          });
        } else {
          return openSnackbar(
            "Proposal already approved or rejected by other admin",
            "error"
          );
        }
      })
      .catch((err: any) => {
        return openSnackbar("An error occured", "error");
      });
  };

  const changeProposalStatusForDraw = async (
    i: number,
    j: number,
    status: any,
    id: any,
    str: string
  ) => {
    try {
      setTestValue((val: any) => ({ ...val, [`${i}${j}${str}`]: true }));

      const get = await axios.put(
        `${URL}${Proposal}${id}`,
        { status: status },
        {
          headers: {
            Authorization: `Bearer ${props.user.token}`,
          },
        }
      );
      if (status == "Accepted") {
        openSnackbar("Proposal successfully marked pass !", "success");
      } else {
        openSnackbar("Proposal successfully marked fail !", "success");
      }
      getProposalsOfStatusDraw();
      setTestValue((val: any) => ({ ...val, [`${i}${j}${str}`]: false }));
      await getProposalsOfStatusDraw();
    } catch (err) {
      setTestValue((val: any) => ({ ...val, [`${i}${j}${str}`]: false }));
      await getProposalsOfStatusDraw();
    }
  };

  const handleEmail = (e: any) => {
    console.log("Working --->");
    setReasonForRejecting(e.target.value);
    console.log(e.target.value);
  };

  const temp = false;

  return (
    <>
      <Dialog
        open={openDialogueState}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleDialogue(dialogueNumber, false)}
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
            {dialogueMessage}
          </DialogContentText>
        </DialogContent>
        {approvalStateForMilestone.milestoneStatus == "Incomplete" ? (
          <div className={style.dialogDiv}>
            <div style={{ textAlign: "center" }}>
              <TextField
                multiline
                rows={6}
                //  defaultValue="hello"
                // error={!email}
                // helperText={"ojasok"}
                required
                label="Reason"
                value={reasonForRejecting}
                variant="outlined"
                onChange={(e: any) => handleEmail(e)}
                className={classes.firstfields}
                style={{ width: "85%", marginTop: "10px" }}
              />
            </div>
          </div>
        ) : null}
        <DialogActions className={classes.dialogueText}>
          <Button
            className={classes.dialogueButton}
            onClick={() => handleDialogue(dialogueNumber, false)}
            color="primary"
            style={{ color: "#EA8604", width: "85%", marginBottom: "9px" }}
          >
            Disagree
          </Button>
          <Button
            className={classes.dialogueButton}
            onClick={() => handleDialogue(dialogueNumber, true)}
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
      <Budget openSnackbar={openSnackbar} />
      {modalOpen && <EditModal close={closeModal} />}
      {projectModalItem && (
        <AdminModal
          resetData={renderAgain}
          title={projectModalItem.title}
          reward={projectModalItem.reward}
          budget={projectModalItem.budget}
          milestones={projectModalItem.milestoness}
          description={projectModalItem.description}
          createdAt={projectModalItem.createdAt}
          votes={projectModalItem.votes}
          _id={projectModalItem._id}
          button1="Approve"
          button2="Reject"
          tooltipMessage1="On approving this you agree that this proposal do fulfills the DAO initial voting criteria. The proposal will be moved in upvote section"
          tooltipMessage2="By rejecting this you agree that this proposal do not fulfills the DAO initial voting criteria. The proposal will be removed and is not shown in upvote section"
          close={() => setProjectModalItem(undefined)}
          openSnackbar={openSnackbar}
          collateral={projectModalItem.collateral}
          proposalUSerNumioAddress={projectModalItem.proposalUserNumioAddress}
          email={projectModalItem.email}
        />
      )}
      {projectModalItem2 && (
        <AdminModal2
          // resetData={renderAgain}
          title={projectModalItem2.title}
          reward={projectModalItem2.reward}
          budget={projectModalItem2.budget}
          milestones={projectModalItem2.milestoness}
          description={projectModalItem2.description}
          votingDate={projectModalItem2.votingDate}
          votes={projectModalItem2.votes}
          _id={projectModalItem2._id}
          // styleFlag={projectModalItem2.styleFlag}
          close={() => setProjectModalItem2(undefined)}
          // setSnackBar={() => setSnackBar}
        />
      )}
      {projectModalItem3 && (
        <AdminModal3
          title={projectModalItem3.title}
          budget={projectModalItem3.budget}
          milestones={projectModalItem3.milestoness}
          description={projectModalItem3.description}
          votingDate={projectModalItem3.votingDate}
          githubLink={projectModalItem3.githubLink}
          email={projectModalItem3.email}
          name={projectModalItem3.name}
          close={() => setProjectModalItem3(undefined)}
        />
      )}
      <div id="scrollContainer" className={style.grid}>
        <Snackbar
          className={classes.root2}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={showSnackbar}
          autoHideDuration={4000}
          onClose={() => {
            setShowSnackbar(false);
            //setMessage({ message: "", severity: undefined });
          }}
        >
          <Alert
            className={classes.alert}
            onClose={() => {
              setShowSnackbar(false);
              //setMessage({ message: "", severity: undefined });
            }}
            severity={message.severity}
          >
            {message.message}
          </Alert>
        </Snackbar>
        <Card
          styleFlag={true}
          title="Proposal Requests"
          tooltipMessage="This shows all the proposals pending for approval"
        >
          <Table compact columns={["Proposal", "Submission Date "]}>
            {proposalsOfStatusPending.length == 0 ? (
              <td>{loading1 ? "Loading..." : "No proposals found"}</td>
            ) : (
              proposalsOfStatusPending.map((item: any, i) => (
                <>
                  <tr
                    onClick={
                      () => getLatestProposal(item, i)

                      // setProjectModalItem({
                      //   title: item.name,
                      //   reward: item.reward,
                      //   budget: item.budget,
                      //   milestoness: item.milestone,
                      //   description: item.description,
                      //   votes: item.votes,
                      //   index: i,
                      //   // Here we can show the createdAt date
                      //   createdAt: item.createdAt,
                      //   expirationDate: item.createdAt,
                      //   _id: item._id,
                      //   openSnackbar: openSnackbar,
                      //   renderAgain: renderAgain,
                      //   button1: "",
                      //   button2: "",
                      //   collateral: item.collateral,
                      //   proposalUserNumioAddress: item.numioAddress,
                      //   email: item.email,
                      // })
                    }
                    key={i}
                  >
                    <td>{item.name}</td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        marginBottom: "0px",
                      }}
                      className={cn(
                        style.listItem,
                        item.approve && style.checked
                      )}
                    >
                      <div>{changeFormat(item.createdAt)}</div>
                    </td>
                  </tr>
                </>
              ))
            )}
          </Table>
        </Card>

        <Card
          styleFlag={true}
          title="Proposals Ready for Vote"
          tooltipMessage="All the proposals ready for voting"
        >
          <Table compact columns={["Proposal", "Voting Day"]}>
            {proposalsOfStatusVoting.length == 0 ? (
              <td>
                {loading2 ? "Loading..." : "No proposal ready for voting"}
              </td>
            ) : (
              proposalsOfStatusVoting.map((item: any, i) => (
                <tr
                  key={i}
                  onClick={() =>
                    setProjectModalItem2({
                      title: item.name,
                      reward: item.reward,
                      budget: item.budget,
                      milestoness: item.milestone,
                      description: item.description,
                      votes: item.votes,
                      votingDate: item.votingDate,
                      _id: item._id,
                      // styleFlag: "UpvoteModal",
                      // button1: "UpVote",
                      // button2: "Ok",
                      // renderAgain: renderAgain,
                    })
                  }
                >
                  <td>{item.name}</td>
                  <td>{changeFormat(item.votingDate)}</td>
                </tr>
              ))
            )}
          </Table>
        </Card>

        <Card
          styleFlag={true}
          title="Voting Results"
          tooltipMessage="Proposals having draw result on voting"
        >
          <Table compact columns={["Cost", "Proposal", "%", "Approve"]}>
            {proposalsOfStatusDraw.length == 0 ? (
              <td>
                {loading4
                  ? "Loading..."
                  : "No proposal with draw results found"}
              </td>
            ) : (
              proposalsOfStatusDraw.map((item: any, j) => (
                <tr key={j}>
                  <td>{item.budget}</td>
                  <td> {item.name} </td>
                  <td> 50% </td>
                  <td
                    className={cn(
                      style.listItem,
                      item.approve && style.checked
                    )}
                  >
                    <div
                      className={style.toggleButton}
                      onClick={() => {
                        openDialogueForDraw(0, j, "Accepted", item._id, "Yes");
                        // changeProposalStatusForDraw(
                        //   0,
                        //   j,
                        //   "Accepted",
                        //   item._id,
                        //   "Yes"
                        // );
                      }}
                    >
                      {testValue[`0${j}Yes`] ? (
                        <CircularProgress size={12} color="inherit" />
                      ) : (
                        "Yes"
                      )}
                    </div>
                    <div
                      className={style.toggleButton}
                      onClick={() => {
                        openDialogueForDraw(0, j, "Rejected", item._id, "No");
                        // changeProposalStatusForDraw(
                        //   0,
                        //   j,
                        //   "Rejected",
                        //   item._id,
                        //   "No"
                        // );
                      }}
                    >
                      {testValue[`0${j}No`] ? (
                        <CircularProgress size={12} color="inherit" />
                      ) : (
                        "No"
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </Table>
        </Card>
        <Card
          styleFlag={true}
          title="Milestone Requested"
          tooltipMessage="All milestones that user marked complete and are pending for approval"
        >
          <Table compact columns={["Proposal", "Milestone", "Approve"]}>
            {loading3 ? (
              <td>Loading...</td>
            ) : noData ? (
              <td>No milestone completion request found</td>
            ) : (
              Object.keys(milestones).map((id: any, i: any) =>
                milestones[id].milestone.map((item: any, j: any) => (
                  <tr
                    onClick={() => {
                      setProjectModalItem3({
                        title: milestones[id].name,
                        budget: milestones[id].budget,
                        milestoness: milestones[id].milestone,
                        description: milestones[id].description,
                        votingDate: milestones[id].votingDate,
                        githubLink: milestones[id].githubLink,
                        email: milestones[id].email,
                        name: milestones[id].name,
                      });
                    }}
                    key={i}
                  >
                    <td>{milestones[id].name}</td>
                    <td> {`M${item.index + 1}`} </td>

                    <td
                      className={cn(
                        style.listItem,
                        item.approve && style.checked
                      )}
                    >
                      <div
                        className={style.toggleButton}
                        onClick={
                          (e) => {
                            e.stopPropagation();
                            openDialogueForMilestone(
                              id,
                              1,
                              i,
                              j,
                              item.index,
                              (milestoneStatus = "Completed"),
                              "Yes",
                              milestones[id].email,
                              milestones[id].name
                            );
                          }

                          // changeMilestoneByAdmin(
                          // id,
                          // 1,
                          // i,
                          // j,
                          // item.index,
                          // (milestoneStatus = "Completed"),
                          // "Yes"
                          // )
                        }
                      >
                        {testValue[`1${id}${item.index}Yes`] ? (
                          <CircularProgress size={12} color="inherit" />
                        ) : (
                          "Yes"
                        )}
                      </div>
                      <div
                        className={style.toggleButton}
                        onClick={
                          (e) => {
                            e.stopPropagation();
                            openDialogueForMilestone(
                              id,
                              1,
                              i,
                              j,
                              item.index,
                              (milestoneStatus = "Incomplete"),
                              "No",
                              milestones[id].email,
                              milestones[id].name
                            );
                          }
                          // changeMilestoneByAdmin(
                          //   id,
                          //   1,
                          //   i,
                          //   j,
                          //   item.index,
                          //   (milestoneStatus = "Incomplete"),
                          //   "No"
                          // )
                        }
                      >
                        {testValue[`1${id}${item.index}No`] ? (
                          <CircularProgress size={12} color="inherit" />
                        ) : (
                          "No"
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )
            )}
          </Table>
        </Card>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.userDetails.user,
});

export default connect(mapStateToProps)(Admin);
