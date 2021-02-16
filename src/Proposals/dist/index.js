"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var Card_1 = require("Shared/Card");
var Table_1 = require("Shared/Table");
var Font_1 = require("Shared/Font");
var Button_1 = require("Shared/Button");
var EditModal_1 = require("./EditModal");
var Modal_1 = require("Proposals/Modal");
var react_redux_1 = require("react-redux");
var const_1 = require("../const");
var axios_1 = require("axios");
var core_1 = require("@material-ui/core");
//import Web3 from "web3";
var web3_1 = require("web3");
var Alert_1 = require("@material-ui/lab/Alert");
var contractsInit_1 = require("../config/contractsInit");
var phnxProposal_1 = require("../Contracts/phnxProposal");
var core_2 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var styles_2 = require("@material-ui/core/styles");
var const_2 = require("../const");
var Dialog_1 = require("@material-ui/core/Dialog");
var DialogActions_1 = require("@material-ui/core/DialogActions");
var DialogContent_1 = require("@material-ui/core/DialogContent");
var DialogContentText_1 = require("@material-ui/core/DialogContentText");
var DialogTitle_1 = require("@material-ui/core/DialogTitle");
function Alert(props) {
    return react_1["default"].createElement(Alert_1["default"], __assign({ elevation: 6, variant: "standard" }, props));
}
var useStyles = styles_2.makeStyles(function (theme) {
    var _a, _b, _c, _d;
    return styles_1.createStyles({
        buttonsdiv: (_a = {},
            _a[theme.breakpoints.up("xs")] = {
                display: "flex",
                justifyContent: "space-between"
            },
            _a[theme.breakpoints.down("xs")] = {
                display: "block"
            },
            _a),
        submitbutton: (_b = {},
            _b[theme.breakpoints.up("xs")] = {
                marginLeft: "6px"
            },
            _b[theme.breakpoints.down("xs")] = {
                marginLeft: "0px"
            },
            _b),
        approvalButton: (_c = {},
            _c[theme.breakpoints.down("xs")] = {
                marginBottom: "5px"
            },
            _c),
        transactionhash: (_d = {},
            _d[theme.breakpoints.down("xs")] = {
                fontSize: "10px",
                overflowWrap: "anywhere"
            },
            _d),
        dialogueText: {
            "& .MuiTypography-h6": {
                fontSize: "16px"
            },
            "& .MuiDialogContentText-root": {
                fontSize: "12px",
                color: "black"
            },
            "& .MuiDialogTitle-root": {
                flex: "0 0 auto",
                // margin: "0 0 5px 0",
                padding: "12px 24px 8px 24px",
                //  backgroundColor: "forestgreen",
                backgroundColor: "#4C42FF",
                color: "#FFFFFF"
            }
        }
    });
});
var web3js;
var contractDAO;
var contractPHNX;
var accounts;
var ethereum;
var _window = window;
var DAO_ABI = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "_proposalId",
                type: "string"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_collateralAmount",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "address",
                name: "_proposer",
                type: "address"
            },
        ],
        name: "CollateralDeposited",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "_proposalId",
                type: "string"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_collateralAmount",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "address",
                name: "_proposer",
                type: "address"
            },
        ],
        name: "ColleteralWithdrawn",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "_proposalId",
                type: "string"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_completedMilestones",
                type: "uint256"
            },
        ],
        name: "CompletedMilestone",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "_proposalId",
                type: "string"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_amountReleased",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "address",
                name: "_admin",
                type: "address"
            },
        ],
        name: "FundsReleased",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address"
            },
        ],
        name: "OwnershipTransferred",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address"
            },
        ],
        name: "Paused",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "_proposalId",
                type: "string"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_previousStatus",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_newStatus",
                type: "uint256"
            },
        ],
        name: "ProposalStatusUpdated",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "fundsRequested",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "initiationTimestamp",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "completionTimestamp",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "colletralAmount",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "totalMilestones",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "status",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "totalVotes",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "address",
                name: "proposer",
                type: "address"
            },
        ],
        name: "ProposalSubmitted",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address"
            },
        ],
        name: "Unpaused",
        type: "event"
    },
    {
        inputs: [],
        name: "getBaseInterest",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_phoenixContractAddress",
                type: "address"
            },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_proposalId",
                type: "string"
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256"
            },
        ],
        name: "issueFunds",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "pause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "paused",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "phnxContractAddress",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "",
                type: "string"
            },
        ],
        name: "proposalList",
        outputs: [
            {
                internalType: "uint256",
                name: "fundsRequested",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "initiationTimestamp",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "completionTimestamp",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "colletralAmount",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "totalMilestones",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "completedMilestones",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "status",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "totalVotes",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "proposer",
                type: "address"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "fundsRequested",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "endTimestamp",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "colletralAmount",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "totalMilestones",
                type: "uint256"
            },
            {
                internalType: "string",
                name: "_proposalId",
                type: "string"
            },
        ],
        name: "submitProposal",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address"
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "unPause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_proposalId",
                type: "string"
            },
            {
                internalType: "uint256",
                name: "_status",
                type: "uint256"
            },
        ],
        name: "updateProposalStatus",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_proposalId",
                type: "string"
            },
        ],
        name: "withdrawCollateral",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
];
var PHNX_ABI = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "_owner",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "_spender",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_amount",
                type: "uint256"
            },
        ],
        name: "Approval",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "_burner",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_amount",
                type: "uint256"
            },
        ],
        name: "Burn",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address"
            },
        ],
        name: "OwnershipTransferred",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "_from",
                type: "address"
            },
            { indexed: true, internalType: "address", name: "_to", type: "address" },
            {
                indexed: false,
                internalType: "uint256",
                name: "_amount",
                type: "uint256"
            },
        ],
        name: "Transfer",
        type: "event"
    },
    {
        inputs: [
            { internalType: "address", name: "_owner", type: "address" },
            { internalType: "address", name: "_spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ internalType: "uint256", name: "remaining", type: "uint256" }],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            { internalType: "address", name: "", type: "address" },
            { internalType: "address", name: "", type: "address" },
        ],
        name: "allowed",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            { internalType: "address", name: "_spender", type: "address" },
            { internalType: "uint256", name: "_amount", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ internalType: "bool", name: "success", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function"
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
        type: "function"
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
        type: "function"
    },
    {
        inputs: [{ internalType: "address", name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "balances",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [{ internalType: "uint256", name: "_value", type: "uint256" }],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "initialOwner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "phoenixAuthAddress",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            { internalType: "address[]", name: "_addressList", type: "address[]" },
            { internalType: "uint256[]", name: "_amounts", type: "uint256[]" },
        ],
        name: "setBalances",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [{ internalType: "address", name: "_auth", type: "address" }],
        name: "setPhoenixAuthAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            { internalType: "address", name: "_to", type: "address" },
            { internalType: "uint256", name: "_amount", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ internalType: "bool", name: "success", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function"
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
        type: "function"
    },
    {
        inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
];
var PHNX_ADDRESS = "0x21fcf41D7C48B2a5fF70503Bf579FA34AAb72394";
var DAO_ADDRESS = "0x1cF280994Cb807402A8e2AbA8C445262392653EC";
var Proposals = function (props) {
    var _a = react_1.useState({
        message: undefined,
        severity: undefined
    }), message = _a[0], setMessage = _a[1];
    var _b = react_1.useState([]), value = _b[0], setValue = _b[1];
    var _c = react_1.useState(true), loading1 = _c[0], setLoading1 = _c[1];
    var _d = react_1["default"].useState(false), modalOpen = _d[0], setModalOpen = _d[1];
    var closeModal = function () { return setModalOpen(false); };
    var _e = react_1.useState(false), showSnackBar = _e[0], setShowSnackBar = _e[1];
    var _f = react_1.useState(false), ethereumNetworkError = _f[0], setEthereumNetworkError = _f[1];
    var _g = react_1.useState(false), metaMaskApproval = _g[0], setMetaMaskApproval = _g[1];
    var _h = react_1.useState(true), checkingLoading = _h[0], setCheckingLoading = _h[1];
    var _j = react_1.useState(false), openDialogueState = _j[0], setOpenDialogueState = _j[1];
    var _k = react_1.useState(false), approvalDialogue = _k[0], setApprovalDialogue = _k[1];
    var _l = react_1.useState(""), metaMaskTxHash = _l[0], setMetaMaskTxHash = _l[1];
    var _m = react_1.useState(false), forceUpdate = _m[0], setForceUpdate = _m[1];
    var _o = react_1["default"].useState(undefined), projectModalItem = _o[0], setProjectModalItem = _o[1];
    var _p = react_1.useState(false), myLoader = _p[0], setMyLoader = _p[1];
    var getData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var get, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"]
                            .post("" + const_1.URL + const_1.ProposalByStatus, {
                            status: "UpVote"
                        }, {
                            headers: {
                                Authorization: "Bearer " + props.user.token
                            }
                        })
                            .then(function (value) {
                            // let tempDate = new Date();
                            // let temp: any[] = [];
                            // console.log("before splice", temp);
                            // value.data.result.map((proposal: any, i: number) => {
                            //   if (proposal.expirationDate > tempDate.toISOString()) {
                            //     temp.push(value.data.result[i]);
                            //   }
                            // });
                            // console.log("after splice", temp);
                            console.log("value", value.data.result);
                            value.data.result.map(function (_value) {
                                if (_value.votes.length !== _value.minimumUpvotes) {
                                    console.log("show", value.data.result);
                                    setValue(value.data.result);
                                }
                            });
                            // console.log("votes length", value.data.result.votes.length);
                            // console.log('minimum upvotes', value.data.result.minimumUp)
                            // if (
                            //   value.data.result.votes.length == value.data.result.minimumUpvotes
                            // ) {
                            //   console.log("Dont show");
                            // }
                            // setValue(value.data.result);
                            setLoading1(false);
                        })["catch"](function (err) {
                            setValue([]);
                            setLoading1(false);
                        })];
                case 1:
                    get = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    setLoading1(false);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var checkWeb3 = function () { return __awaiter(void 0, void 0, void 0, function () {
        var init, network;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(typeof _window.web3 !== "undefined")) return [3 /*break*/, 4];
                    _window.ethereum.enable();
                    // Use Mist/MetaMask's provider.
                    web3js = new web3_1["default"](_window.web3.currentProvider);
                    return [4 /*yield*/, contractsInit_1["default"].init()];
                case 1:
                    init = _a.sent();
                    accounts = init.address;
                    return [4 /*yield*/, web3js.eth.net.getNetworkType()];
                case 2:
                    network = _a.sent();
                    console.log("checking network", network);
                    console.log("checking account", accounts);
                    return [4 /*yield*/, initContract()];
                case 3:
                    _a.sent();
                    return [2 /*return*/, network];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var initContract = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new web3js.eth.Contract(DAO_ABI, DAO_ADDRESS)];
                case 1:
                    contractDAO = _a.sent();
                    /*** CONTRACT ADDRESS ***/
                    contractPHNX = new web3js.eth.Contract(PHNX_ABI, PHNX_ADDRESS);
                    return [2 /*return*/];
            }
        });
    }); };
    var sendProposal = function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, contractDAO.methods
                        .submitProposal("10000000000000000000", 1500000000, "10000000000000000000", 2, "1")
                        .send({ from: accounts })
                        .on("transactionHash", function (hash) {
                        // hash of tx
                    })
                        .on("confirmation", function (confirmationNumber, receipt) {
                        if (confirmationNumber === 1) {
                            // tx confirmed
                        }
                    })];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    }); };
    var sendApproval = function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setMyLoader(true);
                    return [4 /*yield*/, contractsInit_1["default"].initPhnxTokenContract()];
                case 1: return [4 /*yield*/, ((_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.methods.approve(phnxProposal_1.PHNX_PROPOSAL_ADDRESS, "100000000000000000000000").send({ from: accounts }).on("transactionHash", function (hash) {
                        console.log("approval hash of transaction --> ", hash);
                    }).on("confirmation", function (confirmationNumber, receipt) {
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
                    }).on("error", function (error) {
                        if (error.code == "4001") {
                            console.log("Transaction rejected ");
                            setMyLoader(false);
                        }
                    }))];
                case 2:
                    result = _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var checkApproval = function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, contractsInit_1["default"].initPhnxTokenContract()];
                case 1: return [4 /*yield*/, ((_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.methods.allowance(accounts, phnxProposal_1.PHNX_PROPOSAL_ADDRESS).call({ from: accounts }))];
                case 2:
                    result = _b.sent();
                    console.log("What is returning --->> ??? ", result);
                    if (result == "0") {
                        console.log("-----", false, accounts);
                        // await sendApproval();
                        setCheckingLoading(false);
                        setMetaMaskApproval(false);
                        return [2 /*return*/, false];
                    }
                    else {
                        console.log("-------", true, accounts);
                        // sendApproval();
                        setCheckingLoading(false);
                        setMetaMaskApproval(true);
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var changeFormat = function (date) {
        date = new Date(date);
        return new Date(date.getTime()).getDate() + "/" + (new Date(date.getTime()).getMonth() + 1) + "/" + new Date(date.getTime()).getFullYear() + " ";
    };
    var renderAgain = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getData()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    function useForceUpdate() {
        var _a = react_1.useState(0), value = _a[0], setValue = _a[1]; // integer state
        return function () { return setValue(function (value) { return value + 1; }); }; // update the state to force render
    }
    react_1.useEffect(function () {
        getData();
        checking();
        console.log("Redux address", props.user.numioAddress);
        //checkWeb3();
        // getData();
    }, []);
    react_1.useEffect(function () {
        if (openDialogueState) {
            var descriptionElement = descriptionElementRef.current;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openDialogueState]);
    var checkNetwork = function () { return __awaiter(void 0, void 0, void 0, function () {
        var temp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, contractsInit_1["default"].init()];
                case 1:
                    temp = _a.sent();
                    if (temp.network != const_2.ethereumNetwork) {
                        console.log("Network 11 false");
                        //openSnackbar('Network must br Rinkeby',)
                        return [2 /*return*/, false];
                    }
                    else {
                        console.log("Network 11 true");
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    // const handleOpenDialogue = (scrollType: DialogProps['scroll']) => () => {
    //   setOpen(true);
    //   setScroll(scrollType);
    // };
    var checking = function () { return __awaiter(void 0, void 0, void 0, function () {
        var value, isApproved;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, checkWeb3()];
                case 1:
                    value = _a.sent();
                    if (!(value == const_2.ethereumNetwork)) return [3 /*break*/, 3];
                    console.log("in if");
                    return [4 /*yield*/, checkApproval()];
                case 2:
                    isApproved = _a.sent();
                    console.log("isApproved", isApproved);
                    return [3 /*break*/, 4];
                case 3:
                    console.log("Network error");
                    console.log("In else");
                    console.log("Here");
                    setCheckingLoading(false);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var openModal = function () { return __awaiter(void 0, void 0, void 0, function () {
        var temp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, contractsInit_1["default"].init()];
                case 1:
                    temp = _a.sent();
                    console.log("123", temp.network);
                    if (temp.network != const_2.ethereumNetwork) {
                        setEthereumNetworkError(true);
                        throw "Ethereum Network invalid !";
                    }
                    else {
                        setModalOpen(true);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    // const doubleMethods = async () => {
    //   await sendApproval();
    //   await sendProposal();
    // };
    var date = new Date();
    var styleFlag = false;
    var handleNetworkErrorSnackBar = function () {
        setEthereumNetworkError(false);
    };
    var handleSnackBar = function () {
        setShowSnackBar(false);
    };
    var openDialogue = function () {
        setOpenDialogueState(true);
    };
    var descriptionElementRef = react_1["default"].useRef(null);
    var openSnackbar = function (message, severity) {
        setMessage({ message: message, severity: severity });
        setShowSnackBar(true);
    };
    var grantApproval = function () {
        setApprovalDialogue(true);
    };
    var getTxHashFromMetaMask = function (txHashMM) {
        console.log("MetaMask Hash --->", txHashMM);
        setMetaMaskTxHash(txHashMM.transactionHash);
    };
    var classes = useStyles();
    var test = true;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Dialog_1["default"], { open: openDialogueState, onClose: function () { return setOpenDialogueState(false); }, className: classes.dialogueText, scroll: "paper", "aria-labelledby": "scroll-dialog-title", "aria-describedby": "scroll-dialog-description" },
            react_1["default"].createElement(DialogTitle_1["default"], { className: classes.dialogueText, id: "scroll-dialog-title", style: { backgroundColor: "#4C42FF" } }, "Proposal successfully submitted"),
            react_1["default"].createElement(DialogContent_1["default"], { className: classes.dialogueText, dividers: true },
                react_1["default"].createElement(DialogContentText_1["default"], { className: classes.dialogueText, id: "scroll-dialog-description", ref: descriptionElementRef, tabIndex: -1 },
                    "Your proposal is successfully submitted. The proposal will not be visible until approved by admin. The collateral amount of 10 PHNX will be deducted when the Admin approves the proposal.",
                    react_1["default"].createElement("br", null),
                    " ",
                    react_1["default"].createElement("br", null),
                    react_1["default"].createElement("p", { style: {
                            fontWeight: "bold",
                            fontSize: "15px"
                        } }, "Transaction Hash"),
                    react_1["default"].createElement("p", { className: classes.transactionhash }, metaMaskTxHash),
                    react_1["default"].createElement("br", null),
                    " ",
                    react_1["default"].createElement("br", null),
                    react_1["default"].createElement("a", { href: "https://rinkeby.etherscan.io/tx/" + metaMaskTxHash, target: "_blank", 
                        // type="link"
                        style: { textDecoration: "underline", color: "#0056b3" } }, "View transaction on Etherscan"))),
            react_1["default"].createElement(DialogActions_1["default"], null,
                react_1["default"].createElement(Button_1["default"], { onClick: function () { return setOpenDialogueState(false); }, style: { backgroundColor: "#4C42FF", color: "white" } }, "Understood"))),
        react_1["default"].createElement(Dialog_1["default"], { open: approvalDialogue, onClose: function () { return setApprovalDialogue(false); }, className: classes.dialogueText, scroll: "paper", "aria-labelledby": "scroll-dialog-title", "aria-describedby": "scroll-dialog-description" },
            react_1["default"].createElement(DialogTitle_1["default"], { className: classes.dialogueText, id: "scroll-dialog-title" }, "PHNX contract approval"),
            react_1["default"].createElement(DialogContent_1["default"], { className: classes.dialogueText, dividers: true },
                react_1["default"].createElement(DialogContentText_1["default"], { className: classes.dialogueText, id: "scroll-dialog-description", ref: descriptionElementRef, tabIndex: -1 }, "To submit a proposal you need to give the contract approval")),
            react_1["default"].createElement(DialogActions_1["default"], null,
                react_1["default"].createElement(Button_1["default"], { onClick: function () { return sendApproval(); }, color: "primary" }, myLoader ? react_1["default"].createElement(core_2.CircularProgress, { size: 10 }) : "Grant Approval"))),
        modalOpen && (react_1["default"].createElement(EditModal_1["default"], { close: closeModal, openDialogue: openDialogue, openSnackbar: openSnackbar, getTxHashFromMetaMask: getTxHashFromMetaMask })),
        projectModalItem && (react_1["default"].createElement(Modal_1["default"], { forceUpdate: forceUpdate, setForceUpdate: setForceUpdate, resetData: renderAgain, useForceUpdate: useForceUpdate, openSnackbar: openSnackbar, title: projectModalItem.title, reward: projectModalItem.reward, budget: projectModalItem.budget, milestones: projectModalItem.milestoness, description: projectModalItem.description, expirationDate: projectModalItem.expirationDate, votes: projectModalItem.votes, _id: projectModalItem._id, styleFlag: projectModalItem.styleFlag, button1: "Upvote", button2: "Back", close: function () { return setProjectModalItem(undefined); }, status: projectModalItem.status, minimumUpvotes: projectModalItem.minimumUpvotes })),
        react_1["default"].createElement(Card_1["default"], { styleFlag: "UpvoteProposals", title: "Upvote Proposals", actions: react_1["default"].createElement("div", { className: classes.buttonsdiv },
                react_1["default"].createElement(Button_1["default"]
                //style={{marginRight:"8px"}}
                , { 
                    //style={{marginRight:"8px"}}
                    className: classes.submitbutton, secondary: true, 
                    //onClick={() => (metaMaskApproval ? openModal() : checkApproval())}
                    onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!checkingLoading) return [3 /*break*/, 1];
                                    _a = null;
                                    return [3 /*break*/, 3];
                                case 1: return [4 /*yield*/, checkNetwork()];
                                case 2:
                                    _a = !(_b.sent())
                                        ? openSnackbar("Network must be Rinkbey", "error")
                                        : metaMaskApproval
                                            ? openModal()
                                            : grantApproval();
                                    _b.label = 3;
                                case 3: return [2 /*return*/, _a];
                            }
                        });
                    }); } }, checkingLoading ? (react_1["default"].createElement(core_2.CircularProgress, { size: 12 })) : ("Submit Proposal")),
                console.log("In card two")), tooltipMessage: "Proposals approved by admin and ready for upvote" },
            react_1["default"].createElement(Table_1["default"], { columns: [
                    "Proposal",
                    "Current Upvotes",
                    "Cost (PHNX)",
                    "Expiration Date ",
                ] }, value.length == 0 ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement("tr", null,
                    react_1["default"].createElement("td", null, loading1 ? "Loading..." : "No proposals found")))) : (value.map(function (proposal, i) { return (react_1["default"].createElement("tr", { key: i, onClick: function () {
                    return setProjectModalItem({
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
                        minimumUpvotes: proposal.minimumUpvotes
                    });
                } }, value.length == 0 ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                " ",
                react_1["default"].createElement("tr", null,
                    react_1["default"].createElement("td", null, loading1 ? "Loading..." : "No proposals found")),
                " ")) : (
            // : proposal.expirationDate < date.toISOString() ? (
            //   ""
            // )
            react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement("td", null, proposal.name),
                react_1["default"].createElement("td", null,
                    proposal.votes.length,
                    "/",
                    react_1["default"].createElement(Font_1["default"], { color: "success" }, proposal.minimumUpvotes)),
                react_1["default"].createElement("td", null, proposal.budget),
                react_1["default"].createElement("td", { style: { color: "#EA8604" } }, changeFormat(proposal.expirationDate)))))); }))),
            " ",
            react_1["default"].createElement(core_1.Snackbar, { open: ethereumNetworkError, autoHideDuration: 2000, message: "errorMessage", onClose: handleNetworkErrorSnackBar },
                react_1["default"].createElement(Alert, { style: { fontSize: "12px" }, severity: "error" }, "Network error. Ethereum network must be Rinkeby !")),
            react_1["default"].createElement(core_1.Snackbar, { open: showSnackBar, autoHideDuration: 4000, message: "errorMessage", onClose: handleSnackBar },
                react_1["default"].createElement(Alert, { style: { fontSize: "12px" }, severity: message.severity }, message.message)))));
};
var mapStateToProps = function (state) { return ({
    user: state.userDetails.user,
    network: state.layoutReducer.network
}); };
exports["default"] = react_redux_1.connect(mapStateToProps)(Proposals);
