//import { SIGNIN_USER, SIGNUP_USER, CLEAR_USER, GET_ERRORS, CLEAR_ERRORS, GET_EMAIL_ERRORS, GET_PASSWORD_ERRORS } from './ActionTypes';
import {
  GET_LOGINWITHNUMIO_ERROR,
  USER_LOGINWITHNUMIO,
  USER_LOGINWITHMETAMASK,
  USER_SIGNUPWITHMETAMASK,
  CLEAR_USER,
} from "./ActionTypes";
import axios from "axios";
import { logout2 } from "./layoutActions";

import { URL, NumioAuth, MetaMaskLogin } from "../const";

import Numio from "numio-cdn";
// import { tokenConfig } from './authActions';
//import { returnErrors } from './errorActions';

// export const register = (userData) => (dispatch) => {

//   const newUser = JSON.stringify(userData);

//   return fetch(`http://localhost:3001/auth/signup`, {
//         method: "POST",
//         body: newUser,
//         headers : {"Content-Type": "application/json"}
//     })
//   .then(response => response.json())
//     .then(user => {
//       if(user.result.usererror){
//         dispatch({
//           type: GET_ERRORS,
//           payload: user.result.usererror})}
//       else {
//         dispatch({
//           type: SIGNUP_USER,
//           payload: user
//         })
//         dispatch({
//           type: CLEAR_ERRORS})
//       }
//    }
//     )
// };

export const loginWithNumio = (body) => async (dispatch) => {
 
  let res = await axios.post(`${URL}${NumioAuth}`, body);
  
  if (res.data.responseCode != 200) {
    await dispatch({
      type: GET_LOGINWITHNUMIO_ERROR,
      payload: res.data.result.message,
    });
  }
  if (res.data.responseCode == 200) {
  
    await dispatch({
      type: USER_LOGINWITHNUMIO,
      payload: res.data.result,
    });
  }
  return res.data.result;
};

export const loginWithMetaMask = (body) => async (dispatch) => {

  let res = await axios.post(`${URL}${MetaMaskLogin}`, body);

  if (res.data.responseCode == 200) {
 
    if (res.data.result.signInSuccess) {
      await dispatch({
        type: USER_LOGINWITHNUMIO,
        payload: res.data.result.user,
      });
    }
  }
  return res;
};
// export const signin = (email, password) => (dispatch) => {

//   const user= {email, password}

//   return  fetch(`http://localhost:3001/auth/login`, {
//         method: "POST",
//         body: JSON.stringify(user),
//         headers : {"Content-Type": "application/json"}
//     })
//   .then(response => response.json())
//   .then(user => {
//     if(user.result.emailerror){
//       dispatch({
//         type: GET_EMAIL_ERRORS,
//         payload: user.result.emailerror})}
//     else if(user.result.passworderror){
//       dispatch({
//         type: GET_PASSWORD_ERRORS,
//         payload: user.result.passworderror})
//     }
//     else {
//       dispatch({
//         type: SIGNIN_USER,
//         payload: user
//       })
//     }
//    }
//     )
// };

export const logout = () => async (dispatch) => {

  dispatch({
    type: CLEAR_USER,
  });
};
