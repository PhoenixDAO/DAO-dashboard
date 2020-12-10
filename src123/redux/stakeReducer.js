const initState = {
  tokenList: [],
  token: {},
  isUnlock: true,
  phnxLimit: 5000,
  daysLimit: 30,
  initialRate: 0,
  interestRate: 0,
  unitRate: 0,
  initial: true,
  phnxAmount: "0",
  days: "0",
  minimumStake: 1,
};

const stakeReducer = (state = initState, action) => {
  switch (action.type) {
    case "getTokens":
      return {
        ...state,
        tokenList: action.payload,
        token: action.payload[0],
      };
    case "getUnlock":
      return {
        ...state,
        isUnlock: action.payload,
      };
    case "onPhnxLimit":
      return {
        ...state,
        phnxLimit: action.payload,
      };
    case "onDaysLimit":
      return {
        ...state,
        daysLimit: action.payload,
      };
    case "onInitialInterestRate":
      return {
        ...state,
        initialRate: action.payload,
      };
    case "onInterestRate":
      return {
        ...state,
        interestRate: action.payload,
      };
    case "onUnitInterestRate":
      return {
        ...state,
        unitRate: action.payload,
      };
    case "onInitial":
      return {
        ...state,
        initial: action.payload,
      };
    case "onPhnx":
      return {
        ...state,
        phnxAmount: action.payload,
      };
    case "onDays":
      return {
        ...state,
        days: action.payload,
      };
    case "onToken":
      return {
        ...state,
        token: action.payload,
      };
    case "minimumStake":
      return {
        ...state,
        minimumStake: action.payload,
      };
    default:
      return state;
  }
};

export default stakeReducer;
