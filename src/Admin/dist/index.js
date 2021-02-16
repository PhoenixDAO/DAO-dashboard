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
var classnames_1 = require("classnames");
var Card_1 = require("Shared/Card");
var AdminTable_1 = require("Shared/AdminTable");
var style_module_scss_1 = require("./style.module.scss");
var axios_1 = require("axios");
var react_redux_1 = require("react-redux");
var index_1 = require("../Proposals/EditModal/index");
var adminModal_1 = require("../Proposals/Modal/adminModal");
var adminModal2_1 = require("../Proposals/Modal/adminModal2");
var adminModal3_1 = require("../Proposals/Modal/adminModal3");
var const_1 = require("../const");
var const_2 = require("../const");
var core_1 = require("@material-ui/core");
var Budget_1 = require("Shared/Budget");
var Snackbar_1 = require("@material-ui/core/Snackbar");
var Alert_1 = require("@material-ui/lab/Alert");
var styles_1 = require("@material-ui/core/styles");
var Button_1 = require("Shared/Button");
var TextField_1 = require("@material-ui/core/TextField");
var Dialog_1 = require("@material-ui/core/Dialog");
var DialogActions_1 = require("@material-ui/core/DialogActions");
var DialogContent_1 = require("@material-ui/core/DialogContent");
var DialogContentText_1 = require("@material-ui/core/DialogContentText");
var DialogTitle_1 = require("@material-ui/core/DialogTitle");
var Slide_1 = require("@material-ui/core/Slide");
function Alert(props) {
    return react_1["default"].createElement(Alert_1["default"], __assign({ elevation: 6, variant: "standard" }, props));
}
var Transition = react_1["default"].forwardRef(function Transition(props, ref) {
    return react_1["default"].createElement(Slide_1["default"], __assign({ direction: "up", ref: ref }, props));
});
var useStyles = styles_1.makeStyles(function (theme) {
    var _a;
    return styles_1.createStyles({
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
                borderColor: "#EA8604"
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
            marginTop: "30rem"
        },
        root2: {
            "& .MuiSnackbarContent-root": {
                backgroundColor: "red",
                color: "white",
                fontSize: "10px"
            }
        },
        alert: {
            "& .MuiAlert-message": {
                fontSize: "12px",
                display: "flex",
                alignItem: "center"
            }
        },
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
            _a)
    });
});
var Admin = function (props) {
    var classes = useStyles();
    var _a = react_1.useState([]), proposalsOfStatusPending = _a[0], setProposalsOfStatusPending = _a[1];
    var _b = react_1.useState([]), proposalsOfStatusVoting = _b[0], setProposalsOfStatusVoting = _b[1];
    var _c = react_1.useState([]), proposalsOfStatusDraw = _c[0], setProposalsOfStatusDraw = _c[1];
    var _d = react_1.useState({}), testValue = _d[0], setTestValue = _d[1];
    var _e = react_1.useState(true), loading1 = _e[0], setLoading1 = _e[1];
    var _f = react_1.useState(true), loading2 = _f[0], setLoading2 = _f[1];
    var _g = react_1.useState(true), loading3 = _g[0], setLoading3 = _g[1];
    var _h = react_1.useState(true), loading4 = _h[0], setLoading4 = _h[1];
    var _j = react_1.useState(true), noData = _j[0], setNoData = _j[1];
    var _k = react_1.useState(false), showSnackbar = _k[0], setShowSnackbar = _k[1];
    var _l = react_1.useState({
        message: undefined,
        severity: undefined
    }), message = _l[0], setMessage = _l[1];
    var _m = react_1["default"].useState(false), modalOpen = _m[0], setModalOpen = _m[1];
    var _o = react_1.useState(false), openDialogueState = _o[0], setOpenDialogueState = _o[1];
    var _p = react_1.useState({
        i: undefined,
        j: undefined,
        status: undefined,
        id: undefined,
        str: undefined
    }), approvalStateForDraw = _p[0], setApprovalStateForDraw = _p[1];
    var _q = react_1.useState({
        id: undefined,
        k: undefined,
        i: undefined,
        j: undefined,
        index: undefined,
        milestoneStatus: undefined,
        str: undefined
    }), approvalStateForMilestone = _q[0], setApprovalStateForMilestone = _q[1];
    var _r = react_1.useState(""), dialogueMessage = _r[0], setDialogueMessage = _r[1];
    var _s = react_1.useState(undefined), dialogueNumber = _s[0], setDialogueNumber = _s[1];
    var _t = react_1.useState(""), reasonForRejecting = _t[0], setReasonForRejecting = _t[1];
    var openDialogueForDraw = function (i, j, status, id, str) {
        // e.preventDefault();
        setDialogueNumber(0);
        if (status == "Accepted") {
            setDialogueMessage("On approving this you agree to accept this proposal and it will be moved to active project.");
        }
        else {
            setDialogueMessage("On approving this you agree to reject this proposal and it will be marked as failed proposal.");
        }
        setApprovalStateForDraw({ i: i, j: j, status: status, id: id, str: str });
        setOpenDialogueState(true);
    };
    var handleDialogue = function (i, result) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Props", props);
                    setOpenDialogueState(false);
                    setDialogueNumber(undefined);
                    setDialogueMessage("");
                    if (!result) return [3 /*break*/, 4];
                    if (!(i == 0)) return [3 /*break*/, 2];
                    return [4 /*yield*/, changeProposalStatusForDraw(approvalStateForDraw.i, approvalStateForDraw.j, approvalStateForDraw.status, approvalStateForDraw.id, approvalStateForDraw.str)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, changeMilestoneByAdmin(approvalStateForMilestone.id, approvalStateForMilestone.k, approvalStateForMilestone.i, approvalStateForMilestone.j, approvalStateForMilestone.index, approvalStateForMilestone.milestoneStatus, approvalStateForMilestone.str)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var openDialogueForMilestone = function (id, k, i, j, index, milestoneStatus, str) {
        console.log("Opening");
        // e.preventDefault();
        setDialogueNumber(1);
        if (milestoneStatus == "Completed") {
            setDialogueMessage("On approving this you agree that you verified the project progress and this milestone is ready to be marked completed.");
        }
        else {
            setDialogueMessage("On approving this you agree that you verified the project progress and this milestone is not completed.");
        }
        setApprovalStateForMilestone({ id: id, k: k, i: i, j: j, index: index, milestoneStatus: milestoneStatus, str: str });
        setOpenDialogueState(true);
    };
    var closeModal = function () { return setModalOpen(false); };
    var _u = react_1["default"].useState(undefined), projectModalItem = _u[0], setProjectModalItem = _u[1];
    var _v = react_1["default"].useState(undefined), projectModalItem2 = _v[0], setProjectModalItem2 = _v[1];
    var _w = react_1["default"].useState(undefined), projectModalItem3 = _w[0], setProjectModalItem3 = _w[1];
    var openSnackbar = function (message, severity) {
        setMessage({ message: message, severity: severity });
        setShowSnackbar(true);
    };
    var renderAgain = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getProposalsOfStatusPending()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var changeMilestoneByAdmin = function (id, k, i, j, index, milestoneStatus, str
    //reasonForRejecting: any
    ) { return __awaiter(void 0, void 0, void 0, function () {
        var get, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Reason ......", milestoneStatus);
                    if (!reasonForRejecting && milestoneStatus == "Incomplete") {
                        openSnackbar("Please provide a reason", "error");
                        return [2 /*return*/, null];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 5]);
                    setTestValue(function (val) {
                        var _a;
                        return (__assign(__assign({}, val), (_a = {}, _a["" + k + id + index + str] = true, _a)));
                    });
                    return [4 /*yield*/, axios_1["default"]
                            .put("" + const_1.URL + const_2.ByAdmin + id, {
                            status: milestoneStatus,
                            index: index,
                            numioAddress: props.user.numioAddress,
                            reasonForRejecting: reasonForRejecting,
                            email: props.user.email
                        }, {
                            headers: {
                                Authorization: "Bearer " + props.user.token
                            }
                        })
                            .then(function (value) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        setTestValue(function (val) {
                                            var _a;
                                            return (__assign(__assign({}, val), (_a = {}, _a["" + k + id + index + str] = false, _a)));
                                        });
                                        if (milestoneStatus == "Completed") {
                                            openSnackbar("Milestone successfully marked completed !", "success");
                                        }
                                        else {
                                            openSnackbar("Milestone successfully marked incomplete !", "success");
                                        }
                                        return [4 /*yield*/, getProposalOfStatusAccepted()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    get = _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    setTestValue(function (val) {
                        var _a;
                        return (__assign(__assign({}, val), (_a = {}, _a["" + k + id + index + str] = false, _a)));
                    });
                    return [4 /*yield*/, getProposalOfStatusAccepted()];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var changeFormat = function (date) {
        date = new Date(date);
        return new Date(date.getTime()).getDate() + "/" + (new Date(date.getTime()).getMonth() + 1) + "/" + new Date(date.getTime()).getFullYear();
    };
    react_1.useEffect(function () {
        getProposalsOfStatusPending();
        getProposalsOfStatusVoting();
        getProposalOfStatusAccepted();
        getProposalsOfStatusDraw();
        setReasonForRejecting("");
    }, []);
    var getProposalsOfStatusPending = function () { return __awaiter(void 0, void 0, void 0, function () {
        var get, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"]
                            .post("" + const_1.URL + const_2.ProposalByStatus, {
                            status: "Pending"
                        }, {
                            headers: {
                                Authorization: "Bearer " + props.user.token
                            }
                        })
                            .then(function (value) {
                            setProposalsOfStatusPending(value.data.result);
                            setLoading1(false);
                        })];
                case 1:
                    get = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    setProposalsOfStatusPending([]);
                    setLoading1(false);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var getProposalsOfStatusVoting = function () { return __awaiter(void 0, void 0, void 0, function () {
        var get, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"]
                            .post("" + const_1.URL + const_2.ProposalByStatus, {
                            status: "Voting"
                        }, {
                            headers: {
                                Authorization: "Bearer " + props.user.token
                            }
                        })
                            .then(function (value) {
                            setProposalsOfStatusVoting(value.data.result);
                            setLoading2(false);
                        })];
                case 1:
                    get = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    setProposalsOfStatusVoting([]);
                    setLoading2(false);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var getProposalsOfStatusDraw = function () { return __awaiter(void 0, void 0, void 0, function () {
        var get, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"]
                            .post("" + const_1.URL + const_2.ProposalByStatus, {
                            status: "Draw"
                        }, {
                            headers: {
                                Authorization: "Bearer " + props.user.token
                            }
                        })
                            .then(function (value) {
                            setProposalsOfStatusDraw(value.data.result);
                            setLoading4(false);
                        })];
                case 1:
                    get = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _a.sent();
                    setProposalsOfStatusDraw([]);
                    setLoading4(false);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var _x = react_1.useState({}), milestones = _x[0], setMilestones = _x[1];
    var getProposalOfStatusAccepted = function () { return __awaiter(void 0, void 0, void 0, function () {
        var get, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"]
                            .post("" + const_1.URL + const_2.ProposalByStatus, {
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
                                    description: _value.description,
                                    budget: _value.budget,
                                    githubLink: _value.githubLink,
                                    votingDate: _value.votingDate,
                                    milestone: _value.milestone
                                        .map(function (milestonee, index) {
                                        return __assign(__assign({}, milestonee), { index: index });
                                    })
                                        .filter(function (milestonee) {
                                        return milestonee.status === "Pending";
                                    })
                                };
                            });
                            Object.values(result).map(function (item) {
                                if (item.milestone.length > 0)
                                    setNoData(false);
                            });
                            setMilestones(result);
                            setLoading3(false);
                        })];
                case 1:
                    get = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _a.sent();
                    setLoading3(false);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var milestoneStatus;
    var changeProposalStatusForDraw = function (i, j, status, id, str) { return __awaiter(void 0, void 0, void 0, function () {
        var get, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 5]);
                    setTestValue(function (val) {
                        var _a;
                        return (__assign(__assign({}, val), (_a = {}, _a["" + i + j + str] = true, _a)));
                    });
                    return [4 /*yield*/, axios_1["default"].put("" + const_1.URL + const_2.Proposal + id, { status: status }, {
                            headers: {
                                Authorization: "Bearer " + props.user.token
                            }
                        })];
                case 1:
                    get = _a.sent();
                    if (status == "Accepted") {
                        openSnackbar("Proposal successfully marked pass !", "success");
                    }
                    else {
                        openSnackbar("Proposal successfully marked fail !", "success");
                    }
                    getProposalsOfStatusDraw();
                    setTestValue(function (val) {
                        var _a;
                        return (__assign(__assign({}, val), (_a = {}, _a["" + i + j + str] = false, _a)));
                    });
                    return [4 /*yield*/, getProposalsOfStatusDraw()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    err_6 = _a.sent();
                    setTestValue(function (val) {
                        var _a;
                        return (__assign(__assign({}, val), (_a = {}, _a["" + i + j + str] = false, _a)));
                    });
                    return [4 /*yield*/, getProposalsOfStatusDraw()];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleEmail = function (e) {
        setReasonForRejecting(e.target.value);
        console.log(e.target.value);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Dialog_1["default"], { open: openDialogueState, TransitionComponent: Transition, keepMounted: true, onClose: function () { return handleDialogue(dialogueNumber, false); }, "aria-labelledby": "alert-dialog-slide-title", "aria-describedby": "alert-dialog-slide-description", className: classes.dialogueText },
            react_1["default"].createElement(DialogTitle_1["default"], { className: classes.dialogueText, id: "alert-dialog-slide-title" }, "Are you sure?"),
            react_1["default"].createElement(DialogContent_1["default"], { className: classes.dialogueText },
                react_1["default"].createElement(DialogContentText_1["default"], { className: classes.dialogueText, id: "alert-dialog-slide-description" }, dialogueMessage)),
            approvalStateForMilestone.milestoneStatus == "Incomplete" ? (react_1["default"].createElement("div", { className: style_module_scss_1["default"].dialogDiv },
                react_1["default"].createElement("div", { style: { textAlign: "center" } },
                    react_1["default"].createElement(TextField_1["default"], { multiline: true, rows: 6, 
                        //  defaultValue="hello"
                        // error={!email}
                        // helperText={"ojasok"}
                        label: "Reason", value: reasonForRejecting, variant: "outlined", onChange: function (e) { return handleEmail(e); }, className: classes.firstfields, style: { width: "85%", marginTop: "10px" } })))) : null,
            react_1["default"].createElement(DialogActions_1["default"], { className: classes.dialogueText },
                react_1["default"].createElement(Button_1["default"], { className: classes.dialogueButton, onClick: function () { return handleDialogue(dialogueNumber, false); }, color: "primary", style: { color: "#EA8604", width: "85%", marginBottom: "9px" } }, "Disagree"),
                react_1["default"].createElement(Button_1["default"], { className: classes.dialogueButton, onClick: function () { return handleDialogue(dialogueNumber, true); }, color: "primary", style: { color: "white", backgroundColor: "#EA8604", width: "85%", marginLeft: "0px" } }, "Agree"))),
        react_1["default"].createElement(Budget_1["default"], { openSnackbar: openSnackbar }),
        modalOpen && react_1["default"].createElement(index_1["default"], { close: closeModal }),
        projectModalItem && (react_1["default"].createElement(adminModal_1["default"], { resetData: renderAgain, title: projectModalItem.title, reward: projectModalItem.reward, budget: projectModalItem.budget, milestones: projectModalItem.milestoness, description: projectModalItem.description, createdAt: projectModalItem.createdAt, votes: projectModalItem.votes, _id: projectModalItem._id, button1: "Approve", button2: "Reject", tooltipMessage1: "On approving this you agree that this proposal do fulfills the DAO initial voting criteria. The proposal will be moved in upvote section", tooltipMessage2: "By rejecting this you agree that this proposal do not fulfills the DAO initial voting criteria. The proposal will be removed and is not shown in upvote section", close: function () { return setProjectModalItem(undefined); }, openSnackbar: openSnackbar, collateral: projectModalItem.collateral, proposalUSerNumioAddress: projectModalItem.proposalUserNumioAddress, email: projectModalItem.email })),
        projectModalItem2 && (react_1["default"].createElement(adminModal2_1["default"]
        // resetData={renderAgain}
        , { 
            // resetData={renderAgain}
            title: projectModalItem2.title, reward: projectModalItem2.reward, budget: projectModalItem2.budget, milestones: projectModalItem2.milestoness, description: projectModalItem2.description, votingDate: projectModalItem2.votingDate, votes: projectModalItem2.votes, _id: projectModalItem2._id, 
            // styleFlag={projectModalItem2.styleFlag}
            close: function () { return setProjectModalItem2(undefined); } })),
        projectModalItem3 && (react_1["default"].createElement(adminModal3_1["default"], { title: projectModalItem3.title, budget: projectModalItem3.budget, milestones: projectModalItem3.milestoness, description: projectModalItem3.description, votingDate: projectModalItem3.votingDate, githubLink: "https://github.com/", close: function () { return setProjectModalItem3(undefined); } })),
        react_1["default"].createElement("div", { id: "scrollContainer", className: style_module_scss_1["default"].grid },
            react_1["default"].createElement(Snackbar_1["default"], { className: classes.root2, anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center"
                }, open: showSnackbar, autoHideDuration: 4000, onClose: function () {
                    setShowSnackbar(false);
                    //setMessage({ message: "", severity: undefined });
                } },
                react_1["default"].createElement(Alert, { className: classes.alert, onClose: function () {
                        setShowSnackbar(false);
                        //setMessage({ message: "", severity: undefined });
                    }, severity: message.severity }, message.message)),
            react_1["default"].createElement(Card_1["default"], { styleFlag: true, title: "Proposal Requests", tooltipMessage: "This shows all the proposals pending for approval" },
                react_1["default"].createElement(AdminTable_1["default"], { compact: true, columns: ["Proposal", "Submission Date "] }, proposalsOfStatusPending.length == 0 ? (react_1["default"].createElement("td", null, loading1 ? "Loading..." : "No proposals found")) : (proposalsOfStatusPending.map(function (item, i) { return (react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement("tr", { onClick: function () {
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
                                email: item.email
                            });
                        }, key: i },
                        react_1["default"].createElement("td", null, item.name),
                        react_1["default"].createElement("td", { style: {
                                verticalAlign: "middle",
                                marginBottom: "0px"
                            }, className: classnames_1["default"](style_module_scss_1["default"].listItem, item.approve && style_module_scss_1["default"].checked) },
                            react_1["default"].createElement("div", null, changeFormat(item.createdAt)))))); })))),
            react_1["default"].createElement(Card_1["default"], { styleFlag: true, title: "Proposals Ready for Vote", tooltipMessage: "All the proposals ready for voting" },
                react_1["default"].createElement(AdminTable_1["default"], { compact: true, columns: ["Proposal", "Voting Day"] }, proposalsOfStatusVoting.length == 0 ? (react_1["default"].createElement("td", null, loading2 ? "Loading..." : "No proposal ready for voting")) : (proposalsOfStatusVoting.map(function (item, i) { return (react_1["default"].createElement("tr", { key: i, onClick: function () {
                        return setProjectModalItem2({
                            title: item.name,
                            reward: item.reward,
                            budget: item.budget,
                            milestoness: item.milestone,
                            description: item.description,
                            votes: item.votes,
                            votingDate: item.votingDate,
                            _id: item._id
                        });
                    } },
                    react_1["default"].createElement("td", null, item.name),
                    react_1["default"].createElement("td", null, changeFormat(item.votingDate)))); })))),
            react_1["default"].createElement(Card_1["default"], { styleFlag: true, title: "Voting Results", tooltipMessage: "Proposals having draw result on voting" },
                react_1["default"].createElement(AdminTable_1["default"], { compact: true, columns: ["Cost", "Proposal", "%", "Approve"] }, proposalsOfStatusDraw.length == 0 ? (react_1["default"].createElement("td", null, loading4
                    ? "Loading..."
                    : "No proposal with draw results found")) : (proposalsOfStatusDraw.map(function (item, j) { return (react_1["default"].createElement("tr", { key: j },
                    react_1["default"].createElement("td", null, item.budget),
                    react_1["default"].createElement("td", null,
                        " ",
                        item.name,
                        " "),
                    react_1["default"].createElement("td", null, " 50% "),
                    react_1["default"].createElement("td", { className: classnames_1["default"](style_module_scss_1["default"].listItem, item.approve && style_module_scss_1["default"].checked) },
                        react_1["default"].createElement("div", { className: style_module_scss_1["default"].toggleButton, onClick: function () {
                                openDialogueForDraw(0, j, "Accepted", item._id, "Yes");
                                // changeProposalStatusForDraw(
                                //   0,
                                //   j,
                                //   "Accepted",
                                //   item._id,
                                //   "Yes"
                                // );
                            } }, testValue["0" + j + "Yes"] ? (react_1["default"].createElement(core_1.CircularProgress, { size: 12, color: "inherit" })) : ("Yes")),
                        react_1["default"].createElement("div", { className: style_module_scss_1["default"].toggleButton, onClick: function () {
                                openDialogueForDraw(0, j, "Rejected", item._id, "No");
                                // changeProposalStatusForDraw(
                                //   0,
                                //   j,
                                //   "Rejected",
                                //   item._id,
                                //   "No"
                                // );
                            } }, testValue["0" + j + "No"] ? (react_1["default"].createElement(core_1.CircularProgress, { size: 12, color: "inherit" })) : ("No"))))); })))),
            react_1["default"].createElement(Card_1["default"], { styleFlag: true, title: "Milestone Requested", tooltipMessage: "All milestones that user marked complete and are pending for approval" },
                react_1["default"].createElement(AdminTable_1["default"], { compact: true, columns: ["Proposal", "Milestone", "Approve"] }, loading3 ? (react_1["default"].createElement("td", null, "Loading...")) : noData ? (react_1["default"].createElement("td", null, "No milestone completion request found")) : (Object.keys(milestones).map(function (id, i) {
                    return milestones[id].milestone.map(function (item, j) { return (react_1["default"].createElement("tr", { onClick: function () {
                            setProjectModalItem3({
                                title: milestones[id].name,
                                budget: milestones[id].budget,
                                milestoness: milestones[id].milestone,
                                description: milestones[id].description,
                                votingDate: milestones[id].votingDate,
                                githubLink: milestones[id].githubLink
                            });
                        }, key: i },
                        react_1["default"].createElement("td", null, milestones[id].name),
                        react_1["default"].createElement("td", null,
                            " ", "M" + (item.index + 1),
                            " "),
                        react_1["default"].createElement("td", { className: classnames_1["default"](style_module_scss_1["default"].listItem, item.approve && style_module_scss_1["default"].checked) },
                            react_1["default"].createElement("div", { className: style_module_scss_1["default"].toggleButton, onClick: function (e) {
                                    e.stopPropagation();
                                    openDialogueForMilestone(id, 1, i, j, item.index, (milestoneStatus = "Completed"), "Yes");
                                } }, testValue["1" + id + item.index + "Yes"] ? (react_1["default"].createElement(core_1.CircularProgress, { size: 12, color: "inherit" })) : ("Yes")),
                            react_1["default"].createElement("div", { className: style_module_scss_1["default"].toggleButton, onClick: function (e) {
                                    e.stopPropagation();
                                    openDialogueForMilestone(id, 1, i, j, item.index, (milestoneStatus = "Incomplete"), "No");
                                } }, testValue["1" + id + item.index + "No"] ? (react_1["default"].createElement(core_1.CircularProgress, { size: 12, color: "inherit" })) : ("No"))))); });
                })))))));
};
var mapStateToProps = function (state) { return ({
    user: state.userDetails.user
}); };
exports["default"] = react_redux_1.connect(mapStateToProps)(Admin);
