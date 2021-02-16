import React, { useState, useEffect } from "react";
import cn from "classnames";
import style from "./style.module.scss";
import axios from "axios";
// import useForceUpdate from "use-force-update";
import ViewProposalModal from "./ViewProposalModal";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import spinner from "../../assets/spinner-black.svg";
import { Snackbar, Grid } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import {
  URL,
  ByUser,
  ByStatusAndNumio,
  updateProposalCompleteDateAndGitHubLink,
  getProposalById,
} from "../../const";
import moment from "moment";

import SimpleAlerts from "./snackBar";
type Item = {
  title: string;
  url: string;
  list: { text: string; checked: boolean }[];
  completionDate: string;
};
type message = {
  message: undefined | string;
  severity: "error" | "success" | "warning" | "info" | undefined;
};

const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    fontSize: 11,
  },
}))(Tooltip);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",

      "& > * + *": {
        marginTop: theme.spacing(2),
        color: "#fff",
      },
      "& .MuiAlert-message": {},
      "& .MuiAlert-root": { fontSize: "15px" },
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
const ActiveProjects = (props: any) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState([]);
  const [onlyUserProposal, setOnlyUserProposal] = React.useState([]);
  const [errorFlag, setErrorFlag] = useState(false);
  const [testValue, setTestValue]: any = useState({});
  const [modalOpen, setModalOpen]: any = useState(false);
  const [modalData, setModalData]: any = useState(false);
  const [estCompletionDate, setEstCompletionDate]: any = useState({});
  const [
    errorFlagForCompletedMilestone,
    setErrorFlagForCompletedMilestone,
  ] = useState(false);
  const [githubLink, setGithubLink]: any = useState("");
  const [submitUpdateLoader, setSubmitUpdateLoader]: any = useState({});
  const [currentTime, setCurrentTime]: any = useState(0);
  const [restrictDateUpdate, setRestrictDateUpdate] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [message, setMessage] = useState<message>({
    message: undefined,
    severity: undefined,
  });
  const [loading1, setLoading1] = useState(true);

  const gettingDate = () => {
    let currentTime: any = moment().format("YYYY-MM-DD");

    // let currentTime = moment().toDate().getTime();
    console.log("Time", currentTime);
    setCurrentTime(currentTime);
  };

  useEffect((): any => {
    gettingDate();
    getData();
  }, []);

  let i: any = false;
  let testVar = {};
  const changeStatusOfMilestoneByUser = async (
    i: number,
    j: Number,
    _id: any
  ) => {
    try {
      setLoading(true);
      setTestValue((val: any) => ({ ...val, [`${i}${j}`]: true }));
      const get = await axios.put(
        `${URL}${ByUser}${_id}`,
        {
          numioAddress: props.user.numioAddress,
          index: j,
          status: "Completed",
        },
        {
          headers: {
            Authorization: `Bearer ${props.user.token}`,
          },
        }
      );
      setTestValue((val: any) => ({ ...val, [`${i}${j}`]: false }));

      getData();
      setLoading(false);
    } catch (err) {
      if (!err.response) {
        openSnackbar("Network error", "error");
      }
      openSnackbar("An error occured", "error");
    }
  };

  const getData = async () => {
    const get = await axios
      .post(
        `${URL}${ByStatusAndNumio}`,
        {
          status: "Accepted",
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
        value.data.result.map((proposal: any, i: number) => {
          setEstCompletionDate((val: any) => ({
            ...val,
            [i]: changeFormat(proposal.estCompletionDate),
          }));
          setSubmitUpdateLoader((val: any) => ({ ...val, [i]: false }));
          setLoading1(false);
          setGithubLink((val: any) => ({ ...val, [i]: proposal.githubLink }));
        });
      })
      .catch((err) => {
        setLoading1(false);
      });
  };

  const checkStatus = async (
    status: any,
    _id: any,
    i: any,
    j: any,
    milestoneCost: any
  ) => {
    console.log("Milestone =====>", status, _id, i, j, milestoneCost);
    console.log("Status", status);
    if (status == "Completed") {
      openSnackbar("Milestone already completed !", "success");
    } else if (status == "Incomplete") {
      setErrorFlag(false);
      setLoading(true);
      changeStatusOfMilestoneByUser(i, j, _id);

      openSnackbar(
        "Milestone completion request sent for approval !",
        "success"
      );
    } else if (status == "Pending") {
      openSnackbar("Request already sent for approval !", "error");
      setLoading(false);
    } else {
      setErrorFlagForCompletedMilestone(true);
      setLoading(false);
    }
  };
  const openSnackbar = (
    message: string,
    severity: "error" | "success" | "warning" | "info" | undefined
  ) => {
    setMessage({ message, severity });
    setShowSnackbar(true);
  };

  const submitUpdateAPI = async (e: any, _id: any, i: number) => {
    console.log(i);
    console.log("-----////", estCompletionDate);
    let tempDate = changeFormat(estCompletionDate[i]);
    console.log(tempDate);
    console.log(currentTime);
    if (tempDate < currentTime) {
      console.log("Smaller");
      openSnackbar(
        "Provided date must not be behind than today's date",
        "error"
      );
      return true;
    }
    if (estCompletionDate[i] == "NaN-NaN-NaN") {
      console.log("In if");
      openSnackbar("Please provide the date", "error");
      return true;
    }
    try {
      e.preventDefault();
      setSubmitUpdateLoader((val: any) => ({ ...val, [i]: true }));
      let body = {
        githubLink: githubLink[i],
        estCompletionDate: estCompletionDate[i],
        numioAddress: props.user.numioAddress,
      };

      const get = await axios
        .put(`${URL}${updateProposalCompleteDateAndGitHubLink}${_id}`, body, {
          headers: {
            Authorization: `Bearer ${props.user.token}`,
          },
        })
        .then((proposal: any) => {
          setSubmitUpdateLoader((val: any) => ({ ...val, [i]: false }));
          openSnackbar(" Successfully updated! ", "success");
          getData();
        })
        .catch((e) => {
          setSubmitUpdateLoader((val: any) => ({ ...val, [i]: false }));
          if (!e.response) {
            throw { message: "Network error", severity: "error" };
          }
          throw { message: e.response.data.result, severity: "error" };
        });
    } catch (e) {
      //  openSnackbar(e.message, e.severity);
      setSubmitUpdateLoader((val: any) => ({ ...val, [i]: false }));
    }
  };

  const changeFormat = (date: any) => {
    let d1 = new Date(date);
    let y1 = d1.getFullYear();
    let m1: string | number = d1.getMonth() + 1;
    if (m1 < 10) m1 = "0" + m1;

    let dt1: string | number = d1.getDate();
    if (dt1 < 10) {
      dt1 = "0" + dt1;
    }
    let d2 = y1 + "-" + m1 + "-" + dt1;
    return d2;
  };

  const handleChangeDate = (date: any, i: number) => {
    // if (changeFormat(date) < currentTime) {
    //   setRestrictDateUpdate(true);
    //   console.log("Smaller");
    //   openSnackbar("Provided date must be bigger than today's date", "error");
    //   return true;
    // }
    setRestrictDateUpdate(false);
    setEstCompletionDate((val: any) => ({ ...val, [i]: changeFormat(date) }));
  };

  const handleGitHubLinkDate = (githubLink: any, i: number) => {
    setGithubLink((val: any) => ({ ...val, [i]: githubLink }));
  };

  const viewModal = (item: any) => {
    setModalOpen(!modalOpen);
    setModalData(item);
    console.log("check this one now", item);
  };

  let estimatedDays = 0;
  let x = 0;
  return (
    <>
      {modalOpen && (
        <ViewProposalModal
          proposal={modalData}
          openSnackbar={openSnackbar}
          type="Active Proposal"
          renderAgain={modalOpen}
          close={viewModal}
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
      <div>
        <div className={classes.root}></div>
        <div className={style.wrap}>
          {value.map((item: any) => {
            item.milestone.map((newItem: any) => {
              estimatedDays = estimatedDays + newItem.days;
            });
          })}
          {/* (
           
           loading1 ? (<td>Loading...</td>) :   (<Grid     lg={12} md={12} sm={12} xs={12} justify="space-between">
           <form style= {{height: "389px "}} className={style.item}>No active projects found
           </form>
           </Grid>)
         )  */}

          {value.length == 0 ? (
            <Grid lg={12} md={12} sm={12} xs={12} justify="space-between">
              <form style={{ height: "389px " }} className={style.item}>
                <td> {loading1 ? "Loading..." : "No active projects found"}</td>
              </form>
            </Grid>
          ) : (
            value.map((item: any, i) => {
              const { name, description } = item;
              return (
                <Grid lg={6} md={6} sm={12} xs={12} justify="space-between">
                  <div key={i} className={style.item}>
                    <LightTooltip title="View proposal" placement="top-start">
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={(_) => viewModal(item)}
                        className={style.title}
                      >
                        {name}
                      </div>
                    </LightTooltip>

                    <label className={style.formControl}>
                      <div className={style.label}>Medium Update</div>
                      <input
                        className={style.input}
                        type="url"
                        onChange={(e) => {
                          handleGitHubLinkDate(e.target.value, i);
                        }}
                        value={githubLink[i]}
                      />
                    </label>
                    <div
                      style={{
                        overflowY: "scroll",
                        height: "98px",
                        padding: "10px 10px 10px 0px",
                      }}
                    >
                      {item.milestone.map((ite: any, j: any) => (
                        <div
                          key={j}
                          className={cn(
                            style.listItem,
                            ite.status == "Completed" && style.checked
                          )}
                        >
                          <div className={style.num}>
                            {ite.status == "Completed" ? "✓" : j + 1}
                          </div>
                          <div className={style.name}>{ite.task}</div>
                          <div
                            className={style.toggleButton}
                            onClick={() =>
                              checkStatus(
                                ite.status,
                                item._id,
                                i,
                                j,
                                item.milestoneCost
                              )
                            }
                          >
                            {testValue[`${i}${j}`] ? (
                              // <img src={spinner} />
                              <CircularProgress size={10} color="inherit" />
                            ) : ite.status == "Completed" ? (
                              "Completed"
                            ) : ite.status == "Pending" ? (
                              "Pending"
                            ) : (
                              "Incomplete"
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <label className={style.formControl}>
                      <div className={style.label}>Est. Completion Date</div>
                      <input
                        className={cn(style.input, style.date)}
                        type="date"
                        onChange={(e) => {
                          handleChangeDate(e.target.value, i);
                        }}
                        value={estCompletionDate[i]}
                      />
                    </label>
                    <div className={style.submitWrap}>
                      <button
                        className={style.submit}
                        onClick={(e) => submitUpdateAPI(e, item._id, i)}
                      >
                        {submitUpdateLoader[i] ? (
                          <CircularProgress size={10} color="inherit" />
                        ) : (
                          // <img src={spinner} />
                          "Submit Updates"
                        )}
                      </button>
                    </div>
                  </div>
                </Grid>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.userDetails.user,
});

export default connect(mapStateToProps)(ActiveProjects);
