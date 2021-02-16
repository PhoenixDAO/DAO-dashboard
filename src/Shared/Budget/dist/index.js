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
var react_redux_1 = require("react-redux");
var core_1 = require("@material-ui/core");
var DAOAttributesActions_1 = require("../../redux/DAOAttributesActions");
/** Components */
var Button_1 = require("Shared/Button");
var Field_1 = require("Shared/Field");
var style_module_scss_1 = require("./style.module.scss");
var Budget = function (props) {
    var _a = react_1.useState(props.DAOAttributes), DAOAttributes = _a[0], setDAOAttributes = _a[1];
    var _b = react_1.useState(false), showLoader = _b[0], setShowLoader = _b[1];
    var _c = react_1.useState(["", "", ""]), error = _c[0], setError = _c[1];
    var monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    var date = new Date();
    // const getDAOAttributes = async () => {
    //   try {
    //     const get = await axios
    //       .get(`${URL}${Admin}`, {
    //         headers: {
    //           Authorization: `Bearer ${props.user.token}`,
    //         },
    //       })
    //       .then((value) => {
    //         console.log("DAO ATTRIBUTES ---> ", value.data.result);
    //         setDAOAttributes(value.data.result);
    //       })
    //       .catch((err) => {
    //         console.log("Attributes Not Found", err);
    //       });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    var getDAOAttributes = function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("props.token is", props.token);
                    return [4 /*yield*/, props.getDAOAttributes(props.token)];
                case 1:
                    _a.sent();
                    console.log("DAO ATTRIBUTES in budget---> ", props.DAOAttributes);
                    setDAOAttributes(props.DAOAttributes);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.log("error", err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var updateDAOAttributes = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _id, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!verifyValue()) {
                        return [2 /*return*/];
                    }
                    setShowLoader(true);
                    _id = props.user && props.user._id
                        ? props.user._id
                        : "5f32adb31fa04b0e0f4e3298";
                    console.log("id isss", _id);
                    return [4 /*yield*/, props.updateDAOAttributes(props.token, _id, DAOAttributes)];
                case 1:
                    _a.sent();
                    // const get = await axios
                    //   .put(`${URL}${Admin}${_id}`, DAOAttributes, {
                    //     headers: {
                    //       Authorization: `Bearer ${props.user.token}`,
                    //     },
                    //   })
                    console.log("UPDATED DAO ATTRIBUTES ---> ", props.DAOAttributes);
                    // setDAOAttributes(props.DAOAttributes);
                    props.openSnackbar("Successfully updated !", "success");
                    setShowLoader(false);
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    props.openSnackbar("Oops! something went wrong.", "error");
                    console.log(err_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        getDAOAttributes();
    }, [props.token]);
    react_1.useEffect(function () {
        setDAOAttributes(props.DAOAttributes);
    }, [props.DAOAttributes]);
    var verifyValue = function () {
        var err = false;
        var err0 = "", err1 = "", err2 = "";
        if (DAOAttributes.minimumUpvotes <= 0) {
            err0 = "Value must be greater than 0";
            err = true;
        }
        if (DAOAttributes.maxUpvoteDays <= 0) {
            err1 = "Value must be greater than 0";
            err = true;
        }
        if (DAOAttributes.monthlyBudget <= 0) {
            err2 = "Value must be greater than 0";
            err = true;
        }
        if (err) {
            setError([err0, err1, err2]);
            return false;
        }
        return true;
    };
    var formatInput = function (e) {
        var inputKeyCode = e.which;
        var allowedKeyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
        if (!allowedKeyCodes.includes(inputKeyCode)) {
            e.preventDefault();
            return;
        }
        // // Prevent characters that are not numbers ("e", ".", "+" & "-") ✨
        // console.log("value",e);
        // let checkIfNum;
        // if (e.key !== undefined) {
        //   // Check if it's a "e", ".", "+" or "-"
        //   checkIfNum =
        //     e.key === "e" || e.key === "." || e.key === "+" || e.key === "-";
        // } else if (e.keyCode !== undefined) {
        //   // Check if it's a "e" (69), "." (190), "+" (187) or "-" (189)
        //   checkIfNum =
        //     e.keyCode === 69 ||
        //     e.keyCode === 190 ||
        //     e.keyCode === 187 ||
        //     e.keyCode === 189;
        // }
        // return checkIfNum && e.preventDefault();
    };
    var setMinimumUpvotes = function (value) {
        if ((value <= 0 && value != "") ||
            value.toString().length > 3 ||
            value == "-")
            return;
        var err1 = error[1];
        var err2 = error[2];
        setError(["", err1, err2]);
        setDAOAttributes(__assign(__assign({}, DAOAttributes), { minimumUpvotes: value }));
    };
    var setMaxUpvoteDays = function (value) {
        if ((value <= 0 && value != "") ||
            value.toString().length > 3 ||
            value == "-")
            return;
        var err0 = error[0];
        var err2 = error[2];
        setError([err0, "", err2]);
        setDAOAttributes(__assign(__assign({}, DAOAttributes), { maxUpvoteDays: value }));
    };
    var setMonthlyBudget = function (value) {
        if ((value <= 0 && value != "") ||
            value.toString().length > 6 ||
            value == "-")
            return;
        var err0 = error[0];
        var err1 = error[1];
        setError([err0, err1, ""]);
        setDAOAttributes(__assign(__assign({}, DAOAttributes), { monthlyBudget: value }));
    };
    return (react_1["default"].createElement("div", { className: style_module_scss_1["default"].budget },
        react_1["default"].createElement("div", { className: style_module_scss_1["default"].inputs },
            react_1["default"].createElement(core_1.Grid, { container: true, spacing: 1 },
                react_1["default"].createElement(core_1.Grid, { item: true, xs: 12, sm: 4, lg: 4, md: 4, xl: 4, alignItems: "flex-end" },
                    react_1["default"].createElement(Field_1["default"], { label: "Minimum Upvotes", type: "number", fieldValue2: DAOAttributes === null || DAOAttributes === void 0 ? void 0 : DAOAttributes.minimumUpvotes, onChange: setMinimumUpvotes, error: error[0], tooltipMessage: "Minimum upvotes required to pass upvoting stage", onKeyPress: formatInput })),
                react_1["default"].createElement(core_1.Grid, { item: true, xs: 12, sm: 4, lg: 4, md: 4, xl: 4, alignItems: "flex-end" },
                    react_1["default"].createElement(Field_1["default"], { label: "Max Upvote Days", type: "number", onKeyPress: formatInput, fieldValue2: DAOAttributes === null || DAOAttributes === void 0 ? void 0 : DAOAttributes.maxUpvoteDays, onChange: setMaxUpvoteDays, error: error[1], tooltipMessage: "Maximum days for passing upvote stage" })),
                react_1["default"].createElement(core_1.Grid, { item: true, xs: 12, sm: 4, lg: 4, md: 4, xl: 4, alignItems: "flex-end" },
                    react_1["default"].createElement(Field_1["default"], { onKeyPress: formatInput, label: "Set Budget " + monthNames[date.getMonth()] + " " + date.getFullYear(), type: "number", fieldValue2: DAOAttributes === null || DAOAttributes === void 0 ? void 0 : DAOAttributes.monthlyBudget, onChange: setMonthlyBudget, error: error[2], tooltipMessage: "DAO contract balance" })))),
        react_1["default"].createElement(Button_1["default"], { primary: true, className: style_module_scss_1["default"].updatebutton, onClick: updateDAOAttributes }, showLoader ? (react_1["default"].createElement(core_1.CircularProgress, { size: "30rem", color: "inherit" })) : ("Update"))));
};
var mapStateToProps = function (state) { return ({
    token: state.userDetails.token,
    user: state.userDetails.user,
    DAOAttributes: state.DAOAttributesReducer.DAOAttributes
}); };
var mapDispatchToProps = function (dispatch) {
    return {
        getDAOAttributes: function (body) { return dispatch(DAOAttributesActions_1.getDAOAttributes(body)); },
        updateDAOAttributes: function (body, _id, DAOAttributes) {
            return dispatch(DAOAttributesActions_1.updateDAOAttributes(body, _id, DAOAttributes));
        }
    };
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Budget);
