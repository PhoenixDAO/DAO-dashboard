import React, { useState } from "react";
import Layout from "../Layout";
import { Title } from "../Shared";
import Field from "Shared/Field";
import Button from "Shared/Button";
import { Link, Redirect } from "react-router-dom";
import routes from "routes";
import style from "./style.module.scss";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { loginWithMetaMask } from "redux/authActions";

const ThanksPage = () => (
  <Layout className={style.thanksPage}>
    <Title>Thank you for creating an account and joining the DAO!</Title>
    <div className={style.verifyText}>
      Please verify your email to complete registration to login.
    </div>
    <div className={style.buttons}>
      <Button
        component={Link}
        to={routes.root()}
        className={style.button}
        primary
        shadow
      >
        Log in
      </Button>
    </div>
  </Layout>
);

const SignUp = (props: any) => {
  const [logIn, setLogIn] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [alreadyExistError, setAlreadyExistError] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage]: any = useState<
    String | undefined
  >(undefined);

  const [state, setState] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (e: any) => {
    setEmailErrorMessage(undefined);
    setState({ ...state, [e.target.name]: e.target.value });
    setErrorFlag(false);
  };

  const loginWithMetaMask = async () => {
    const value = await props.loginWithMetaMask({
      ...state,
      register: true,
      Address: props.address,
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

      if (!state.email || !state.first_name || !state.last_name) {
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
    } catch (err) {}
  };

  return logIn === "user" ? (
    <Redirect to="/" />
  ) : logIn === "admin" ? (
    <Redirect to="/admin" />
  ) : props.address ? (
    <>
      <Layout>
        <Title>Register</Title>
        <Field
          label="First Name"
          type="text"
          name="first_name"
          fieldValue={state.first_name}
          onChange={(e: any) => {
            handleChange(e);
          }}
        />
        <Field
          label="Last Name"
          type="text"
          name="last_name"
          fieldValue={state.last_name}
          onChange={(e: any) => {
            handleChange(e);
          }}
        />
        <Field
          label="Email"
          type="email"
          name="email"
          fieldValue={state.email}
          error={emailErrorMessage}
          onChange={(e: any) => {
            handleChange(e);
          }}
        />
        {errorFlag ? (
          <Alert
            severity="error"
            className={style.Button}
            style={{ fontSize: "10px" }}
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

        <div className={style.buttons}>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            className={style.button}
            primary
            shadow
          >
            {" "}
            {showLoader ? <CircularProgress size={12} /> : <p>Register</p>}
          </Button>
        </div>
      </Layout>
    </>
  ) : (
    <Redirect
      to={{
        pathname: "/auth/log_in",
        state: { from: props.location },
      }}
    />
  );
};
const mapStateToProps = (state: any) => ({
  address: state.layoutReducer.address,
});

export default connect(mapStateToProps, { loginWithMetaMask })(SignUp);
