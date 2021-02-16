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
import React, { useCallback, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../Layout";
import { Title } from "../Shared";
import Field from "Shared/Field";
import { default as MuiButton } from "@material-ui/core/Button";
import Button from "Shared/Button";
import routes from "routes";
import style from "./style.module.scss";
import { connect } from "react-redux";
import { checkWeb3 } from "../../../redux/layoutActions";
import axios from "axios";
import { loginWithMetaMask } from "redux/authActions";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { CircularProgress, Grid } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Alert from "@material-ui/lab/Alert";
import mobile from "assets/images/mobile.svg";
import numioLogo from "assets/images/numioLogo.svg";
import Login_with from "assets/images/Login_with.svg";
import LoginImage from "assets/images/Group 230.svg";
import welcomeBackImage from "assets/images/Welcome Back.svg";
import { checkWeb3BeforeLogin } from "redux/layoutActions";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Logo from "../../../assets/images/logo1.png";
import DaoDashborad from "../../../assets/images/Dao.jpg";
import { StylesContext } from "@material-ui/styles";
import { URL } from "../../../const";
import Carousel from "./imageSlider";
import ContractInit from "../../../config/contractsInit";
import { logout } from "../../../redux/authActions";

type message = {
  message: undefined | string;
  severity: "error" | "success" | "warning" | "info" | undefined;
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
        borderColor: "#EA8604",
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
      marginTop: "30rem",
    },
    root2: {
      "& .MuiSnackbarContent-root": {
        backgroundColor: "red",
        color: "white",
        fontSize: "10px",
      },
    },
    alert: {
      "& .MuiAlert-message": {
        fontSize: "12px",
        display: "flex",
        alignItem: "center",
      },
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
      marginBottom: "30px",
    },
    firstfields: {
      "& .MuiInputBase-root": {
        fontSize: "12px",
        width: "auto",
      },
      "& .MuiFormLabel-root": {
        fontSize: "12px",
      },
      "& .MuiFormHelperText-root": {
        fontSize: "10px",
      },

      [theme.breakpoints.down("xl")]: {
        width: "275px",
      },

      [theme.breakpoints.up("lg")]: {
        width: "274px",
      },
      [theme.breakpoints.down("lg")]: {
        width: "223px",
      },
      [theme.breakpoints.down("md")]: {
        width: "167px",
      },
      [theme.breakpoints.down("xs")]: {
        width: "165px",
      },
      [theme.breakpoints.up("xs")]: {
        width: "160px",
      },
    },
    image: {
      width: "100%",
      height: "100%",
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
    testing: {
      height: "100%",
      width: "100%",
    },
    main: {
      height: "100%",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      // justifyContent: "center",
      alignItems: "center",
    },
    carousel: {
      "& .Carousel-indicators-57": {
        color: "rgb(112 0 255)",
      },
    },

    // numioLogo: {
    //   width: "127px",
    //   height: "25px",
    //   marginLeft: "3px",
    // },
  })
);
const Login = (props: any) => {
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
  const classes = useStyles();
  const [logIn, setLogIn] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [alreadyExistError, setAlreadyExistError] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [loginRedirect, setLoginRedirect] = useState(false);
  const [metaMaskAddress, setMetaMaskAddress] = useState("");
  const [emailErrorMessage, setEmailErrorMessage]: any = useState<
    String | undefined
  >(undefined);

  const [state, setState] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });
  const handleForm = (e: any) => {
    e.preventDefault();
    handleSubmit();
  };
  const handleChange = (e: any) => {
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
    setState({ ...state, [e.target.name]: e.target.value });
    setErrorFlag(false);
  };

  const getContractInfo = async () => {
    let temp = await ContractInit.init();
    console.log("temp", temp.address);
    setMetaMaskAddress(temp.address);
    return temp;
  };

  const _window = window as any;

  const matchAddressWithAccount = async () => {
    let temp = await ContractInit.init();
    console.log(
      "address is",
      temp.address,
      " and numioAddress is ",
      props.user?.numioAddress
    );
    if (
      !temp.address ||
      (props.user &&
        temp.address.toLowerCase() != props.user.numioAddress.toLowerCase())
    ) {
      setLoginRedirect(true);
      //await props.logout();
    }
  };

  useEffect(() => {
    async function listenMMAccount() {
      if (typeof _window.ethereum !== "undefined") {
        _window.ethereum.on("accountsChanged", async function (accounts: any) {
          console.log("Xord", accounts);
          setLoginRedirect(true);
          //  await props.logout();
          if (!accounts[0]) {
            console.log("In if");
            setLoginRedirect(true);
            // await props.logout();
          } else if (
            props.user &&
            props.user.numioAddress.toLowerCase() != accounts[0].toLowerCase()
          ) {
            console.log("In else if");
            setLoginRedirect(true);
            //  await props.logout();
          }
        });
      }
    }
    matchAddressWithAccount();
    listenMMAccount();
  }, []);

  useEffect(() => {
    getContractInfo();
  });

  const loginWithMetaMask = async () => {
    console.log("MetaMask", metaMaskAddress);
    // let result = await ContractInit.init();
    // console.log("Xord", result.address);
    const value = await props.loginWithMetaMask({
      ...state,
      register: true,
      // Address: props.address,
      Address: metaMaskAddress,
    });
    if (value.data.result.alreadyRegistered) {
      setAlreadyExistError(true);
      setErrorMessage(value.data.result.alreadyRegistered);
    } else {
      if (
        value.data.result.user &&
        value.data.result.user.token &&
        !value.data.result.user.isAdmin
      ) {
        setLogIn("user");
      } else if (
        value.data.result.user &&
        value.data.result.user.token &&
        value.data.result.user.isAdmin
      ) {
        setLogIn("admin");
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setAlreadyExistError(false);
      console.log(state);
      if (!state.email || !state.first_name || !state.last_name || !checkBox) {
        setErrorFlag(true);
      } else {
        let emailValid = state.email.match(
          /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
        );

        if (emailValid == null) {
          setEmailErrorMessage("Email is not valid");
          return;
        }

        setErrorFlag(false);

        setShowLoader(true);
        await loginWithMetaMask();
        setShowLoader(false);
      }
    } catch (err) {
      console.log("In catch");
    }
  };

  return logIn === "user" ? (
    <Redirect to="/" />
  ) : logIn === "admin" ? (
    <Redirect to="/admin" />
  ) : loginRedirect ? (
    <Redirect to="/auth/log_in" />
  ) : // ) : props.address ? (
  metaMaskAddress ? (
    <Grid className={style.rootGrid} sm={12} xs={12} md={12} lg={12} container>
      <Grid
        item
        sm={6}
        xs={12}
        md={6}
        lg={6}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "white",
        }}
      >
        <div style={{ marginLeft: "10%", marginRight: "10%" }}>
          <div style={{ flexDirection: "column" }}>
            <div style={{ marginBottom: "50px" }}>
              <img src={Logo} style={{ height: "35px" }} />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <p
                style={{
                  fontSize: "30px",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Sign up.
              </p>
            </div>
          </div>
          <p
            style={{
              fontSize: "15px",
              width: "auto",
            }}
          >
            Register an account with Phoenix Dao and join
          </p>
          <p
            style={{
              fontSize: "15px",
              width: "auto",
              marginBottom: "40px",
            }}
          >
            thousands of voters in the ecosystem!
          </p>
          <form>
            <TextField
              label="First Name"
              variant="outlined"
              name="first_name"
              id="outlined-error-helper-text"
              className={classes.firstfields}
              style={{
                marginBottom: "30px",
                width: "100%",
                fontSize: "30px",
              }}
              //fieldValue={state.first_name}
              onChange={(e: any) => {
                handleChange(e);
              }}
              value={state.first_name}
            />
            <br />
            <TextField
              label="Last Name"
              name="last_name"
              variant="outlined"
              id="outlined-error-helper-text"
              className={classes.firstfields}
              style={{ marginBottom: "30px", width: "100%" }}
              //fieldValue={state.last_name}
              value={state.last_name}
              onChange={(e: any) => {
                handleChange(e);
              }}
            />
            <br />

            <TextField
              label="Email"
              variant="outlined"
              id="outlined-error-helper-text"
              name="email"
              className={classes.firstfields}
              style={{ marginBottom: "20px", width: "100%" }}
              error={emailErrorMessage}
              value={state.email}
              onChange={(e: any) => {
                handleChange(e);
              }}
            />
            <div style={{ display: "flex" }}>
              <div style={{ flexDirection: "column", marginTop: "2px" }}>
                <input
                  type="checkbox"
                  name="checkbox"
                  onClick={() => setCheckBox(!checkBox)}
                />
              </div>
              <div style={{ flexDirection: "column", marginLeft: "8px" }}>
                <label>
                  By creating an account, you agree to the{" "}
                  <span
                  // style={{
                  //   color: "#4C42FF",
                  //   textDecoration: "underline",
                  // }}
                  >
                    {" "}
                    privacy policy{" "}
                  </span>{" "}
                  and our{" "}
                  <span
                  // style={{
                  //   color: "#4C42FF",
                  //   textDecoration: "underline",
                  //   }}
                  >
                    terms of use{" "}
                  </span>
                </label>{" "}
              </div>
            </div>
            <Button
              className={classes.dialogueButton}
              type="Submit"
              onClick={handleSubmit}
            >
              {" "}
              {showLoader ? (
                <CircularProgress size={18} style={{ color: "white" }} />
              ) : (
                <h4 style={{ fontSize: "20px" }}>Create account</h4>
              )}
            </Button>
          </form>

          {errorFlag ? (
            <Alert
              severity="error"
              className={style.Button}
              style={{ fontSize: "15px" }}
            >
              <p> Warning! All fields must be filled. </p>
            </Alert>
          ) : alreadyExistError ? (
            <Alert
              severity="error"
              className={style.Button}
              style={{ fontSize: "10px" }}
            >
              <p> {errorMessage} </p>
            </Alert>
          ) : null}

          <div style={{ marginBottom: "30px", textAlign: "center" }}>
            <p style={{ fontSize: "15px" }}>
              Already have an account?{" "}
              <span
                className={style.loginText}
                onClick={() => setLoginRedirect(true)}
                // onClick={() => props.history.push("/log_in")}
              >
                Log in
              </span>
            </p>
          </div>
        </div>
      </Grid>
      <Grid
        item
        sm={6}
        xs={12}
        md={6}
        lg={6}
        style={{ display: "flex", alignItems: "center" }}
        //className={style.gridTwo}
        className={style.carousel}
        //  style={{ background: "white" }}
        // style={{ background: "white", paddingBottom: "30px" }}
      >
        <div className={style.carouselDiv}>
          <Carousel />
        </div>
      </Grid>
    </Grid>
  ) : null;
};

const mapStateToProps = (state: any) => ({
  user: state.userDetails.user,
  balance: state.dashboardReducer.balance,
  address: state.layoutReducer.address,
  // metamaskInstalled: state.layoutReducer.metamaskInstalled
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    checkWeb3: (param: boolean) => dispatch(checkWeb3(param)),
    loginWithMetaMask: (body: any) => dispatch(loginWithMetaMask(body)),
    checkWeb3BeforeLogin: () => dispatch(checkWeb3BeforeLogin()),
    logout: () => dispatch(logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
