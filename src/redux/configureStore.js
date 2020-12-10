import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
// import errorReducer from './errorReducer';
import authReducer from "./authReducer";
import stakeReducer from "./stakeReducer"
import layoutReducer from './layoutReducer';
import dashboardReducer from './dashboardReducer'
import DAOAttributesReducer from './DAOAttributesReducer'
import {compose} from 'redux';
// import productReducer from "./productReducer";
// import mouseReducer from "./mouseReducer";
// import mousepadReducer from "./mousepadReducer";
// import keyboardReducer from "./keyboardReducer";
// Session Storage is used to persist Store in Redux
function saveToLocalStorage(state) {
  try {
  
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("state", serializedState);
  } catch (e) {
  }
}
function loadFromLocalSotrage() {
  try {
    const serializedState = sessionStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
  }
}
const persistedState = loadFromLocalSotrage();
export const store = createStore(
  combineReducers({
    userDetails: authReducer,
    layoutReducer,
    stakeReducer,
    dashboardReducer,
    DAOAttributesReducer
    // error: errorReducer,
    // product: productReducer,
    // mouse: mouseReducer,
    // keyboard: keyboardReducer,
    // mousepad: mousepadReducer,
  }), 
  persistedState,
  compose(
    applyMiddleware(thunk,logger),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
);
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});
export default store;
