import React, { useState, useEffect } from "react";
import Modal from "Shared/Modal";
import Button from "Shared/Button";
import iconLike from "assets/images/icons/like.svg";
import style from "./style.module.scss";
import axios from "axios";
import { connect } from "react-redux";
import Collapse from "./collapse";
import { CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { URL, VoteOnProposal, Admin } from "../../const";
import Tooltip from "@material-ui/core/Tooltip";
import {
  withStyles,
  createStyles,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
type Props = {
  close: () => any;
  title: string;
  styleFlag: string;
};
const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    fontSize: 11,
  },
}))(Tooltip);

const useStyles = makeStyles((theme) =>
  createStyles({
    alertDiv: {
      [theme.breakpoints.up("sm")]: {
        width: "420px !important",
        justifyContent: "center",
      },
      [theme.breakpoints.down("sm")]: {
        width: "220px",
        justifyContent: "center",
      },
    },
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

const changeFormat = (date: any) => {
  date = new Date(date);

  return (
    <td>
      {new Date(date.getTime()).getDate()}/
      {new Date(date.getTime()).getMonth() + 1}/
      {new Date(date.getTime()).getFullYear()}
    </td>
  );
};

const ProposalModal = (props: any) => {
  const [myLoading, setMyLoading] = useState(false);
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const checkVotesThreshold = () => {
    console.log("xyz", value);
    console.log("12", props);
    if (props.votes.length >= props.minimumUpvotes) {
      console.log("Dont show");
      return true;
    } else {
      console.log("Show");
      return false;
    }
  };

  useEffect(() => {
    checkVotesThreshold();
  });

  const handleClick = async (_id: any, resetData: any, props: any) => {
    console.log("In handle Click");
    try {
      console.log("Click", _id);
      console.log("props", props);
      console.log("Total votes", props.user.proposalVote.length);
      setMyLoading(true);
      const get = await axios.post(
        `${URL}${VoteOnProposal}${_id}`,
        {
          email: props.user.email,
          status: props.status,
        },
        {
          headers: {
            Authorization: `Bearer ${props.user.token}`,
          },
        }
      );

      console.log("Get ======", get);
      console.log("Modal index api completed");

      props.openSnackbar("Successfully Upvoted! ", "success");

      resetData();
      await props.close();
      // props.useForceUpdate();
      // props.setForceUpdate(!props.forceUpdate);
      // window.location.reload(false);
      // setTimeout(() => {
      //   window.location.reload(false);
      // }, 3000);
      setMyLoading(false);
    } catch (err) {
      setMyLoading(false);
      console.log("Message1 Error", err);
      console.log("Message2 Error", err.response);
      props.openSnackbar("An error occurred", "error");
      // console.log("Message3", err.response.data);
      // console.log("Message", err.response.data.message);
      // if (
      //   err.response.data.message ==
      //   "Cannot destructure property 'status' of 'req.body' as it is undefined."
      // ) {
      //   resetData();
      //   props.openSnackbar("Successfully Upvoted! ", "success");
      //   props.close();
      // } else
      // if (err.response && err.response.data && err.response.data.message) {
      //   props.openSnackbar(err.response.data.message, "error");
      //   // props.openSnackbar("An error occured", "error");
      // } else {
      //   props.openSnackbar("Network Error", "error");
      // }
    }
  };
  const checkVoted = () => {
    let hasVoted = props.votes.find(
      (obj: any) => obj.email === props.user.email
    );
    if (hasVoted) return true;
    return false;
  };

  return (
    <Modal
      title={props.title}
      close={props.close}
      styleFlag={props.styleFlag}
      actions={
        <>
          {checkVoted() && (
            <div className={classes.alertDiv}>
              <Alert severity="error" style={{ fontSize: "13px" }}>
                <p> You have already voted on this proposal! </p>
              </Alert>
            </div>
          )}
          {checkVotesThreshold() ? (
            <div className={classes.alertDiv}>
              <Alert severity="success" style={{ fontSize: "13px" }}>
                <p> Threshold of this proposal is reached </p>
              </Alert>
            </div>
          ) : (
            !checkVoted() && (
              <LightTooltip
                title={`${props.tooltipMessage1}`}
                placement="top"
                arrow
              >
                <Button
                  className={style.button}
                  primary
                  outline
                  icon={iconLike}
                  disabled={myLoading ? true : false}
                  onClick={() => handleClick(props._id, props.resetData, props)}
                >
                  {myLoading ? <CircularProgress size={12} /> : props.button1}
                </Button>
              </LightTooltip>
            )
          )}
          <LightTooltip
            title={`${props.tooltipMessage2}`}
            placement="bottom"
            arrow
          >
            <Button primary onClick={props.close}>
              {props.button2}
            </Button>
          </LightTooltip>
        </>
      }
    >
      <div className={style.modalContent}>
        {/* <div className={style.modalBrief}>
          {console.log(props.milestones)}
          <span>Budget</span>
          <span>Milestones</span>
          <span>Expiration Date</span>
        </div> */}
        <div className={style.modalBrief}>
          {console.log(props.milestones)}
          <div style={{ textAlign: "center", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "14px", color: "#EA8604" }}>Budget</span>
            </div>
            <div style={{ marginTop: "5px" }}>
              <span>{props.budget}</span> <span>PHNX</span>
            </div>
          </div>
          <div style={{ textAlign: "center", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "14px", color: "#EA8604" }}>
                Milestones
              </span>
            </div>
            <div style={{ marginTop: "5px" }}>
              <span>{props.milestones.length}</span>
            </div>
          </div>
          <div
            style={{ width: "80px", textAlign: "center", alignItems: "center" }}
          >
            <div>
              <span style={{ fontSize: "14px", color: "#EA8604" }}>
                Exp. Date
              </span>
            </div>
            {/* <span>(dd/mm/yyyy)</span> */}
            <div>
              <span>{changeFormat(props.expirationDate)}</span>
            </div>
          </div>
          {/* <div><span>{props.milestones.length}</span></div>
          <div><span>{changeFormat(props.expirationDate)}</span></div> */}
        </div>
        {/* <div className={style.modalText}>{props.description}</div> */}

        <form className={classes.description} noValidate autoComplete="off">
          <TextField
            id="outlined-multiline-static"
            label="Project Description"
            multiline
            rows={3}
            defaultValue={props.description}
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
              height: "115px",
              overflowY: "auto",
              overflowX: "hidden",
              scrollbarColor: "#EA8604 white",
              scrollbarWidth: "thin",
            }}
          >
            {props.milestones.map((milestone: any, i: any) => {
              return (
                <div>
                  <Collapse milestone={milestone} i={i} />
                  <div className={style.modalStep}></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};
const mapStateToProps = (state: any) => ({
  user: state.userDetails.user,
});

// export default connect(mapStateToProps)(ProposalModal);
// tone} i={i} />
//                   <div className={style.modalStep}></div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };
// const mapStateToProps = (state: any) => ({
//   user: state.userDetails.user,
// });

export default connect(mapStateToProps)(ProposalModal);
