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
import Logo from "../../../assets/images/logo.png";

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
      height: "42px",
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
    // numioLogo: {
    //   width: "127px",
    //   height: "25px",
    //   marginLeft: "3px",
    // },
  })
);
const Login = (props: any) => {
  const classes = useStyles();
  const [myLoading, setMyLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState<message>({
    message: undefined,
    severity: undefined,
  });
  const [error, setError] = useState(false);
  const [logIn, setLogIn] = useState("");
  const [redirect, setRedirect] = useState(false);
  // const thischeckWeb3 = useCallback(async () => {
  //   await props.checkWeb3(loginClicked);
  //   if (loginClicked && props.address) {
  //     const result = await LoginAPI();
  //   }
  // }, [loginClicked, props.address]);
  const openSnackbar = (
    message: string,
    severity: "error" | "success" | "warning" | "info" | undefined
  ) => {
    setErrorMessage({ message, severity });
    setError(true);
  };
  const checkAuth = async () => {
    openSnackbar("MetaMask connected successfully", "success");
    setTimeout(async () => {
      const result = await LoginAPI();
    }, 1000);
  };
  useEffect(() => {
    if (props.address && loginClicked) {
      checkAuth();
      // let temp = setInterval(thischeckWeb3, 5000);
      // return () => {
      //   clearInterval(temp);
      // };
    }
  }, [props.address, loginClicked]);

  const _window = window as any;

  useEffect(() => {
    // checkWeb3BeforeLogin();
    async function listenMMAccount() {
      if (typeof _window.ethereum !== "undefined") {
        console.log("in here");
        _window.ethereum.on("connect", async (accounts: any) => {
          //  logout();
          setDisable(true);
          setMyLoading(true);
          await props.checkWeb3BeforeLogin();
          setDisable(false);
          setMyLoading(false);
          console.log("fired connect");
          //  checkWeb3BeforeLogin();
        });
        _window.ethereum.on("accountsChanged", async (accounts: any) => {
          // await logout();
          console.log("fired accountsChanged");
          setDisable(true);
          setMyLoading(true);
          await props.checkWeb3BeforeLogin();
          setDisable(false);
          setMyLoading(false);
        });
        _window.ethereum.on("disconnect", async (accounts: any) => {
          //  logout();
          console.log("fired disconnect");
          setDisable(true);
          setMyLoading(true);
          await props.checkWeb3BeforeLogin();
          setDisable(false);
          setMyLoading(false);
          //  checkWeb3BeforeLogin();
        });
      }
    }

    listenMMAccount();
  }, []);
  const LoginAPI = async () => {
    try {
      setMyLoading(true);
      setDisable(true);
      const value = await props.loginWithMetaMask({ Address: props.address });
      if (value.data.result.notRegistered) {
        setRedirect(true);
        setMyLoading(false);
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
        setMyLoading(false);
      }
    } catch (e) {
      setMyLoading(false);
      setDisable(false);
      throw { message: "An Error Occured" };
    }
  };
  const loginWithMetaMask = async (e: any) => {
    e.preventDefault();
    try {
      let result = await props.checkWeb3(false);
      if (!props.address) {
        setLoginClicked(true);
      } else if (props.address) {
        setLoginClicked(false);
        await LoginAPI();
      }
    } catch (e) {
      openSnackbar(e.message, "error");
      // setErrorMessage({message:e.message , severity:"error"});
      // setError(true);
      setLoginClicked(false);
      setDisable(false);
      setMyLoading(false);
      // if (e.message === "Network Error") {
      //   setLoginClicked(false);
      //   setDisable(false);
      //   setMyLoading(false);
      // }
      openSnackbar(e.message, "error");
    }
  };

  return logIn === "user" ? (
    <Redirect to="/" />
  ) : logIn === "admin" ? (
    <Redirect to="/admin" />
  ) : redirect ? (
    <Redirect
      to={{
        pathname: "/auth/sign_up",
        state: { from: props.location },
      }}
    />
  ) : (
    <>
      <Snackbar
        className={classes.root2}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={error}
        autoHideDuration={2000}
        onClose={() => {
          setError(false);
          // setErrorMessage({ message: undefined, severity: undefined });
        }}
      >
        <Alert
          className={classes.alert}
          // onClose={() => {
          //   setError(false);
          //   setErrorMessage({ message: undefined, severity: undefined });
          // }}
          severity={errorMessage.severity}
        >
          {errorMessage.message}
        </Alert>
      </Snackbar>

      {/* <Layout
        className={style.layout}
        //  className={classes.testing}
      > */}
      {/* <Title>Welcome Back</Title>
        <h2 style={{ fontSize: "25px", color: "black" }}>Welcome Back</h2> */}
      <div
        // style={style.main}
        //className={style.main}
        style={{
          height: "100%",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container>
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
              //height: "100%",
              //  textAlign: "center",
            }}
          >
            <div style={{ marginLeft: "10%", marginRight: "10%" }}>
              <div style={{ flexDirection: "column" }}>
                <div style={{ marginBottom: "30px" }}>
                  <img
                    src={Logo}
                    style={{ height: "35px", marginTop: "30px" }}
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <p
                    style={{
                      fontSize: "30px",
                      color: "black",
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
              <h3
                style={{
                  fontSize: "15px",
                  width: "auto",
                  marginBottom: "40px",
                }}
              >
                thousands of voters in the ecosystem.
              </h3>
              <TextField
                label="First Name"
                variant="outlined"
                id="outlined-error-helper-text"
                className={classes.firstfields}
                style={{ marginBottom: "30px", width: "100%" }}
              />
              <br />
              <TextField
                label="Last Name"
                variant="outlined"
                id="outlined-error-helper-text"
                className={classes.firstfields}
                style={{ marginBottom: "30px", width: "100%" }}
              />
              <br />

              <TextField
                label="Email"
                variant="outlined"
                id="outlined-error-helper-text"
                className={classes.firstfields}
                style={{ marginBottom: "20px", width: "100%" }}
              />

              <div style={{ display: "flex" }}>
                <div style={{ flexDirection: "column", marginTop: "2px" }}>
                  <input type="checkbox" name="checkbox" />
                </div>
                <div style={{ flexDirection: "column", marginLeft: "8px" }}>
                  <label>
                    By creating an account, you agree to the{" "}
                    <span
                      style={{ color: "#4C42FF", textDecoration: "underline" }}
                    >
                      {" "}
                      privacy policy{" "}
                    </span>{" "}
                    and our{" "}
                    <span
                      style={{ color: "#4C42FF", textDecoration: "underline" }}
                    >
                      terms of use{" "}
                    </span>
                  </label>{" "}
                </div>
              </div>
              {/* <Checkbox
              // name="Hello"
              // value="checkedA"
              color="secondary"
              checked={true}
              size="medium"
              // inputProps={{
              //   "aria-label":
              //     "Checkbox A and this asojs askndoas sjlksmd oajdom",
              // }}
              // style={{
              //   fontSize: "20px",
              //   color: "blue",
              //   width: "10px",
              //   borderRadius: "red",
              // }}
            /> */}
              <Button className={classes.dialogueButton}>Create account</Button>
              <div style={{ marginBottom: "50px", textAlign: "center" }}>
                <p style={{ fontSize: "12px" }}>
                  Already have an account?{" "}
                  <span style={{ fontWeight: "bold", color: "#4C42FF" }}>
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
            style={{
              display: " flex",
              flexDirection: "column",
              //justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#4C42FF",
              borderRadius: "15px 0px 0px 15px",
            }}
          >
            <div
              style={{
                display: " flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <img src={welcomeBackImage} className={style.welcomeImage} /> */}

              <img
                src={Logo}
                style={{ height: "120px", width: "300px", marginTop: "160px" }}
              />
              <p
                style={{
                  fontSize: "12px",
                  color: " white",
                  marginTop: "50px",
                  //  fontWeight: 100,
                  // marginTop: "6%",
                  // display: "flex",
                  // flexDirection: "row",
                  // justifyContent: "center",
                }}
              >
                Community owns the vote!
              </p>
              <p
                style={{
                  color: "white",
                  textAlign: "center",
                  marginTop: "25px",
                  fontSize: "15px",
                }}
              >
                Be a part of the PhoenixDAO projects by voting with <br />{" "}
                thousands of passionate communities
              </p>
              <div className={style.buttons}>
                {/* <MuiButton
                  className={classes.root}
                  onClick={(e) => {
                    loginWithMetaMask(e);
                  }}
                  disabled={disable}
                  variant="outlined"
                  color="secondary"
                  style={{
                    width: "200px",
                    height: "40px",
                    background: "#FE9D2B",
                  }}
                >
                  {myLoading ? (
                    <CircularProgress size={12} color="inherit" />
                  ) : (
                    "MetaMask"
                  )}
                </MuiButton> */}
                {/* <Button
                  component={Link}
                  disable={disable}
                  to={routes.auth.logInWithNumio()}
                  className={style.button}
                  primary
                  outline
                  shadow
                  style={{
                    background: "#59B937",
                    color: "white",
                    width: "200px",
                    borderColor: "green",
                    marginTop: "8%",
                    height: "40px",
                  }}
                >
                  Numio
                </Button> */}
              </div>
            </div>
          </Grid>
          {/* <Title>Login</Title>
        <div className={style.text}>
          Scan the QR code with your Numio app to login
        </div>
        <div className={style.qr}>
          <QRCode value={values.qrURL} />
        </div> */}
        </Grid>
      </div>
      {/* </Layout> */}
    </>
  );
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
