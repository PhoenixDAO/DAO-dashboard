/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from "react";
import cn from "classnames";
import iconNoEye from "assets/images/icons/no-eye.svg";
import iconEye from "assets/images/icons/eye.svg";
import style from "./style.module.scss";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, Theme, makeStyles } from "@material-ui/core/styles";

type Props = {
  label?: string;
  error?: string;
  type?: string;
  fieldValue?: number | string;
  fieldValue2?: number;
  onChange?: any;
  onKeyPress?: any;
  name?: any;
  tooltipMessage?:String
};
const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    fontSize: 11,
  },
}))(Tooltip);

export default ({
  label,
  name,
  error,
  type,
  fieldValue,
  fieldValue2,
  onChange,
  onKeyPress,
  tooltipMessage
}: Props) => {
  const [localType, setLocalType] = React.useState(type);

  return (
    
    <label className={style.wrap}>
      {label && (
        <LightTooltip title={`${tooltipMessage}`} placement="top" arrow><div className={cn(style.label, error && style.hasError)}>{label}</div></LightTooltip>
        
      )}
      <div className={style.inputWrap}>
        {type === "password" && (
          <img
            className={style.icon}
            src={localType === "password" ? iconNoEye : iconEye}
            onClick={() => {
              setLocalType(localType === "password" ? "text" : "password");
            }}
            alt=""
          />
        )}
        {localType !== "number" ? (
          <input
            type={localType}
            name={name}
            value={fieldValue}
            onChange={onChange}
            onKeyPress={onKeyPress}
            className={cn(style.input, error && style.hasError)}
          />
        ) : (
          <input
            type={localType}
            value={fieldValue2}
            onKeyPress={onKeyPress}

            onChange={(e) => onChange(e.target.value)}
            className={cn(style.input, error && style.hasError)}
          />
        )}
      </div>
      {error && <div className={style.error}>{error}</div>}
    </label>
  );
};
