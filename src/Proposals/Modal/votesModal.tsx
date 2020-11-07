import React, { useState, useEffect } from "react";
import Modal from "Shared/Modal";
import Button from "Shared/Button";
import iconLike from "assets/images/icons/like.svg";
import style from "./style.module.scss";
import axios from "axios";
import { connect } from "react-redux";
import Collapse from "./collapse";
import { CircularProgress } from "@material-ui/core";
import { URL, VoteOnProposal } from "../../const";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Stake from "../../Votes/stake";
import ContractInit from "../../config/contractsInit";
import { ethereumNetwork } from "../../const";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) =>
  createStyles({
    description: {
      [theme.breakpoints.down("sm")]: {
        width: "220px",
        "& .MuiInputBase-root": {
          fontSize: "18px",
          marginBottom: "10px",
          width: "220px",
        },
        "& .MuiFormLabel-root": {
          fontSize: "18px",
          fontWeight: "normal",
          color: "#EA8604",
          width: "max-content",
        },
        "& .MuiFormHelperText-root": {
          fontSize: "5px",
        },
      },
      [theme.breakpoints.up("sm")]: {
        width: "420px",

        "& .MuiInputBase-root": {
          fontSize: "18px",
          marginBottom: "10px",
          width: "420px",
        },
        "& .MuiFormLabel-root": {
          fontSize: "18px",
          fontWeight: "normal",
          color: "#EA8604",
        },
        "& .MuiFormHelperText-root": {
          fontSize: "5px",
        },
      },
      "& .MuiInputBase-root": {
        fontSize: "18px",

        marginBottom: "10px",
      },
      "& .MuiFormLabel-root": {
        fontSize: "18px",
        fontWeight: "normal",
        color: "#EA8604",
        width: "max-content",
      },
      "& .MuiFormHelperText-root": {
        fontSize: "10px",
      },
      "& .MuiOutlinedInput-inputMultiline": {
        padding: "0",
        fontSize: "13px",
      },
    },
  })
);

type Project = {
  title: string;
  date?: string;
};

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="standard" {...props} />;
}

const changeFormat = (date: any) => {
  date = new Date(date);
  return `${new Date(date.getTime()).getDate()}/${
    new Date(date.getTime()).getMonth() + 1
  }/${new Date(date.getTime()).getFullYear()} `;
};

const VotesModal = (props: any) => {
  const [myLoading, setMyLoading] = useState(false);
  const classes = useStyles();

  const [openVotesModal, setOpenVotesModal] = useState(true);

  const [ethereumNetworkError, setEthereumNetworkError] = useState(false);
  const [stakedSnackBar, setStakedSnackBar] = useState(false);
  const [transactionRejected, setTransactionRejected] = useState(false);

  const [modalItem, setModalItem] = React.useState<Project | undefined>(
    undefined
  );
  const closeModal = () => {
    setModalItem(undefined);
    props.close();
  };

  const handleNetworkErrorSnackBar = () => {
    setEthereumNetworkError(false);
    setInterval(() => {
      setEthereumNetworkError(false);
    }, 3000);
  };

  const handleStakedSnackBar = (state: boolean = true) => {
    console.log("helloooo");
    setStakedSnackBar(state);
  };

  const handleTransactionRejectedError = (input: boolean) => {
    setTransactionRejected(input);
  };

  const openModal = async (item: any) => {
    let temp: any = await ContractInit.init();
    console.log("123", temp.network);

    //  const networkResult: any = props.network;
    if (temp.network != ethereumNetwork) {
      setEthereumNetworkError(true);
      throw "Ethereum Network invalid !";
    } else {
      setModalItem(item);
      setOpenVotesModal(false);
    }
  };

  const handleClick = async (_id: any, resetData: any, props: any) => {
    try {
      console.log("Click", _id);
      setMyLoading(true);
      const get = await axios.post(
        `${URL}${VoteOnProposal}${_id}`,
        {
          email: props.user.email,
        },
        {
          headers: {
            Authorization: `Bearer ${props.user.token}`,
          },
        }
      );

      resetData();
      setMyLoading(false);
      props.openSnackbar(" Successfully Upvoted! ", "success");
      props.close();
    } catch (err) {
      setMyLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        props.openSnackbar(err.response.data.message, "error");
      } else {
        props.openSnackbar("Network Error", "error");
      }
    }
  };

  return (
    <>
      <Snackbar
        open={ethereumNetworkError}
        autoHideDuration={2000}
        message={props.toastMessage}
        onClose={() => handleNetworkErrorSnackBar()}
      >
        <Alert style={{ fontSize: "12px" }} severity="error">
          Ethereum network must be Rinkeby !
        </Alert>
      </Snackbar>
      {/*<Snackbar
        open={stakedSnackBar}
        autoHideDuration={2000}
        message={props.toastMessage}
        onClose={() => handleStakedSnackBar(false)}
      >
        <Alert style={{ fontSize: "12px" }} severity="success">
          Stake Successfull
        </Alert>
      </Snackbar>

      <Snackbar
        open={transactionRejected}
        autoHideDuration={2000}
        message={props.toastMessage}
        onClose={() => handleTransactionRejectedError(false)}
      >
        <Alert style={{ fontSize: "12px" }} severity="error">
          Transaction Rejected
        </Alert>
      </Snackbar> */}
      {modalItem && (
        <Modal
          close={closeModal}
          title={modalItem.title}
          styleFlag="stakeModal"
        >
          <div className={style.stakeModalContent}>
            <div className={style.stakeModalInfo}>
              <Stake
                proposal={props.selectedProposal}
                close={closeModal}
                renderAgain={props.resetData}
                handleStakedSnackBar={props.handleStakedSnackBar}
                handleTransactionRejectedError={
                  props.handleTransactionRejectedError
                }
              />
            </div>
          </div>
        </Modal>
      )}
      {openVotesModal && (
        <Modal
          title={props.selectedProposal.title}
          close={props.close}
          styleFlag={props.styleFlag}
          actions={
            <>
              <Button
                className={style.button}
                primary
                outline
                icon={iconLike}
                disabled={myLoading ? true : false}
                onClick={() =>
                  props.selectedProposal.votingStatus
                    ? openModal(props.selectedProposal)
                    : null
                }
              >
                {props.selectedProposal.votingStatus
                  ? props.button1
                  : `Vote on ${changeFormat(
                      props.selectedProposal.votingDate
                    )}`}
              </Button>
              <Button primary onClick={props.close}>
                {props.button2}
              </Button>
            </>
          }
        >
          <div className={style.modalContent}>
            <div className={style.modalBrief}>
              {console.log(props.selectedProposal.milestone)}
              <div style={{ textAlign: "center", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "16px", color: "#EA8604" }}>
                    Budget
                  </span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <span>{props.selectedProposal.budget}</span> <span>PHNX</span>
                </div>
              </div>
              <div style={{ textAlign: "center", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "16px", color: "#EA8604" }}>
                    Milestones
                  </span>
                </div>
                <div style={{ marginTop: "5px" }}>
                  <span>{props.selectedProposal.milestone.length}</span>
                </div>
              </div>
              <div
                style={{
                  width: "80px",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <span style={{ fontSize: "16px", color: "#EA8604" }}>
                    Voting Date
                  </span>
                </div>
                <span>(dd/mm/yyyy)</span>
                <div>
                  <span>{changeFormat(props.selectedProposal.votingDate)}</span>
                </div>
              </div>
            </div>
            <form className={classes.description} noValidate autoComplete="off">
              <TextField
                id="outlined-multiline-static"
                label="Project Description"
                multiline
                rows={3}
                defaultValue={props.selectedProposal.description}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </form>
            <div className={style.modalSteps}>
              <h3
                style={{
                  fontSize: "16px",
                  marginBottom: "10px",
                  color: "#ea8604",
                  fontWeight: "normal",
                }}
              >
                Milestones
              </h3>
              <div
                style={{
                  height: "200px",
                  overflowY: "auto",
                  overflowX: "hidden",
                  scrollbarColor: "#EA8604 white",
                  scrollbarWidth: "thin",
                }}
              >
                {props.selectedProposal.milestone.map(
                  (milestone: any, i: any) => {
                    return (
                      <div>
                        <Collapse milestone={milestone} i={i} />
                        <div className={style.modalStep}></div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
const mapStateToProps = (state: any) => ({
  user: state.userDetails.user,
  address: state.layoutReducer.address,
  network: state.layoutReducer.network,
});

export default connect(mapStateToProps)(VotesModal);
