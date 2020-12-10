//import { SIGNIN_USER, SIGNUP_USER, CLEAR_USER } from './ActionTypes';
import {
  USER_LOGINWITHNUMIO,
  USER_LOGINWITHMETAMASK,
  USER_SIGNUPWITHMETAMASK,
  SIGNIN_USER,
  SIGNUP_USER,
  CLEAR_USER,
} from "./ActionTypes";

const initialState = {
  user: null,
  isloggedIn: false,
  token: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGINWITHNUMIO:
      return {
        ...state,
        user: action.payload,
        isloggedIn: true,
        error: null,
        token: action.payload.token,
      };
    case USER_LOGINWITHMETAMASK:
      return {
        ...state,
        user: action.payload,
        isloggedIn: true,
        error: null,
        token: action.payload.token,
      }; 
    case CLEAR_USER:
      window.sessionStorage.clear();
      return {
        ...state,
        user: null,
        isloggedIn: false,
        token: null,
        error: null,
      };
    default:
      return state;
  }
  //   case SIGNUP_USER:
  //     return {
  //       ...state,
  //       user: action.payload.result.userExist,
  //       token: action.payload.result.token,
  //       isloggedIn: true,
  //       error: null,
  //       role: false
  //     };
  //   case SIGNIN_USER:
  //     return {
  //       ...state,
  //       user: action.payload.result.userExist,
  //       role: action.payload.result.isAdmin,
  //       token: action.payload.result.token,
  //       isloggedIn: true
  //     };
}
