import React, { useState, useEffect } from "react";
import Card from "Shared/Card";
import Table from "Shared/Table";
import Font from "Shared/Font";
import PieChart from "Shared/PieChart";
import ProposalModal from "Proposals/Modal";
import style from "./style.module.scss";
import axios from "axios";
import { connect } from "react-redux";
import { URL, Proposal, transaction } from "../const";
import { Input } from "@material-ui/core";
import AdminModal from "../Proposals/Modal/adminModal2";

const chartData = [
  {
    title: "Community Airdrop",
    value: 40,
    color: "#172DCE",
  },
  {
    title: "Phoenix DAO Foundation",
    value: 30,
    color: "#EA8604",
  },
  {
    title: "DAO Rewards",
    value: 15,
    color: "#A278FF",
  },
  {
    title: "DAO Fund",
    value: 15,
    color: "#29B700",
  },
];

const Home = (props: any) => {
  const [value, setValue] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);

  useEffect(() => {
    getData();
    getAllProposals();
    getAllTransactionsOfUser();
  }, []);
  const getData = async () => {
    const get = await axios
      .get(`${URL}${Proposal}`, {
        headers: {
          Authorization: `Bearer ${props.user.token}`,
        },
      })
      .then((value) => {
        setValue(value.data.result);
        setLoading1(false);
      })

      .catch((err) => {
        setLoading1(false);
      });
  };

  const getAllProposals = async () => {
    const get = await axios
      .get(`${URL}${Proposal}`, {
        headers: {
          Authorization: `Bearer ${props.user.token}`,
        },
      })
      .then((value) => {
        console.log("value ss", value);
        let temp = value.data.result;
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].status != "Accepted" && temp[i].status != "Fail") {
            temp.splice(i, 1);
            i--;
          }
        }
        console.log(" setProposals ", temp);
        setProposals(temp);
        setLoading2(false);
      })
      .catch((err) => {
        setLoading2(false);
      });
  };
  const getAllTransactionsOfUser = async () => {
    const get = await axios
      .get(`${URL}${transaction}${props.user.numioAddress}`, {
        headers: {
          Authorization: `Bearer ${props.user.token}`,
        },
      })
      .then((value) => {
        console.log("transactions of user", value.data.result);
        setTransactions(value.data.result);
        setLoading3(false);
      })
      .catch((err) => {
        setLoading3(false);
      });
  };
  let date = new Date();
  const changeFormat = (date: any) => {
    date = new Date(date);
    return `${new Date(date.getTime()).getDate()}/${
      new Date(date.getTime()).getMonth() + 1
    }/${new Date(date.getTime()).getFullYear()} `;
  };
  let styleFlag = true;

  const [projectModalItem2, setProjectModalItem2] = React.useState<
    | {
        title: string;
        // votes: [];
        reward: any;
        budget: any;
        milestoness: any;
        description: any;
        votingDate: any;
        _id: any;
        // renderAgain: any;
        // styleFlag: string;
      }
    | undefined
  >(undefined);

  return (
    <>
      <div className={style.grid}>
        <Card
          styleFlag={styleFlag}
          title="Latest Proposals"
          tooltipMessage="This shows all the proposals submitted"
        >
          <Table compact styleFlag="LatestProposals">
            {value.length === 0 ? (
              <>
                {" "}
                <tr>
                  <td>{loading1 ? "Loading..." : "No proposals found"}</td>
                </tr>{" "}
              </>
            ) : (
              value.map((valu: any, i) => (
                <tr
                  key={i}
                  onClick={() => {
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
                      _id: valu._id,
                    });
                  }}
                >
                  <td>{valu.name}</td>

                  <td> {changeFormat(valu.createdAt)} </td>
                </tr>
              ))
            )}
          </Table>
        </Card>
        <PieChart lineWidth={50} data={chartData} />
        <Card
          styleFlag={styleFlag}
          title="Voting Results"
          tooltipMessage="Recent voting results"
        >
          <Table compact>
            {proposals.length === 0 ? (
              <>
                {" "}
                <tr>
                  <td>{loading2 ? "Loading..." : "No results found"}</td>
                </tr>{" "}
              </>
            ) : (
              proposals.map((proposal: any, i: any, j: any) => (
                <>
                  {proposal.status == "Accepted" ||
                  proposal.status == "Fail" ? (
                    <tr
                      key={i}
                      onClick={() => {
                        console.log("Hello", proposal);
                        setProjectModalItem2({
                          title: proposal.name,
                          reward: proposal.reward,
                          budget: 100,
                          milestoness: proposal.milestone,
                          description: proposal.description,
                          //   votes: 'votesArray',
                          votingDate: proposal.votingDate,
                          _id: proposal._id,
                        });
                      }}
                    >
                      <td key={j}> {changeFormat(proposal.votingDate)} </td>

                      <td key={j}> {proposal.name} </td>

                      {proposal.status == "Accepted" ? (
                        <td key={j} style={{ color: "#29B700" }}>
                          Pass
                        </td>
                      ) : (
                        <td key={j} style={{ color: "red" }}>
                          Fail
                        </td>
                      )}
                    </tr>
                  ) : null}
                </>
              ))
            )}
          </Table>
        </Card>
        <Card
          styleFlag={styleFlag}
          title="Transaction History"
          tooltipMessage="This shows all your transactions"
        >
          <Table compact columns={["Type", "Use", "Amount", "Date "]}>
            {transactions.length === 0 ? (
              <>
                <tr>
                  <td>{loading3 ? "Loading..." : "No transactions found"}</td>
                </tr>
              </>
            ) : (
              transactions.map((transaction: any, i: any, j: any) => (
                <>
                  <tr
                    key={i}
                    //   transaction.proposalId.milestone
                    onClick={() => {
                      console.log("Hello", transaction);
                      setProjectModalItem2({
                        title: transaction.proposalId.name,
                        reward: transaction.proposalId.reward,
                        budget: transaction.proposalId.budget,
                        milestoness: transaction.proposalId.milestone,
                        description: transaction.proposalId.description,
                        //   votes: 'votesArray',
                        votingDate: transaction.proposalId.votingDate,
                        _id: transaction.proposalId._id,
                      });
                    }}
                  >
                    <td>
                      {" "}
                      {transaction.Type == "Stake" ? "reward" : "proposal"}{" "}
                    </td>
                    <td>
                      {transaction.Type === "Stake"
                        ? "Community Vote"
                        : "Dao Developers"}
                    </td>
                    <td>
                      {" "}
                      {transaction.Type == "Stake"
                        ? transaction.stakeId.reward.toFixed(5)
                        : transaction.proposalId?.budget}{" "}
                    </td>

                    <td>{changeFormat(transaction.createdAt)}</td>
                  </tr>
                </>
              ))
            )}
          </Table>
        </Card>
        {projectModalItem2 && (
          <AdminModal
            // resetData={renderAgain}
            title={projectModalItem2.title}
            reward={projectModalItem2.reward}
            budget={projectModalItem2.budget}
            milestones={projectModalItem2.milestoness}
            description={projectModalItem2.description}
            votingDate={projectModalItem2.votingDate}
            //  votes={projectModalItem2.votes}
            _id={projectModalItem2._id}
            // styleFlag={projectModalItem2.styleFlag}
            close={() => setProjectModalItem2(undefined)}
            // setSnackBar={() => setSnackBar}
          />
        )}
      </div>
    </>
  );
};
const mapStateToProps = (state: any) => ({
  token: state.userDetails.token,
  user: state.userDetails.user,
});

export default connect(mapStateToProps)(Home);
