import React, { useState, useEffect } from "react";
import Card from "Shared/Card";
import Table from "Shared/Table";
import axios from "axios";
import { connect } from "react-redux";
import { URL, transactionStake } from "../const";

let flag = false;

const Rewards = (props: any) => {
  const [numio, setNumio] = useState([]);
  const [loading1, setLoading1] = useState(true);

  useEffect(() => {
    getNumio();
  }, []);
  const getNumio = async () => {
    try {
      const get = await axios
        .get(`${URL}${transactionStake}${props.user.user.numioAddress}`, {
          headers: {
            Authorization: `Bearer ${props.user.token}`,
          },
        })
        .then((value) => {
          setNumio(value.data.result);
          setLoading1(false);
        })
        .catch((err) => {
          setLoading1(false);
        });
    } catch (err) {
      setLoading1(false);
    }
  };

  const changeFormat = (date: any) => {
    date = new Date(date);
    return `${new Date(date.getTime()).getDate()}/${
      new Date(date.getTime()).getMonth() + 1
    }/${new Date(date.getTime()).getFullYear()} `;
  };

  return (
    <Card title="Rewards" tooltipMessage="All your rewards on proposals">
      <Table
        columns={["Votes Participated", "Your Vote", "Reward Earned", "Date (dd/mm/yyyy)"]}
      >
        {numio.length === 0 ? (
          <>
            {" "}
            <tr>
              <td>{loading1 ? "Loading..." : "No rewards found"}</td>
            </tr>{" "}
          </>
        ) : (
          numio.map(
            (valu: any, i) =>
              valu.Type == "Stake" && (
                <tr key={i}>
                  <td>{valu.stakeId.proposalId?.name}</td>
                  <td style={{ color: "#29b700" }}>Yes</td>

                  <td> {valu.stakeId.reward.toFixed(5)} PHNX </td>
                  <td>{changeFormat(valu.createdAt)}</td>

                  {(flag = false)}
                </tr>
              )
          )
        )}
      </Table>
    </Card>
  );
};
const mapStateToProps = (state: any) => ({
  user: state.userDetails,
});

export default connect(mapStateToProps)(Rewards);
