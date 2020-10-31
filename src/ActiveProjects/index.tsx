import React, { useState, useEffect } from "react";
import Card from "Shared/Card";
import Table from "Shared/Table";
import Modal from "./Modal";
import axios from "axios";
import { connect } from "react-redux";
import "./mystyles.css";
import { URL, ProposalByStatus } from "../const";
import { Container } from "@material-ui/core";
type Proposal = {
  budget: any;
  collateral: any;
  description: any;
  expirationDate: any;
  milestone: [];
  minimumUpvotes: any;
  name: any;
  numioAddress: any;
  reward: any;
  stake: [];
  status: any;
  votes: [];
  votingDate: any;
  __v: any;
  _id: any;
  estCompletionDate: any;
};
const ActiveProjects = (props: any) => {
  const [value, setValue] = useState([]);
  const [modalItem, setModalItem] = React.useState<Proposal | undefined>(
    undefined
  );
  const [loading1, setLoading1] = useState(true);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const get = await axios
      .post(
        `${URL}${ProposalByStatus}`,
        {
          status: "Accepted",
        },
        {
          headers: {
            Authorization: `Bearer ${props.user.token}`,
          },
        }
      )
      .then((value) => {
        setValue(value.data.result);
        setLoading1(false);
      })
      .catch((err) => {
        setLoading1(false);
      });
  };
  const closeModal = () => setModalItem(undefined);
  let count = 0;

  const changeFormat = (date: any) => {
    date = new Date(date);
    return `${new Date(date.getTime()).getDate()}/${
      new Date(date.getTime()).getMonth() + 1
    }/${new Date(date.getTime()).getFullYear()} `;
  };

  return (
    //  <Container max-width='xl'>
    <Card
      title="Active Projects"
      tooltipMessage="All proposals accepted after passing voting stage"
    >
      {modalItem && (
        <Modal
          styleFlag="ActiveProjects"
          close={closeModal}
          estDate={changeFormat(modalItem.estCompletionDate)}
          proposal={modalItem}
        />
      )}
      <Table columns={["Active Project", "Status", "Est. Completion Date (dd/mm/yyyy)"]}>
        {value.length === 0 ? (
          <>
            {" "}
            <tr>
              <td>{loading1 ? "Loading..." : "No proposals found"}</td>
            </tr>{" "}
          </>
        ) : (
          value.map((valu: Proposal, i) => {
            count = 0;
            return (
              <tr key={i} onClick={() => setModalItem(valu)}>
                <td>{valu.name}</td>
                {valu.milestone.map((val: any) => {
                  if (val.status == "Completed") {
                    count++;
                  }
                })}

                <td> {`Miletone ${count}/${valu.milestone.length}`} </td>
                <td>{changeFormat(valu.estCompletionDate)}</td>
              </tr>
            );
          })
        )}
      </Table>
    </Card>
    // </Container>
  );
};
const mapStateToProps = (state: any) => ({
  user: state.userDetails.user,
});

export default connect(mapStateToProps)(ActiveProjects);
