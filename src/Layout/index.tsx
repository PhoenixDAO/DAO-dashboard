import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Container } from "@material-ui/core";
import { ethereumNetwork } from "../const";
/** Components */
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
/** Styles */
import style from "./style.module.scss";
import ContractInit from "../config/contractsInit";
import { connect } from "react-redux";
import { logout } from "redux/authActions";
type Props = {
  children: React.ReactNode;
};
const myRef = React.createRef<HTMLDivElement>();
const Layout = (props: any) => {
  let { pathname } = useLocation();
  // const [currentPathName,setCurrentPathname] = useState(window.location.pathname)
  // const tempRef=React.createRef<HTMLDivElement>()
  const isAdmin = pathname === "/admin";
  const checkNetwork = async () => {
    let temp = await ContractInit.init();
    console.log("123", temp.network);
    if (temp.network != ethereumNetwork) {
      alert("Please Switch to rinkeby network ....");
    }
  };
  // useEffect(()=>{
  //   console.log("tempRef",tempRef)
  //   const temp=tempRef.current
  //   console.log("temp",temp)
  //     props.setScrollRef(temp)
  // },[tempRef])
  useEffect(() => {
    // setCurrentPathname(window.location.pathname)
    console.log("pathname", window.location.pathname);
    executeScroll();
  }, [window.location.pathname]);
  useEffect(() => {
    checkNetwork();
  }, []);
  const executeScroll = () => {
    if (myRef.current) myRef.current.scrollIntoView();
  };
  const contentClassName = isAdmin
    ? `${style.admin_layout_padding}`
    : `${style.main_layout_padding}`;

  return (
    <div className={style.page}>
      <TopBar isAdmin={isAdmin} />
      <div className={style.columns}>
        {!isAdmin && <Sidebar />}
        <Container
          style={{ overflowX: "hidden", overflowY: "auto" }}
          maxWidth="xl"
        >
          <div className={`${style.content} ${contentClassName}`} ref={myRef}>
            {props.children}
          </div>
        </Container>
      </div>
    </div>
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
    logout: () => dispatch(logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
