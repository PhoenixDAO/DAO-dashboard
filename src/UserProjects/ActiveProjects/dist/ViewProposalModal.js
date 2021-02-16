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
exports.__esModule = true;
var react_1 = require("react");
var Modal_1 = require("Shared/Modal");
var style_module_scss_1 = require("./style.module.scss");
var Button_1 = require("Shared/Button");
var core_1 = require("@material-ui/core");
var TextField_1 = require("@material-ui/core/TextField");
var styles_1 = require("@material-ui/core/styles");
var react_redux_1 = require("react-redux");
var Accordion_1 = require("@material-ui/core/Accordion");
var AccordionSummary_1 = require("@material-ui/core/AccordionSummary");
var AccordionDetails_1 = require("@material-ui/core/AccordionDetails");
var ExpandMore_1 = require("@material-ui/icons/ExpandMore");
var classnames_1 = require("classnames");
var useStyles = styles_1.makeStyles(function (theme) {
    var _a, _b;
    return styles_1.createStyles({
        text: {
            padding: "15px",
            "& .MuiTypography-body2": { fontSize: "12px", width: "auto" },
            "& .MuiStepIcon-root.MuiStepIcon-active": {
                color: "#EA8604",
                width: "25px",
                height: "25px",
                fontSize: "10px"
            },
            "& .MuiStepIcon-text": {
                fontSize: "12px"
            },
            "& .MuiStepIcon-root": {
                color: "#EA8604",
                width: "25px",
                height: "25px",
                fontSize: "10px"
            }
        },
        submitText: {
            "& .MuiInputBase-root": {
                fontSize: "12px",
                width: "auto"
            },
            "& .MuiFormLabel-root": {
                fontSize: "12px"
            },
            "& .MuiFormHelperText-root": {
                fontSize: "10px"
            }
        },
        countryPicker: {
            "& .MuiInputBase-input": {
                width: "100px",
                fontSize: "12px"
            },
            "& .MuiFormLabel-root": {
                fontSize: "12px"
            },
            "& .MuiFormHelperText-root": {
                fontSize: "10px"
            }
        },
        root: {
            width: "100%"
        },
        button: {
            marginRight: theme.spacing(1)
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        },
        backButton: {
            marginRight: theme.spacing(1)
        },
        margin: {
            "& .MuiInputBase-root": {
                fontSize: "12px",
                width: "auto"
            },
            "& .MuiFormLabel-root": {
                fontSize: "12px"
            }
        },
        withoutLabel: {
            marginTop: theme.spacing(3)
        },
        textField: {
            width: "25ch"
        },
        txt: {
            color: "#2680EB",
            fontSize: "14px",
            fontWeight: "bold",
            marginLeft: "3px"
        },
        root1: {
            width: "100%",
            border: "1px solid #E0E0E0",
            boxShadow: "0 0 6px #888888",
            "& .MuiSvgIcon-root": {
                fontSize: "20px",
                padding: "0px"
            },
            "& .MuiIconButton-root": {
                padding: "0px"
            },
            "& .MuiAccordionSummary-content": {
                justifyContent: "space-between",
                display: "flow-root"
            },
            justifyContent: "space-between",
            marginBottom: "7px"
        },
        txt1: {
            fontSize: "12px",
            fontWeight: "bold",
            display: "inline"
        },
        txt2: (_a = {
                fontSize: "12px",
                fontWeight: "bold",
                display: "inline",
                padding: "0px 20px"
            },
            _a[theme.breakpoints.down("xs")] = {
                padding: "0px 10px"
            },
            _a),
        heading: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            // fontSize: theme.typography.pxToRem(15),
            fontSize: "10px",
            fontWeight: theme.typography.fontWeightRegular
        },
        descriptionTxt: {
            marginTop: "5px",
            color: "#818181",
            fontSize: "10px",
            textAlign: "start"
        },
        icon: {
            height: "20px",
            width: "20px",
            fontSize: "40px",
            color: "#2680EB"
        },
        card: {
            minWidth: 275,
            height: "80px",
            padding: "5px"
        },
        milestone: {
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            textAlign: "center",
            alignItems: "center",
            padding: "10px 0"
        },
        flexRow: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            textAlign: "center",
            alignItems: "center"
        },
        cardGap: {
            margin: "10px 0"
        },
        deleteTxt: {
            cursor: "pointer",
            color: "#D43737",
            marginLeft: "5px",
            fontSize: "20px"
        },
        updateTxt: {
            cursor: "pointer",
            color: "#32CD32",
            marginLeft: "5px",
            fontSize: "12px"
        },
        firstfields: (_b = {
                "& .MuiSelect-iconOutlined": {
                    right: "7px",
                    top: "5px",
                    fontSize: "41px",
                    color: "#4C42FF"
                },
                "& .MuiInputBase-root": {
                    fontSize: "12px",
                    width: "auto",
                    borderRadius: "7px"
                },
                "& .MuiFormLabel-root": {
                    fontSize: "12px"
                },
                "& .MuiFormHelperText-root": {
                    fontSize: "10px"
                }
            },
            _b[theme.breakpoints.down("xl")] = {
                width: "490px"
            },
            _b[theme.breakpoints.up("lg")] = {
                width: "480px"
            },
            _b[theme.breakpoints.down("lg")] = {
                //   width: "223px",
                width: "370px"
            },
            _b[theme.breakpoints.down("md")] = {
                //    width: "167px",
                width: "263px"
            },
            _b[theme.breakpoints.down("xs")] = {
                //    width: "165px",
                width: "263px"
            },
            _b[theme.breakpoints.up("xs")] = {
                width: "160px"
            },
            _b)
    });
});
var EditModal = function (props) {
    console.log("check propso now", props);
    var _a = react_1.useState({
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
        fundsUsage: props.proposal.fundsUsage,
        personalExperience: props.proposal.personalExperience,
        experiencedYear: props.proposal.experiencedYear,
        duration: props.proposal.duration,
        collateral: props.proposal.collateral,
        reward: props.proposal.reward,
        numioAddress: props.user.numioAddress,
        milestone: props.proposal.milestone
    }), state = _a[0], setState = _a[1];
    var _b = react_1.useState({
        task: "",
        description: "",
        estimatedDays: "",
        numberOfDevelopers: "",
        milestoneCost: ""
    }), milestoneDetails = _b[0], setMilestoneDetails = _b[1];
    var _c = react_1.useState(false), addMilestones = _c[0], setAddMilestones = _c[1];
    var _d = react_1.useState([]), proposalValue = _d[0], setProposalValue = _d[1];
    var _e = react_1.useState([]), testValue = _e[0], setTestValue = _e[1];
    var _f = react_1.useState(false), fieldRequired = _f[0], setFieldRequired = _f[1];
    var _g = react_1.useState(false), linkValidation = _g[0], setLinkValidation = _g[1];
    var _h = react_1.useState(false), emailValid = _h[0], setEmailValid = _h[1];
    var _j = react_1.useState(0), stepperStep = _j[0], setStepperStep = _j[1];
    var _k = react_1.useState(1), milestoneCount = _k[0], setMilestoneCount = _k[1];
    var _l = react_1.useState(false), errorFlag = _l[0], setErrorFlag = _l[1];
    var _m = react_1.useState(false), proposalSubmittedFlag = _m[0], setproposalSubmittedFlag = _m[1];
    var _o = react_1.useState(false), showLoader = _o[0], setShowLoader = _o[1];
    var _p = react_1.useState(false), disabled = _p[0], setDisabled = _p[1];
    var _q = react_1.useState(false), apiFailFlag = _q[0], setApiFailFlag = _q[1];
    var _r = react_1.useState(false), disableInputs = _r[0], setDisableInputs = _r[1];
    var _s = react_1.useState(false), ethereumNetworkError = _s[0], setEthereumNetworkError = _s[1];
    var _t = react_1.useState(0), milestoneSelected = _t[0], setMilestoneSelected = _t[1];
    var _u = react_1.useState(0), j = _u[0], setJ = _u[1];
    var classes = useStyles();
    react_1.useEffect(function () { }, []);
    var handleClickNext = function (e) {
        var firstName = state.firstName, lastName = state.lastName, name = state.name, country = state.country, email = state.email, githubLink = state.githubLink, 
        // fundsUsage,
        purpose = state.purpose, importance = state.importance, 
        // personalExperience,
        experiencedYear = state.experiencedYear, duration = state.duration, 
        // reward,
        collateral = state.collateral;
        if (j == 0 &&
            (!firstName || !lastName || !email || !name || !githubLink || !country)) {
            setFieldRequired(true);
            return;
        }
        else {
            var emailValid_1 = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            var checkLink = githubLink.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
            if (emailValid_1 == null) {
                setEmailValid(true);
                return;
            }
            else {
                setEmailValid(false);
            }
            if (checkLink == null) {
                setLinkValidation(true);
                return;
            }
            else {
                setLinkValidation(false);
            }
        }
        if (j == 1 &&
            (!purpose ||
                !importance ||
                // !fundsUsage ||
                // !personalExperience ||
                !experiencedYear ||
                !collateral)) {
            setFieldRequired(true);
            return;
        }
        setFieldRequired(false);
        setStepperStep(function (prevActiveStep) { return Number(prevActiveStep) + 1; });
        if (showLoader) {
            return null;
        }
        else if (j < 3) {
            if (j == 1 && state.milestone.length != 0) {
                setJ(j + 2);
            }
            else {
                setJ(j + 1);
            }
        }
        else {
            console.log("In Else");
        }
    };
    var handleMilestoneBack = function () {
        if (state.milestone.length != 0) {
            setJ(3);
        }
        else {
            setJ(2);
        }
    };
    react_1.useEffect(function () {
        console.log("Hello");
    });
    var handleClickBack = function (e) {
        if (stepperStep > 0) {
            setStepperStep(function (prevActiveStep) { return prevActiveStep - 1; });
        }
        if (showLoader) {
            return null;
        }
        else if (j == 0) {
            console.log("Cannot go back");
        }
        else {
            if (state.milestone.length != 0 && j == 3) {
                setJ(j - 2);
            }
            else if (j == 4) {
                setMilestoneDetails({
                    task: "",
                    description: "",
                    estimatedDays: "",
                    numberOfDevelopers: "",
                    milestoneCost: ""
                });
                setJ(j - 1);
            }
            else {
                setJ(j - 1);
            }
        }
    };
    var _onChangeMilestoneValue = function (value, name) {
        var _a;
        if (name == "milestoneCost" ||
            name == "estimatedDays" ||
            name == "numberOfDevelopers") {
            if (value < 0 || value.toString().length > 6) {
                return;
            }
        }
        setMilestoneDetails(__assign(__assign({}, milestoneDetails), (_a = {}, _a[name] = value, _a)));
    };
    var ProjectName = function () {
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: style_module_scss_1["default"].inputDiv },
                react_1["default"].createElement("div", { style: {
                        margin: "10px 0px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    } },
                    react_1["default"].createElement(TextField_1["default"], { error: state.firstName.length == 0 && fieldRequired, label: "First Name", contentEditable: false, className: classes.firstfields, style: { marginRight: "5px" }, id: "outlined-error-helper-text", value: state.firstName, variant: "outlined", helperText: state.firstName.length == 0 && fieldRequired
                            ? "First Name is required."
                            : false, InputProps: {
                            readOnly: true
                        } }),
                    react_1["default"].createElement(TextField_1["default"], { error: state.lastName.length == 0 && fieldRequired, label: "Last Name", id: "outlined-error-helper-text", className: classes.firstfields, variant: "outlined", value: state.lastName, helperText: state.lastName.length == 0 && fieldRequired
                            ? "Last Name is required."
                            : false, InputProps: {
                            readOnly: true
                        } })),
                react_1["default"].createElement("div", { style: {
                        display: "flex",
                        margin: "10px 0px",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    } },
                    react_1["default"].createElement(TextField_1["default"], { id: "outlined-error-helper-text", label: "Title", error: state.name.length == 0 && fieldRequired, className: classes.firstfields, style: { marginRight: "5px" }, value: state.name, helperText: state.name.length == 0 && fieldRequired
                            ? "Title is required."
                            : false, variant: "outlined", InputProps: {
                            readOnly: true
                        } }),
                    react_1["default"].createElement(TextField_1["default"], { error: state.country.length == 0 && fieldRequired, label: "Country", value: state.country, id: "outlined-error-helper-text", helperText: state.country.length == 0 && fieldRequired
                            ? "Country is required."
                            : false, className: classes.firstfields, variant: "outlined", InputProps: {
                            readOnly: true
                        } })),
                react_1["default"].createElement("div", { style: {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center"
                    } },
                    react_1["default"].createElement(core_1.FormControl, { error: true, fullWidth: true, className: classes.margin, variant: "outlined" },
                        react_1["default"].createElement(TextField_1["default"], { error: (state.email.length == 0 && fieldRequired) || emailValid, label: "Email", value: state.email, id: "outlined-error-helper-text", helperText: state.email.length == 0 && fieldRequired
                                ? "Email is required."
                                : emailValid
                                    ? "Email is not valid"
                                    : false, className: classes.submitText, variant: "outlined", InputProps: {
                                readOnly: true
                            } }))),
                react_1["default"].createElement("div", { style: {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        margin: "10px 0px"
                    } },
                    react_1["default"].createElement(core_1.FormControl, { error: true, fullWidth: true, className: classes.margin, variant: "outlined" },
                        react_1["default"].createElement(TextField_1["default"], { error: (state.githubLink.length == 0 && fieldRequired) ||
                                linkValidation, label: "Github link", value: state.githubLink, id: "outlined-error-helper-text", helperText: state.githubLink.length == 0 && fieldRequired
                                ? "Github link is required."
                                : linkValidation
                                    ? "Github link is not valid."
                                    : false, className: classes.submitText, variant: "outlined", InputProps: {
                                readOnly: true
                            } }))))));
    };
    var ProjectDetails = function () {
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: style_module_scss_1["default"].inputDiv },
                react_1["default"].createElement("div", { style: {
                        margin: "10px 0px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    } },
                    react_1["default"].createElement(core_1.FormControl, { error: true, fullWidth: true, className: classes.margin, variant: "outlined" },
                        react_1["default"].createElement(TextField_1["default"], { error: state.purpose.length == 0 && fieldRequired, label: "Purpose to use Phoenix-Dao funds", value: state.purpose, id: "outlined-error-helper-text", helperText: state.purpose.length == 0 && fieldRequired
                                ? "Purpose is required."
                                : false, className: classes.submitText, variant: "outlined", InputProps: {
                                readOnly: true
                            } }))),
                react_1["default"].createElement("div", { style: {
                        margin: "10px 0px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    } },
                    react_1["default"].createElement(core_1.FormControl, { error: true, fullWidth: true, className: classes.margin, variant: "outlined" },
                        react_1["default"].createElement(TextField_1["default"], { multiline: true, rows: 1, error: state.importance.length == 0 && fieldRequired, label: "Importance of Proposal", value: state.importance, id: "outlined-error-helper-text", helperText: state.importance.length == 0 && fieldRequired
                                ? "Importance of proposal is required."
                                : false, className: classes.submitText, variant: "outlined", InputProps: {
                                readOnly: true
                            } }))),
                react_1["default"].createElement("div", { style: {
                        margin: "10px 0px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    } },
                    react_1["default"].createElement(TextField_1["default"], { error: state.experiencedYear.length == 0 && fieldRequired, label: fieldRequired && state.experiencedYear.length == 0
                            ? false
                            : "Experience in years", type: "number", id: "outlined-error-helper-text", 
                        //  className={classes.firstfields}
                        className: classes.submitText, 
                        // style={{ marginRight: "5px" }}
                        style: { width: "100%" }, value: state.experiencedYear, variant: "outlined", helperText: state.experiencedYear.length == 0 && fieldRequired
                            ? "Experienced is required."
                            : false, InputProps: {
                            readOnly: true
                        } })),
                react_1["default"].createElement("div", { style: {
                        margin: "10px 0px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    } },
                    react_1["default"].createElement(TextField_1["default"], { error: state.collateral.length == 0 && fieldRequired, label: fieldRequired && state.collateral.length == 0
                            ? false
                            : "Collateral", className: classes.submitText, style: { width: "100%" }, type: "number", id: "outlined-error-helper-text", value: state.collateral, variant: "outlined", helperText: state.collateral.length == 0 && fieldRequired
                            ? "Collateral is required."
                            : false, InputProps: {
                            readOnly: true
                        } })),
                react_1["default"].createElement("div", { style: {
                        margin: "10px 0px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    } },
                    react_1["default"].createElement(core_1.FormControl, { error: true, fullWidth: true, className: classes.margin, variant: "outlined" },
                        react_1["default"].createElement(TextField_1["default"], { multiline: true, rows: 2, error: state.description.length == 0 && fieldRequired, label: "Description", value: state.description, id: "outlined-error-helper-text", helperText: state.description.length == 0 &&
                                fieldRequired &&
                                "Description is required.", className: classes.submitText, variant: "outlined", InputProps: {
                                readOnly: true
                            } }))))));
    };
    var MilestonesDescription = function () {
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: style_module_scss_1["default"].inputDiv },
                react_1["default"].createElement("div", { style: {
                        margin: "10px 0px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    } },
                    react_1["default"].createElement(TextField_1["default"], { id: "outlined-error-helper-text", error: milestoneDetails.task.length == 0 && fieldRequired, className: classes.firstfields, onChange: function (e) { return _onChangeMilestoneValue(e.target.value, "task"); }, helperText: milestoneDetails.task.length == 0 &&
                            fieldRequired &&
                            "Title is required.", label: "Title", variant: "outlined", InputProps: {
                            readOnly: true
                        } }),
                    react_1["default"].createElement(TextField_1["default"], { id: "outlined-basic", error: milestoneDetails.estimatedDays.length == 0 && fieldRequired, label: fieldRequired && milestoneDetails.estimatedDays.length == 0
                            ? false
                            : "Estimated Days", type: "number", onChange: function (e) {
                            return _onChangeMilestoneValue(e.target.value, "estimatedDays");
                        }, className: classes.firstfields, value: milestoneDetails.estimatedDays, variant: "outlined", helperText: milestoneDetails.estimatedDays.length == 0 &&
                            fieldRequired &&
                            "Estimated days are required.", InputProps: {
                            readOnly: true
                        } })),
                react_1["default"].createElement("div", { style: {
                        display: "flex",
                        margin: "10px 0px",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    } },
                    react_1["default"].createElement(TextField_1["default"], { id: "outlined-basic", label: fieldRequired && milestoneDetails.numberOfDevelopers.length == 0
                            ? false
                            : "Developers Working", type: "number", onChange: function (e) {
                            return _onChangeMilestoneValue(e.target.value, "numberOfDevelopers");
                        }, error: milestoneDetails.numberOfDevelopers.length == 0 && fieldRequired, className: classes.firstfields, value: milestoneDetails.numberOfDevelopers, helperText: milestoneDetails.numberOfDevelopers.length == 0 &&
                            fieldRequired &&
                            "Number of developers are required.", variant: "outlined", InputProps: {
                            readOnly: true
                        } }),
                    react_1["default"].createElement(TextField_1["default"], { id: "outlined-basic", error: milestoneDetails.milestoneCost.length == 0 && fieldRequired, value: milestoneDetails.milestoneCost, type: "number", label: fieldRequired && milestoneDetails.milestoneCost.length == 0
                            ? false
                            : "Milestone Cost", onChange: function (e) {
                            return _onChangeMilestoneValue(e.target.value, "milestoneCost");
                        }, className: classes.firstfields, variant: "outlined", helperText: milestoneDetails.milestoneCost.length == 0 &&
                            fieldRequired &&
                            "Cost is required.", InputProps: {
                            readOnly: true
                        } })),
                react_1["default"].createElement("div", { style: {
                        margin: "10px 0px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    } },
                    react_1["default"].createElement(core_1.FormControl, { error: true, fullWidth: true, className: classes.margin, variant: "outlined" },
                        react_1["default"].createElement(TextField_1["default"], { multiline: true, rows: 4, error: milestoneDetails.description.length == 0 && fieldRequired, label: "Description", value: milestoneDetails.description, onChange: function (e) {
                                return _onChangeMilestoneValue(e.target.value, "description");
                            }, id: "outlined-error-helper-text", helperText: milestoneDetails.description.length == 0 &&
                                fieldRequired &&
                                "Description is required.", className: classes.submitText, variant: "outlined", InputProps: {
                                readOnly: true
                            } }))))));
    };
    var projectMilestones = function () {
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: style_module_scss_1["default"].inputDiv },
                react_1["default"].createElement("div", { style: { marginBottom: "5px" } }, state.milestone.length != 0 &&
                    state.milestone.map(function (item, index) {
                        return (react_1["default"].createElement("div", { className: classes.root1 },
                            react_1["default"].createElement(Accordion_1["default"], null,
                                react_1["default"].createElement(AccordionSummary_1["default"], { expandIcon: react_1["default"].createElement(ExpandMore_1["default"], null), "aria-controls": "panel1a-content", id: "panel1a-header" },
                                    react_1["default"].createElement("div", { className: classes.heading },
                                        react_1["default"].createElement("div", { className: classes.txt1 }, item.task),
                                        react_1["default"].createElement("div", null,
                                            react_1["default"].createElement("div", { className: classes.txt2 },
                                                item.estimatedDays,
                                                " (days)")))),
                                react_1["default"].createElement(AccordionDetails_1["default"], null,
                                    react_1["default"].createElement(core_1.Typography, { className: classes.descriptionTxt }, item.description))))
                        // <div className={classes.cardGap}>
                        //   <Card className={classes.card}>
                        //     <div className={classes.flexRow}>
                        //       <Typography className={classes.txt1}>
                        //         {item.task}
                        //       </Typography>
                        //       <Typography className={classes.txt1}>
                        //         {item.estimatedDays} (days)
                        //       </Typography>
                        //     </div>
                        //     <div className={classes.flexRow}>
                        //       <Typography className={classes.descriptionTxt}>
                        //         {item.description}
                        //       </Typography>
                        //     </div>
                        //   </Card>
                        // </div>
                        );
                    })))));
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(Modal_1["default"], { title: props.type, className: style_module_scss_1["default"].modal, styleFlag: "proposalModal", activeSteps: stepperStep, showStepper: true, actions: react_1["default"].createElement("div", null,
                    react_1["default"].createElement("div", { style: { display: "block" } }, j == 2 ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement(Button_1["default"], { disabled: disableInputs, style: { marginTop: "10px" }, onClick: handleMilestoneBack }, "Back"))) : (react_1["default"].createElement(react_1["default"].Fragment, null,
                        j < 2 ? (react_1["default"].createElement(Button_1["default"], { disabled: disableInputs, 
                            // primary
                            style: {
                                background: "#4C42FF",
                                color: "white",
                                borderRadius: "7px",
                                height: "38px",
                                marginTop: "10px"
                            }, onClick: function (e) { return handleClickNext(e); } },
                            react_1["default"].createElement("p", { style: { textAlign: "center" } }, "Next"),
                            react_1["default"].createElement("i", { className: "fas fa-arrow-right fa-1x", style: {
                                    paddingLeft: "8px",
                                    fontSize: "13px"
                                } }))) : j == 4 ? (false) : (false),
                        j != 0 ? (react_1["default"].createElement("div", { className: style_module_scss_1["default"].backText },
                            react_1["default"].createElement("i", { onClick: disableInputs ? undefined : handleClickBack, style: { color: "#4C42FF", marginTop: "5px" }, className: classnames_1["default"](style_module_scss_1["default"].testing, "fas fa-arrow-left fa-2x") }),
                            react_1["default"].createElement("h4", { onClick: disableInputs ? undefined : handleClickBack, className: style_module_scss_1["default"].testing, style: {
                                    //  backgroundColor: "red",
                                    color: "#4C42FF",
                                    fontSize: "18px",
                                    paddingLeft: "12px",
                                    paddingTop: "4px"
                                } }, "Back"))) : null)))), close: props.close }, addMilestones ? (MilestonesDescription()) : (react_1["default"].createElement(react_1["default"].Fragment, null,
                j == 0 && ProjectName(),
                j == 1 && ProjectDetails(),
                j == 2 && MilestonesDescription(),
                j == 3 && projectMilestones()))))));
};
var mapStateToProps = function (state) { return ({
    user: state.userDetails.user,
    network: state.layoutReducer.network
}); };
exports["default"] = react_redux_1.connect(mapStateToProps)(EditModal);
