import Web3 from "web3";
import { PHNX_STAKING_ABI, PHNX_STAKING_ADDRESS } from "./phnxStaking";

let web3js = "";
let contract = "";
let accounts = "";
let address = "";
let network = "";
let ethereum = window.ethereum;

export const phnxTokenAddress = "0xfe1b6ABc39E46cEc54d275efB4b29B33be176c2A";

export const init = () => {
  if (ethereum) {
    checkWeb3();
  }
};

export const checkWeb3 = async () => {
  // Use Mist/MetaMask's provider.
  web3js = new Web3(window.web3.currentProvider);
  //get selected account on metamask
  accounts = await web3js.eth.getAccounts();
  address = accounts[0];
  //get network which metamask is connected too
  network = await web3js.eth.net.getNetworkType();
};

export const onConnect = async () => {
  await ethereum.enable();
  if (!ethereum || !ethereum.isMetaMask) {
    // throw new Error('Please install MetaMask.')
    alert(`METAMASK NOT INSTALLED!!`);
  } else {
    checkWeb3();
  }
};

export const getPhnxBalance = () => {
  const balance = contract.method.balanceOf(accounts[0]);
  return balance;
};

export const getAddress = () => {
  return accounts[0];
};

export const initPhnxContract = () => {
  contract = new web3js.eth.Contract(PHNX_STAKING_ABI, PHNX_STAKING_ADDRESS);
};
