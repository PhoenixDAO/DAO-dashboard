import React,{useState} from "react";
import { useLocation } from "react-router";
import {Container} from '@material-ui/core'

/** Components */
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";

/** Styles */
import style from "./style.module.scss";


type Props = {
  children: React.ReactNode;
};


export default ({ children }: Props) => {
  let { pathname } = useLocation();
  const isAdmin = pathname === "/admin";

  const contentClassName = isAdmin
    ? `${style.admin_layout_padding}`
    : `${style.main_layout_padding}`;

  return (
    <div className={style.page}>
      <TopBar isAdmin={isAdmin}/>
      <div className={style.columns}>
        {!isAdmin && <Sidebar />}
        <Container style={{ overflow:"auto"}} maxWidth="xl"> 
         <div className={`${style.content} ${contentClassName}`}>{children}</div>
         </Container>
      </div>
    </div>
  );
};
