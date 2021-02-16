"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var Card_1 = require("Shared/Card");
var Table_1 = require("Shared/Table");
var PieChart_1 = require("Shared/PieChart");
var style_module_scss_1 = require("./style.module.scss");
var axios_1 = require("axios");
var react_redux_1 = require("react-redux");
var const_1 = require("../const");
var adminModal2_1 = require("../Proposals/Modal/adminModal2");
var chartData = [
    {
        title: "Community Airdrop",
        value: 40,
        color: "#172DCE"
    },
    {
        title: "Phoenix DAO Foundation",
        value: 30,
        color: "#EA8604"
    },
    {
        title: "DAO Rewards",
        value: 15,
        color: "#A278FF"
    },
    {
        title: "DAO Fund",
        value: 15,
        color: "#29B700"
    },
];
var Home = function (props) {
    var _a = react_1.useState([]), value = _a[0], setValue = _a[1];
    var _b = react_1.useState([]), proposals = _b[0], setProposals = _b[1];
    var _c = react_1.useState([]), transactions = _c[0], setTransactions = _c[1];
    var _d = react_1.useState(true), loading1 = _d[0], setLoading1 = _d[1];
    var _e = react_1.useState(true), loading2 = _e[0], setLoading2 = _e[1];
    var _f = react_1.useState(true), loading3 = _f[0], setLoading3 = _f[1];
    react_1.useEffect(function () {
        getData();
        getAllProposals();
        getAllTransactionsOfUser();
    }, []);
    var getData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var get;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"]
                        .get("" + const_1.URL + const_1.Proposal, {
                        headers: {
                            Authorization: "Bearer " + props.user.token
                        }
                    })
                        .then(function (value) {
                        setValue(value.data.result);
                        setLoading1(false);
                    })["catch"](function (err) {
                        setLoading1(false);
                    })];
                case 1:
                    get = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var getAllProposals = function () { return __awaiter(void 0, void 0, void 0, function () {
        var get;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"]
                        .get("" + const_1.URL + const_1.Proposal, {
                        headers: {
                            Authorization: "Bearer " + props.user.token
                        }
                    })
                        .then(function (value) {
                        console.log("value ss", value);
                        var temp = value.data.result;
                        for (var i = 0; i < temp.length; i++) {
                            if (temp[i].status != "Accepted" && temp[i].status != "Fail") {
                                temp.splice(i, 1);
                                i--;
                            }
                        }
                        console.log(" setProposals ", temp);
                        setProposals(temp);
                        setLoading2(false);
                    })["catch"](function (err) {
                        setLoading2(false);
                    })];
                case 1:
                    get = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var getAllTransactionsOfUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var get;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"]
                        .get("" + const_1.URL + const_1.transaction + props.user.numioAddress, {
                        headers: {
                            Authorization: "Bearer " + props.user.token
                        }
                    })
                        .then(function (value) {
                        console.log("transactions of user", value.data.result);
                        setTransactions(value.data.result);
                        setLoading3(false);
                    })["catch"](function (err) {
                        setLoading3(false);
                    })];
                case 1:
                    get = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var date = new Date();
    var changeFormat = function (date) {
        date = new Date(date);
        return new Date(date.getTime()).getDate() + "/" + (new Date(date.getTime()).getMonth() + 1) + "/" + new Date(date.getTime()).getFullYear() + " ";
    };
    var styleFlag = true;
    var _g = react_1["default"].useState(undefined), projectModalItem2 = _g[0], setProjectModalItem2 = _g[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: style_module_scss_1["default"].grid },
            react_1["default"].createElement(Card_1["default"], { styleFlag: styleFlag, title: "Latest Proposals", tooltipMessage: "This shows all the proposals submitted" },
                react_1["default"].createElement(Table_1["default"], { compact: true, styleFlag: "LatestProposals" }, value.length === 0 ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                    " ",
                    react_1["default"].createElement("tr", null,
                        react_1["default"].createElement("td", null, loading1 ? "Loading..." : "No proposals found")),
                    " ")) : (value.map(function (valu, i) { return (react_1["default"].createElement("tr", { key: i, onClick: function () {
                        console.log("Hello here is console", valu);
                        setProjectModalItem2({
                            title: valu.name,
                            reward: valu.reward,
                            budget: valu.budget,
                            milestoness: valu.milestone,
                            description: valu.description,
                            //   votes: 'votesArray',
                            votingDate: valu.votingDate,
                            //votingDate: '',
                            _id: valu._id
                        });
                    } },
                    react_1["default"].createElement("td", null, valu.name),
                    react_1["default"].createElement("td", null,
                        " ",
                        changeFormat(valu.createdAt),
                        " "))); })))),
            react_1["default"].createElement(PieChart_1["default"], { lineWidth: 50, data: chartData }),
            react_1["default"].createElement(Card_1["default"], { styleFlag: styleFlag, title: "Voting Results", tooltipMessage: "Recent voting results" },
                react_1["default"].createElement(Table_1["default"], { compact: true }, proposals.length === 0 ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                    " ",
                    react_1["default"].createElement("tr", null,
                        react_1["default"].createElement("td", null, loading2 ? "Loading..." : "No results found")),
                    " ")) : (proposals.map(function (proposal, i, j) { return (react_1["default"].createElement(react_1["default"].Fragment, null, proposal.status == "Accepted" ||
                    proposal.status == "Fail" ? (react_1["default"].createElement("tr", { key: i, onClick: function () {
                        console.log("Hello", proposal);
                        setProjectModalItem2({
                            title: proposal.name,
                            reward: proposal.reward,
                            budget: 100,
                            milestoness: proposal.milestone,
                            description: proposal.description,
                            //   votes: 'votesArray',
                            votingDate: proposal.votingDate,
                            _id: proposal._id
                        });
                    } },
                    react_1["default"].createElement("td", { key: j },
                        " ",
                        changeFormat(proposal.votingDate),
                        " "),
                    react_1["default"].createElement("td", { key: j },
                        " ",
                        proposal.name,
                        " "),
                    proposal.status == "Accepted" ? (react_1["default"].createElement("td", { key: j, style: { color: "#29B700" } }, "Pass")) : (react_1["default"].createElement("td", { key: j, style: { color: "red" } }, "Fail")))) : null)); })))),
            react_1["default"].createElement(Card_1["default"], { styleFlag: styleFlag, title: "Transaction History", tooltipMessage: "This shows all your transactions" },
                react_1["default"].createElement(Table_1["default"], { compact: true, columns: ["Type", "Use", "Amount", "Date "] }, transactions.length === 0 ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement("tr", null,
                        react_1["default"].createElement("td", null, loading3 ? "Loading..." : "No transactions found")))) : (transactions.map(function (transaction, i, j) {
                    var _a;
                    return (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement("tr", { key: i, 
                            //   transaction.proposalId.milestone
                            onClick: function () {
                                console.log("Hello", transaction);
                                setProjectModalItem2({
                                    title: transaction.proposalId.name,
                                    reward: transaction.proposalId.reward,
                                    budget: transaction.proposalId.budget,
                                    milestoness: transaction.proposalId.milestone,
                                    description: transaction.proposalId.description,
                                    //   votes: 'votesArray',
                                    votingDate: transaction.proposalId.votingDate,
                                    _id: transaction.proposalId._id
                                });
                            } },
                            react_1["default"].createElement("td", null,
                                " ",
                                transaction.Type == "Stake" ? "reward" : "proposal",
                                " "),
                            react_1["default"].createElement("td", null, transaction.Type === "Stake"
                                ? "Community Vote"
                                : "Dao Developers"),
                            react_1["default"].createElement("td", null,
                                " ",
                                transaction.Type == "Stake"
                                    ? transaction.stakeId.reward.toFixed(5)
                                    : (_a = transaction.proposalId) === null || _a === void 0 ? void 0 : _a.budget,
                                " "),
                            react_1["default"].createElement("td", null, changeFormat(transaction.createdAt)))));
                })))),
            projectModalItem2 && (react_1["default"].createElement(adminModal2_1["default"]
            // resetData={renderAgain}
            , { 
                // resetData={renderAgain}
                title: projectModalItem2.title, reward: projectModalItem2.reward, budget: projectModalItem2.budget, milestones: projectModalItem2.milestoness, description: projectModalItem2.description, votingDate: projectModalItem2.votingDate, 
                //  votes={projectModalItem2.votes}
                _id: projectModalItem2._id, 
                // styleFlag={projectModalItem2.styleFlag}
                close: function () { return setProjectModalItem2(undefined); } })))));
};
var mapStateToProps = function (state) { return ({
    token: state.userDetails.token,
    user: state.userDetails.user
}); };
exports["default"] = react_redux_1.connect(mapStateToProps)(Home);
