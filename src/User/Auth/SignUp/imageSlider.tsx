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
import Button from "Shared/Button";
import Logo from "../../../assets/images/Group 230.svg";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import style from "./style.module.scss";
import DashboardImage from "../../../assets/images/Dao.jpg";
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme: Theme) => {
  createStyles({
    root: {
      "&.MuiPaper-elevation1": {
        boxShadow: "0px",

      }
    },
  });
});

export default function Example(props: any) {
  const classes = useStyles();
  var items = [
    {
      name: "Random Name #1",
      title: "Community owns the vote!",
      description:
        "Be a part of the PhoenixDAO projects by voting with thousands of passionate communities.",
      image: DashboardImage,
    },
    // {
    //   name: "Random Name #2",
    //   title: "Hello World!",
    //   image: Logo,
    //   description:
    //     "YouTube is an American online video-sharing platform headquartered in San Bruno, California. Three former PayPal employees—Chad Hurley, Steve Chen, and Jawed Karim—created the service in February 2005. Google bought the site in November 2006 for US$1.65 billion;",
    // },
  ];

  return (
    <Carousel >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props: any) {
  return (
    <div className={style.testing}>
      <img src={props.item.image} className={style.carouselImage} />
      <div>
        <p
          style={{
            fontSize: "15px",
            color: "white",
            fontWeight: "bold",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          {props.item.title} <span role="img" aria-label="smiling face with sunglasses">😎</span>
        </p>
        <Grid
          style={{
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
            display: "-webkit-inline-box",
          }}
          lg={6}
          sm={12}
          md={12}
        >

          {props.item.description}
        </Grid>
      </div>
    </div>
  );
}
