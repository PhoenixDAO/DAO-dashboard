var axios=require('axios');
var Web3 = require("web3");
const BigNumber = require("bignumber.js");
const { Constants } = require("./constants");
const OPTIONS = {
  // defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5,
};
let web3 = new Web3(Constants.infuraKey, null, OPTIONS);
let contract = new web3.eth.Contract(
  Constants.contractAbi,
  Constants.contractAddress
);

export const submitPropsosal = async (
  fromAccount,
  collateralAmount,
  fundRequested,
  numberOfMilestones,
  endTimeStamp
) => {
  try {
    let gasprice = await exports.getCurrentGasPrices();
    gasprice = gasprice.high;
    const transactionParameters = {
      nonce: "0x00", // ignored by MetaMask
      gasPrice: "", // customizable by user during MetaMask confirmation.
      gas: "0xf4240", // customizable by user during MetaMask confirmation.
      to: contract, // Required except during contract publications.
      from: fromAccount, // must match user's active address.
      value: "0x00", // Only required to send ether to the recipient from the initiating external account.
      data: contract.methods
        .submitProposal(
          collateralAmount,
          fundRequested,
          numberOfMilestones,
          endTimeStamp
        )
        .encodeABI(), // Optional, but used for defining smart contract creation and interaction.
      chainId: 4, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };
  } catch (error) {
    
  }
};

export const withDrawCollateral = async (fromAccount, proposalId) => {
  try {
    let gasprice = await exports.getCurrentGasPrices();
    gasprice = gasprice.high;
    const transactionParameters = {
      nonce: "0x00", // ignored by MetaMask
      gasPrice: (gasprice * 1000000000).toString(16), // customizable by user during MetaMask confirmation.
      gas: "0xf4240", // customizable by user during MetaMask confirmation.
      to: contract, // Required except during contract publications.
      from: fromAccount, // must match user's active address.
      value: "0x00", // Only required to send ether to the recipient from the initiating external account.
      data: contract.methods.withDrawCollateral(proposalId).encodeABI(), // Optional, but used for defining smart contract creation and interaction.
      chainId: 4, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };
  } catch (error) {
  }
};

export const updateProposalStatus = async (
  fromAccount,
  proposalId,
  proposalStatus
) => {
  try {
    let gasprice = await exports.getCurrentGasPrices();
    gasprice = gasprice.high;
    const transactionParameters = {
      nonce: "0x00", // ignored by MetaMask
      gasPrice: (gasprice * 1000000000).toString(16), // customizable by user during MetaMask confirmation.
      gas: "0xf4240", // customizable by user during MetaMask confirmation.
      to: contract, // Required except during contract publications.
      from: fromAccount, // must match user's active address.
      value: "0x00", // Only required to send ether to the recipient from the initiating external account.
      data: contract.methods.updateProposalStatus(proposalId).encodeABI(), // Optional, but used for defining smart contract creation and interaction.
      chainId: 4, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };
  } catch (error) {
  }
};

export const getCurrentGasPrices = async () => {
  try {
    let response = await axios.get(
      "https://ethgasstation.info/json/ethgasAPI.json"
    );
    let prices = {
      low: response.data.safeLow / 10,
      medium: response.data.average / 10,
      high: response.data.fast / 10,
    };
 
    return prices;
  } catch (e) {
   
  }
};
