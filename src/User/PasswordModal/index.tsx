import React from 'react'
import Modal from 'Shared/Modal'
import Field from 'Shared/Field'
import Button from 'Shared/Button'
import style from './style.module.scss'

type Props = {
  close: () => any
}

export default ({close}: Props) =>
  <Modal
    className={style.modal}
    title='Change Password'
    close={close}
    actions={
      <Button primary onClick={close}>Confirm</Button>
    }
  >
    <div className={style.modalContent}>
      <Field label='Password' type='password'/>
      <Field label='New password' type='password'/>
      <Field label='Confirm new password' type='password'/>
    </div>
  </Modal>
