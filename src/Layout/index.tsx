import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

/** Components */
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";

/** Styles */
import style from "./style.module.scss";
import ContractInit from "../config/contractsInit";

type Props = {
  children: React.ReactNode;
};

export default ({ children }: Props) => {
  let { pathname } = useLocation();
  const isAdmin = pathname === "/admin";

  const checkNetwork = async () => {
    let temp = await ContractInit.init();
    console.log("123", temp.network);
    if (temp.network != "rinkeby") {
      alert("Please Switch to rinkeby network ....");
    }
  };

  useEffect(() => {
    checkNetwork();
  }, []);
  const contentClassName = isAdmin
    ? `${style.admin_layout_padding}`
    : `${style.main_layout_padding}`;

  return (
    <div className={style.page}>
      <TopBar isAdmin={isAdmin} />
      <div className={style.columns}>
        {!isAdmin && <Sidebar />}
        <div className={`${style.content} ${contentClassName}`}>{children}</div>
      </div>
    </div>
  );
};
