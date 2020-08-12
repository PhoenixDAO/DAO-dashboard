import React from 'react'
import cn from 'classnames'
import style from './style.module.scss'

type Props = {
  children: React.ReactNode
  columns?: string[]
  compact?: boolean
}

export default ({children, columns, compact}: Props) => {
  return <div
    className={cn(style.wrap, compact && style.compact, style.clickable)}
  >
    <table className={style.table}>
      {columns &&
        <thead>
          <tr>
            {columns.map((column, i) =>
              <th key={i}>{column}</th>
            )}
          </tr>
        </thead>
      }
      <tbody>{children}</tbody>
    </table>
  </div>
}
