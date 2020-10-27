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
import { URL, VoteOnProposal } from "../../const";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, Theme, makeStyles } from "@material-ui/core/styles";

type Props = {
  close: () => any;
  title: string;
  styleFlag:string;
};
const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    fontSize: 11,
  },
}))(Tooltip);

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
            <Alert severity="error" style={{ fontSize: "10px" }}>
              <p> You have already voted on this proposal! </p>
            </Alert>
          )}
          {!checkVoted() && (
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
          )}
<LightTooltip title={`${props.tooltipMessage2}`}  placement="bottom" arrow>
<Button primary onClick={props.close}>
            {props.button2}
          </Button>
</LightTooltip>
          
        </>
      }
    >
      <div className={style.modalContent}>
        <div className={style.modalBrief}>
          {console.log(props.milestones)}
          <span>{props.reward} PHNX</span>
          <span>{props.milestones.length} milestone</span>
          <span>{changeFormat(props.expirationDate)}</span>
        </div>
        {/* <div className={style.modalText}>{props.description}</div> */}
        <div className={style.modalSteps}>
          <div
            style={{
              height: "200px",
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

export default connect(mapStateToProps)(ProposalModal);
