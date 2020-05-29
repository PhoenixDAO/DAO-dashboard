import React from 'react'
import {Link} from 'react-router-dom'
import routes from 'routes'
import logo from 'assets/images/logo.svg'
import avatar from 'assets/images/avatar.png'
import Sidebar from './Sidebar'
import style from './style.module.scss'

type Props = {
  children: React.ReactNode
}

export default ({children}: Props) =>
  <div className={style.page}>
    <div className={style.topBar}>
      <Link to={routes.root}>
        <img src={logo} alt="logo"/>
      </Link>
      <div className={style.user}>
        <div>
          <div className={style.name}>Robert Chen</div>
          <div className={style.email}>robchen@gmail.com</div>
        </div>
        <div className={style.avatar} style={{backgroundImage: `url(${avatar})`}}/>
      </div>
    </div>
    <div className={style.columns}>
      <Sidebar />
      <div className={style.content}>{children}</div>
    </div>
  </div>
