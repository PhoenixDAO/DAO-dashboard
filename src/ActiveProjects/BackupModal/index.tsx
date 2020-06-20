import React from 'react'
import Modal from "Shared/Modal"
import Button from "Shared/Button"
import style from "./style.module.scss"

type Props = {
  close: () => any
  item: {
    title: string
    milestone: string
    date: string
  }
}

export default ({close, item}: Props) =>
  <Modal
    close={close}
    title={item.title}
    actions={
      <Button primary onClick={close}>Ok</Button>
    }
  >
    <div className={style.modalContent}>
      <div className={style.modalSection}>
        <div className={style.modalInfo}>
          <div className={style.modalColumn}>
            <div className={style.modalKey}>Status</div>
            <div className={style.modalValue}>{item.milestone}</div>
          </div>
          <div className={style.modalColumn}>
            <div className={style.modalKey}>Est. Completion Date</div>
            <div className={style.modalValue}>{item.date} (On time)</div>
          </div>
        </div>
      </div>
      <div className={style.modalSection}>
        <div className={style.modalTitle}>Progress Screenshots</div>
        <div className={style.modalImages}>
          <div/>
          <div/>
          <div/>
        </div>
      </div>
      <div className={style.modalSection}>
        <div className={style.modalTitle}>Notes</div>
        <div className={style.modalNotes}>
              <textarea className={style.modalTextarea}>
                Developers have been selected and designs have been completed.
              </textarea>
          <div className={style.modalNotesDate}>05/12/2020</div>
        </div>
      </div>
    </div>
  </Modal>
