"use strict";
exports.__esModule = true;
var react_1 = require("react");
var classnames_1 = require("classnames");
var style_module_scss_1 = require("./style.module.scss");
var Stepper_1 = require("@material-ui/core/Stepper");
var core_1 = require("@material-ui/core");
var Step_1 = require("@material-ui/core/Step");
var StepLabel_1 = require("@material-ui/core/StepLabel");
var styles_1 = require("@material-ui/core/styles");
var useStyles = styles_1.makeStyles(function (theme) {
    return styles_1.createStyles({
        modalWrap: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
            backdropFilter: "blur(3px)",
            background: "rgba(0, 0, 0, 0.36)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
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
                width: "auto",
                // height: "30px",
                margin: "0px 5px"
            },
            "& .MuiFormLabel-root": {
                fontSize: "12px"
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
        firstStepper: {
            borderTop: "solid",
            borderTopWidth: "thick",
            borderImageSource: "linear-gradient(90deg,rgb(76,66,255)35% ,rgb(105,100,187)24%)"
        },
        secondStepper: {
            borderTop: "solid",
            borderTopWidth: "thick",
            borderImageSource: "linear-gradient(90deg,rgb(76,66,255)66% ,rgb(105,100,187)34%)"
        },
        thirdStepper: {
            borderTop: "solid",
            borderTopWidth: "thick",
            borderTopColor: "rgb(76,66,255)"
        }
    });
});
function getSteps() {
    return ["Proposal Details", "Proposal Description", "Proposal Milestones", "Proposal Submission"];
}
function getStepsDescription() {
    return [
        "  Hey there 👋, tell us more about yourself and your project.",
        "Tell us more about your proposal, give details of what you hope to achieve and your experience.",
        "Give us an in-depth concept about your milestones and how you plan to achieve them.",
    ];
}
exports["default"] = (function (_a) {
    var children = _a.children, className = _a.className, title = _a.title, actions = _a.actions, close = _a.close, styleFlag = _a.styleFlag, showSnackBar = _a.showSnackBar, activeSteps = _a.activeSteps, stepper = _a.stepper, showStepper = _a.showStepper;
    var handleClick = function (e) {
        console.log("eee", e.target.id);
        console.log("handle click", e.target.className);
        var checkClassName = e.target.className;
        if (e.target.id == "adminModal" ||
            e.target.id == "activeProjectsModal" ||
            e.target.id == "upvoteModal" ||
            e.target.className === style_module_scss_1["default"].modalWrap ||
            e.target.className ===
                "MuiGrid-root style_modalWrap__fAu8M MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-12 MuiGrid-grid-lg-12") {
            close();
            console.log("handle click 2");
        }
    };
    var classes = useStyles();
    var steps = getSteps();
    var stepsDescription = getStepsDescription();
    return (react_1["default"].createElement("div", null, styleFlag == "stakeModal" ? (react_1["default"].createElement("div", { className: style_module_scss_1["default"].modalWrap, onClick: handleClick },
        react_1["default"].createElement("div", { className: classnames_1["default"](style_module_scss_1["default"].stakeModal, className) },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("div", { className: style_module_scss_1["default"].closeButton, onClick: close }),
                title && react_1["default"].createElement("div", { className: style_module_scss_1["default"].title }, title),
                react_1["default"].createElement("div", null, children),
                actions && react_1["default"].createElement("div", { className: style_module_scss_1["default"].actions }, actions))))) : styleFlag == "UpvoteModal" ? (react_1["default"].createElement(core_1.Grid, { lg: 12, sm: 12, xs: 12, md: 12, className: style_module_scss_1["default"].modalWrap, id: "upvoteModal", onClick: function (e) { return handleClick(e); } },
        react_1["default"].createElement("div", { className: classnames_1["default"](style_module_scss_1["default"].modal, className) },
            react_1["default"].createElement("div", { className: style_module_scss_1["default"].closeButton, onClick: close }),
            title && react_1["default"].createElement("div", { className: style_module_scss_1["default"].title2 }, title),
            showStepper && (react_1["default"].createElement(Stepper_1["default"], { className: classes.text, activeStep: activeSteps, alternativeLabel: true }, steps.map(function (label) { return (react_1["default"].createElement(Step_1["default"], { key: label },
                react_1["default"].createElement(StepLabel_1["default"], null, label))); }))),
            react_1["default"].createElement("div", null, children),
            actions && react_1["default"].createElement("div", { className: style_module_scss_1["default"].actions }, actions)))) : styleFlag == "ActiveProjects" ? (react_1["default"].createElement(core_1.Grid, { lg: 12, sm: 12, xs: 12, md: 12, className: style_module_scss_1["default"].modalWrap, id: "activeProjectsModal", onClick: handleClick },
        react_1["default"].createElement("div", { className: classnames_1["default"](style_module_scss_1["default"].modal, className) },
            react_1["default"].createElement("div", { className: style_module_scss_1["default"].closeButton, onClick: close }),
            title && react_1["default"].createElement("div", { className: style_module_scss_1["default"].title4 }, title),
            showStepper && (react_1["default"].createElement(Stepper_1["default"], { className: classes.text, activeStep: activeSteps, alternativeLabel: true }, steps.map(function (label) { return (react_1["default"].createElement(Step_1["default"], { key: label },
                react_1["default"].createElement(StepLabel_1["default"], null, label))); }))),
            react_1["default"].createElement("div", null, children),
            actions && react_1["default"].createElement("div", { className: style_module_scss_1["default"].actions }, actions)))) : styleFlag == "proposalModal" ? (react_1["default"].createElement(core_1.Grid, { lg: 12, sm: 12, xs: 12, md: 12, className: style_module_scss_1["default"].modalWrap },
        react_1["default"].createElement("div", { className: classnames_1["default"](style_module_scss_1["default"].modal1, className, activeSteps == 1
                ? classes.secondStepper
                : activeSteps == 1
                    ? classes.firstStepper
                    : classes.thirdStepper) },
            react_1["default"].createElement("div", { className: style_module_scss_1["default"].hoverEffect },
                react_1["default"].createElement("i", { className: classnames_1["default"]("fa fa-times fa-1x", style_module_scss_1["default"].cross), onClick: close })),
            title && (react_1["default"].createElement("div", { className: style_module_scss_1["default"].proposalHeader },
                react_1["default"].createElement("div", { className: style_module_scss_1["default"].title5 }, title),
                react_1["default"].createElement("div", { style: { display: "flex" }, className: style_module_scss_1["default"].stepperDiv },
                    stepper,
                    react_1["default"].createElement("div", { className: style_module_scss_1["default"].stepper },
                        react_1["default"].createElement("div", { className: style_module_scss_1["default"].stepperCircle },
                            react_1["default"].createElement("h3", { className: style_module_scss_1["default"].stepperNumber }, activeSteps + 1)),
                        " ",
                        react_1["default"].createElement("div", { className: style_module_scss_1["default"].headerText }, steps[activeSteps]))))),
            react_1["default"].createElement(core_1.Grid, { lg: 5, sm: 8, xs: 12, md: 6, className: style_module_scss_1["default"].modalText, style: { fontSize: "14px", marginBottom: "20px" } }, stepsDescription[activeSteps]),
            react_1["default"].createElement("div", null, children),
            actions && react_1["default"].createElement("div", { className: style_module_scss_1["default"].actions }, actions)))) : (react_1["default"].createElement(core_1.Grid, { lg: 12, sm: 12, xs: 12, md: 12, className: style_module_scss_1["default"].modalWrap, id: "adminModal", onClick: handleClick },
        react_1["default"].createElement("div", { className: classnames_1["default"](style_module_scss_1["default"].modal, className) },
            react_1["default"].createElement("div", { className: style_module_scss_1["default"].closeButton, onClick: close }),
            title && react_1["default"].createElement("div", { className: style_module_scss_1["default"].title }, title),
            showStepper && (react_1["default"].createElement(Stepper_1["default"], { className: classes.text, activeStep: activeSteps, alternativeLabel: true }, steps.map(function (label) { return (react_1["default"].createElement(Step_1["default"], { key: label },
                react_1["default"].createElement(StepLabel_1["default"], null, label))); }))),
            react_1["default"].createElement("div", null, children),
            actions && react_1["default"].createElement("div", { className: style_module_scss_1["default"].actions }, actions))))));
});
