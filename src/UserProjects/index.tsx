import React from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import ActiveProjects from "./ActiveProjects";
import Proposals from "./Proposals";
import routes from "routes";
import style from "./style.module.scss";
import PrivateRoute from "../Router/PrivateRoute";

const navLinks = [
  {
    to: routes.myProjects.active(),
    text: "Active Projects",
  },
  {
    to: routes.myProjects.proposals(),
    text: "Proposals",
  },
];

export default () => (
  <div className={style.wrap}>
    <div className={style.nav}>
      {navLinks.map(({ to, text }, i) => (
        <NavLink
          key={i}
          exact
          className={style.navLink}
          activeClassName={style.active}
          to={to}
        >
          {text}
        </NavLink>
      ))}
    </div>
    <div className={style.content}>
      <Switch>
        <PrivateRoute path={routes.myProjects.active()} component={ActiveProjects} />
        <PrivateRoute path={routes.myProjects.proposals()} component={Proposals} />
      </Switch>
    </div>
  </div>
);
