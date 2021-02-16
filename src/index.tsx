import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "Router";
import { Container } from "@material-ui/core";
import { store } from "redux/configureStore";

const appPassword = prompt("App password");
console.log("========>", appPassword);

if (appPassword == process.env.REACT_APP_PASSWORD) {
  ReactDOM.render(
    <React.StrictMode>
      {/* <Container maxWidth='xl'> */}
      <Router store={store} />
      {/* </Container> */}
    </React.StrictMode>,
    document.getElementById("root")
  );
} else {
  console.log("Wrong password");
}
