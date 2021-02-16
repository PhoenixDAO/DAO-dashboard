const initState = {
  address: null,
  network: process.env.REACT_APP_NETWORK,
  stakeLoading: false,
  stakeTransactionMessage: { message: "", hash: "" },
  unStakeLoading: false,
  toastState: false,
  toastMessage: "",
  severity:"",
  metamaskInstalled:true
};

const LayoutReducer = (state = initState, action) => {
  switch (action.type) {
    case "checkWeb3":
      return {
        ...state,
        address: action.payload.address,
        network: action.payload.network,
        metamaskInstalled:action.payload.metamaskInstalled
      };
    case "onStakeLoad":
      return {
        ...state,
        stakeLoading: action.payload,
      };
    case "onStakeMessage":
      return {
        ...state,
        stakeTransactionMessage: action.payload,
      };
    case "onUnStakeLoad":
      return {
        ...state,
        unStakeLoading: action.payload,
      };
    case "onToastOpen":
      return {
        ...state,
        toastMessage: action.payload.message,
        toastState: action.payload.open,
        severity:action.payload.severity
      };
    case "onHandleToastClose":
      return {
        ...state,
        toastState: action.payload,
        severity:""
      };
      case "CLEAR_LAYOUT":
      // window.sessionStorage.clear();
      return {
        ...state,
        address: null,
        network: process.env.REACT_APP_NETWORK,
        stakeLoading: false,
        stakeTransactionMessage: { message: "", hash: "" },
        unStakeLoading: false,
        toastState: false,
        toastMessage: "",
        severity:""
      };
    default:
      return state;
  }
};

export default LayoutReducer;
