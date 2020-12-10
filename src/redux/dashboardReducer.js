const initState = {
  balance: 0,
  stakedPhnx: 0,
  activePortal: [],
  interest: 0,
  interestList: [],
  loading: true,
};

const dashboardReducer = (state = initState, action) => {
  switch (action.type) {
    case "getBalance":
      return {
        ...state,
        balance: action.payload,
      };
    case "stakerData":
      return {
        ...state,
        stakedPhnx: action.payload.stakedPhnx,
        activePortal: action.payload.activePortal,
        loading: false,
      };
    case "getInterest":
      return {
        ...state,
        interest: action.payload,
      };
    case "interestList":
      return {
        ...state,
        interestList: action.payload,
      };
    case "setLoading":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
