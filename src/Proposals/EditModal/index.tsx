import React from 'react'
import Modal from "Shared/Modal"
import style from "./style.module.scss"
import Button from "Shared/Button"

type Props = {
  close: () => any
}

export default ({close}: Props) =>
  <Modal
    title='Submit a Proposal'
    className={style.modal}
    actions={<Button primary onClick={close}>Next</Button>}
    close={close}
  >
    <div className={style.modalContent}>
      <div className={style.modalContentTitle}>
        Why do you want to build this dApp or smart contract? Why is it needed?
      </div>
      <textarea className={style.modalText}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
      </textarea>
    </div>
  </Modal>
