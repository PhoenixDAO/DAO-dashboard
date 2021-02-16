"use strict";
// import React, { useState } from "react";
// import Layout from "../Layout";
// import { Title } from "../Shared";
// import Field from "Shared/Field";
// // import Button from "Shared/Button";
// import { Link, Redirect } from "react-router-dom";
// import routes from "routes";
// import style from "./style.module.scss";
// import Alert from "@material-ui/lab/Alert";
// import axios from "axios";
// import { connect } from "react-redux";
// import { CircularProgress, Button, FormControl } from "@material-ui/core";
// import { loginWithMetaMask } from "redux/authActions";
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
// const SignUp = (props: any) => {
//   const [logIn, setLogIn] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [alreadyExistError, setAlreadyExistError] = useState(false);
//   const [errorFlag, setErrorFlag] = useState(false);
//   const [showLoader, setShowLoader] = useState(false);
//   const [emailErrorMessage, setEmailErrorMessage]: any = useState<
//     String | undefined
//   >(undefined);
//   const [state, setState] = useState({
//     email: "",
//     first_name: "",
//     last_name: "",
//   });
//   const handleForm = (e: any) => {
//     e.preventDefault();
//     handleSubmit();
//   };
//   const handleChange = (e: any) => {
//     setEmailErrorMessage(undefined);
//     setState({ ...state, [e.target.name]: e.target.value });
//     setErrorFlag(false);
//   };
//   const loginWithMetaMask = async () => {
//     const value = await props.loginWithMetaMask({
//       ...state,
//       register: true,
//       Address: props.address,
//     });
//     if (value.data.result.alreadyRegistered) {
//       setAlreadyExistError(true);
//       setErrorMessage(value.data.result.alreadyRegistered);
//     } else {
//       if (
//         value.data.result.user &&
//         value.data.result.user.token &&
//         !value.data.result.user.isAdmin
//       ) {
//         setLogIn("user");
//       } else if (
//         value.data.result.user &&
//         value.data.result.user.token &&
//         value.data.result.user.isAdmin
//       ) {
//         setLogIn("admin");
//       }
//     }
//   };
//   const handleSubmit = async () => {
//     try {
//       setAlreadyExistError(false);
//       if (!state.email || !state.first_name || !state.last_name) {
//         setErrorFlag(true);
//       } else {
//         let emailValid = state.email.match(
//           /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
//         );
//         if (emailValid == null) {
//           setEmailErrorMessage("Email is not valid");
//           return;
//         }
//         setErrorFlag(false);
//         setShowLoader(true);
//         await loginWithMetaMask();
//         setShowLoader(false);
//       }
//     } catch (err) {}
//   };
//   return logIn === "user" ? (
//     <Redirect to="/" />
//   ) : logIn === "admin" ? (
//     <Redirect to="/admin" />
//   ) : props.address ? (
//     <>
//       <Layout>
//         <form onSubmit={handleForm}>
//           <Title>Register</Title>
//           <Field
//             label="First Name"
//             type="text"
//             name="first_name"
//             tooltipMessage="First Name"
//             fieldValue={state.first_name}
//             onChange={(e: any) => {
//               handleChange(e);
//             }}
//           />
//           <Field
//             label="Last Name"
//             tooltipMessage="Last Name"
//             type="text"
//             name="last_name"
//             fieldValue={state.last_name}
//             onChange={(e: any) => {
//               handleChange(e);
//             }}
//           />
//           <Field
//             label="Email"
//             type="email"
//             name="email"
//             tooltipMessage="Email Address"
//             fieldValue={state.email}
//             error={emailErrorMessage}
//             onChange={(e: any) => {
//               handleChange(e);
//             }}
//           />
//           {errorFlag ? (
//             <Alert
//               severity="error"
//               className={style.Button}
//               style={{ fontSize: "10px" }}
//             >
//               <p> Warning! All fields must be filled. </p>
//             </Alert>
//           ) : alreadyExistError ? (
//             <Alert
//               severity="error"
//               className={style.Button}
//               style={{ fontSize: "10px" }}
//             >
//               <p> {errorMessage} </p>
//             </Alert>
//           ) : null}
//           <div className={style.buttons}>
//             <Button
//               type="submit"
//               style={{
//                 backgroundColor: "#ea8604",
//                 borderColor: "#ea8604",
//                 color: " #fff",
//                 textTransform: "none",
//                 justifyContent: "center",
//               }}
//               fullWidth
//               className={style.primary}
//               variant="contained"
//             >
//               {" "}
//               {showLoader ? (
//                 <CircularProgress size={18} />
//               ) : (
//                 <p style={{ fontWeight: "bold", fontSize: "12px" }}>Register</p>
//               )}
//             </Button>
//           </div>
//         </form>
//       </Layout>
//     </>
//   ) : (
//     <Redirect
//       to={{
//         pathname: "/auth/log_in",
//         state: { from: props.location },
//       }}
//     />
//   );
// };
// const mapStateToProps = (state: any) => ({
//   address: state.layoutReducer.address,
// });
// export default connect(mapStateToProps, { loginWithMetaMask })(SignUp);
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
var Alert_1 = require("@material-ui/lab/Alert");
var layoutActions_2 = require("redux/layoutActions");
var TextField_1 = require("@material-ui/core/TextField");
var logo1_png_1 = require("../../../assets/images/logo1.png");
var imageSlider_1 = require("./imageSlider");
var contractsInit_1 = require("../../../config/contractsInit");
var authActions_2 = require("../../../redux/authActions");
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
        dialogueButton: {
            border: "1px solid",
            cursor: "pointer",
            height: "48px",
            display: "flex",
            padding: "0 20rem",
            position: "relative",
            fontSize: "12px",
            transition: "0.2s",
            alignItems: "center",
            // fontWeight: "bold",
            // fontFamily: "Product Sans",
            // fontStyle: "normal",
            // fontWeight: "bold",
            userWelect: "none",
            borderRadius: "14rem",
            justifyContent: "center",
            minWidth: "100px",
            backgroundColor: "#4C42FF",
            color: "white",
            width: "100%",
            marginTop: "20px",
            marginBottom: "30px"
        },
        firstfields: (_a = {
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
            _a[theme.breakpoints.down("xl")] = {
                width: "275px"
            },
            _a[theme.breakpoints.up("lg")] = {
                width: "274px"
            },
            _a[theme.breakpoints.down("lg")] = {
                width: "223px"
            },
            _a[theme.breakpoints.down("md")] = {
                width: "167px"
            },
            _a[theme.breakpoints.down("xs")] = {
                width: "165px"
            },
            _a[theme.breakpoints.up("xs")] = {
                width: "160px"
            },
            _a),
        image: {
            width: "100%",
            height: "100%"
        },
        img: {
            margin: "auto",
            display: "block",
            maxWidth: "100%",
            maxHeight: "100%"
        },
        testing: {
            height: "100%",
            width: "100%"
        },
        main: {
            height: "100%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center"
        },
        carousel: {
            "& .Carousel-indicators-57": {
                color: "rgb(112 0 255)"
            }
        }
    });
});
var Login = function (props) {
    // const classes = useStyles();
    // const [myLoading, setMyLoading] = useState(false);
    // const [disable, setDisable] = useState(false);
    // const [loginClicked, setLoginClicked] = useState(false);
    // const [errorMessage, setErrorMessage] = useState<message>({
    //   message: undefined,
    //   severity: undefined,
    // });
    // const [error, setError] = useState(false);
    // const [logIn, setLogIn] = useState("");
    // const [redirect, setRedirect] = useState(false);
    // const thischeckWeb3 = useCallback(async () => {
    //   await props.checkWeb3(loginClicked);
    //   if (loginClicked && props.address) {
    //     const result = await LoginAPI();
    //   }
    // }, [loginClicked, props.address]);
    // const openSnackbar = (
    //   message: string,
    //   severity: "error" | "success" | "warning" | "info" | undefined
    // ) => {
    //   setErrorMessage({ message, severity });
    //   setError(true);
    // };
    // const checkAuth = async () => {
    //   openSnackbar("MetaMask connected successfully", "success");
    //   setTimeout(async () => {
    //     const result = await LoginAPI();
    //   }, 1000);
    // };
    // useEffect(() => {
    //   if (props.address && loginClicked) {
    //     checkAuth();
    //     // let temp = setInterval(thischeckWeb3, 5000);
    //     // return () => {
    //     //   clearInterval(temp);
    //     // };
    //   }
    // }, [props.address, loginClicked]);
    // const _window = window as any;
    // useEffect(() => {
    //   // checkWeb3BeforeLogin();
    //   async function listenMMAccount() {
    //     if (typeof _window.ethereum !== "undefined") {
    //       console.log("in here");
    //       _window.ethereum.on("connect", async (accounts: any) => {
    //         //  logout();
    //         setDisable(true);
    //         setMyLoading(true);
    //         await props.checkWeb3BeforeLogin();
    //         setDisable(false);
    //         setMyLoading(false);
    //         console.log("fired connect");
    //         //  checkWeb3BeforeLogin();
    //       });
    //       _window.ethereum.on("accountsChanged", async (accounts: any) => {
    //         // await logout();
    //         console.log("fired accountsChanged");
    //         setDisable(true);
    //         setMyLoading(true);
    //         await props.checkWeb3BeforeLogin();
    //         setDisable(false);
    //         setMyLoading(false);
    //       });
    //       _window.ethereum.on("disconnect", async (accounts: any) => {
    //         //  logout();
    //         console.log("fired disconnect");
    //         setDisable(true);
    //         setMyLoading(true);
    //         await props.checkWeb3BeforeLogin();
    //         setDisable(false);
    //         setMyLoading(false);
    //         //  checkWeb3BeforeLogin();
    //       });
    //     }
    //   }
    //   listenMMAccount();
    // }, []);
    // const LoginAPI = async () => {
    //   try {
    //     setMyLoading(true);
    //     setDisable(true);
    //     const value = await props.loginWithMetaMask({ Address: props.address });
    //     if (value.data.result.notRegistered) {
    //       setRedirect(true);
    //       setMyLoading(false);
    //     } else {
    //       if (
    //         value.data.result.user &&
    //         value.data.result.user.token &&
    //         !value.data.result.user.isAdmin
    //       ) {
    //         setLogIn("user");
    //       } else if (
    //         value.data.result.user &&
    //         value.data.result.user.token &&
    //         value.data.result.user.isAdmin
    //       ) {
    //         setLogIn("admin");
    //       }
    //       setMyLoading(false);
    //     }
    //   } catch (e) {
    //     setMyLoading(false);
    //     setDisable(false);
    //     throw { message: "An Error Occured" };
    //   }
    // };
    // const loginWithMetaMask = async (e: any) => {
    //   e.preventDefault();
    //   try {
    //     let result = await props.checkWeb3(false);
    //     if (!props.address) {
    //       setLoginClicked(true);
    //     } else if (props.address) {
    //       setLoginClicked(false);
    //       await LoginAPI();
    //     }
    //   } catch (e) {
    //     openSnackbar(e.message, "error");
    //     // setErrorMessage({message:e.message , severity:"error"});
    //     // setError(true);
    //     setLoginClicked(false);
    //     setDisable(false);
    //     setMyLoading(false);
    //     // if (e.message === "Network Error") {
    //     //   setLoginClicked(false);
    //     //   setDisable(false);
    //     //   setMyLoading(false);
    //     // }
    //     openSnackbar(e.message, "error");
    //   }
    // };
    var classes = useStyles();
    var _a = react_1.useState(""), logIn = _a[0], setLogIn = _a[1];
    var _b = react_1.useState(""), errorMessage = _b[0], setErrorMessage = _b[1];
    var _c = react_1.useState(false), alreadyExistError = _c[0], setAlreadyExistError = _c[1];
    var _d = react_1.useState(false), errorFlag = _d[0], setErrorFlag = _d[1];
    var _e = react_1.useState(false), showLoader = _e[0], setShowLoader = _e[1];
    var _f = react_1.useState(false), checkBox = _f[0], setCheckBox = _f[1];
    var _g = react_1.useState(false), loginRedirect = _g[0], setLoginRedirect = _g[1];
    var _h = react_1.useState(""), metaMaskAddress = _h[0], setMetaMaskAddress = _h[1];
    var _j = react_1.useState(undefined), emailErrorMessage = _j[0], setEmailErrorMessage = _j[1];
    var _k = react_1.useState({
        email: "",
        first_name: "",
        last_name: ""
    }), state = _k[0], setState = _k[1];
    var handleForm = function (e) {
        e.preventDefault();
        handleSubmit();
    };
    var handleChange = function (e) {
        var _a;
        console.log(e.target.name);
        console.log(e.target.value.length);
        setEmailErrorMessage(undefined);
        // console.log(e.target.value);
        // console.log(e.target.value.length);
        console.log(state);
        if (e.target.name != "email" && e.target.value.length > 15) {
            return false;
        }
        if (e.target.name == "email" && e.target.value.length > 30) {
            console.log("Break");
            return false;
        }
        setState(__assign(__assign({}, state), (_a = {}, _a[e.target.name] = e.target.value, _a)));
        setErrorFlag(false);
    };
    var getContractInfo = function () { return __awaiter(void 0, void 0, void 0, function () {
        var temp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, contractsInit_1["default"].init()];
                case 1:
                    temp = _a.sent();
                    console.log("temp", temp.address);
                    setMetaMaskAddress(temp.address);
                    return [2 /*return*/, temp];
            }
        });
    }); };
    var _window = window;
    var matchAddressWithAccount = function () { return __awaiter(void 0, void 0, void 0, function () {
        var temp;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, contractsInit_1["default"].init()];
                case 1:
                    temp = _b.sent();
                    console.log("address is", temp.address, " and numioAddress is ", (_a = props.user) === null || _a === void 0 ? void 0 : _a.numioAddress);
                    if (!temp.address ||
                        (props.user &&
                            temp.address.toLowerCase() != props.user.numioAddress.toLowerCase())) {
                        setLoginRedirect(true);
                        //await props.logout();
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        function listenMMAccount() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (typeof _window.ethereum !== "undefined") {
                        _window.ethereum.on("accountsChanged", function (accounts) {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    console.log("Xord", accounts);
                                    setLoginRedirect(true);
                                    //  await props.logout();
                                    if (!accounts[0]) {
                                        console.log("In if");
                                        setLoginRedirect(true);
                                        // await props.logout();
                                    }
                                    else if (props.user &&
                                        props.user.numioAddress.toLowerCase() != accounts[0].toLowerCase()) {
                                        console.log("In else if");
                                        setLoginRedirect(true);
                                        //  await props.logout();
                                    }
                                    return [2 /*return*/];
                                });
                            });
                        });
                    }
                    return [2 /*return*/];
                });
            });
        }
        matchAddressWithAccount();
        listenMMAccount();
    }, []);
    react_1.useEffect(function () {
        getContractInfo();
    });
    var loginWithMetaMask = function () { return __awaiter(void 0, void 0, void 0, function () {
        var value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("MetaMask", metaMaskAddress);
                    return [4 /*yield*/, props.loginWithMetaMask(__assign(__assign({}, state), { register: true, 
                            // Address: props.address,
                            Address: metaMaskAddress }))];
                case 1:
                    value = _a.sent();
                    if (value.data.result.alreadyRegistered) {
                        setAlreadyExistError(true);
                        setErrorMessage(value.data.result.alreadyRegistered);
                    }
                    else {
                        if (value.data.result.user &&
                            value.data.result.user.token &&
                            !value.data.result.user.isAdmin) {
                            setLogIn("user");
                        }
                        else if (value.data.result.user &&
                            value.data.result.user.token &&
                            value.data.result.user.isAdmin) {
                            setLogIn("admin");
                        }
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var emailValid, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    setAlreadyExistError(false);
                    console.log(state);
                    if (!(!state.email || !state.first_name || !state.last_name || !checkBox)) return [3 /*break*/, 1];
                    setErrorFlag(true);
                    return [3 /*break*/, 3];
                case 1:
                    emailValid = state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                    if (emailValid == null) {
                        setEmailErrorMessage("Email is not valid");
                        return [2 /*return*/];
                    }
                    setErrorFlag(false);
                    setShowLoader(true);
                    return [4 /*yield*/, loginWithMetaMask()];
                case 2:
                    _a.sent();
                    setShowLoader(false);
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    console.log("In catch");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return logIn === "user" ? (react_1["default"].createElement(react_router_dom_1.Redirect, { to: "/" })) : logIn === "admin" ? (react_1["default"].createElement(react_router_dom_1.Redirect, { to: "/admin" })) : loginRedirect ? (react_1["default"].createElement(react_router_dom_1.Redirect, { to: "/auth/log_in" })) : // ) : props.address ? (
        metaMaskAddress ? (react_1["default"].createElement(core_1.Grid, { className: style_module_scss_1["default"].rootGrid, sm: 12, xs: 12, md: 12, lg: 12, container: true },
            react_1["default"].createElement(core_1.Grid, { item: true, sm: 6, xs: 12, md: 6, lg: 6, style: {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    background: "white"
                } },
                react_1["default"].createElement("div", { style: { marginLeft: "10%", marginRight: "10%" } },
                    react_1["default"].createElement("div", { style: { flexDirection: "column" } },
                        react_1["default"].createElement("div", { style: { marginBottom: "50px" } },
                            react_1["default"].createElement("img", { src: logo1_png_1["default"], style: { height: "35px" } })),
                        react_1["default"].createElement("div", { style: { marginBottom: "20px" } },
                            react_1["default"].createElement("p", { style: {
                                    fontSize: "30px",
                                    color: "black",
                                    fontWeight: "bold"
                                } }, "Sign up."))),
                    react_1["default"].createElement("p", { style: {
                            fontSize: "15px",
                            width: "auto"
                        } }, "Register an account with Phoenix Dao and join"),
                    react_1["default"].createElement("p", { style: {
                            fontSize: "15px",
                            width: "auto",
                            marginBottom: "40px"
                        } }, "thousands of voters in the ecosystem!"),
                    react_1["default"].createElement("form", null,
                        react_1["default"].createElement(TextField_1["default"], { label: "First Name", variant: "outlined", name: "first_name", id: "outlined-error-helper-text", className: classes.firstfields, style: {
                                marginBottom: "30px",
                                width: "100%",
                                fontSize: "30px"
                            }, 
                            //fieldValue={state.first_name}
                            onChange: function (e) {
                                handleChange(e);
                            }, value: state.first_name }),
                        react_1["default"].createElement("br", null),
                        react_1["default"].createElement(TextField_1["default"], { label: "Last Name", name: "last_name", variant: "outlined", id: "outlined-error-helper-text", className: classes.firstfields, style: { marginBottom: "30px", width: "100%" }, 
                            //fieldValue={state.last_name}
                            value: state.last_name, onChange: function (e) {
                                handleChange(e);
                            } }),
                        react_1["default"].createElement("br", null),
                        react_1["default"].createElement(TextField_1["default"], { label: "Email", variant: "outlined", id: "outlined-error-helper-text", name: "email", className: classes.firstfields, style: { marginBottom: "20px", width: "100%" }, error: emailErrorMessage, value: state.email, onChange: function (e) {
                                handleChange(e);
                            } }),
                        react_1["default"].createElement("div", { style: { display: "flex" } },
                            react_1["default"].createElement("div", { style: { flexDirection: "column", marginTop: "2px" } },
                                react_1["default"].createElement("input", { type: "checkbox", name: "checkbox", onClick: function () { return setCheckBox(!checkBox); } })),
                            react_1["default"].createElement("div", { style: { flexDirection: "column", marginLeft: "8px" } },
                                react_1["default"].createElement("label", null,
                                    "By creating an account, you agree to the",
                                    " ",
                                    react_1["default"].createElement("span", null,
                                        " ",
                                        "privacy policy",
                                        " "),
                                    " ",
                                    "and our",
                                    " ",
                                    react_1["default"].createElement("span", null,
                                        "terms of use",
                                        " ")),
                                " ")),
                        react_1["default"].createElement(Button_1["default"], { className: classes.dialogueButton, type: "Submit", onClick: handleSubmit },
                            " ",
                            showLoader ? (react_1["default"].createElement(core_1.CircularProgress, { size: 18, style: { color: "white" } })) : (react_1["default"].createElement("h4", { style: { fontSize: "20px" } }, "Create account")))),
                    errorFlag ? (react_1["default"].createElement(Alert_1["default"], { severity: "error", className: style_module_scss_1["default"].Button, style: { fontSize: "15px" } },
                        react_1["default"].createElement("p", null, " Warning! All fields must be filled. "))) : alreadyExistError ? (react_1["default"].createElement(Alert_1["default"], { severity: "error", className: style_module_scss_1["default"].Button, style: { fontSize: "10px" } },
                        react_1["default"].createElement("p", null,
                            " ",
                            errorMessage,
                            " "))) : null,
                    react_1["default"].createElement("div", { style: { marginBottom: "30px", textAlign: "center" } },
                        react_1["default"].createElement("p", { style: { fontSize: "15px" } },
                            "Already have an account?",
                            " ",
                            react_1["default"].createElement("span", { className: style_module_scss_1["default"].loginText, onClick: function () { return setLoginRedirect(true); } }, "Log in"))))),
            react_1["default"].createElement(core_1.Grid, { item: true, sm: 6, xs: 12, md: 6, lg: 6, style: { display: "flex", alignItems: "center" }, 
                //className={style.gridTwo}
                className: style_module_scss_1["default"].carousel },
                react_1["default"].createElement("div", { className: style_module_scss_1["default"].carouselDiv },
                    react_1["default"].createElement(imageSlider_1["default"], null))))) : null;
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
        checkWeb3BeforeLogin: function () { return dispatch(layoutActions_2.checkWeb3BeforeLogin()); },
        logout: function () { return dispatch(authActions_2.logout()); }
    };
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Login);
