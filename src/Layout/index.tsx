import React from "react";
import { useLocation } from "react-router";

/** Components */
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";

/** Styles */
import style from "./style.module.scss";
import Budget from "Shared/Budget";

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
      <TopBar isAdmin={isAdmin} />
      {isAdmin && <Budget />}
      <div className={style.columns}>
        {!isAdmin && <Sidebar />}
        <div className={`${style.content} ${contentClassName}`}>{children}</div>
      </div>
    </div>
  );
};
