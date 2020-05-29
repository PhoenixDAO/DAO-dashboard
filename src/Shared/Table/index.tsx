import React from 'react'
import cn from 'classnames'
import style from './style.module.scss'

type Props = {
  children: React.ReactNode
  columns?: string[]
  compact?: boolean
}

export default ({children, columns, compact}: Props) => {
  const hoverRef = React.useRef(null)

  const hoverRow = (e: React.MouseEvent) => {
    const tr = (e.target as HTMLElement).closest('tr')
    const hover = (hoverRef.current as any as HTMLDivElement)
    if (!tr || (tr.parentNode as HTMLElement).tagName !== 'TBODY') return

    hover.hidden = false
    hover.style.top = `${tr.offsetTop}px`
  }

  const unhoverRow = (e: React.MouseEvent) => {
    (hoverRef.current as any as HTMLDivElement).hidden = true
  }

  return <div className={cn(style.wrap, compact && style.compact)} onMouseMove={hoverRow} onMouseLeave={unhoverRow}>
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
    <div ref={hoverRef} className={style.hoverRow} hidden/>
  </div>
}
