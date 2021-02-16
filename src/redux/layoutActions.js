import ContractInits from "../config/contractsInit";

export const checkWeb3 = (loginClicked) => {
  return async (dispatch) => {
    dispatch({
      type: "checkWeb3",
      payload: await ContractInits.init(loginClicked),
    });
  };
};
export const checkWeb3BeforeLogin = () => {
  return async (dispatch) => {
    dispatch({
      type: "checkWeb3",
      payload: await ContractInits.init2(),
    });
  };
};

export const onSetStakeLoading = (load) => {
  return {
    type: "onStakeLoad",
    payload: load,
  };
};

export const onSetTransactionMessage = (message,severity) => {
  return {
    type: "onStakeMessage",
    payload: {message,severity},
  };
};

export const onSetUnStakeLoading = (load) => {
  return {
    type: "onUnStakeLoad",
    payload: load,
  };
};

export const onToast = (message,severity) => {
  return {
    type: "onToastOpen",
    payload: { message, open: true ,severity},
  };
};

export const handleToastClose = () => {
  return {
    type: "onHandleToastClose",
    payload: false,
  };
};
export const logout2 = () => (dispatch) => {

  dispatch({
    type: "CLEAR_LAYOUT",
  });
};
