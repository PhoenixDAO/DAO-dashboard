import React, { useState, useEffect } from "react";
import Modal from "Shared/Modal";
import style from "./style.module.scss";
import { connect } from "react-redux";
import Collapse from "./collapse";
import TextField from "@material-ui/core/TextField";
import { withStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    dialogueText: {
      "& .MuiTypography-h6": {
        fontSize: "16px",
      },
      "& .MuiDialogContentText-root": {
        fontSize: "12px",
        color: "black",
      },
      "& .MuiDialogTitle-root": {
        flex: "0 0 auto",
        margin: "0 0 5px 0",
        padding: "12px 24px 8px 24px",
        backgroundColor: "#EA8604",
        color: "#FFFFFF",
      },
      "& .MuiDialogActions-root": {
        flex: "0 0 auto",
        display: "flex",
        padding: "8px 0 14px 0",
        alignItems: "center",
        justifyContent: "space-around",
      },
    },
    dialogueButton: {
      border: "1px solid",
      cursor: "pointer",
      height: "32px",
      display: "flex",
      padding: "0 20rem",
      position: "relative",
      fontSize: "12px",
      transition: "0.2s",
      alignItems: "center",
      fontWeight: "bold",
      userWelect: "none",
      borderRadius: "5rem",
      justifyContent: "center",
      minWidth: "100px",
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
          fontWeight:"normal",
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
          fontWeight:"normal",
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
        fontWeight:"normal",
        color: "#EA8604",
        width: "max-content",
      },
      "& .MuiFormHelperText-root": {
        fontSize: "10px",
      },
      "& .MuiOutlinedInput-inputMultiline": {
        padding: "0",
    fontSize: "13px"
      }
    },
  })
);

const changeFormat = (date: any) => {
  date = new Date(date);
  return `${new Date(date.getTime()).getDate()}/${new Date(date.getTime()).getMonth() + 1}/${new Date(date.getTime()).getFullYear()}`;
};
const ProposalModal = (props: any) => {

  const classes = useStyles();

  useEffect(() => {
  });
  return (
    <>
      
      <div>
        <Modal
          title={props.title}
          close={props.close}
          actions={
            <>
              {/* <Button
                primary
                outline
                icon={iconLike}
                disabled={
                  myLoading1 == true || myLoading2 == true ? true : false
                }
                onClick={() => {
                  if (disable == false) {
                    openDialogue(
                      props._id,
                      props.index,
                      statusUpVote,
                      props.resetData,
                      props.close
                    );
                  }
                }}
              >
                {myLoading1 ? <CircularProgress size={12} /> : props.button1}
              </Button>
              <Button
                primary
                disabled={
                  myLoading1 == true || myLoading2 == true ? true : false
                }
                onClick={() => {
                  if (disable == false) {
                    openDialogue(
                      props._id,
                      props.index,
                      statusRejected,
                      props.resetData,
                      props.close
                    );
                  }
                }}
              >
                {myLoading2 ? <CircularProgress size={12} /> : props.button2}
              </Button> */}
            </>
          }
        >
          <div className={style.modalContent}>
            {console.log("456", props)}
            {console.log("Proposal ID", props._id)}
            {console.log("MetaMask address", props.proposalUserNumioAddress)}
            {console.log("Admin address", props.user.numioAddress)}
            <div className={style.modalBrief}>
            <div style={{textAlign:"center",alignItems:"center"}}><div><span style={{fontSize:"14px",color:"#EA8604"}}>Budget</span></div><div style={{marginTop:"5px"}}><span>{props.budget}</span> <span>PHNX</span></div></div>
          <div style={{textAlign:"center",alignItems:"center"}}><div><span style={{fontSize:"14px",color:"#EA8604"}}>Milestones</span></div><div style={{marginTop:"5px"}}><span>{props.milestones.length}</span></div></div>
          <div style={{width:"80px",textAlign:"center",alignItems:"center"}}><div><span style={{fontSize:"14px",color:"#EA8604"}}>Voting Date</span></div><span>(dd/mm/yyyy)</span><div>{changeFormat(props.votingDate)}</div></div>
            </div>
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
            <h3 style={{ fontSize: "16px", marginBottom: "10px", color: "#ea8604", fontWeight: "normal"}}>Milestones</h3>
              <div
                style={{
                  height: "115px",
                  overflowY: "auto",
                  overflowX: "hidden",
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
      </div>
    </>
  );
};
const mapStateToProps = (state: any) => ({
  user: state.userDetails.user,
});
export default connect(mapStateToProps)(ProposalModal);
