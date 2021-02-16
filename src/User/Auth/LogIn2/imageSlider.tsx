// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";
// import A from "./download.jpg";
// import LoginImage from "assets/images/Group 230.svg";
// import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

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

import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";
import img1 from "./download.jpg";
import img2 from "./images.jpg";
import Logo from "../../../assets/images/Group 230.svg";
import Button from "Shared/Button";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import style from "./style.module.scss";

const useStyles = makeStyles((theme: Theme) => {
  createStyles({
    root: {
      "&.MuiPaper-elevation1": {
        boxShadow: "0px",
      },
    },
  });
});

export default function Example(props: any) {
  const classes = useStyles();
  var items = [
    {
      name: "Random Name #1",
      title: "Create what the community wants!",
      description:
        "Your voice in every projects on PhoenixDAO matters, that voice begins with your votes.",
      image: Logo,
    },
    // {
    //   name: "Random Name #2",
    //   title: "Hello World!",
    //   image: Logo,
    //   description:
    //     "Your voice in every projects on PhoenixDAO matters, that voice begins with your votes",
    // },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props: any) {
  return (
    // <Paper>
    <div>
      <img src={props.item.image} className={style.carouselImage} />
      <div>
        <p
          style={{
            fontSize: "15px",
            color: "black",
            fontWeight: "bold",
            paddingTop: "50px",
          }}
        >
          {props.item.title}
        </p>
        <p
          style={{
            fontSize: "13px",
            // padding: "1% 2% 1% 2%",
            marginRight: "auto",
            marginLeft: "auto",
            textAlign: "center",
            justifyContent: "center",
            paddingTop: "20px",
            width:"60%"
          }}
        >
          {props.item.description}
        </p>
      </div>
    </div>
  );
}
