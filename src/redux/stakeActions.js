import ContractInit from "../config/contractsInit";
import {
  onSetStakeLoading,
  onSetTransactionMessage,
  onToast,
} from "./layoutActions";
import Web3 from "web3";
import { PHNX_STAKING_ADDRESS } from "../Contracts/phnxStaking";
import { getBalance } from "./dashboardActions";

export const onGetIsUnlock = (address) => {
  return async (dispatch) => {
    try {
      if (address) {
        const res = await (await ContractInit.initPhnxTokenContract()).methods
          .allowance(address, PHNX_STAKING_ADDRESS)
          .call();
        dispatch({
          type: "getUnlock",
          payload: !!(res != 0),
        });
      }
    } catch (e) {
      console.error("ERROR onGetIsUnlock => ", e);
    }
  };
};

export const onGetPhnxLimit = () => {
  return async (dispatch) => {
    try {
      const phnxStakingContract = await ContractInit.initPhnxStakingContract();
      const { web3js } = await ContractInit.init();
      const res = await phnxStakingContract.methods.maxStakedQuantity().call();
      const phnx = await web3js.utils.fromWei(res.toString());
      dispatch({
        type: "onPhnxLimit",
        payload: phnx,
      });
    } catch (e) {
      console.error("ERROR onGetPhnxLimit => ", e);
    }
  };
};

export const onGetDaysLimit = () => {
  return async (dispatch) => {
    try {
      const res = await (await ContractInit.initPhnxStakingContract()).methods
        .stakeDays()
        .call();
      dispatch({
        type: "onDaysLimit",
        payload: res,
      });
    } catch (e) {
    }
  };
};

export const onGetInterestRate = (amountPhnxInput, durationDaysInput) => {
  return async (dispatch, getState) => {
    try {
      console.log("amountPhnxInput", amountPhnxInput);
      console.log("durationDaysInput", durationDaysInput);
      console.log("get State -->", getState().stakeReducer);
      const res = await (await ContractInit.initPhnxStakingContract()).methods
        .ratio()
        .call();
      const interestRate = Web3.utils.fromWei(res);
      console.log("changing interest rate", interestRate);
      if (!getState().stakeReducer.initialRate) {
        dispatch({
          type: "onInitialInterestRate",
          payload: interestRate,
        });
      }
      dispatch({
        type: "onInterestRate",
        payload: interestRate,
      });
    } catch (e) {
    }
  };
};

export const onApprove = (isUnlock, address) => {
  return async (dispatch) => {
    try {
      if (!address) {
        dispatch(onToast("PLEASE CONNECT TO METAMASK TO CONTINUE", "error"));
        return;
      }
      if (isUnlock) {
        dispatch(
          onToast("PHNX Approved, you can start staking now.", "success")
        );
        return;
      }
      if (address) {
        dispatch(
          onSetTransactionMessage({
            message: "PLEASE CONFIRM PERMISSION TO START STAKING.",
            severity: "error",
            hash: "",
          })
        );
        dispatch(onSetStakeLoading(true));

        const _approve = await (
          await ContractInit.initPhnxTokenContract()
        ).methods
          .approve(
            PHNX_STAKING_ADDRESS,
            "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
          )
          .send({
            from: address,
          });
        dispatch(onGetIsUnlock(address));
        dispatch(
          onToast(
            "You have successfully approved PHNX and can now begin staking.",
            "success"
          )
        );
        dispatch(onSetStakeLoading(false));
      } else {
        dispatch(onToast("PLEASE CONNECT TO METAMASK WALLET", "error"));
      }
    } catch (e) {
      console.error("ERROR onApprove => ", e);

      dispatch(onSetStakeLoading(false));
      dispatch(onToast("Oops, something went wrong please try again", "error"));
    }
  };
};

export const onSubmitProposal = (
  reward,
  timeInSeconds,
  collateral,
  milestone,
  id,
  userAddress
) => {
  return async (dispatch) => {
    try {
      const onSubmit = await (
        await ContractInit.phoenixProposalContract()
      ).methods
        .submitProposal(
          Web3.utils.toWei(reward),
          timeInSeconds,
          Web3.utils.toWei(collateral),
          milestone.length,
          id
        )
        .send({
          from: userAddress,
        })
        
        .catch((err) => {
          if (err.code == 4001) {
            dispatch(onToast("request rejected by user", err.code));
          }
        });
      dispatch(onToast("You have successfully send .", "success"));
    } catch (e) {
      dispatch(onToast("Oops, something went wrong please try again", "error"));
    }
  };
};

export const onSetInterestRate = (interest) => {
  return {
    type: "onInterestRate",
    payload: interest,
  };
};

export const onSetInitial = () => {
  return {
    type: "onInitial",
    payload: true,
  };
};

export const onSetPhnx = (phnx) => {
  return {
    type: "onPhnx",
    payload: phnx,
  };
};

export const onSetDays = (days) => {
  return {
    type: "onDays",
    payload: days,
  };
};

export const onSetToken = (token) => {
  return {
    type: "onToken",
    payload: token,
  };
};

export const onConfirmStake = (
  address,
  balance,
  stakeAmount,
  interestRate,
  stakeDuration,
  isUnlock,
  minimumStake
) => {
 
  return async (dispatch) => {
    try {
      const { web3js } = await ContractInit.init();
      if (address) {
        if (!isUnlock) {
          dispatch(onToast("Approve PHNX First.", "error"));
          return false;
        }
        if (Number(balance) < Number(stakeAmount)) {
          dispatch(
            onToast(
              "You have insuffient amount of PHNX to make this transaction.",
              "error"
            )
          );
          return false;
        }
        if (Number(stakeAmount) < Number(minimumStake)) {
          dispatch(
            onToast(`You can stake minimum ${minimumStake} PHNX`, "error")
          );
          return false;
        }
        if (Number(stakeDuration) <= 0) {
          dispatch(onToast(`You can stake for minimum of 1 day.`, "error"));
          return false;
        }
        dispatch(onSetStakeLoading(true));
        dispatch(
          onSetTransactionMessage({
            message: "PLEASE CONFIRM STAKE TRANSACTION IN YOUR WALLET",
            severity: "error",
            hash: "",
          })
        );
      
        const res = await (await ContractInit.initPhnxStakingContract()).methods
          .stakeALT(Web3.utils.toWei(stakeAmount), stakeDuration)
          .send({
            from: address,
          })
          .catch((err) => {
            if (err.code == 4001) {
              dispatch(onToast("request rejected by user", err.code));
            }
          });
        dispatch(getBalance(address));
        dispatch(onSetPhnx(0));
        dispatch(onSetDays(0));
        dispatch(onSetInterestRate(0));
        dispatch(onSetStakeLoading(false));
        dispatch(
          onToast(
            `You have successfully staked ${stakeAmount} PHNX and can unlock these tokens after ${stakeDuration} days.`,
            "success"
          )
        );
       
        return {
          status: true,
          TxHash: res.transactionHash,
          reward: Web3.utils.fromWei(
            res.events.StakeCompleted.returnValues.rewardAmount
          ),
        };
      }
    } catch (e) {
      console.error("ERROR onConfirmStake => ", e);
      dispatch(onToast("Oops, something went wrong please try again", "error"));
      dispatch(onSetStakeLoading(false));
      return { status: false };
    }
  };
};
