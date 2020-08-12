import React from "react";
import { Link } from "react-router-dom";
import ProfileModal from "User/ProfileModal";
import routes from "routes";
import logo from "assets/images/logo.png";
import avatar from "assets/images/avatar.png";
import style from "./style.module.scss";

type Props = {
  isAdmin: boolean;
};

export default ({ isAdmin }: Props) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      {modalOpen && <ProfileModal close={() => setModalOpen(false)} />}
      <div className={style.topBar}>
        <div className={style.topleft}>
          <Link className={style.logo} to={routes.root}>
            <img src={logo} alt="logo" />
          </Link>
          {isAdmin && 
            <ul className={style.customlist}>
              <li>Admin</li>
            </ul>
          }
        </div>
        {isAdmin ? (
          <div className={style.balance_detail}>
            <span>DAO contract balance</span>
            <span>5,000,000 PHNX</span>
          </div>
        ) : (
          <div className={style.user} onClick={() => setModalOpen(true)}>
            <div>
              <div className={style.name}>Robert Chen</div>
              <div className={style.email}>robchen@gmail.com</div>
            </div>
            <div
              className={style.avatar}
              style={{ backgroundImage: `url(${avatar})` }}
            />
          </div>
        )}
      </div>
    </>
  );
};
