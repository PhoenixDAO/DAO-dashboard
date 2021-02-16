"use strict";
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-unused-expressions */
var react_1 = require("react");
var classnames_1 = require("classnames");
var no_eye_svg_1 = require("assets/images/icons/no-eye.svg");
var eye_svg_1 = require("assets/images/icons/eye.svg");
var style_module_scss_1 = require("./style.module.scss");
var Tooltip_1 = require("@material-ui/core/Tooltip");
var styles_1 = require("@material-ui/core/styles");
var LightTooltip = styles_1.withStyles(function (theme) { return ({
    tooltip: {
        fontSize: 11
    }
}); })(Tooltip_1["default"]);
exports["default"] = (function (_a) {
    var label = _a.label, name = _a.name, error = _a.error, type = _a.type, fieldValue = _a.fieldValue, fieldValue2 = _a.fieldValue2, onChange = _a.onChange, onKeyPress = _a.onKeyPress, tooltipMessage = _a.tooltipMessage;
    var _b = react_1["default"].useState(type), localType = _b[0], setLocalType = _b[1];
    return (react_1["default"].createElement("label", { className: style_module_scss_1["default"].wrap },
        label && (react_1["default"].createElement(LightTooltip, { title: "" + tooltipMessage, placement: "top", arrow: true },
            react_1["default"].createElement("div", { className: classnames_1["default"](style_module_scss_1["default"].label, error && style_module_scss_1["default"].hasError) }, label))),
        react_1["default"].createElement("div", { className: style_module_scss_1["default"].inputWrap },
            type === "password" && (react_1["default"].createElement("img", { className: style_module_scss_1["default"].icon, src: localType === "password" ? no_eye_svg_1["default"] : eye_svg_1["default"], onClick: function () {
                    setLocalType(localType === "password" ? "text" : "password");
                }, alt: "" })),
            localType !== "number" ? (react_1["default"].createElement("input", { type: localType, name: name, value: fieldValue, onChange: onChange, onKeyPress: onKeyPress, className: classnames_1["default"](style_module_scss_1["default"].input, error && style_module_scss_1["default"].hasError) })) : (react_1["default"].createElement("input", { type: localType, value: fieldValue2, onKeyPress: onKeyPress, onChange: function (e) { return onChange(e.target.value); }, className: classnames_1["default"](style_module_scss_1["default"].input, error && style_module_scss_1["default"].hasError) }))),
        error && react_1["default"].createElement("div", { className: style_module_scss_1["default"].error }, error)));
});
