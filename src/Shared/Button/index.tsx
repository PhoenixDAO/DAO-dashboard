import React from 'react'
import cn from 'classnames'
import style from './style.module.scss'

type Props = {
  children: React.ReactNode
  primary?: boolean
  secondary?: boolean
  outline?: boolean
  light?: boolean
  shadow?: boolean
  icon?: string
  [key: string]: any
}

export default ({
  children,
  className,
  secondary,
  primary,
  outline,
  light,
  shadow,
  icon,
  ...props
}: Props) =>
  <div {...props} className={cn(
    style.button,
    className,
    primary && style.primary,
    secondary && style.secondary,
    outline && style.outline,
    light && style.light,
    shadow && style.shadow,
  )}>
    {children}
    {icon && <img className={style.icon} src={icon}/>}
  </div>
