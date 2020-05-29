import React from 'react'
import cn from 'classnames'
import style from './style.module.scss'

type Props = {
  children: React.ReactNode
  color?: 'success' | 'accent'
}

export default ({children, color}: Props) =>
  <span className={cn(color && style[color])}>{children}</span>
