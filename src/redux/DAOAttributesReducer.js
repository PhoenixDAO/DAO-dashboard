//import { SIGNIN_USER, SIGNUP_USER, CLEAR_USER } from './ActionTypes';
import {
    UPDATE_DAOATTRIBUTES
  } from "./ActionTypes";

const initialState = {
  DAOAttributes: { minimumUpvotes: 0, monthlyBudget: 0, maxUpvoteDays: 0 },
  rerender:false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "updateDAOAttributes":
      return {
        ...state,
        DAOAttributes: {  
          minimumUpvotes: action.payload.res.minimumUpvotes,
          monthlyBudget: action.payload.res.monthlyBudget,
          maxUpvoteDays: action.payload.res.maxUpvoteDays,
        },
        rerender:action.payload.res.rerender
      };
      case "getDAOAttributes":
        return {
          ...state,
          DAOAttributes: {
            minimumUpvotes: action.payload.res.minimumUpvotes,
            monthlyBudget: action.payload.res.monthlyBudget,
            maxUpvoteDays: action.payload.res.maxUpvoteDays,
          },
          rerender:action.payload.res.rerender
        };
    default:
      return state;
  }
}
