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
import Logo from "../../../assets/images/logo1.png";
import { checkWeb3BeforeLogin } from "redux/layoutActions";
import Carousel from "./imageSlider";
import ContractInit from "../../../config/contractsInit";
import cn from "classnames";

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
  const [metaMaskAddress, setMetaMaskAddress] = useState(false);
  const [signUpRedirect, setSignUpRedirect] = useState(false);
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

  const getContractInfo = async () => {
    let temp = await ContractInit.init();
    console.log("temp", temp);
    setMetaMaskAddress(temp.address);
  };

  useEffect(() => {
    getContractInfo();
  });
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
        console.log("In if 1");
        setRedirect(true);
        setMyLoading(false);
      } else {
        if (
          value.data.result.user &&
          value.data.result.user.token &&
          !value.data.result.user.isAdmin
        ) {
          console.log("In if 2");
          setLogIn("user");
        } else if (
          value.data.result.user &&
          value.data.result.user.token &&
          value.data.result.user.isAdmin
        ) {
          console.log("In else");
          setLogIn("admin");
        }
        setMyLoading(false);
      }
    } catch (e) {
      console.log("Error -----", e);
      setMyLoading(false);
      setDisable(false);
      throw { message: "An Error Occured" };
    }
  };
  const loginWithMetaMask = async () => {
    // e.preventDefault();
    console.log("Working");
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
      setLoginClicked(false);
      setDisable(false);
      setMyLoading(false);
      openSnackbar(e.message, "error");
    }
  };
  return logIn === "user" ? (
    <Redirect to="/" />
  ) : logIn === "admin" ? (
    <Redirect to="/admin" />
  ) : signUpRedirect ? (
    <Redirect to="/auth/sign_up" />
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
        }}
      >
        <Alert className={classes.alert} severity={errorMessage.severity}>
          {errorMessage.message}
        </Alert>
      </Snackbar>

      <div className={style.main}>
        <Grid container sm={12}>
          <Grid item sm={12} xs={12} md={12} lg={12}>
            <img src={Logo} className={style.firstImage} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={6} className={style.logo}>
            <div className={style.signinDiv}>
              <div>
                <p
                  style={{
                    fontSize: "28px",
                    color: "black",
                    fontWeight: "bold",
                    paddingTop: "20px",
                  }}
                  className={style.txt}
                >
                  Welcome back!
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    paddingTop: "10px",
                  }}
                  className={style.txt1}
                >
                  Let's get those votes counting.
                </p>
              </div>
              <div className={style.buttonsDiv}>
                <Button
                  style={{
                    fontSize: "17px",
                    fontFamily: "sans-serif",
                  }}
                  className={cn(classes.root, style.loginWithMetaMask)}
                  onClick={loginWithMetaMask}
                  disabled={disable}
                  variant="outlined"
                  // style={{
                  //   height: "50px",
                  //   width: "80%",
                  //   background: "#4C42FF",
                  //   borderRadius: "8px",
                  //   borderColor: "#4C42FF",
                  //   marginTop: "80px",
                  // }}
                >
                  {myLoading ? (
                    // <CircularProgress size={12} color="inherit" />
                    <CircularProgress size={14} style={{ color: "white" }} />
                  ) : (
                    "Login with MetaMask"
                  )}
                </Button>

                <Button
                  component={Link}
                  disable={disable}
                  to={routes.auth.logInWithNumio()}
                  // onClick={() => openSnackbar("Coming Soon", "info")}
                  className={style.button}
                  primary
                  outline
                  shadow
                  style={{
                    background: "#258C01",
                    color: "white",
                    borderColor: "green",
                    marginTop: "30px",
                    height: "50px",
                    width: "80%",
                    borderRadius: "7px",
                    fontSize: "17px",
                    fontFamily: "sans-serif",
                  }}
                >
                  Login with Numio
                </Button>
              </div>
              <div
                style={{
                  marginTop: "55px",
                  // width: "350px",
                  width: "75%",
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: "16px", color: "grey" }}>
                  Don't have an account?{" "}
                  <span
                    className={style.signUpText}
                    onClick={() =>
                      metaMaskAddress
                        ? setSignUpRedirect(true)
                        : openSnackbar("Metamask not connected", "error")
                    }
                    style={{ fontWeight: "bold" }}
                  >
                    Sign up
                  </span>
                </p>
                {/* <p
                  style={{
                    fontWeight: "bold",
                    color: "#4C42FF",
                    marginTop: "15px",
                    fontSize: "15px",
                  }}
                >
                  Forgot password
                </p> */}
              </div>
            </div>
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
            md={6}
            lg={6}
            style={{ background: "white", paddingBottom: "30px" }}
          >
            <div
              style={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                background: "white",
                margin: "20px",
              }}
            >
              <Carousel />
            </div>
          </Grid>
        </Grid>
      </div>
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
