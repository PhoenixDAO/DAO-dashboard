import React from 'react'
import cn from 'classnames'
import style from './style.module.scss'

type Props = {
  children: React.ReactNode
  secondary?: boolean
}

export default ({children, secondary}: Props) =>
  <div className={cn(style.button, secondary && style.secondary)}>
    {children}
  </div>
