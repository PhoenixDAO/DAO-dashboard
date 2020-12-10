import React, { useEffect } from "react";
import Modal from "Shared/Modal";
import cn from "classnames";
import style from "./style.module.scss";
import Collapse from "../../Proposals/Modal/collapse";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      border: "1px solid #E0E0E0",
      "& .MuiAccordionSummary-content": {
        alignItems: "center"
      }
    },
    heading: {
      // fontSize: theme.typography.pxToRem(15),
      fontSize: "13px",
      fontWeight: theme.typography.fontWeightRegular,
    },
    text: {
      fontSize: "12px",

    },


  })
);


// type Props = {
//   close: () => any;
//   item: any;
// };

const slides = [{}, {}, {}, {}, {}, {}, {}, {}];
type Proposal = {
  budget: any;
  collateral: any;
  description: any;
  expirationDate: any;
  milestone: [];
  minimumUpvotes: any;
  name: any;
  numioAddress: any;
  reward: any;
  stake: [];
  status: any;
  votes: [];
  votingDate: any;
  styleFlag: string;
  __v: any;
  _id: any;
};

export default ({ close, proposal, estDate }: any) => {
  const classes = useStyles();

  const [currentSliderPage, setCurrentSliderPage] = React.useState(1);
  const [completionDate, setCompletionDate]: any = React.useState();
  // const [list, setList] = React.useState([]);

  const sliderPagesCount = Math.ceil(slides.length / 3);

  // const check = (i: number) => {
  //   list[i].checked = !list[i].checked;
  //   setList([...list]);
  // };

  const prevSlide = () => {
    if (currentSliderPage > 1) setCurrentSliderPage(currentSliderPage - 1);
  };

  const nextSlide = () => {
    if (currentSliderPage < sliderPagesCount)
      setCurrentSliderPage(currentSliderPage + 1);
  };

  let date = new Date();
  let flag = true;
  let temp = 0;

  // useEffect(() => {
  //   setDate();
  // }, []);

  const setDate = () => {
    //setCompletionDate(1);
    return 1;
  };

  let count = 0;
  return (
    <>
      {/* {setList(proposal.milestone)} */}
      <Modal className={style.modal} styleFlag="ActiveProjects" title={proposal.name} close={close}>
        <div className={style.modalContent}>
          <div className={style.keyValues}>
            <div>
              <div className={style.key}>Status</div>
              {proposal.milestone.map((val: any) => {
                if (val.status == "Completed") {
                  count++;
                }
              })}
              <div
                className={style.value}
              >{`M${count}/M${proposal.milestone.length}`}</div>
            </div>
            <div>
              <div className={style.key}>Est. Completion Date</div>
              {/* <div className={style.value}>10/30/2020 (On time)</div> */}
              <div className={style.value}> {estDate}</div>
            </div>
          </div>

          {proposal.milestone.map((milestone: any, j: any) => (
            <div
              key={j}
              className={cn(
                style.listItem,
                milestone.status == "Completed" && style.checked
              )}
            >
              <div className={classes.root}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ fontSize: "16px" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'center' }}
                  >
                    <div className={style.num}>
                      {milestone.status == "Completed" ? "✓" : j + 1}
                    </div>
                    <Typography className={classes.heading}>
                      {milestone.task}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className={classes.text}>
                      {milestone.description}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                </div>
                </div>
          ))}
              {/* <div className={style.sliderTop}>
          <div className={style.title}>Latest Update</div>
          <div className={style.controls}>
            <div
              className={cn(
                style.control,
                style.prev,
                currentSliderPage === 1 && style.disabled
              )}
              onClick={prevSlide}
            >
              Prev
            </div>

            <div
              className={cn(
                style.control,
                style.next,
                currentSliderPage === sliderPagesCount && style.disabled
              )}
              onClick={nextSlide}
            >
              Next
            </div>
          </div>
        </div>
        <div className={style.sliderContent}>
          <div
            className={style.items}
            style={{ left: `-${103.5 * (currentSliderPage - 1)}%` }}
          >
            {slides.map((_, i) => (
              <div key={i} className={style.item}>
                <div className={style.image} />
                <div className={style.title}>Lorem ipsum dolor sit</div>
                <div className={style.date}>6/15/2020</div>
              </div>
            ))}
          </div>
        </div> */}
            </div>
      </Modal>
    </>
  );
};
