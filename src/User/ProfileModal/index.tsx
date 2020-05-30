import React from 'react'
import Modal from 'Shared/Modal'
import Button from 'Shared/Button'
import Checkbox from 'Shared/Checkbox'
import EmailModal from 'User/EmailModal'
import PasswordModal from 'User/PasswordModal'
import avatar from "assets/images/avatar.png"
import style from './style.module.scss'

type Props = {
  close: () => any
}

export default ({close}: Props) => {
  const [openEmailModal, setOpenEmailModal] = React.useState(false)
  const [openPasswordModal, setOpenPasswordModal] = React.useState(false)

  return <>
    {
      !openEmailModal &&
      <Modal className={style.modal} close={close}>
        <div className={style.modalHeader}>
          <div className={style.modalAvatar} style={{backgroundImage: `url(${avatar})`}}/>
          <div className={style.modalUserInfo}>
            <div className={style.modalName}>Robert Chen</div>
            <div className={style.modalEmail}>robchen@gmail.com</div>
            <div className={style.modalDate}>Since 07/01/2020</div>
          </div>
        </div>
        <Button className={style.modalButton} light onClick={() => setOpenPasswordModal(true)}>
          Change Password
        </Button>
        <Button className={style.modalButton} light onClick={() => setOpenEmailModal(true)}>
          Change Email
        </Button>
        <Button className={style.modalButton} light component={'label'}>
          <div>Dark Mode</div>
          <Checkbox/>
        </Button>
      </Modal>
    }
    {openEmailModal && <EmailModal close={() => setOpenEmailModal(false)}/>}
    {openPasswordModal && <PasswordModal close={() => setOpenPasswordModal(false)}/>}
  </>
}
