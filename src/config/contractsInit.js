import Web3 from "web3";
import {
  PHNX_STAKING_ABI,
  PHNX_STAKING_ADDRESS,
} from "../Contracts/phnxStaking";
import { ERC20_ABI } from "../Contracts/erc20";
import { phnxTokenAddress } from "../Contracts";

import {
  PHNX_PROPOSAL_ABI,
  PHNX_PROPOSAL_ADDRESS,
} from "../Contracts/phnxProposal";

export default class ContractInit {
  static init = async (loginClicked = true) => {
    try {
      if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask is installed!");
        if (!loginClicked) {
          await window.ethereum.enable();
        }

        this.web3js = new Web3(window.web3.currentProvider);
        console.log("web3", this.web3js);
        this.accountsWeb3 = await this.web3js.eth.getAccounts();
        this.accounts = window.ethereum.selectedAddress;
        if(this.accounts.toUpperCase() !== this.accountsWeb3[0].toUpperCase()){
          alert('Different')
        }
        console.log('selected web3', this.accountsWeb3[0])
        console.log('Selected address', this.accounts)
        this.getNetwork = await this.web3js.eth.net.getNetworkType();
        console.log("asdasmdkasnkdjasd as", this.accounts);
        console.log('987', this.accounts)
        return {
          web3js: this.web3js,
          address: this.accounts,
         // address: this.accounts[0],
          network: this.getNetwork,
        };
      } else {
        throw { code: 12345 };
      }
    } catch (e) {
      let message = "";
      console.log("in catch of contracts init", e);
      if (e.code === -32002) {
        console.log("code-32002");
        message = "Wallet Connection Request Pending";
      } else if (e.code === 12345) {
        message = "Please install MetaMask!";
      } else {
        message = "An Error Occurred";
      }
      console.error("ERROR activateWallet -> ", e);
      throw { message, severity: "error" };
    }
  };
  static init2 = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        this.web3js = new Web3(window.web3.currentProvider);
        this.accounts = await this.web3js.eth.getAccounts();
        this.getNetwork = await this.web3js.eth.net.getNetworkType();
        console.log("asdasmdkasnkdjasd as", this.getNetwork, this.accounts);
        return {
          web3js: this.web3js,
          address: this.accounts[0],
          network: this.getNetwork,
        };
      } else {
        throw { code: 12345 };
      }
    } catch (e) {
      let message = "";
      console.log("in catch of contracts init", e);
      if (e.code === -32002) {
        console.log("code-32002");
        message = "Wallet Connection Request Pending";
      } else if (e.code === 12345) {
        message = "Please install MetaMask!";
      } else {
        message = "An Error Occurred";
      }
      console.error("ERROR activateWallet -> ", e);
      throw { message, severity: "error" };
    }
  };

  static initPhnxTokenContract = async () => {
    try {
      if (!this.web3js) {
        await this.init();
      }
      this.phnxTokenContract = new this.web3js.eth.Contract(
        ERC20_ABI,
        phnxTokenAddress
      );

      return this.phnxTokenContract;
    } catch (e) {
      console.error("ERROR initPhnxTokenContract => ", e);
    }
  };

  static initPhnxStakingContract = async () => {
    try {
      if (!this.web3js) {
        await this.init();
      }
      this.phnxContract = new this.web3js.eth.Contract(
        PHNX_STAKING_ABI,
        PHNX_STAKING_ADDRESS
      );

      return this.phnxContract;
    } catch (e) {
      console.error("ERROR initPhnxStakingContract => ", e);
    }
  };

  static phoenixProposalContract = async () => {
    try {
      console.log("555555555555555555555555555");
      if (!this.web3js) {
        await this.init();
      }
      this.phnxProposalContract = new this.web3js.eth.Contract(
        PHNX_PROPOSAL_ABI,
        PHNX_PROPOSAL_ADDRESS
      );

      return this.phnxProposalContract;
    } catch (e) {
      console.error("ERROR Proposal ABI => ", e);
    }
  };
}
