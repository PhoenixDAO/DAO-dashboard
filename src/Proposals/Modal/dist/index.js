"use strict";
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
var Alert_1 = require("@material-ui/lab/Alert");
var const_1 = require("../../const");
var Tooltip_1 = require("@material-ui/core/Tooltip");
var styles_1 = require("@material-ui/core/styles");
var TextField_1 = require("@material-ui/core/TextField");
var LightTooltip = styles_1.withStyles(function (theme) { return ({
    tooltip: {
        fontSize: 11
    }
}); })(Tooltip_1["default"]);
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
var changeFormat = function (date) {
    date = new Date(date);
    return (react_1["default"].createElement("td", null,
        new Date(date.getTime()).getDate(),
        "/",
        new Date(date.getTime()).getMonth() + 1,
        "/",
        new Date(date.getTime()).getFullYear()));
};
var ProposalModal = function (props) {
    var _a = react_1.useState(false), myLoading = _a[0], setMyLoading = _a[1];
    var _b = react_1.useState(0), value = _b[0], setValue = _b[1];
    var classes = useStyles();
    var checkVotesThreshold = function () {
        console.log("xyz", value);
        console.log("12", props);
        if (props.votes.length >= props.minimumUpvotes) {
            console.log("Dont show");
            return true;
        }
        else {
            console.log("Show");
            return false;
        }
    };
    react_1.useEffect(function () {
        checkVotesThreshold();
    });
    var handleClick = function (_id, resetData, props) { return __awaiter(void 0, void 0, void 0, function () {
        var get, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("Click", _id);
                    console.log("props", props);
                    console.log("Total votes", props.user.proposalVote.length);
                    setMyLoading(true);
                    return [4 /*yield*/, axios_1["default"].post("" + const_1.URL + const_1.VoteOnProposal + _id, {
                            email: props.user.email,
                            status: props.status
                        }, {
                            headers: {
                                Authorization: "Bearer " + props.user.token
                            }
                        })];
                case 1:
                    get = _a.sent();
                    resetData();
                    setMyLoading(false);
                    props.openSnackbar("Successfully Upvoted! ", "success");
                    props.close();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    setMyLoading(false);
                    console.log("Message1 here", err_1);
                    console.log("Message2", err_1.response);
                    console.log("Message3", err_1.response.data);
                    // console.log("Message", err.response.data.message);
                    // if (
                    //   err.response.data.message ==
                    //   "Cannot destructure property 'status' of 'req.body' as it is undefined."
                    // ) {
                    //   resetData();
                    //   props.openSnackbar("Successfully Upvoted! ", "success");
                    //   props.close();
                    // } else
                    if (err_1.response && err_1.response.data && err_1.response.data.message) {
                        props.openSnackbar(err_1.response.data.message, "error");
                        // props.openSnackbar("An error occured", "error");
                    }
                    else {
                        props.openSnackbar("Network Error", "error");
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var checkVoted = function () {
        var hasVoted = props.votes.find(function (obj) { return obj.email === props.user.email; });
        if (hasVoted)
            return true;
        return false;
    };
    return (react_1["default"].createElement(Modal_1["default"], { title: props.title, close: props.close, styleFlag: props.styleFlag, actions: react_1["default"].createElement(react_1["default"].Fragment, null,
            checkVoted() && (react_1["default"].createElement("div", { className: classes.alertDiv },
                react_1["default"].createElement(Alert_1["default"], { severity: "error", style: { fontSize: "13px" } },
                    react_1["default"].createElement("p", null, " You have already voted on this proposal! ")))),
            checkVotesThreshold() ? (react_1["default"].createElement("div", { className: classes.alertDiv },
                react_1["default"].createElement(Alert_1["default"], { severity: "success", style: { fontSize: "13px" } },
                    react_1["default"].createElement("p", null, " Threshold of this proposal is reached ")))) : (!checkVoted() && (react_1["default"].createElement(LightTooltip, { title: "" + props.tooltipMessage1, placement: "top", arrow: true },
                react_1["default"].createElement(Button_1["default"], { className: style_module_scss_1["default"].button, primary: true, outline: true, icon: like_svg_1["default"], disabled: myLoading ? true : false, onClick: function () { return handleClick(props._id, props.resetData, props); } }, myLoading ? react_1["default"].createElement(core_1.CircularProgress, { size: 12 }) : props.button1)))),
            react_1["default"].createElement(LightTooltip, { title: "" + props.tooltipMessage2, placement: "bottom", arrow: true },
                react_1["default"].createElement(Button_1["default"], { primary: true, onClick: props.close }, props.button2))) },
        react_1["default"].createElement("div", { className: style_module_scss_1["default"].modalContent },
            react_1["default"].createElement("div", { className: style_module_scss_1["default"].modalBrief },
                console.log(props.milestones),
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
                react_1["default"].createElement("div", { style: { width: "80px", textAlign: "center", alignItems: "center" } },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("span", { style: { fontSize: "14px", color: "#EA8604" } }, "Exp. Date")),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("span", null, changeFormat(props.expirationDate))))),
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
                        overflowX: "hidden",
                        scrollbarColor: "#EA8604 white",
                        scrollbarWidth: "thin"
                    } }, props.milestones.map(function (milestone, i) {
                    return (react_1["default"].createElement("div", null,
                        react_1["default"].createElement(collapse_1["default"], { milestone: milestone, i: i }),
                        react_1["default"].createElement("div", { className: style_module_scss_1["default"].modalStep })));
                }))))));
};
var mapStateToProps = function (state) { return ({
    user: state.userDetails.user
}); };
exports["default"] = react_redux_1.connect(mapStateToProps)(ProposalModal);
