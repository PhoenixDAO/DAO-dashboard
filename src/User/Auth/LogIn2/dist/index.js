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
/* eslint-disable jsx-a11y/alt-text */
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Button_1 = require("Shared/Button");
var style_module_scss_1 = require("./style.module.scss");
var react_redux_1 = require("react-redux");
var layoutActions_1 = require("../../../redux/layoutActions");
var authActions_1 = require("redux/authActions");
var styles_1 = require("@material-ui/core/styles");
var core_1 = require("@material-ui/core");
var Snackbar_1 = require("@material-ui/core/Snackbar");
var Alert_1 = require("@material-ui/lab/Alert");
var logo1_png_1 = require("../../../assets/images/logo1.png");
var layoutActions_2 = require("redux/layoutActions");
var imageSlider_1 = require("./imageSlider");
var contractsInit_1 = require("../../../config/contractsInit");
var classnames_1 = require("classnames");
var useStyles = styles_1.makeStyles(function (theme) {
    return styles_1.createStyles({
        root: {
            textTransform: "none",
            width: "100%",
            backgroundColor: "#EA8604",
            color: "white",
            borderColor: "#EA8604",
            "&:hover": {
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
        image: {
            width: "100%",
            height: "100%"
        },
        img: {
            margin: "auto",
            display: "block",
            maxWidth: "100%",
            maxHeight: "100%"
        }
    });
});
var Login = function (props) {
    var classes = useStyles();
    var _a = react_1.useState(false), myLoading = _a[0], setMyLoading = _a[1];
    var _b = react_1.useState(false), disable = _b[0], setDisable = _b[1];
    var _c = react_1.useState(false), loginClicked = _c[0], setLoginClicked = _c[1];
    var _d = react_1.useState({
        message: undefined,
        severity: undefined
    }), errorMessage = _d[0], setErrorMessage = _d[1];
    var _e = react_1.useState(false), error = _e[0], setError = _e[1];
    var _f = react_1.useState(false), metaMaskAddress = _f[0], setMetaMaskAddress = _f[1];
    var _g = react_1.useState(false), signUpRedirect = _g[0], setSignUpRedirect = _g[1];
    var _h = react_1.useState(""), logIn = _h[0], setLogIn = _h[1];
    var _j = react_1.useState(false), redirect = _j[0], setRedirect = _j[1];
    // const thischeckWeb3 = useCallback(async () => {
    //   await props.checkWeb3(loginClicked);
    //   if (loginClicked && props.address) {
    //     const result = await LoginAPI();
    //   }
    // }, [loginClicked, props.address]);
    var openSnackbar = function (message, severity) {
        setErrorMessage({ message: message, severity: severity });
        setError(true);
    };
    var checkAuth = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            openSnackbar("MetaMask connected successfully", "success");
            setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, LoginAPI()];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }, 1000);
            return [2 /*return*/];
        });
    }); };
    var getContractInfo = function () { return __awaiter(void 0, void 0, void 0, function () {
        var temp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, contractsInit_1["default"].init()];
                case 1:
                    temp = _a.sent();
                    console.log("temp", temp);
                    setMetaMaskAddress(temp.address);
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        getContractInfo();
    });
    react_1.useEffect(function () {
        if (props.address && loginClicked) {
            checkAuth();
            // let temp = setInterval(thischeckWeb3, 5000);
            // return () => {
            //   clearInterval(temp);
            // };
        }
    }, [props.address, loginClicked]);
    var _window = window;
    react_1.useEffect(function () {
        // checkWeb3BeforeLogin();
        function listenMMAccount() {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    if (typeof _window.ethereum !== "undefined") {
                        console.log("in here");
                        _window.ethereum.on("connect", function (accounts) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        //  logout();
                                        setDisable(true);
                                        setMyLoading(true);
                                        return [4 /*yield*/, props.checkWeb3BeforeLogin()];
                                    case 1:
                                        _a.sent();
                                        setDisable(false);
                                        setMyLoading(false);
                                        console.log("fired connect");
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        _window.ethereum.on("accountsChanged", function (accounts) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        // await logout();
                                        console.log("fired accountsChanged");
                                        setDisable(true);
                                        setMyLoading(true);
                                        return [4 /*yield*/, props.checkWeb3BeforeLogin()];
                                    case 1:
                                        _a.sent();
                                        setDisable(false);
                                        setMyLoading(false);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        _window.ethereum.on("disconnect", function (accounts) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        //  logout();
                                        console.log("fired disconnect");
                                        setDisable(true);
                                        setMyLoading(true);
                                        return [4 /*yield*/, props.checkWeb3BeforeLogin()];
                                    case 1:
                                        _a.sent();
                                        setDisable(false);
                                        setMyLoading(false);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    return [2 /*return*/];
                });
            });
        }
        listenMMAccount();
    }, []);
    var LoginAPI = function () { return __awaiter(void 0, void 0, void 0, function () {
        var value, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    setMyLoading(true);
                    setDisable(true);
                    return [4 /*yield*/, props.loginWithMetaMask({ Address: props.address })];
                case 1:
                    value = _a.sent();
                    if (value.data.result.notRegistered) {
                        console.log("In if 1");
                        setRedirect(true);
                        setMyLoading(false);
                    }
                    else {
                        if (value.data.result.user &&
                            value.data.result.user.token &&
                            !value.data.result.user.isAdmin) {
                            console.log("In if 2");
                            setLogIn("user");
                        }
                        else if (value.data.result.user &&
                            value.data.result.user.token &&
                            value.data.result.user.isAdmin) {
                            console.log("In else");
                            setLogIn("admin");
                        }
                        setMyLoading(false);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    console.log("Error -----", e_1);
                    setMyLoading(false);
                    setDisable(false);
                    throw { message: "An Error Occured" };
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var loginWithMetaMask = function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, props.checkWeb3(false)];
                case 1:
                    result = _a.sent();
                    if (!!props.address) return [3 /*break*/, 2];
                    setLoginClicked(true);
                    return [3 /*break*/, 4];
                case 2:
                    if (!props.address) return [3 /*break*/, 4];
                    setLoginClicked(false);
                    return [4 /*yield*/, LoginAPI()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    e_2 = _a.sent();
                    openSnackbar(e_2.message, "error");
                    setLoginClicked(false);
                    setDisable(false);
                    setMyLoading(false);
                    openSnackbar(e_2.message, "error");
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return logIn === "user" ? (react_1["default"].createElement(react_router_dom_1.Redirect, { to: "/" })) : logIn === "admin" ? (react_1["default"].createElement(react_router_dom_1.Redirect, { to: "/admin" })) : signUpRedirect ? (react_1["default"].createElement(react_router_dom_1.Redirect, { to: "/auth/sign_up" })) : redirect ? (react_1["default"].createElement(react_router_dom_1.Redirect, { to: {
            pathname: "/auth/sign_up",
            state: { from: props.location }
        } })) : (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Snackbar_1["default"], { className: classes.root2, anchorOrigin: {
                vertical: "bottom",
                horizontal: "center"
            }, open: error, autoHideDuration: 2000, onClose: function () {
                setError(false);
            } },
            react_1["default"].createElement(Alert_1["default"], { className: classes.alert, severity: errorMessage.severity }, errorMessage.message)),
        react_1["default"].createElement("div", { className: style_module_scss_1["default"].main },
            react_1["default"].createElement(core_1.Grid, { container: true, sm: 12 },
                react_1["default"].createElement(core_1.Grid, { item: true, sm: 12, xs: 12, md: 12, lg: 12 },
                    react_1["default"].createElement("img", { src: logo1_png_1["default"], className: style_module_scss_1["default"].firstImage })),
                react_1["default"].createElement(core_1.Grid, { item: true, sm: 6, xs: 12, md: 6, lg: 6, className: style_module_scss_1["default"].logo },
                    react_1["default"].createElement("div", { className: style_module_scss_1["default"].signinDiv },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("p", { style: {
                                    fontSize: "28px",
                                    color: "black",
                                    fontWeight: "bold",
                                    paddingTop: "20px"
                                }, className: style_module_scss_1["default"].txt }, "Welcome back!"),
                            react_1["default"].createElement("p", { style: {
                                    fontSize: "16px",
                                    paddingTop: "10px"
                                }, className: style_module_scss_1["default"].txt1 }, "Let's get those votes counting yeah?")),
                        react_1["default"].createElement("div", { className: style_module_scss_1["default"].buttonsDiv },
                            react_1["default"].createElement(Button_1["default"], { style: {
                                    fontSize: "17px", fontFamily: "sans-serif"
                                }, className: classnames_1["default"](classes.root, style_module_scss_1["default"].loginWithMetaMask), onClick: loginWithMetaMask, disabled: disable, variant: "outlined" }, myLoading ? (
                            // <CircularProgress size={12} color="inherit" />
                            react_1["default"].createElement(core_1.CircularProgress, { size: 14, style: { color: "white"
                                } })) : ("Login with MetaMask")),
                            react_1["default"].createElement(Button_1["default"], { component: react_router_dom_1.Link, disable: disable, 
                                //   to={routes.auth.logInWithNumio()}
                                className: style_module_scss_1["default"].button, primary: true, outline: true, shadow: true, style: {
                                    background: "#258C01",
                                    color: "white",
                                    borderColor: "green",
                                    marginTop: "30px",
                                    height: "50px",
                                    width: "80%",
                                    borderRadius: "7px",
                                    fontSize: "17px",
                                    fontFamily: "sans-serif"
                                } }, "Login with Numio")),
                        react_1["default"].createElement("div", { style: {
                                marginTop: "55px",
                                // width: "350px",
                                width: "75%",
                                textAlign: "center"
                            } },
                            react_1["default"].createElement("p", { style: { fontSize: "16px", color: "grey" } },
                                "Don't have an account?",
                                " ",
                                react_1["default"].createElement("span", { className: style_module_scss_1["default"].signUpText, onClick: function () {
                                        return metaMaskAddress
                                            ? setSignUpRedirect(true)
                                            : openSnackbar("Metamask not connected", "error");
                                    }, style: { fontWeight: "bold" } }, "Sign up"))))),
                react_1["default"].createElement(core_1.Grid, { item: true, sm: 6, xs: 12, md: 6, lg: 6, style: { background: "white", paddingBottom: "30px" } },
                    react_1["default"].createElement("div", { style: {
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            background: "white",
                            margin: "20px"
                        } },
                        react_1["default"].createElement(imageSlider_1["default"], null)))))));
};
var mapStateToProps = function (state) { return ({
    user: state.userDetails.user,
    balance: state.dashboardReducer.balance,
    address: state.layoutReducer.address
}); };
var mapDispatchToProps = function (dispatch) {
    return {
        checkWeb3: function (param) { return dispatch(layoutActions_1.checkWeb3(param)); },
        loginWithMetaMask: function (body) { return dispatch(authActions_1.loginWithMetaMask(body)); },
        checkWeb3BeforeLogin: function () { return dispatch(layoutActions_2.checkWeb3BeforeLogin()); }
    };
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Login);
