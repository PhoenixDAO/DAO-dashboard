import React from "react";
import style from "./style.module.scss";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, Theme, makeStyles } from "@material-ui/core/styles";

type Props = {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
  styleFlag?: any;
  tooltipMessage?: String;
};
const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    fontSize: 11,
  },
}))(Tooltip);

export default ({
  children,
  title,
  actions,
  styleFlag,
  tooltipMessage,
}: Props) => (
  <div>
    {styleFlag == "passVotes" ? (
      <div className={style.card4}>
        <div className={style.header}>
          {title && (
            <LightTooltip title={`${tooltipMessage}`} placement="top" arrow>
              <div className={style.title}>
                {title.split(" ").map((word, i) => (
                  <span key={i} className={style.word}>
                    {word}
                  </span>
                ))}
              </div>
            </LightTooltip>
          )}
          {actions}
        </div>

        <div className={style.content}>{children}</div>
      </div>
    ) : styleFlag == "upcomingVotes" ? (
      <div className={style.card3}>
        <div className={style.header}>
          {title && (
            <LightTooltip title={`${tooltipMessage}`} placement="top" arrow>
              <div className={style.title}>
                {title.split(" ").map((word, i) => (
                  <span key={i} className={style.word}>
                    {word}
                  </span>
                ))}
              </div>
            </LightTooltip>
          )}
          {actions}
        </div>
        <div className={style.content}>{children}</div>
      </div>

    ) : styleFlag == "UpvoteProposals" ?
    (
      <div className={style.card2}>
        <div className={style.header3}>
          {title && (
            <LightTooltip title={`${tooltipMessage}`} placement="top" arrow>
              <div className={style.title3}>
                {title.split(" ").map((word, i) => (
                  <span key={i} className={style.word}>
                    {word}
                  </span>
                ))}
              </div>
            </LightTooltip>
          )}
          {actions}
        </div>
        <div className={style.content}>{children}</div>
      </div>
    )
    : styleFlag ? (
      <div className={style.card}>
        <div className={style.header}>
          {title && (
            <LightTooltip title={`${tooltipMessage}`} placement="top" arrow>
              <div className={style.title}>
                {title.split(" ").map((word, i) => (
                  <span key={i} className={style.word}>
                    {word}
                  </span>
                ))}
              </div>
            </LightTooltip>
          )}
          {actions}
        </div>
        <div className={style.content}>{children}</div>
      </div>
    ) : (
      <div className={style.card2}>
        <div className={style.header}>
          {title && (
            <LightTooltip title={`${tooltipMessage}`} placement="top" arrow>
              <div className={style.title}>
                {title.split(" ").map((word, i) => (
                  <span key={i} className={style.word}>
                    {word}
                  </span>
                ))}
              </div>
            </LightTooltip>
          )}
          {actions}
        </div>
        <div className={style.content}>{children}</div>
      </div>
    )}
  </div>
);
