import React, { useState, useEffect } from "react";
import Card from "Shared/Card";
import Table from "Shared/Table";
import Font from "Shared/Font";
import Button from "Shared/Button";
import EditModal from "./EditModal";
import ProposalModal from "Proposals/Modal";
import { connect } from "react-redux";
import { URL, ProposalByStatus } from "../const";
import axios from "axios";
import { Snackbar } from "@material-ui/core";
//import Web3 from "web3";
import Web3 from "web3";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import ContractInit from "../config/contractsInit";
import { PHNX_PROPOSAL_ADDRESS } from "../Contracts/phnxProposal";
import { CircularProgress } from "@material-ui/core";
import { createStyles } from "@material-ui/core/styles";
import { withStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { ethereumNetwork } from "../const";

import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="standard" {...props} />;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    buttonsdiv: {
      [theme.breakpoints.up("xs")]: {
        display: "flex",
        justifyContent: "space-between",
      },
      [theme.breakpoints.down("xs")]: {
        display: "block",
      },
    },
    submitbutton: {
      [theme.breakpoints.up("xs")]: {
        marginLeft: "6px",
      },
      [theme.breakpoints.down("xs")]: {
        marginLeft: "0px",
      },
    },
    approvalButton: {
      [theme.breakpoints.down("xs")]: {
        marginBottom: "5px",
      },
    },
    transactionhash: {
      [theme.breakpoints.down("xs")]: {
        fontSize: "10px",
        overflowWrap: "anywhere",
      },
    },
    dialogueText: {
      "& .MuiTypography-h6": {
        fontSize: "16px",
      },
      "& .MuiDialogContentText-root": {
        fontSize: "12px",
        color: "black",
      },
      "& .MuiDialogTitle-root": {
        flex: "0 0 auto",
        // margin: "0 0 5px 0",
        padding: "12px 24px 8px 24px",
        //  backgroundColor: "forestgreen",
        backgroundColor: "#4C42FF",
        color: "#FFFFFF",
      },

      // "& .MuiDialogActions-root": {
      //   flex: "0 0 auto",
      //   display: "flex",
      //   padding: "8px 0 14px 0",
      //   alignItems: "center",
      //   justifyContent: "space-around",
      // },
    },
  })
);

let web3js: any;

let contractDAO: any;

let contractPHNX: any;

let accounts: any;

let ethereum: any;

const _window = window as any;

const DAO_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_proposalId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_collateralAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_proposer",
        type: "address",
      },
    ],
    name: "CollateralDeposited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_proposalId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_collateralAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_proposer",
        type: "address",
      },
    ],
    name: "ColleteralWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_proposalId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_completedMilestones",
        type: "uint256",
      },
    ],
    name: "CompletedMilestone",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_proposalId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amountReleased",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_admin",
        type: "address",
      },
    ],
    name: "FundsReleased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "_proposalId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_previousStatus",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_newStatus",
        type: "uint256",
      },
    ],
    name: "ProposalStatusUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "fundsRequested",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "initiationTimestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "completionTimestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "colletralAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalMilestones",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "status",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalVotes",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "proposer",
        type: "address",
      },
    ],
    name: "ProposalSubmitted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "getBaseInterest",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_phoenixContractAddress",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_proposalId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "issueFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "phnxContractAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "proposalList",
    outputs: [
      {
        internalType: "uint256",
        name: "fundsRequested",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "initiationTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "completionTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "colletralAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalMilestones",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "completedMilestones",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "status",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalVotes",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "proposer",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "fundsRequested",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "colletralAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalMilestones",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_proposalId",
        type: "string",
      },
    ],
    name: "submitProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unPause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_proposalId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_status",
        type: "uint256",
      },
    ],
    name: "updateProposalStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_proposalId",
        type: "string",
      },
    ],
    name: "withdrawCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const PHNX_ABI: any = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_burner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "Burn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      { indexed: true, internalType: "address", name: "_to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "address", name: "_spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "remaining", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "allowed",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_spender", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_spender", type: "address" },
      { internalType: "uint256", name: "_value", type: "uint256" },
      { internalType: "bytes", name: "_extraData", type: "bytes" },
    ],
    name: "approveAndCall",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_value", type: "uint256" },
      { internalType: "uint256", name: "_challenge", type: "uint256" },
      { internalType: "uint256", name: "_partnerId", type: "uint256" },
    ],
    name: "authenticate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "balances",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_value", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initialOwner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "phoenixAuthAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "_addressList", type: "address[]" },
      { internalType: "uint256[]", name: "_amounts", type: "uint256[]" },
    ],
    name: "setBalances",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_auth", type: "address" }],
    name: "setPhoenixAuthAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_from", type: "address" },
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "success", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const PHNX_ADDRESS = "0x21fcf41D7C48B2a5fF70503Bf579FA34AAb72394";

const DAO_ADDRESS = "0x1cF280994Cb807402A8e2AbA8C445262392653EC";

type message = {
  message: undefined | string;
  severity: "error" | "success" | "warning" | "info" | undefined;
};

const Proposals = (props: any) => {
  const [message, setMessage] = useState<message>({
    message: undefined,
    severity: undefined,
  });

  const [value, setValue] = useState<any[]>([]);
  const [loading1, setLoading1] = useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const closeModal = () => setModalOpen(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [ethereumNetworkError, setEthereumNetworkError] = useState(false);
  const [metaMaskApproval, setMetaMaskApproval] = useState(false);
  const [checkingLoading, setCheckingLoading] = useState(true);
  const [openDialogueState, setOpenDialogueState] = useState(false);
  const [approvalDialogue, setApprovalDialogue] = useState(false);
  const [metaMaskTxHash, setMetaMaskTxHash] = useState("");
  const [forceUpdate, setForceUpdate] = useState(false);

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
        renderAgain: any;
        button1: any;
        button2: any;
        styleFlag: string;
        status: any;
        minimumUpvotes: any;
      }
    | undefined
  >(undefined);
  const [myLoader, setMyLoader] = useState(false);

  let tempDate = new Date();
  let temp: any[] = [];

  const getData = async () => {
    try {
      const get = await axios
        .post(
          `${URL}${ProposalByStatus}`,
          {
            status: "UpVote",
          },
          {
            headers: {
              Authorization: `Bearer ${props.user.token}`,
            },
          }
        )
        .then((value) => {
          // let tempDate = new Date();
          // let temp: any[] = [];
          // console.log("before splice", temp);
          // value.data.result.map((proposal: any, i: number) => {
          //   if (proposal.expirationDate > tempDate.toISOString()) {
          //     temp.push(value.data.result[i]);
          //   }
          // });
          // value.data.result.map((_value: any) => {
          //   if (_value.votes.length !== _value.minimumUpvotes) {
          //     console.log("show", value.data.result);
          //     setValue(value.data.result);
          //   }
          // });
          // console.log("votes length", value.data.result.votes.length);
          // console.log('minimum upvotes', value.data.result.minimumUp)
          // if (
          //   value.data.result.votes.length == value.data.result.minimumUpvotes
          // ) {
          //   console.log("Dont show");
          // }
          setValue(value.data.result);
          setLoading1(false);
        })
        .catch((err) => {
          setValue([]);
          setLoading1(false);
        });
    } catch (err) {
      setLoading1(false);
    }
  };

  const checkWeb3 = async () => {
    if (typeof _window.web3 !== "undefined") {
      _window.ethereum.enable();
      // Use Mist/MetaMask's provider.
      web3js = new Web3(_window.web3.currentProvider);

      //get selected account on metamask
      //accounts = await web3js.eth.getAccounts();
      let init = await ContractInit.init();
      accounts = init.address;

      //get network which metamask is connected too
      let network = await web3js.eth.net.getNetworkType();
      console.log("checking network", network);
      console.log("checking account", accounts);
      await initContract();
      return network;
    } else {
      /*** meta mask is not installed ***/
    }
  };
  const initContract = async () => {
    contractDAO = await new web3js.eth.Contract(DAO_ABI, DAO_ADDRESS);

    /*** CONTRACT ADDRESS ***/

    contractPHNX = new web3js.eth.Contract(PHNX_ABI, PHNX_ADDRESS);
    /*** CONTRACT ADDRESS ***/
  };

  const sendProposal = async () => {
    let result = await contractDAO.methods
      .submitProposal(
        "10000000000000000000",
        1500000000,
        "10000000000000000000",
        2,
        "1"
      )
      .send({ from: accounts })
      .on("transactionHash", (hash: any) => {
        // hash of tx
      })
      .on("confirmation", function (confirmationNumber: any, receipt: any) {
        if (confirmationNumber === 1) {
          // tx confirmed
        }
      });
    return result;
  };

  const sendApproval = async () => {
    setMyLoader(true);
    let result = await (await ContractInit.initPhnxTokenContract())?.methods
      .approve(PHNX_PROPOSAL_ADDRESS, "100000000000000000000000")
      .send({ from: accounts })
      .on("transactionHash", (hash: any) => {
        console.log("approval hash of transaction --> ", hash);
      })
      .on("confirmation", function (confirmationNumber: any, receipt: any) {
        if (confirmationNumber === 1) {
          // tx confirmed
          // checkApproval();
          console.log("Approval transaction sent");
          console.log(1);
          setApprovalDialogue(false);
          console.log(2);
          // openSnackbar("Approval granted", "success");
          console.log(3);
          openModal();
          console.log(4);
          setMetaMaskApproval(true);
          console.log(5);
        }
        // setMetaMaskApproval(true);
      })
      .on("error", function (error: any) {
        if (error.code == "4001") {
          console.log("Transaction rejected ");
          setMyLoader(false);
        }
      });

    // setApprovalGranted(true);
    // setMyLoader(false);
    // return result;
  };

  const checkApproval = async () => {
    let result = await (await ContractInit.initPhnxTokenContract())?.methods
      .allowance(accounts, PHNX_PROPOSAL_ADDRESS)
      .call({ from: accounts });
    console.log("What is returning --->> ??? ", result);
    if (result == "0") {
      console.log("-----", false, accounts);
      // await sendApproval();
      setCheckingLoading(false);
      setMetaMaskApproval(false);
      return false;
    } else {
      console.log("-------", true, accounts);
      // sendApproval();
      setCheckingLoading(false);
      setMetaMaskApproval(true);
      return true;
    }

    // return result;
  };

  const changeFormat = (date: any) => {
    date = new Date(date);
    return `${new Date(date.getTime()).getDate()}/${
      new Date(date.getTime()).getMonth() + 1
    }/${new Date(date.getTime()).getFullYear()} `;
  };
  const renderAgain = async () => {
    await getData();
  };

  function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue((value) => value + 1); // update the state to force render
  }

  function get_browser() {
    var ua = navigator.userAgent,
      tem,
      M =
        ua.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return { name: "IE", version: tem[1] || "" };
    }
    if (M[1] === "Chrome") {
      tem = ua.match(/\bOPR|Edge\/(\d+)/);
      if (tem != null) {
        return { name: "Opera", version: tem[1] };
      }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
      M.splice(1, 1, tem[1]);
    }
    return {
      name: M[0],
      version: M[1],
    };
  }

  useEffect(() => {
    getData();
    checking();
    let tempNameOffset, tempVersionOffset, tempVersion;

    let verOffset;

    if ((verOffset = navigator.userAgent.indexOf("Firefox")) != -1) {
      let browserName = "Firefox";
      let fullVersion = navigator.userAgent.substring(verOffset + 6);
      console.log("Browser full version ====>", fullVersion);
      console.log("browser here", navigator.userAgent);
    }

    if ((verOffset = navigator.userAgent.indexOf("Chrome")) != -1) {
      let browserName = "Chrome";
      let fullVersion = navigator.userAgent.substring(verOffset + 6);
      fullVersion = fullVersion.slice(0, -14);
      console.log("Browser full version ====>", fullVersion);
      console.log("browser here", navigator.userAgent);
    }

    // console.log("Redux address", props.user.numioAddress);
    // console.log("Browser name", navigator.appName);
    // console.log("Browser user agent", navigator.userAgent);
    var browser = get_browser(); // browser.name = 'Chrome'
    // browser.version = '40'

    console.log("Browser here", browser);
    console.log("Browser Name ====>", browser.name);
    // console.log("Browser Version", navigator.appVersion);
    // console.log("Browser user agent", navigator.userAgent);
    // if ((tempVersionOffset = navigator.userAgent.indexOf("Chrome") != -1)) {
    //   console.log("browser Chrome ====>");
    // }

    // let browserVersion = "" + parseFloat(navigator.appVersion);
    // if ((tempVersion = browserVersion.indexOf(";")) != -1)
    //   browserVersion = browserVersion.substring(0, tempVersion);

    // console.log("Browser version", browserVersion);
    //checkWeb3();
    // getData();
  }, []);

  useEffect(() => {
    if (openDialogueState) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openDialogueState]);

  const checkNetwork = async () => {
    let temp: any = await ContractInit.init();
    if (temp.network != ethereumNetwork) {
      console.log("Network 11 false");
      //openSnackbar('Network must br Rinkeby',)
      return false;
    } else {
      console.log("Network 11 true");
      return true;
    }
  };

  // const handleOpenDialogue = (scrollType: DialogProps['scroll']) => () => {
  //   setOpen(true);
  //   setScroll(scrollType);
  // };

  const checking = async () => {
    let value = await checkWeb3();
    //  console.log('')
    if (value == ethereumNetwork) {
      console.log("in if");
      let isApproved = await checkApproval();
      console.log("isApproved", isApproved);
    } else {
      console.log("Network error");
      console.log("In else");
      console.log("Here");
      setCheckingLoading(false);
    }
  };

  const openModal = async () => {
    //const networkResult: any = props.network;
    let temp: any = await ContractInit.init();
    console.log("123", temp.network);

    if (temp.network != ethereumNetwork) {
      setEthereumNetworkError(true);
      throw "Ethereum Network invalid !";
    } else {
      setModalOpen(true);
    }
  };

  // const doubleMethods = async () => {
  //   await sendApproval();
  //   await sendProposal();
  // };

  let date = new Date();
  let styleFlag = false;
  const handleNetworkErrorSnackBar = () => {
    setEthereumNetworkError(false);
  };
  const handleSnackBar = () => {
    setShowSnackBar(false);
  };

  const openDialogue = () => {
    setOpenDialogueState(true);
  };
  const descriptionElementRef = React.useRef<HTMLElement>(null);

  const openSnackbar = (
    message: string,
    severity: "error" | "success" | "warning" | "info" | undefined
  ) => {
    setMessage({ message, severity });
    setShowSnackBar(true);
  };

  const grantApproval = () => {
    setApprovalDialogue(true);
  };

  const getTxHashFromMetaMask = (txHashMM: any) => {
    console.log("MetaMask Hash --->", txHashMM);
    setMetaMaskTxHash(txHashMM.transactionHash);
  };

  const classes = useStyles();
  let test = true;
  return (
    <>
      <Dialog
        open={openDialogueState}
        onClose={() => setOpenDialogueState(false)}
        className={classes.dialogueText}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          className={classes.dialogueText}
          id="scroll-dialog-title"
          style={{ backgroundColor: "#4C42FF" }}
        >
          Proposal successfully submitted
        </DialogTitle>
        <DialogContent className={classes.dialogueText} dividers={true}>
          <DialogContentText
            className={classes.dialogueText}
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            Your proposal is successfully submitted. The proposal will not be
            visible until approved by admin. The collateral amount of 10 PHNX
            will be deducted when the Admin approves the proposal.
            {/* <h4>Transaction Hash</h4>
            {metaMaskTxHash} */}
            <br /> <br />
            <p
              style={{
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              Transaction Hash
            </p>
            <p className={classes.transactionhash}>{metaMaskTxHash}</p>
            <br /> <br />
            <a
              href={`https://rinkeby.etherscan.io/tx/${metaMaskTxHash}`}
              target="_blank"
              // type="link"
              style={{ textDecoration: "underline", color: "#0056b3" }}
            >
              View transaction on Etherscan
            </a>
            {/* https://rinkeby.etherscan.io/tx/{metaMaskTxHash} */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialogueState(false)}
            style={{ backgroundColor: "#4C42FF", color: "white" }}
          >
            Understood
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={approvalDialogue}
        onClose={() => setApprovalDialogue(false)}
        className={classes.dialogueText}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle className={classes.dialogueText} id="scroll-dialog-title">
          PHNX contract approval
        </DialogTitle>
        <DialogContent className={classes.dialogueText} dividers={true}>
          <DialogContentText
            className={classes.dialogueText}
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            To submit a proposal you need to give the contract approval
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => sendApproval()} color="primary">
            {myLoader ? <CircularProgress size={10} /> : "Grant Approval"}
          </Button>
        </DialogActions>
      </Dialog>
      {modalOpen && (
        <EditModal
          close={closeModal}
          openDialogue={openDialogue}
          openSnackbar={openSnackbar}
          getTxHashFromMetaMask={getTxHashFromMetaMask}
        />
      )}
      {projectModalItem && (
        <ProposalModal
          forceUpdate={forceUpdate}
          setForceUpdate={setForceUpdate}
          resetData={renderAgain}
          useForceUpdate={useForceUpdate}
          openSnackbar={openSnackbar}
          title={projectModalItem.title}
          reward={projectModalItem.reward}
          budget={projectModalItem.budget}
          milestones={projectModalItem.milestoness}
          description={projectModalItem.description}
          expirationDate={projectModalItem.expirationDate}
          votes={projectModalItem.votes}
          _id={projectModalItem._id}
          styleFlag={projectModalItem.styleFlag}
          button1="Upvote"
          button2="Back"
          close={() => setProjectModalItem(undefined)}
          status={projectModalItem.status}
          minimumUpvotes={projectModalItem.minimumUpvotes}
          // setSnackBar={() => setSnackBar}
        />
      )}
      <Card
        styleFlag="UpvoteProposals"
        title="Upvote Proposals"
        actions={
          <div className={classes.buttonsdiv}>
            {/* <Button
         className={classes.approvalButton}
         secondary
         onClick={async () =>
           checkingLoading
             ? null
             : !(await checkNetwork())
             ? openSnackbar("Network must be Rinkeby", "error")
             : metaMaskApproval
             ? openSnackbar("Approval already granted", "success")
             : myLoader
             ? null
             : sendApproval()
         }
       >
         {checkingLoading ? (
           <CircularProgress size={12} />
         ) : myLoader ? (
           <CircularProgress size={12} />
         ) : (
           " Send Approval"
         )}
       </Button> */}
            {/* <Button className={classes.submitbutton}
         secondary onClick={openDialogue}>im button</Button> */}
            <Button
              //style={{marginRight:"8px"}}
              className={classes.submitbutton}
              secondary
              //onClick={() => (metaMaskApproval ? openModal() : checkApproval())}
              onClick={async () =>
                checkingLoading
                  ? null
                  : !(await checkNetwork())
                  ? openSnackbar("Network must be Rinkbey", "error")
                  : metaMaskApproval
                  ? openModal()
                  : grantApproval()
              }
            >
              {checkingLoading ? (
                <CircularProgress size={12} />
              ) : (
                "Submit Proposal"
              )}
            </Button>
            {console.log("In card two")}
          </div>
        }
        tooltipMessage="Proposals approved by admin and ready for upvote"
      >
        <Table
          columns={[
            "Proposal",
            "Current Upvotes",
            "Cost (PHNX)",
            "Expiration Date ",
          ]}
        >
          {value.length == 0 ? (
            <>
              <tr>
                <td>{loading1 ? "Loading..." : "No proposals found"}</td>
              </tr>
            </>
          ) : (
            value.map((proposal: any, i) => (
              <tr
                key={i}
                onClick={() =>
                  setProjectModalItem({
                    title: proposal.name,
                    reward: proposal.reward,
                    budget: proposal.budget,
                    milestoness: proposal.milestone,
                    description: proposal.description,
                    votes: proposal.votes,
                    expirationDate: proposal.expirationDate,
                    _id: proposal._id,
                    styleFlag: "UpvoteModal",
                    button1: "UpVote",
                    button2: "Ok",
                    renderAgain: renderAgain,
                    status: proposal.status,
                    minimumUpvotes: proposal.minimumUpvotes,
                  })
                }
              >
                {value.length == 0 ? (
                  <>
                    {" "}
                    <tr>
                      <td>{loading1 ? "Loading..." : "No proposals found"}</td>
                    </tr>{" "}
                  </>
                ) : (
                  // : proposal.expirationDate < date.toISOString() ? (
                  //   ""
                  // )
                  <>
                    <td>{proposal.name}</td>
                    <td>
                      {proposal.votes.length}/
                      <Font color="success">{proposal.minimumUpvotes}</Font>
                    </td>

                    <td>{proposal.budget}</td>

                    <td style={{ color: "#EA8604" }}>
                      {changeFormat(proposal.expirationDate)}
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </Table>{" "}
        <Snackbar
          open={ethereumNetworkError}
          autoHideDuration={2000}
          message={"errorMessage"}
          onClose={handleNetworkErrorSnackBar}
        >
          <Alert style={{ fontSize: "12px" }} severity="error">
            Network error. Ethereum network must be Rinkeby !
          </Alert>
        </Snackbar>
        <Snackbar
          open={showSnackBar}
          autoHideDuration={4000}
          message={"errorMessage"}
          onClose={handleSnackBar}
        >
          <Alert style={{ fontSize: "12px" }} severity={message.severity}>
            {message.message}
          </Alert>
        </Snackbar>
      </Card>
    </>
  );
};
const mapStateToProps = (state: any) => ({
  user: state.userDetails.user,
  network: state.layoutReducer.network,
});

export default connect(mapStateToProps)(Proposals);
