import React from 'react'
import Modal from "Shared/Modal"
import Button from "Shared/Button"
import style from "./style.module.scss"

type Props = {
  item: {title: string}
  close: () => any
}

export default ({item: {title}, close}: Props) =>
  <Modal
    title={title}
    className={style.modal}
    actions={
      <>
        <Button primary onClick={close}>Yes</Button>
        <Button primary outline onClick={close}>No</Button>
      </>
    }
    close={close}
  >
    <div className={style.title}>
      Are you sure you want to delete this proposal?
    </div>
  </Modal>
