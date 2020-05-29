import React from 'react'
import style from './style.module.scss'

type Props = {
  children: React.ReactNode
  title?: string
}

export default ({children, title}: Props) =>
  <div className={style.card}>
    {title && <div className={style.title}>
      {title.split(' ').map(word =>
        <span className={style.word}>{word}</span>
      )}
    </div>}
    {children}
  </div>

