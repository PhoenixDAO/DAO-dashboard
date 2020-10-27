import React from "react";
import cn from "classnames";
import style from "./style.module.scss";

type Props = {
  children: React.ReactNode;
  columns?: string[];
  compact?: boolean;
  styleFlag?: string;
};

export default ({ styleFlag, children, columns, compact }: Props) => {
  const hoverRef = React.useRef(null);
  let hoverRow, unhoverRow;
  hoverRow = (e: React.MouseEvent) => {
    const tr = (e.target as HTMLElement).closest("tr");
    const hover = (hoverRef.current as any) as HTMLDivElement;
    if (!tr) return;
    if ((tr.parentNode as HTMLElement).tagName === "THEAD")
      return (hover.hidden = true);

    hover.hidden = false;
    hover.style.top = `${tr.offsetTop}px`;
    hover.style.height = `${tr.offsetHeight}px`;
  };

  unhoverRow = () => {
    ((hoverRef.current as any) as HTMLDivElement).hidden = true;
  };

  return (
    <div
      className={cn(style.wrap, compact && style.compact, style.clickable)}
      onMouseMove={hoverRow}
      onMouseLeave={unhoverRow}
    >
      {styleFlag == "upcomingVotes" ? (
        <table className={style.tableUpcomingVotes}>
          {columns && (
            <thead>
              <tr>
                {columns.map((column, i) => (
                  <th key={i}>
                    <p id="p">{column}</p>
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>{children}</tbody>
          {(styleFlag = undefined)}
        </table>
      ) : styleFlag == "passVotes" ? (
        <table className={style.tablePassVotes}>
          {columns && (
            <thead>
              <tr>
                {columns.map((column, i) => (
                  <th key={i}>
                    <p>{column}</p>
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>{children}</tbody>
          {(styleFlag = undefined)}
        </table>
      ) : (
        <table className={style.table}>
          {columns && (
            <thead>
              <tr>
                {columns.map((column, i) => (
                  <th key={i}>
                    <p>{column}</p>
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>{children}</tbody>
          {(styleFlag = undefined)}
        </table>
      )}
      <div ref={hoverRef} className={style.hoverRow} hidden />
    </div>
  );
};
//    column == "Expiration Date" ? (<th key={i} style={{fontSize:"3px"}} className={style.date}><p>{column}</p></th>):(<th key={i}><p>{column}</p></th>)
