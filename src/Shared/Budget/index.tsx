import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";
import { URL, Admin } from "../../const";
import {
  getDAOAttributes,
  updateDAOAttributes,
} from "../../redux/DAOAttributesActions";

/** Components */
import Button from "Shared/Button";
import Field from "Shared/Field";

import style from "./style.module.scss";
import { AnySoaRecord } from "dns";

const Budget = (props: any) => {
  const [DAOAttributes, setDAOAttributes] = useState<any>(props.DAOAttributes);
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState(["", "", ""]);
  const monthNames = [
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
  let date = new Date();

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

  const getDAOAttributes = async () => {
    try {
      console.log("props.token is", props.token);
      await props.getDAOAttributes(props.token);

      console.log("DAO ATTRIBUTES in budget---> ", props.DAOAttributes);
      setDAOAttributes(props.DAOAttributes);
    } catch (err) {
      console.log("error", err);
    }
  };

  const updateDAOAttributes = async () => {
    console.log("Props", props.DAOAttributes);
    console.log("User", DAOAttributes);
    try {
      if (!verifyValue()) {
        return;
      }
      let compareValues = props.DAOAttributes == DAOAttributes ? true : false;
      console.log("Compare values", compareValues);
      if (
        JSON.stringify(props.DAOAttributes) == JSON.stringify(DAOAttributes)
      ) {
        props.openSnackbar("Please update the values", "info");
        return;
      }
      setShowLoader(true);
      let _id =
        props.user && props.user._id
          ? props.user._id
          : "5f32adb31fa04b0e0f4e3298";
      console.log("id isss", _id);
      await props.updateDAOAttributes(props.token, _id, DAOAttributes);

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
    } catch (err) {
      props.openSnackbar("Oops! something went wrong.", "error");
      console.log(err);
    }
  };

  useEffect(() => {
    getDAOAttributes();
  }, [props.token]);

  useEffect(() => {
    setDAOAttributes(props.DAOAttributes);
  }, [props.DAOAttributes]);

  const verifyValue = () => {
    let err = false;
    let err0 = "",
      err1 = "",
      err2 = "";
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

  const restrictMinus = (e: any, value: any) => {
    console.log("Name", value);
    //  console.log("Name state", state);
    //  console.log("qwert e.which", e.which);
    let inputKeyCode = e.which;
    //   console.log("qwert key", e.key);
    const allowedKeyCodes = [46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
    // const temp: any = state;
    if (inputKeyCode == 46 && value.split(".").length > 1) {
      return null;
      //  e.preventDefault();
    }
    if (!allowedKeyCodes.includes(inputKeyCode)) {
      return null;
      // e.preventDefault();
    }
  };

  const formatInput = (e: any) => {
    let inputKeyCode = e.which;
    const allowedKeyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
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
  const setMinimumUpvotes = (value: any) => {
    if (
      (value <= 0 && value != "") ||
      value.toString().length > 3 ||
      value == "-"
    )
      return;
    let err1 = error[1];
    let err2 = error[2];
    setError(["", err1, err2]);
    console.log("Value", value);
    console.log("Value int", parseInt(value));
    setDAOAttributes({ ...DAOAttributes, minimumUpvotes: parseInt(value) });
  };
  const setMaxUpvoteDays = (value: any) => {
    if (
      (value <= 0 && value != "") ||
      value.toString().length > 3 ||
      value == "-"
    )
      return;
    let err0 = error[0];
    let err2 = error[2];
    setError([err0, "", err2]);
    setDAOAttributes({ ...DAOAttributes, maxUpvoteDays: parseInt(value) });
  };
  const setMonthlyBudget = (value: any) => {
    if (
      (value <= 0 && value != "") ||
      value.toString().length > 6 ||
      value == "-"
    )
      return;
    let err0 = error[0];
    let err1 = error[1];
    setError([err0, err1, ""]);
    setDAOAttributes({ ...DAOAttributes, monthlyBudget: parseInt(value) });
  };

  return (
    <div className={style.budget}>
      <div className={style.inputs}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4} lg={4} md={4} xl={4} alignItems="flex-end">
            <Field
              label="Minimum Upvotes"
              type="number"
              fieldValue2={DAOAttributes?.minimumUpvotes}
              onChange={setMinimumUpvotes}
              error={error[0]}
              tooltipMessage="Minimum upvotes required to pass upvoting stage"
              onKeyPress={formatInput}
            />
          </Grid>
          <Grid item xs={12} sm={4} lg={4} md={4} xl={4} alignItems="flex-end">
            <Field
              label="Max Upvote Days"
              type="number"
              onKeyPress={formatInput}
              fieldValue2={DAOAttributes?.maxUpvoteDays}
              onChange={setMaxUpvoteDays}
              error={error[1]}
              tooltipMessage="Maximum days for passing upvote stage"
            />
          </Grid>
          <Grid item xs={12} sm={4} lg={4} md={4} xl={4} alignItems="flex-end">
            <Field
              onKeyPress={formatInput}
              label={`Set Budget ${
                monthNames[date.getMonth()]
              } ${date.getFullYear()}`}
              type="number"
              fieldValue2={DAOAttributes?.monthlyBudget}
              onChange={setMonthlyBudget}
              error={error[2]}
              tooltipMessage="DAO contract balance"
            />
          </Grid>
        </Grid>
      </div>

      <Button
        primary
        className={style.updatebutton}
        onClick={updateDAOAttributes}
      >
        {showLoader ? (
          <CircularProgress size="30rem" color="inherit" />
        ) : (
          "Update"
        )}
      </Button>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  token: state.userDetails.token,
  user: state.userDetails.user,
  DAOAttributes: state.DAOAttributesReducer.DAOAttributes,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDAOAttributes: (body: any) => dispatch(getDAOAttributes(body)),
    updateDAOAttributes: (body: any, _id: any, DAOAttributes: any) =>
      dispatch(updateDAOAttributes(body, _id, DAOAttributes)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
