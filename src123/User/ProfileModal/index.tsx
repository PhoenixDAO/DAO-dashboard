import React, { useEffect } from "react";
import Modal from "Shared/Modal";
import Button from "Shared/Button";
import Checkbox from "Shared/Checkbox";
import EmailModal from "User/EmailModal";
import PasswordModal from "User/PasswordModal";
import { Link } from "react-router-dom";
import avatar from "assets/images/avatar.png";
import routes from "routes";
import style from "./style.module.scss";
import { connect } from "react-redux";
import { logout } from "redux/authActions";
import { logout2 } from "redux/layoutActions";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root2: {
      "& .MuiAlert-message": { fontSize: "15px" },
    },
  })
);

export const ProfileModal = (props: any) => {
  const classes = useStyles();
  const [openEmailModal, setOpenEmailModal] = React.useState(false);
  const [openPasswordModal, setOpenPasswordModal] = React.useState(false);

  const Logout = async () => {
    await props.logout2();
    props.logout();
  };

  const changeFormat = (date: any) => {
    date = new Date(date);
    return `${new Date(date.getTime()).getDate()}/${
      new Date(date.getTime()).getMonth() + 1
    }/${new Date(date.getTime()).getFullYear()}`;
  };


  return (
    <>
      {!openEmailModal && (
        <Modal className={style.modal} close={props.close}>
          {}
          <div className={style.modalHeader}>
            <div
              className={style.modalAvatar}
            />
            <div className={style.modalUserInfo}>
              <div className={style.modalName}>
                {props.user?.first_name} {props.user?.last_name}
              </div>
              <div className={style.modalEmail}>{props.user?.email}</div>
              <div className={style.modalDate}>
                Since {changeFormat(props.user?.createdAt)}
              </div>
            </div>
          </div>
          <Button className={style.modalButton} light component={"label"}>
            <div>Dark Mode</div>
            <Checkbox />
          </Button>
          <Button
            component={Link}
            to={routes.auth.logIn()}
            onClick={Logout}
            style={{ textDecoration: "none" }}
            className={style.modalButton}
            light
          >
            Log out
          </Button>
        </Modal>
      )}
      {openEmailModal && <EmailModal close={() => setOpenEmailModal(false)} />}
      {openPasswordModal && (
        <PasswordModal close={() => setOpenPasswordModal(false)} />
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.userDetails.user,
  address: state.layoutReducer.address,
  network: state.layoutReducer.network,
});

export default connect(mapStateToProps, { logout, logout2 })(ProfileModal);
