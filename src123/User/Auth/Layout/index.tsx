import React,{useEffect} from "react";
import logo from "assets/images/logo.png";
import pheonixLogo from "assets/images/pheonixLogo.svg";

import cn from "classnames";
import style from "./style.module.scss";

import { logout } from "redux/authActions";
import { checkWeb3BeforeLogin } from "redux/layoutActions";

import { connect } from "react-redux";
import { checkWeb3 } from "Contracts";

type Props = {
  children: React.ReactNode;
  className?: string;
  logout? : any;
  checkWeb3BeforeLogin?:any;
};

const _window = window as any;

const Layout = ({ children, className,logout,checkWeb3BeforeLogin }: Props) => {

  return (
    <div
      style={{
        background:
          "linear-gradient(108.07deg, rgba(5, 0, 255, 0.72) -2.2%, #7000FF 94.84%)",
        height: "100%",
        overflowY: "auto",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
      }}
    >
      <img className={style.logo} src={pheonixLogo} alt="logo" />
      <div className={style.page}>
        <div className={cn(style.wrap, className)}>{children}</div>
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  token: state.userDetails.token,
  user: state.userDetails.user,
  balance: state.dashboardReducer.balance,
  address: state.layoutReducer.address,
  DAOAttributes:state.DAOAttributesReducer.DAOAttributes,
  rerender:state.DAOAttributesReducer.rerender
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout:()=> dispatch(logout()),
    checkWeb3BeforeLogin: ()=> dispatch(checkWeb3BeforeLogin())
  }
};

export default connect( mapStateToProps,mapDispatchToProps)(Layout);