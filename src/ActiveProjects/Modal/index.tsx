import React from 'react'
import Modal from "Shared/Modal"
import cn from "classnames";
import style from './style.module.scss'

type Props = {
  close: () => any
  item: {
    title: string
    list: { text: string, checked: boolean }[]
  }
}

const slides = [
  {}, {}, {},
  {}, {}, {},
  {}, {}
]

export default ({close, item: {title, list: originalList}}: Props) => {
  const [currentSliderPage, setCurrentSliderPage] = React.useState(1)
  const [list, setList] = React.useState(originalList)
  const sliderPagesCount = Math.ceil(slides.length / 3)

  const check = (i: number) => {
    list[i].checked = !list[i].checked
    setList([...list])
  }

  const prevSlide = () => {
    if (currentSliderPage > 1)
      setCurrentSliderPage(currentSliderPage - 1)
  }

  const nextSlide = () => {
    if (currentSliderPage < sliderPagesCount)
      setCurrentSliderPage(currentSliderPage + 1)
  }

  return <Modal
    className={style.modal}
    title={title}
    close={close}
  >
    <div className={style.modalContent}>
      <div className={style.keyValues}>
        <div>
          <div className={style.key}>Status</div>
          <div className={style.value}>M1/M5</div>
        </div>
        <div>
          <div className={style.key}>Est. Completion Date</div>
          <div className={style.value}>10/30/2020 (On time)</div>
        </div>
      </div>
      {list.map(({text, checked}, j) =>
        <div key={j} className={cn(style.listItem, checked && style.checked)}>
          <div className={style.num}>{checked ? '✓' : j + 1}</div>
          <div className={style.name}>{text}</div>
          <div className={style.toggleButton} onClick={() => check(j)}>{checked ? 'Complete' : 'Incomplete'}</div>
        </div>
      )}
      <div className={style.sliderTop}>
        <div className={style.title}>Latest Update</div>
        <div className={style.controls}>
          <div
            className={cn(style.control, style.prev, currentSliderPage === 1 && style.disabled)}
            onClick={prevSlide}
          >Prev</div>

          <div
            className={cn(style.control, style.next, currentSliderPage === sliderPagesCount && style.disabled)}
            onClick={nextSlide}
          >Next</div>
        </div>
      </div>
      <div className={style.sliderContent}>
        <div className={style.items} style={{left: `-${103.5 * (currentSliderPage - 1)}%`}}>
          {slides.map((_, i) =>
            <div key={i} className={style.item}>
              <div className={style.image}/>
              <div className={style.title}>Lorem ipsum dolor sit</div>
              <div className={style.date}>6/15/2020</div>
            </div>
          )}
        </div>
      </div>
    </div>
  </Modal>
}
