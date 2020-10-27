import React, { useEffect } from "react";
import Modal from "Shared/Modal";
import cn from "classnames";
import style from "./style.module.scss";

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
  styleFlag:string;
  __v: any;
  _id: any;
};

export default ({ close, proposal, estDate }: any) => {
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
              <div className={style.num}>
                {milestone.status == "Completed" ? "✓" : j + 1}
              </div>
              <div className={style.name}>{milestone.task}</div>
              {/* <div className={style.toggleButton} onClick={() => check(j)}>
              {checked ? "Complete" : "Incomplete"}
            </div> */}
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
