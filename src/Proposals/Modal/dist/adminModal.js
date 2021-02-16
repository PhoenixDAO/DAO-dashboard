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
var Modal_1 = require("Shared/Modal");
var Button_1 = require("Shared/Button");
var like_svg_1 = require("assets/images/icons/like.svg");
var style_module_scss_1 = require("./style.module.scss");
var axios_1 = require("axios");
var react_redux_1 = require("react-redux");
var collapse_1 = require("./collapse");
var core_1 = require("@material-ui/core");
var const_1 = require("../../const");
var Tooltip_1 = require("@material-ui/core/Tooltip");
var TextField_1 = require("@material-ui/core/TextField");
var styles_1 = require("@material-ui/core/styles");
var contractsInit_1 = require("../../config/contractsInit");
var styles_2 = require("@material-ui/core/styles");
var Dialog_1 = require("@material-ui/core/Dialog");
var DialogActions_1 = require("@material-ui/core/DialogActions");
var DialogContent_1 = require("@material-ui/core/DialogContent");
var DialogContentText_1 = require("@material-ui/core/DialogContentText");
var DialogTitle_1 = require("@material-ui/core/DialogTitle");
var Slide_1 = require("@material-ui/core/Slide");
var web3_1 = require("web3");
var const_2 = require("../../const");
var useStyles = styles_1.makeStyles(function (theme) {
    var _a, _b;
    return styles_2.createStyles({
        dialogueText: {
            "& .MuiTypography-h6": {
                fontSize: "16px"
            },
            "& .MuiDialogContentText-root": {
                fontSize: "15px",
                color: "black",
                marginTop: "20px",
                marginBottom: "20px"
            },
            "& .MuiDialogTitle-root": {
                flex: "0 0 auto",
                margin: "0 0 5px 0",
                padding: "12px 24px 8px 24px",
                backgroundColor: "#EA8604",
                color: "#FFFFFF"
            },
            "& .MuiDialogActions-root": {
                marginTop: "20px",
                marginBottom: "20px",
                flex: "0 0 auto",
                display: "flex",
                padding: "8px 0 14px 0",
                alignItems: "center",
                justifyContent: "space-around",
                flexDirection: "column"
            },
            "& .MuiDialogContent-root": {
                overflowY: "auto",
                width: "85%",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "6px",
                padding: "0",
                flex: "0 0 auto"
            },
            "& .MuiDialog-paperWidthSm": {
                maxWidth: "486px",
                maxHeight: "90vh"
            }
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
            minWidth: "100px"
        },
        firstfields: (_a = {
                "& .MuiInputBase-root": {
                    fontSize: "12px"
                },
                "& .MuiFormLabel-root": {
                    fontSize: "12px"
                },
                "& .MuiFormHelperText-root": {
                    fontSize: "10px"
                }
            },
            _a[theme.breakpoints.down("xl")] = {
                width: "188px"
            },
            _a[theme.breakpoints.up("lg")] = {
                width: "198px"
            },
            _a[theme.breakpoints.down("lg")] = {
                width: "198px"
            },
            _a[theme.breakpoints.down("md")] = {
                width: "165px"
            },
            _a[theme.breakpoints.down("xs")] = {
                width: "165px"
            },
            _a[theme.breakpoints.up("xs")] = {
                width: "160px"
            },
            _a),
        description: (_b = {},
            _b[theme.breakpoints.down("sm")] = {
                width: "220px",
                "& .MuiInputBase-root": {
                    fontSize: "18px",
                    marginBottom: "10px",
                    width: "220px"
                },
                "& .MuiFormLabel-root": {
                    fontSize: "18px",
                    fontWeight: "normal",
                    color: "#EA8604",
                    width: "max-content"
                },
                "& .MuiFormHelperText-root": {
                    fontSize: "5px"
                }
            },
            _b[theme.breakpoints.up("sm")] = {
                width: "420px",
                "& .MuiInputBase-root": {
                    fontSize: "18px",
                    marginBottom: "10px",
                    width: "420px"
                },
                "& .MuiFormLabel-root": {
                    fontSize: "18px",
                    fontWeight: "normal",
                    color: "#EA8604"
                },
                "& .MuiFormHelperText-root": {
                    fontSize: "5px"
                }
            },
            _b["& .MuiInputBase-root"] = {
                fontSize: "18px",
                marginBottom: "10px"
            },
            _b["& .MuiFormLabel-root"] = {
                fontSize: "18px",
                fontWeight: "normal",
                color: "#EA8604",
                width: "max-content"
            },
            _b["& .MuiFormHelperText-root"] = {
                fontSize: "10px"
            },
            _b["& .MuiOutlinedInput-inputMultiline"] = {
                padding: "0",
                fontSize: "13px"
            },
            _b)
    });
});
var checkAccounts = function () { return __awaiter(void 0, void 0, void 0, function () {
    var temp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, contractsInit_1["default"].init()];
            case 1:
                temp = _a.sent();
                console.log("Accounts testing", temp);
                return [2 /*return*/];
        }
    });
}); };
var Transition = react_1["default"].forwardRef(function Transition(props, ref) {
    return react_1["default"].createElement(Slide_1["default"], __assign({ direction: "up", ref: ref }, props));
});
var LightTooltip = styles_1.withStyles(function (theme) { return ({
    tooltip: {
        fontSize: 11
    }
}); })(Tooltip_1["default"]);
var changeFormat = function (date) {
    date = new Date(date);
    return new Date(date.getTime()).getDate() + "/" + (new Date(date.getTime()).getMonth() + 1) + "/" + new Date(date.getTime()).getFullYear();
};
var ProposalModal = function (props) {
    var _a = react_1.useState(false), myLoading1 = _a[0], setMyLoading1 = _a[1];
    var _b = react_1.useState(false), myLoading2 = _b[0], setMyLoading2 = _b[1];
    var _c = react_1.useState(false), disable = _c[0], setDisable = _c[1];
    var _d = react_1.useState(false), metaMaskRejectError = _d[0], setMetaMaskRejectError = _d[1];
    var _e = react_1.useState(false), checkNetwork = _e[0], setCheckNetwork = _e[1];
    var checkAdmin = function (address) { return __awaiter(void 0, void 0, void 0, function () {
        var value;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, contractsInit_1["default"].phoenixProposalContract()];
                case 1: return [4 /*yield*/, ((_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.methods.isOwner(address).call())];
                case 2:
                    value = _b.sent();
                    console.log("network in checkAdmin");
                    return [2 /*return*/, value];
            }
        });
    }); };
    var checkBalance = function (address) { return __awaiter(void 0, void 0, void 0, function () {
        var value;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, contractsInit_1["default"].initPhnxTokenContract()];
                case 1: return [4 /*yield*/, ((_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.methods.balanceOf(address).call())];
                case 2:
                    value = _b.sent();
                    value = web3_1["default"].utils.fromWei(value);
                    console.log("balance", value);
                    console.log("balance collateral", props.collateral);
                    //return value;
                    if (value > props.collateral) {
                        return [2 /*return*/, true];
                    }
                    else {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var changeStatusOfProposal = function (id, index, status, resetData, close) { return __awaiter(void 0, void 0, void 0, function () {
        var network, test, checkingAdmin, temp, get, get, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 15, , 16]);
                    return [4 /*yield*/, contractsInit_1["default"].init()];
                case 1:
                    network = _a.sent();
                    console.log("network  ", network);
                    return [4 /*yield*/, checkBalance(props.proposalUSerNumioAddress)];
                case 2:
                    test = _a.sent();
                    console.log("Testing", test);
                    if (!test && status == "UpVote") {
                        props.openSnackbar("Insufficient amount", "error");
                        return [2 /*return*/, null];
                    }
                    if (!(network.network != const_2.ethereumNetwork)) return [3 /*break*/, 3];
                    // setCheckNetwork(true);
                    console.log("IN IF 1");
                    //checkVar = true;
                    props.openSnackbar("Netowrk must be Rinkeby", "error");
                    return [3 /*break*/, 14];
                case 3: return [4 /*yield*/, checkAdmin(network.address)];
                case 4:
                    checkingAdmin = _a.sent();
                    console.log("network admin", checkingAdmin);
                    console.log("network", network.network);
                    if (!(checkingAdmin == false)) return [3 /*break*/, 5];
                    console.log("IN IF 2 ADMIN");
                    props.openSnackbar("User is not the admin", "error");
                    return [3 /*break*/, 14];
                case 5:
                    console.log("IN ELSE");
                    if (status == "UpVote") {
                        setMyLoading1(true);
                    }
                    else {
                        setMyLoading2(true);
                    }
                    setDisable(true);
                    return [4 /*yield*/, contractsInit_1["default"].init()];
                case 6:
                    temp = _a.sent();
                    console.log("temp 2", temp);
                    if (!(status == "UpVote")) return [3 /*break*/, 9];
                    return [4 /*yield*/, blockChainFunction(props._id, 1, temp.address)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, axios_1["default"].put("" + const_1.URL + const_1.Proposal + id, {
                            status: status
                        }, {
                            headers: {
                                Authorization: "Bearer " + props.user.token
                            }
                        })];
                case 8:
                    get = _a.sent();
                    props.openSnackbar("Proposal successfully accepted !", "success");
                    return [3 /*break*/, 13];
                case 9:
                    console.log("Testing", props);
                    return [4 /*yield*/, blockChainFunction(props._id, 5, temp.address)];
                case 10:
                    _a.sent();
                    if (!(metaMaskRejectError == false)) return [3 /*break*/, 12];
                    return [4 /*yield*/, axios_1["default"].put("" + const_1.URL + const_1.Proposal + id, {
                            status: status,
                            reasonForRejecting: proposalRejectionReason,
                            email: props.email,
                            proposalName: props.title,
                            createdAt: props.createdAt
                        }, {
                            headers: {
                                Authorization: "Bearer " + props.user.token
                            }
                        })];
                case 11:
                    get = _a.sent();
                    _a.label = 12;
                case 12:
                    setMyLoading1(false);
                    setMyLoading2(false);
                    props.openSnackbar("Proposal successfully rejected !", "success");
                    _a.label = 13;
                case 13:
                    resetData();
                    props.close();
                    _a.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    err_1 = _a.sent();
                    console.log("IN CATCH", err_1);
                    if (checkNetwork) {
                        console.log("Network 2 ///", checkNetwork);
                        console.log("error");
                        props.openSnackbar("Network must be Rinkeby", "error");
                    }
                    else {
                        //props.openSnackbar("Oops! Something went wrong", "error");
                        props.openSnackbar("Transaction failed", "error");
                        console.log("Error", err_1);
                        setMyLoading1(false);
                        setMyLoading2(false);
                        props.close();
                    }
                    return [3 /*break*/, 16];
                case 16: return [2 /*return*/];
            }
        });
    }); };
    var blockChainFunction = function (id, status, fromAccount) { return __awaiter(void 0, void 0, void 0, function () {
        var temp, value;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("From", fromAccount);
                    return [4 /*yield*/, contractsInit_1["default"].phoenixProposalContract()];
                case 1:
                    temp = _b.sent();
                    console.log("temp", temp);
                    return [4 /*yield*/, temp];
                case 2: return [4 /*yield*/, ((_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.methods.updateProposalStatus(id, status).send({ from: fromAccount }).on("transactionHash", function (hash) {
                        console.log(hash);
                    }).on("confirmation", function (confirmationNumber, receipt) {
                        if (confirmationNumber === 2) {
                            console.log(receipt);
                            console.log("Confirmed");
                        }
                    }).on("error", function () {
                        console.log("Cancelled");
                        setMetaMaskRejectError(true);
                        props.close();
                    }))];
                case 3:
                    value = _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var _f = react_1.useState({}), milestones = _f[0], setMilestones = _f[1];
    var getProposalOfStatusAccepted = function () { return __awaiter(void 0, void 0, void 0, function () {
        var get, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"]
                            .post("" + const_1.URL + const_1.ProposalByStatus, {
                            status: "Accepted"
                        }, {
                            headers: {
                                Authorization: "Bearer " + props.user.token
                            }
                        })
                            .then(function (value) {
                            var result = {};
                            value.data.result.map(function (_value, i) {
                                result[_value._id] = {
                                    name: _value.name,
                                    milestone: _value.milestone
                                        .map(function (milestonee, index) {
                                        return __assign(__assign({}, milestonee), { index: index });
                                    })
                                        .filter(function (milestonee) {
                                        return milestonee.status === "Pending";
                                    })
                                };
                            });
                            setMilestones(result);
                        })];
                case 1:
                    get = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var _g = react_1.useState([]), testState = _g[0], setTestState = _g[1];
    var statusUpVote = "UpVote";
    var statusRejected = "Rejected";
    var tempBool = true;
    var classes = useStyles();
    var _h = react_1.useState(false), openDialogueState = _h[0], setOpenDialogueState = _h[1];
    var _j = react_1.useState(""), proposalRejectionReason = _j[0], setProposalRejectionReason = _j[1];
    var _k = react_1.useState({
        id: undefined,
        index: undefined,
        status: undefined,
        resetData: undefined,
        close: undefined
    }), approvalState = _k[0], setApprovalState = _k[1];
    var _l = react_1.useState(""), dialogueMessage = _l[0], setDialogueMessage = _l[1];
    var openDialogue = function (id, index, status, resetData, close) {
        // e.preventDefault();
        if (status == statusUpVote) {
            setDialogueMessage("On approving this you agree that this proposal fulfills the DAO initial voting criteria. The proposal will be moved in upvote section.");
        }
        else {
            setDialogueMessage("On approving this you agree that this proposal do not fulfill the DAO initial voting criteria. The proposal will be removed and is not shown in upvote section.");
        }
        setApprovalState({ id: id, index: index, status: status, resetData: resetData, close: close });
        setOpenDialogueState(true);
    };
    var handleDialogue = function (result) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // console.log(status);
                    console.log("-----]]]", approvalState.status);
                    if (result &&
                        !proposalRejectionReason &&
                        approvalState.status == "Rejected") {
                        props.openSnackbar("Please provide the reason", "error");
                        return [2 /*return*/, true];
                    }
                    setOpenDialogueState(false);
                    setDialogueMessage("");
                    if (!result) return [3 /*break*/, 2];
                    return [4 /*yield*/, changeStatusOfProposal(approvalState.id, approvalState.index, approvalState.status, approvalState.resetData, approvalState.close)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var handleProposalRejection = function (e, status) {
        console.log("abcdefg", e.target.value);
        setProposalRejectionReason(e.target.value);
    };
    react_1.useEffect(function () {
        console.log("123 Address", props);
        checkAccounts();
        checkBalance(props.proposalUSerNumioAddress);
        // setProposalRejectionReason("");
    });
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Dialog_1["default"], { open: openDialogueState, TransitionComponent: Transition, keepMounted: true, onClose: function () { return handleDialogue(false); }, "aria-labelledby": "alert-dialog-slide-title", "aria-describedby": "alert-dialog-slide-description", className: classes.dialogueText },
            react_1["default"].createElement(DialogTitle_1["default"], { className: classes.dialogueText, id: "alert-dialog-slide-title" }, "Are you sure?"),
            react_1["default"].createElement(DialogContent_1["default"], { className: classes.dialogueText },
                react_1["default"].createElement(DialogContentText_1["default"], { className: classes.dialogueText, id: "alert-dialog-slide-description" }, dialogueMessage)),
            approvalState.status == "Rejected" ? (react_1["default"].createElement("div", { className: style_module_scss_1["default"].dialogDiv },
                react_1["default"].createElement("div", { style: { textAlign: "center" } },
                    react_1["default"].createElement(TextField_1["default"], { required: true, multiline: true, rows: 6, variant: "outlined", label: "Reason", value: proposalRejectionReason, onChange: function (e) { return handleProposalRejection(e, "Rejected"); }, className: classes.firstfields, style: { width: "85%", marginTop: "10px" } })))) : // <input onChange={(e: any) => handleProposalRejection(e)} />
                null,
            react_1["default"].createElement(DialogActions_1["default"], { className: classes.dialogueText },
                react_1["default"].createElement(Button_1["default"], { onClick: function () { return handleDialogue(false); }, color: "primary", style: { color: "#EA8604", width: "85%", marginBottom: "9px" } }, "Disagree"),
                react_1["default"].createElement(Button_1["default"], { onClick: function () { return handleDialogue(true); }, color: "primary", style: {
                        color: "white",
                        backgroundColor: "#EA8604",
                        width: "85%",
                        marginLeft: "0px"
                    } }, "Agree"))),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(Modal_1["default"], { title: props.title, close: props.close, actions: react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement(Button_1["default"], { primary: true, outline: true, icon: like_svg_1["default"], disabled: myLoading1 == true || myLoading2 == true ? true : false, onClick: function () {
                            if (disable == false) {
                                openDialogue(props._id, props.index, statusUpVote, props.resetData, props.close);
                            }
                        } }, myLoading1 ? react_1["default"].createElement(core_1.CircularProgress, { size: 12 }) : props.button1),
                    react_1["default"].createElement(Button_1["default"], { primary: true, disabled: myLoading1 == true || myLoading2 == true ? true : false, onClick: function () {
                            if (disable == false) {
                                openDialogue(props._id, props.index, statusRejected, props.resetData, props.close);
                            }
                        } }, myLoading2 ? react_1["default"].createElement(core_1.CircularProgress, { size: 12, style: { color: "white" } }) : props.button2)) },
                react_1["default"].createElement("div", { className: style_module_scss_1["default"].modalContent },
                    console.log("Address", props.user.numioAddress),
                    react_1["default"].createElement("div", { className: style_module_scss_1["default"].modalBrief },
                        react_1["default"].createElement("div", { style: { textAlign: "center", alignItems: "center" } },
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("span", { style: { fontSize: "14px", color: "#EA8604" } }, "Budget")),
                            react_1["default"].createElement("div", { style: { marginTop: "5px" } },
                                react_1["default"].createElement("span", null, props.budget),
                                " ",
                                react_1["default"].createElement("span", null, "PHNX"))),
                        react_1["default"].createElement("div", { style: { textAlign: "center", alignItems: "center" } },
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("span", { style: { fontSize: "14px", color: "#EA8604" } }, "Milestones")),
                            react_1["default"].createElement("div", { style: { marginTop: "5px" } },
                                react_1["default"].createElement("span", null, props.milestones.length))),
                        react_1["default"].createElement("div", { style: {
                                width: "80px",
                                textAlign: "center",
                                alignItems: "center"
                            } },
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("span", { style: { fontSize: "14px", color: "#EA8604" } }, "Submitted")),
                            react_1["default"].createElement("span", null, "(dd/mm/yyyy)"),
                            react_1["default"].createElement("div", null, changeFormat(props.createdAt)))),
                    react_1["default"].createElement("form", { className: classes.description, noValidate: true, autoComplete: "off" },
                        react_1["default"].createElement(TextField_1["default"], { id: "outlined-multiline-static", label: "Project Description", multiline: true, rows: 3, defaultValue: props.description, InputProps: {
                                readOnly: true
                            }, variant: "outlined" })),
                    react_1["default"].createElement("div", { className: style_module_scss_1["default"].modalSteps },
                        react_1["default"].createElement("h3", { style: {
                                fontSize: "16px",
                                marginBottom: "10px",
                                color: "#ea8604",
                                fontWeight: "normal"
                            } }, "Milestones"),
                        react_1["default"].createElement("div", { style: {
                                height: "115px",
                                overflowY: "auto",
                                overflowX: "hidden"
                            } }, props.milestones.map(function (milestone, i) {
                            return (react_1["default"].createElement("div", null,
                                react_1["default"].createElement(collapse_1["default"], { milestone: milestone, i: i }),
                                react_1["default"].createElement("div", { className: style_module_scss_1["default"].modalStep })));
                        }))))))));
};
var mapStateToProps = function (state) { return ({
    user: state.userDetails.user
}); };
exports["default"] = react_redux_1.connect(mapStateToProps)(ProposalModal);
