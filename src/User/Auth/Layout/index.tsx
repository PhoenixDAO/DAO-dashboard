import React from 'react'
import logo from 'assets/images/logo.png'
import style from './style.module.scss'

type Props = {
  children: React.ReactNode
}

export default ({children}: Props) =>
  <div className={style.page}>
    <div className={style.wrap}>
      <img className={style.logo} src={logo} alt="logo"/>
      {children}
    </div>
  </div>
