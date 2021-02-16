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
var const_1 = require("../../const");
var styles_1 = require("@material-ui/core/styles");
var TextField_1 = require("@material-ui/core/TextField");
var stake_1 = require("../../Votes/stake");
var contractsInit_1 = require("../../config/contractsInit");
var const_2 = require("../../const");
var core_1 = require("@material-ui/core");
var Alert_1 = require("@material-ui/lab/Alert");
var useStyles = styles_1.makeStyles(function (theme) {
    var _a, _b;
    return styles_1.createStyles({
        alertDiv: (_a = {},
            _a[theme.breakpoints.up("sm")] = {
                width: "420px !important",
                justifyContent: "center"
            },
            _a[theme.breakpoints.down("sm")] = {
                width: "220px",
                justifyContent: "center"
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
function Alert(props) {
    return react_1["default"].createElement(Alert_1["default"], __assign({ elevation: 6, variant: "standard" }, props));
}
var changeFormat = function (date) {
    date = new Date(date);
    return new Date(date.getTime()).getDate() + "/" + (new Date(date.getTime()).getMonth() + 1) + "/" + new Date(date.getTime()).getFullYear() + " ";
};
var VotesModal = function (props) {
    var _a = react_1.useState(false), myLoading = _a[0], setMyLoading = _a[1];
    var classes = useStyles();
    var _b = react_1.useState(true), openVotesModal = _b[0], setOpenVotesModal = _b[1];
    var _c = react_1.useState(false), ethereumNetworkError = _c[0], setEthereumNetworkError = _c[1];
    var _d = react_1.useState(false), stakedSnackBar = _d[0], setStakedSnackBar = _d[1];
    var _e = react_1.useState(false), transactionRejected = _e[0], setTransactionRejected = _e[1];
    var _f = react_1.useState(false), cannotVote = _f[0], setCannotVote = _f[1];
    var _g = react_1["default"].useState(undefined), modalItem = _g[0], setModalItem = _g[1];
    var closeModal = function () {
        setModalItem(undefined);
        props.close();
    };
    react_1.useEffect(function () {
        return console.log("Voting Status", props.selectedProposal.votingStatus);
    });
    var handleNetworkErrorSnackBar = function () {
        setEthereumNetworkError(false);
        setInterval(function () {
            setEthereumNetworkError(false);
        }, 3000);
    };
    var handleStakedSnackBar = function (state) {
        if (state === void 0) { state = true; }
        console.log("helloooo");
        setStakedSnackBar(state);
    };
    var handleTransactionRejectedError = function (input) {
        setTransactionRejected(input);
    };
    var openModal = function (item) { return __awaiter(void 0, void 0, void 0, function () {
        var temp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, contractsInit_1["default"].init()];
                case 1:
                    temp = _a.sent();
                    console.log("123", temp.network);
                    //  const networkResult: any = props.network;
                    if (temp.network != const_2.ethereumNetwork) {
                        setEthereumNetworkError(true);
                        throw "Ethereum Network invalid !";
                    }
                    else {
                        setModalItem(item);
                        setOpenVotesModal(false);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleClick = function (_id, resetData, props) { return __awaiter(void 0, void 0, void 0, function () {
        var get, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("Click", _id);
                    setMyLoading(true);
                    return [4 /*yield*/, axios_1["default"].post("" + const_1.URL + const_1.VoteOnProposal + _id, {
                            email: props.user.email
                        }, {
                            headers: {
                                Authorization: "Bearer " + props.user.token
                            }
                        })];
                case 1:
                    get = _a.sent();
                    resetData();
                    setMyLoading(false);
                    props.openSnackbar(" Successfully Upvoted! ", "success");
                    props.close();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    setMyLoading(false);
                    if (err_1.response && err_1.response.data && err_1.response.data.message) {
                        props.openSnackbar(err_1.response.data.message, "error");
                    }
                    else {
                        props.openSnackbar("Network Error", "error");
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var cannotVoteError = function () {
        setCannotVote(true);
        setTimeout(function () {
            setCannotVote(false);
        }, 3000);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(core_1.Snackbar, { open: ethereumNetworkError, autoHideDuration: 2000, message: props.toastMessage, onClose: function () { return handleNetworkErrorSnackBar(); } },
            react_1["default"].createElement(Alert, { style: { fontSize: "12px" }, severity: "error" }, "Ethereum network must be Rinkeby !")),
        modalItem && (react_1["default"].createElement(Modal_1["default"], { close: closeModal, title: modalItem.title, styleFlag: "stakeModal" },
            react_1["default"].createElement("div", { className: style_module_scss_1["default"].stakeModalContent },
                react_1["default"].createElement("div", { className: style_module_scss_1["default"].stakeModalInfo },
                    react_1["default"].createElement(stake_1["default"], { proposal: props.selectedProposal, close: closeModal, renderAgain: props.resetData, handleStakedSnackBar: props.handleStakedSnackBar, handleTransactionRejectedError: props.handleTransactionRejectedError }))))),
        openVotesModal && (react_1["default"].createElement(Modal_1["default"], { title: props.selectedProposal.name, close: props.close, styleFlag: props.styleFlag, actions: react_1["default"].createElement(react_1["default"].Fragment, null,
                cannotVote && (react_1["default"].createElement("div", { style: { marginBottom: "10px" }, className: classes.alertDiv },
                    react_1["default"].createElement(Alert_1["default"], { severity: "error", onClose: function () {
                            console.log("gsfd");
                        }, style: { fontSize: "14px" } },
                        react_1["default"].createElement("p", null, " The voting on this proposal has not started! ! ")))),
                !cannotVote && (react_1["default"].createElement(Button_1["default"], { className: style_module_scss_1["default"].button, primary: true, outline: true, icon: like_svg_1["default"], disabled: myLoading ? true : false, onClick: function () {
                        return props.selectedProposal.votingStatus
                            ? openModal(props.selectedProposal)
                            : cannotVoteError();
                    } }, props.selectedProposal.votingStatus
                    ? props.button1
                    : "Vote on " + changeFormat(props.selectedProposal.votingDate))),
                react_1["default"].createElement(Button_1["default"], { primary: true, onClick: props.close }, props.button2)) },
            react_1["default"].createElement("div", { className: style_module_scss_1["default"].modalContent },
                react_1["default"].createElement("div", { className: style_module_scss_1["default"].modalBrief },
                    console.log(props.selectedProposal.milestone),
                    react_1["default"].createElement("div", { style: { textAlign: "center", alignItems: "center" } },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("span", { style: { fontSize: "14px", color: "#EA8604" } }, "Budget")),
                        react_1["default"].createElement("div", { style: { marginTop: "5px" } },
                            react_1["default"].createElement("span", null, props.selectedProposal.budget),
                            " ",
                            react_1["default"].createElement("span", null, "PHNX"))),
                    react_1["default"].createElement("div", { style: { textAlign: "center", alignItems: "center" } },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("span", { style: { fontSize: "14px", color: "#EA8604" } }, "Milestones")),
                        react_1["default"].createElement("div", { style: { marginTop: "5px" } },
                            react_1["default"].createElement("span", null, props.selectedProposal.milestone.length))),
                    react_1["default"].createElement("div", { style: {
                            width: "80px",
                            textAlign: "center",
                            alignItems: "center"
                        } },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("span", { style: { fontSize: "14px", color: "#EA8604" } }, "Voting Date")),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("span", null, changeFormat(props.selectedProposal.votingDate))))),
                react_1["default"].createElement("form", { className: classes.description, noValidate: true, autoComplete: "off" },
                    react_1["default"].createElement(TextField_1["default"], { id: "outlined-multiline-static", label: "Project Description", multiline: true, rows: 3, defaultValue: props.selectedProposal.description, InputProps: {
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
                            overflowX: "hidden",
                            scrollbarColor: "#EA8604 white",
                            scrollbarWidth: "thin"
                        } }, props.selectedProposal.milestone.map(function (milestone, i) {
                        return (react_1["default"].createElement("div", null,
                            react_1["default"].createElement(collapse_1["default"], { milestone: milestone, i: i }),
                            react_1["default"].createElement("div", { className: style_module_scss_1["default"].modalStep })));
                    }))))))));
};
var mapStateToProps = function (state) { return ({
    user: state.userDetails.user,
    address: state.layoutReducer.address,
    network: state.layoutReducer.network
}); };
exports["default"] = react_redux_1.connect(mapStateToProps)(VotesModal);
