"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProposalById = exports.ethereumNetwork = exports.createTransaction = exports.updateProposalCompleteDateAndGitHubLink = exports.DeleteProposal = exports.UpdateProposal = exports.MetaMaskLogin = exports.stakes = exports.NumioAuth = exports.VoteOnProposal = exports.PostProposal = exports.transactionStake = exports.transaction = exports.Admin = exports.ProposalByStatus = exports.ByStatusAndNumio = exports.ByUser = exports.ByAdmin = exports.Proposal = exports.URL = void 0;
//export const URL = "https://phoenix-dao-backend.herokuapp.com/";
//export const URL = "https://pheonixdao-backend.herokuapp.com/";
// New backend
//export const URL = "http://pheonixdao-backend.herokuapp.com/";
// Deployed App
//export const URL = "https://phoenix-dao-dev-server.herokuapp.com/";
//export const URL = "http://localhost:4000/";
var URL = "https://server.phoenixdao.io/"; // Samad Deployed App
//export const URL = "https://phnx-dao-test.herokuapp.com/";
//export const URL = 'http://192.168.18.155:4000/'
// export const URL = 'https://phoenixdaodevserver.herokuapp.com/'

exports.URL = URL;
var Proposal = "proposal/";
exports.Proposal = Proposal;
var ByAdmin = "proposal/changeStatusOfMilestoneByAdmin/";
exports.ByAdmin = ByAdmin;
var ByUser = "proposal/changeStatusOfMilestoneByUser/";
exports.ByUser = ByUser;
var ByStatusAndNumio = "proposal/getByNumioAddressAndProposalStatus";
exports.ByStatusAndNumio = ByStatusAndNumio;
var ProposalByStatus = "proposal/status";
exports.ProposalByStatus = ProposalByStatus;
var Admin = "DAOadminAttributes/";
exports.Admin = Admin;
var transaction = "transaction/user/";
exports.transaction = transaction;
var transactionStake = "transaction/stakes/user/";
exports.transactionStake = transactionStake;
var PostProposal = "proposal/post";
exports.PostProposal = PostProposal;
var VoteOnProposal = "proposal/vote/";
exports.VoteOnProposal = VoteOnProposal;
var NumioAuth = "auth/numio";
exports.NumioAuth = NumioAuth;
var stakes = "stake/";
exports.stakes = stakes;
var MetaMaskLogin = "auth/metamask";
exports.MetaMaskLogin = MetaMaskLogin;
var UpdateProposal = "proposal/updateProposal/";
exports.UpdateProposal = UpdateProposal;
var DeleteProposal = "proposal/singleProposal/";
exports.DeleteProposal = DeleteProposal;
var updateProposalCompleteDateAndGitHubLink = "proposal/updateProposalCompleteDateAndGitHubLink/";
exports.updateProposalCompleteDateAndGitHubLink = updateProposalCompleteDateAndGitHubLink;
var createTransaction = "transaction/";
exports.createTransaction = createTransaction;
var ethereumNetwork = "rinkeby";
exports.ethereumNetwork = ethereumNetwork;
var getProposalById = "proposal/"; //export const

exports.getProposalById = getProposalById;