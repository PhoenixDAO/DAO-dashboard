"use strict";
// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";
// import A from "./download.jpg";
// import LoginImage from "assets/images/Group 230.svg";
// import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
exports.__esModule = true;
// export class DemoCarousel extends Component {
//   render() {
//     return (
//       <Carousel>
//         <div style={{ background: "white" }}>
//           <img
//             src={LoginImage}
//             style={{
//               background: "white",
//               height: "100px",
//               width: "100px",
//             }}
//           />
//           {/* <p className="legend">Legend 1</p> */}
//         </div>
//         <div style={{ background: "white" }}>
//           <img
//             src={LoginImage}
//             style={{
//               background: "white",
//               height: "100px",
//               width: "100px",
//             }}
//           />
//           {/* <p className="legend">Legend 2</p> */}
//         </div>
//         <div style={{ background: "white" }}>
//           <img
//             src={LoginImage}
//             style={{
//               background: "white",
//               height: "100px",
//               width: "100px",
//               backgroundColor: "white",
//               color: "white",
//             }}
//           />
//           {/* <p className="legend">Legend 3</p> */}
//         </div>
//       </Carousel>
//     );
//   }
// }
var react_1 = require("react");
var react_material_ui_carousel_1 = require("react-material-ui-carousel");
var styles_1 = require("@material-ui/core/styles");
var style_module_scss_1 = require("./style.module.scss");
var Dao_jpg_1 = require("../../../assets/images/Dao.jpg");
var Grid_1 = require("@material-ui/core/Grid");
var useStyles = styles_1.makeStyles(function (theme) {
    styles_1.createStyles({
        root: {
            "&.MuiPaper-elevation1": {
                boxShadow: "0px"
            }
        }
    });
});
function Example(props) {
    var classes = useStyles();
    var items = [
        {
            name: "Random Name #1",
            title: "Community owns the vote!",
            description: "Be a part of the PhoenixDAO projects by voting with thousands of passionate communities.",
            image: Dao_jpg_1["default"]
        },
    ];
    return (react_1["default"].createElement(react_material_ui_carousel_1["default"], null, items.map(function (item, i) { return (react_1["default"].createElement(Item, { key: i, item: item })); })));
}
exports["default"] = Example;
function Item(props) {
    return (react_1["default"].createElement("div", { className: style_module_scss_1["default"].testing },
        react_1["default"].createElement("img", { src: props.item.image, className: style_module_scss_1["default"].carouselImage }),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("p", { style: {
                    fontSize: "15px",
                    color: "white",
                    fontWeight: "bold",
                    paddingTop: "20px",
                    paddingBottom: "20px"
                } },
                props.item.title,
                " ",
                react_1["default"].createElement("span", { role: "img", "aria-label": "smiling face with sunglasses" }, "\uD83D\uDE0E")),
            react_1["default"].createElement(Grid_1["default"], { style: {
                    fontSize: "15px",
                    //  padding: "1% 2% 1% 2%",
                    //  padding: "1% 20%",
                    //  padding: "20px",
                    padding: "0px 11px",
                    marginTop: "5px",
                    textAlign: "center",
                    justifyContent: "center",
                    color: "white",
                    fontStyle: "normal",
                    display: "-webkit-inline-box"
                }, lg: 6, sm: 12, md: 12 }, props.item.description))));
}
