import React, { useState, useEffect } from "react";
import cn from "classnames";
import EditModal from "./EditProposalModal";
import DeleteModal from "Proposals/DeleteModal";
import iconEdit from "assets/images/icons/edit.svg";
import iconDelete from "assets/images/icons/delete.svg";
import style from "./style.module.scss";
import axios from "axios";
import { connect } from "react-redux";
import { URL } from "../../const";
import { Snackbar, Grid } from "@material-ui/core";
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import ViewProposalModal from "../ActiveProjects/ViewProposalModal";
import Tooltip from "@material-ui/core/Tooltip";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="standard" {...props} />;
}

type Item = {
  _id: any;
  name: string;
  budget: number;
  description: string;
  milestone: [];
  votingDate?: Date;
  minimumUpvotes?: number;
  numioAddress: string;
  collateral: number;
  reward: number;
  status: string;
  stake: [];
  votes: [];
  expirationDate?: string;
  createdAt: Date;
  updatedAt: Date;
  _v: number;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      width: "100%",
      backgroundColor: "#EA8604",
      color: "white",
      borderColor: "#EA8604",
      "&:hover": {
        textDecoration: "underline",
        color: "#0056b3",
        backgroundColor: "#EA8604",
        borderColor: "#EA8604",
      },
      position: "relative",
      height: "56rem",
      padding: "0 20rem",
      borderRadius: "5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "20rem",
      transition: ".2s",
      minWidth: "200rem",
      border: "1px solid",
      userSelect: "none",
      marginTop: "30rem",
    },
    root2: {
      "& .MuiSnackbarContent-root": { fontSize: "10px" },
    },
    alert: {
      width: "100%",

      "& .MuiAlert-message": {
        fontSize: "12px",
        display: "flex",
        alignItem: "center",
      },
      "& .MuiSnackbarContent-root": { fontSize: "12px" },
    },
  })
);

type message = {
  message: undefined | string;
  severity: "error" | "success" | "warning" | "info" | undefined;
};

const Proposals = (props: any) => {
  const classes = useStyles();
  const [value, setValue] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [message, setMessage] = useState<message>({
    message: undefined,
    severity: undefined,
  });
  const [editModalItem, setEditModalItem] = React.useState<Item | undefined>(
    undefined
  );
  const [deleteModalItem, setDeleteModalItem] = React.useState<
    Item | undefined
  >(undefined);
  const [loading1, setLoading1] = useState(true);

  const edit = (item: Item) => setEditModalItem(item);

  const deleteProposal = (item: Item) => setDeleteModalItem(item);

  const [modalOpen, setModalOpen]: any = useState(false);
  const [modalData, setModalData]: any = useState(false);

  const openSnackbar = (
    message: string,
    severity: "error" | "success" | "warning" | "info" | undefined
  ) => {
    setMessage({ message, severity });
    setDeleteModalItem(undefined);
    setShowSnackbar(true);
  };
  let newExpitationDate;

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const get = await axios
      .post(
        `${URL}proposal/getByNumioAddress`,
        {
          numioAddress: props.user.numioAddress,
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
        setValue([]);
      });
  };

  const closeEditModal = async () => {
    setEditModalItem(undefined);
    await getData();
  };

  const viewModal = (item: any) => {
    setModalOpen(!modalOpen);
    setModalData(item);
    console.log("check this one now", item);
  };
  const LightTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      fontSize: 11,
    },
  }))(Tooltip);

  return (
    <>
      {modalOpen && (
        <ViewProposalModal
          proposal={modalData}
          type="Proposal"
          close={viewModal}
        />
      )}

      {editModalItem && (
        <EditModal
          proposal={editModalItem}
          openSnackbar={openSnackbar}
          renderAgain={getData}
          close={closeEditModal}
        />
      )}
      {deleteModalItem && (
        <DeleteModal
          proposal={deleteModalItem}
          openSnackbar={openSnackbar}
          renderAgain={getData}
          close={() => setDeleteModalItem(undefined)}
        />
      )}
      <Snackbar
        className={classes.root2}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={() => {
          setShowSnackbar(false);
        }}
      >
        <Alert
          className={classes.alert}
          onClose={() => {
            setShowSnackbar(false);
          }}
          severity={message.severity}
        >
          {message.message}
        </Alert>
      </Snackbar>
      <div className={style.wrap}>
        {value.length == 0 ? (
          <>
            <Grid lg={12} sm={12} xs={12} justify="space-between">
              <div style={{ height: "389px " }} className={style.item}>
                <tr>
                  <td>{loading1 ? "Loading..." : "No proposals found"}</td>
                </tr>
              </div>
            </Grid>
          </>
        ) : (
          <>
            {value.map((item: any, i) => {
              //  const { title, upvotes, expirationDate, text } = item;
              const {
                name,
                expirationDate,
                description,
                minimumUpvotes,
                status,
                votes,
              } = item;
              let value;
              if (expirationDate) {
                newExpitationDate = new Date(expirationDate);
                console.log("Date ", newExpitationDate);
                value = newExpitationDate.toString();
              } else {
                value = "Not issued";
              }

              return (
                <Grid lg={4} sm={6} xs={12} justify="space-between">
                  <div
                    key={i}
                    className={style.item}
                    onClick={(_) => viewModal(item)}
                  >
                    <label tabIndex={-1} className={style.menu}>
                      <div
                        aria-label="menu"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className={style.menuButton}
                      >
                        <div />
                        <div />
                        <div />
                      </div>
                      <div className={style.menuItems}>
                        <div
                          className={cn(style.menuItem, style.edit)}
                          onClick={(e) => {
                            e.stopPropagation();}}
                          // onClick={() => edit(item)}
                        >
                          <img src={iconEdit} className={style.icon} /> Edit
                          proposal
                        </div>
                        <div
                          className={cn(style.menuItem, style.delete)}
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProposal(item);
                          }}
                        >
                          <img src={iconDelete} className={style.icon} /> Delete
                        </div>
                      </div>
                    </label>
                    <LightTooltip title="View proposal" placement="top-start">
                      <div className={style.title}>{name}</div>
                    </LightTooltip>

                    <div className={style.keyValues}>
                      <Grid
                        lg={6}
                        sm={6}
                        md={6}
                        xs={6}
                        className={style.statusValues}
                      >
                        <div>
                          <div className={style.key}>Current Upvotes</div>
                          <div className={style.value}>
                            {" "}
                            {votes.length} /{minimumUpvotes}
                          </div>
                        </div>
                      </Grid>
                      <Grid
                        lg={3}
                        sm={4}
                        md={4}
                        xs={4}
                        className={style.statusValues}
                        justify="flex-end"
                      >
                        <div>
                          <div className={style.key}>Status</div>
                          <div className={style.value}>{status}</div>
                        </div>
                      </Grid>
                      <Grid lg={12} sm={12} md={12} xs={12}>
                        <div>
                          <div className={style.key}>Expiration Date</div>
                          <div className={style.value}>{value}</div>
                        </div>
                      </Grid>
                    </div>
                    {/* <div className={style.text}>{description}</div> */}
                  </div>
                </Grid>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};
const mapStateToProps = (state: any) => ({
  user: state.userDetails.user,
});

export default connect(mapStateToProps)(Proposals);
