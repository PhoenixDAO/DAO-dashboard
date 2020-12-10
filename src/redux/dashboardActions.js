import ContractInits from "../config/contractsInit";

export const getBalance = (address) => {
  return async (dispatch) => {
    try {
      const { web3js } = await ContractInits.init();
      let res = await (await ContractInits.initPhnxTokenContract()).methods
        .balanceOf(address)
        .call();
      res = await web3js.utils.fromWei(res.toString());
      
      dispatch({ type: "getBalance", payload: res });
    } catch (e) {
    }
  };
};

export const getCompletedStake = () => {};

export const onGetInterestRate = () => {
  return async (dispatch) => {
    try {
      let res = await (await ContractInits.initPhnxStakingContract()).methods
        .ratio()
        .call();
      res = await (await ContractInits.init()).web3js.utils.fromWei(
        res.toString()
      );
      res = Math.ceil(res * 365 * 100);
      dispatch({
        type: "getInterest",
        payload: res,
      });
    } catch (e) {
      console.error("ERROR onGetInterestRate => ", e);
    }
  };
};
