import React, { useState } from "react";
import Modal from "Shared/Modal";
import Button from "Shared/Button";
import style from "./style.module.scss";
import { connect } from "react-redux";
import { URL, DeleteProposal } from "../../const";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

type Props = {
  item: {
    name: string;
  };
  close: () => any;
};
const DeleteModal = (props: any) => {
  const [showLoader, setShowLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setShowLoading(true);
      const body = { numioAddress: props.user.numioAddress };
      const get = await axios.delete(
        `${URL}${DeleteProposal}${props.proposal._id}`,
        {
          data: { numioAddress: props.user.numioAddress },
          headers: {
            Authorization: `Bearer ${props.user.token}`,
          },
        }
      );
      setShowLoading(false);

      props.close();
      props.openSnackbar(" Successfully deleted! ", "success");
      props.renderAgain();
    } catch (err) {
      setShowLoading(false);
      if (err.response && err.response.data && err.response.data.result) {
        props.openSnackbar(err.response.data.result, "error");
      } else {
        props.openSnackbar("Network Error", "error");
      }
    }
  };

  return (
    <>
      <Modal
        title={props.proposal.name}
        className={style.modal}
        actions={
          <>
            <Button className={style.button} primary onClick={handleSubmit}>
              {showLoader ? <CircularProgress size={20} /> : <p>Yes</p>}
            </Button>
            <Button primary outline onClick={props.close}>
              No
            </Button>
          </>
        }
        close={props.close}
      >
        <div className={style.title}>
          Are you sure you want to delete this proposal?
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.userDetails.user,
});

export default connect(mapStateToProps)(DeleteModal);
