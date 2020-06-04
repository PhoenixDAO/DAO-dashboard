import React from 'react'
import {Link} from "react-router-dom"
import ProfileModal from 'User/ProfileModal'
import routes from "routes"
import logo from "assets/images/logo.png"
import avatar from "assets/images/avatar.png"
import style from './style.module.scss'

export default () => {
  const [modalOpen, setModalOpen] = React.useState(false)

  return <>
    {
      modalOpen &&
      <ProfileModal close={() => setModalOpen(false)}/>
    }
    <div className={style.topBar}>
      <Link className={style.logo} to={routes.root}>
        <img src={logo} alt="logo"/>
      </Link>
      <div className={style.user} onClick={() => setModalOpen(true)}>
        <div>
          <div className={style.name}>Robert Chen</div>
          <div className={style.email}>robchen@gmail.com</div>
        </div>
        <div className={style.avatar} style={{backgroundImage: `url(${avatar})`}}/>
      </div>
    </div>
  </>
}
