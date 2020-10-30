import React from "react";
import { NavLink } from "react-router-dom";
import iconHome from "assets/images/icons/home.svg";
import iconAddProposal from "assets/images/icons/add-proposal.svg";
import iconUsers from "assets/images/icons/users.svg";
import iconBell from "assets/images/icons/bell.svg";
import iconPenNPaper from "assets/images/icons/pen-n-paper.svg";
import iconReward from "assets/images/icons/reward.svg";
import iconActiveProjects from "assets/images/icons/my-projects.svg";
import routes from "routes";
import style from "./style.module.scss";
const menu = [
  {
    to: routes.root(),
    icon: iconHome,
    text: "Dashboard",
  },
  {
    to: routes.proposals(),
    icon: iconAddProposal,
    text: "Proposals",
  },
  {
    to: routes.votes(),
    icon: iconUsers,
    text: "Votes",
  },
  {
    to: routes.activeProjects(),
    icon: iconPenNPaper,
    text: "Active Projects",
  },
  {
    to: routes.rewards(),
    icon: iconReward,
    text: "Rewards",
  },
  {
    to: routes.myProjects.root(),
    icon: iconActiveProjects,
    text: "My projects",
  },
];
export default () => (
  <div className={style.sidebar}>
    {console.log("routes", routes)}
    {menu.map(({ to, icon, text }, i) => {
      if (i === menu.length) {
        return null;
      }
      {
        return i==5? (
          <NavLink
            key={i}
            className={style.item}
            activeClassName={style.active}
            to={to}
          >
            <div className={style.iconWrap}>
              <div
                className={style.icon}
                style={{
                  maskImage: `url(${icon})`,
                  WebkitMaskImage: `url(${icon})`,
                }}
              />
            </div>
            <div className={style.text}>{text}</div>
            {to === routes.votes() && (
              <div className={style.bell}>
                <img src={iconBell} alt="" />
              </div>
            )}
          </NavLink>
         ): (
          <NavLink
            key={i}
            exact
            className={style.item}
            activeClassName={style.active}
            to={to}
          >
            <div className={style.iconWrap}>
              <div
                className={style.icon}
                style={{
                  maskImage: `url(${icon})`,
                  WebkitMaskImage: `url(${icon})`,
                }}
              />
            </div>
            <div className={style.text}>{text}</div>
            {to === routes.votes() && (
              <div className={style.bell}>
                <img src={iconBell} alt="" />
              </div>
            )}
          </NavLink>
        );
      }
    })}
  </div>
);