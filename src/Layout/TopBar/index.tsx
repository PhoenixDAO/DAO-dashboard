import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import ProfileModal from "User/ProfileModal";
import routes from "routes";
import logo from "assets/images/logo.png";
import avatar from "assets/images/avatar.png";
import style from "./style.module.scss";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MoreIcon from "@material-ui/icons/MoreVert";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { URL, Admin } from "../../const";
import axios from "axios";
import { getDAOAttributes } from "../../redux/DAOAttributesActions";
import ContractInit from "../../config/contractsInit";


import { logout } from "redux/authActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
      "& .MuiSvgIcon-root": {
        fontSize: "25px",
      },
    },
    inputRoot: {
      color: "inherit",
    },

    moreButton: {
      "& .MuiSvgIcon-root": {
        fontSize: "18px",
      },
    },

    // "& .MuiTypography-body1 ": { fontSize: "15px" },
  })
);

// import ContractInit from '../../config/contractsInit'
// import { checkWeb3 } from "../../redux/layoutActions";

// type Props = {
//   isAdmin: boolean;
// };

// export default ({ isAdmin }: Props) => {
//   const [modalOpen, setModalOpen] = React.useState(false);

// return (
//   <>

const TopBar = (props: any) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null);
  const mobileMenuId = "primary-search-account-menu-mobile";
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [DAOAttributes, setDAOAttributes] = React.useState<any>(
    props.DAOAttributes
  );

  useEffect(() => {
    setDAOAttributes(props.DAOAttributes);
  }, [props.DAOAttributes]);

  // const listenWalletEvent = useCallback(async(props:any)=>{

  //   },[props])

  // useEffect(()=>{
  // setInterval(()=>{
  // window.ethereum.on("accountChanged",()=>{

  // })
  // },1000)

  // },[])
  const _window = window as any;

  const matchAddressWithAccount = async() =>{
    let temp = await ContractInit.init();
    console.log("address is",temp.address , " and numioAddress is " , props.user.numioAddress)
    if(temp.address.toLowerCase() != props.user.numioAddress.toLowerCase()){
      console.log("logging out")
      await props.logout();
    }
  }

  useEffect(() => {
    async function listenMMAccount() {
      if (typeof _window.ethereum !== "undefined") {
        _window.ethereum.on("accountsChanged", async function (accounts: any) {
          if(!accounts[0]){
            await props.logout();
          }
          else if (props.user && 
            props.user.numioAddress.toLowerCase() != accounts[0].toLowerCase()
          ) {
            await props.logout();
          }
        });
      }
    }
    matchAddressWithAccount();
    listenMMAccount();
  }, []);

  const renderMobileMenu = (
    <Menu
      className={classes.moreButton}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <p style={{ fontWeight: "bold", fontSize: "14px" }}>
          {" "}
          <span>DAO contract balance: </span>
          <span>{DAOAttributes?.monthlyBudget} PHNX</span>
        </p>
      </MenuItem>
    </Menu>
  );
  return (
    <>
      {modalOpen && <ProfileModal close={() => setModalOpen(false)} />}
      <div className={style.topBar}>
        <div className={style.topleft}>
          <Link className={style.logo} to={routes.root}>
            <img src={logo} alt="logo" />
          </Link>
          {props.user && props.user.isAdmin && (
            <ul className={style.customlist}>
              <Link
                style={{ textDecoration: "none", backgroundColor: "none" }}
                to={routes.admin}
              >
                <li>Admin</li>
              </Link>
            </ul>
          )}
        </div>
        {props.user && props.user.isAdmin ? (
          <>
            <div className={style.balance_detail}>
              <span>DAO contract balance</span>
              <span>{DAOAttributes?.monthlyBudget} PHNX</span>
            </div>
            <div className={style.user} onClick={() => setModalOpen(true)}>
              <div>
                <div className={style.name}>
                  {props.user.first_name} {props.user.last_name}
                </div>
                <div className={style.email}>{props.user.email}</div>
              </div>
              <div className={style.avatar} />
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon className="moreButton" />
              </IconButton>
            </div>
            {renderMobileMenu}
          </>
        ) : props.user ? (
          <div className={style.user} onClick={() => setModalOpen(true)}>
            <div>
              <div className={style.name}>
                {props.user.first_name} {props.user.last_name}
              </div>
              <div className={style.email}>{props.user.email}</div>
            </div>
            <div className={style.avatar} />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
const mapStateToProps = (state: any) => ({
  token: state.userDetails.token,
  user: state.userDetails.user,
  balance: state.dashboardReducer.balance,
  address: state.layoutReducer.address,
  DAOAttributes: state.DAOAttributesReducer.DAOAttributes,
  rerender: state.DAOAttributesReducer.rerender,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDAOAttributes: (body: any) => dispatch(getDAOAttributes(body)),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
