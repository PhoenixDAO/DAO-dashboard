"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var home_svg_1 = require("assets/images/icons/home.svg");
var add_proposal_svg_1 = require("assets/images/icons/add-proposal.svg");
var users_svg_1 = require("assets/images/icons/users.svg");
var bell_svg_1 = require("assets/images/icons/bell.svg");
var pen_n_paper_svg_1 = require("assets/images/icons/pen-n-paper.svg");
var reward_svg_1 = require("assets/images/icons/reward.svg");
var my_projects_svg_1 = require("assets/images/icons/my-projects.svg");
var routes_1 = require("routes");
var style_module_scss_1 = require("./style.module.scss");
var react_2 = require("react");
var menu = [
    {
        to: routes_1["default"].root(),
        icon: home_svg_1["default"],
        text: "Dashboard"
    },
    {
        to: routes_1["default"].proposals(),
        icon: add_proposal_svg_1["default"],
        text: "Proposals"
    },
    {
        to: routes_1["default"].votes(),
        icon: users_svg_1["default"],
        text: "Votes"
    },
    {
        to: routes_1["default"].activeProjects(),
        icon: pen_n_paper_svg_1["default"],
        text: "Active Projects"
    },
    {
        to: routes_1["default"].rewards(),
        icon: reward_svg_1["default"],
        text: "Rewards"
    },
    {
        to: routes_1["default"].myProjects.root(),
        icon: my_projects_svg_1["default"],
        text: "My Projects"
    },
];
var SideBar = function () {
    var _a = react_2.useState(false), expanded = _a[0], setExpanded = _a[1];
    var isExpanded = function () {
        // setExpanded(false)
        setExpanded(function (prevExpanded) { return (prevExpanded = !prevExpanded); });
        console.log("expand", expanded);
    };
    return (react_1["default"].createElement("div", { className: expanded ? style_module_scss_1["default"].sidebar : style_module_scss_1["default"].closeSidebar },
        console.log("routes", routes_1["default"]),
        menu.map(function (_a, i) {
            var to = _a.to, icon = _a.icon, text = _a.text;
            if (i === menu.length) {
                return null;
            }
            {
                return i == 5 ? (react_1["default"].createElement(react_router_dom_1.NavLink, { onClick: isExpanded, key: i, className: style_module_scss_1["default"].item, activeClassName: style_module_scss_1["default"].active, to: to },
                    react_1["default"].createElement("div", { className: style_module_scss_1["default"].iconWrap },
                        react_1["default"].createElement("div", { className: style_module_scss_1["default"].icon, style: {
                                maskImage: "url(" + icon + ")",
                                WebkitMaskImage: "url(" + icon + ")"
                            } })),
                    react_1["default"].createElement("div", { className: style_module_scss_1["default"].text }, text),
                    to === routes_1["default"].votes() && (react_1["default"].createElement("div", { className: style_module_scss_1["default"].bell },
                        react_1["default"].createElement("img", { src: bell_svg_1["default"], alt: "" }))))) : (react_1["default"].createElement(react_router_dom_1.NavLink, { onClick: isExpanded, key: i, exact: true, className: style_module_scss_1["default"].item, activeClassName: style_module_scss_1["default"].active, to: to },
                    react_1["default"].createElement("div", { className: style_module_scss_1["default"].iconWrap },
                        react_1["default"].createElement("div", { className: style_module_scss_1["default"].icon, style: {
                                maskImage: "url(" + icon + ")",
                                WebkitMaskImage: "url(" + icon + ")"
                            } })),
                    react_1["default"].createElement("div", { className: style_module_scss_1["default"].text }, text),
                    to === routes_1["default"].votes() && (react_1["default"].createElement("div", { className: style_module_scss_1["default"].bell },
                        react_1["default"].createElement("img", { src: bell_svg_1["default"], alt: "" })))));
            }
        })));
};
exports["default"] = SideBar;
