"use strict";
exports.__esModule = true;
var react_1 = require("react");
var styles_1 = require("@material-ui/core/styles");
var Stepper_1 = require("@material-ui/core/Stepper");
var Step_1 = require("@material-ui/core/Step");
var StepLabel_1 = require("@material-ui/core/StepLabel");
var Button_1 = require("@material-ui/core/Button");
var Typography_1 = require("@material-ui/core/Typography");
var useStyles = styles_1.makeStyles(function (theme) {
    return styles_1.createStyles({
        root: {
            width: "100%"
        },
        backButton: {
            marginRight: theme.spacing(1)
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        }
    });
});
function getSteps() {
    return [
        "Select master blaster campaign settings",
        "Create an ad group",
        "Create an ad",
    ];
}
function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return "Select campaign settings...";
        case 1:
            return "What is an ad group anyways?";
        case 2:
            return "This is the bit I really care about!";
        default:
            return "Unknown stepIndex";
    }
}
function HorizontalLabelPositionBelowStepper() {
    var classes = useStyles();
    var _a = react_1["default"].useState(0), activeStep = _a[0], setActiveStep = _a[1];
    var steps = getSteps();
    var handleNext = function () {
        setActiveStep(function (prevActiveStep) { return prevActiveStep + 1; });
    };
    var handleBack = function () {
        setActiveStep(function (prevActiveStep) { return prevActiveStep - 1; });
    };
    var handleReset = function () {
        setActiveStep(0);
    };
    return (react_1["default"].createElement("div", { className: classes.root },
        react_1["default"].createElement(Stepper_1["default"], { activeStep: activeStep, alternativeLabel: true }, steps.map(function (label) { return (react_1["default"].createElement(Step_1["default"], { key: label },
            react_1["default"].createElement(StepLabel_1["default"], null, label))); })),
        react_1["default"].createElement("div", null, activeStep === steps.length ? (react_1["default"].createElement("div", null,
            react_1["default"].createElement(Typography_1["default"], { className: classes.instructions }, "All steps completed"),
            react_1["default"].createElement(Button_1["default"], { onClick: handleReset }, "Reset"))) : (react_1["default"].createElement("div", null,
            react_1["default"].createElement(Typography_1["default"], { className: classes.instructions }, getStepContent(activeStep)),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(Button_1["default"], { disabled: activeStep === 0, onClick: handleBack, className: classes.backButton }, "Back"),
                react_1["default"].createElement(Button_1["default"], { variant: "contained", color: "primary", onClick: handleNext }, activeStep === steps.length - 1 ? "Finish" : "Next")))))));
}
exports["default"] = HorizontalLabelPositionBelowStepper;
