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
var Group_230_svg_1 = require("../../../assets/images/Group 230.svg");
var styles_1 = require("@material-ui/core/styles");
var style_module_scss_1 = require("./style.module.scss");
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
            title: "Create what the community wants!",
            description: "Your voice in every projects on PhoenixDAO matters, that voice begins with your votes.",
            image: Group_230_svg_1["default"]
        },
    ];
    return (react_1["default"].createElement(react_material_ui_carousel_1["default"], null, items.map(function (item, i) { return (react_1["default"].createElement(Item, { key: i, item: item })); })));
}
exports["default"] = Example;
function Item(props) {
    return (
    // <Paper>
    react_1["default"].createElement("div", null,
        react_1["default"].createElement("img", { src: props.item.image, className: style_module_scss_1["default"].carouselImage }),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("p", { style: {
                    fontSize: "15px",
                    color: "black",
                    fontWeight: "bold",
                    paddingTop: "50px"
                } }, props.item.title),
            react_1["default"].createElement("p", { style: {
                    fontSize: "13px",
                    // padding: "1% 2% 1% 2%",
                    marginRight: "auto",
                    marginLeft: "auto",
                    textAlign: "center",
                    justifyContent: "center",
                    paddingTop: "20px",
                    width: "60%"
                } }, props.item.description))));
}
