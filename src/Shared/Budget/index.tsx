import React from "react";

/** Components */
import Button from "Shared/Button";
import Field from "Shared/Field";

import style from "./style.module.scss";

export default () => {
  return (
    <div className={style.budget}>
      <div className={style.inputs}>
        <Field label="Minimum Upvotes" type="number" />
        <Field label="Minimum Upvote Days" type="number" />
        <Field label="Set Budget September 2020" type="number" />
      </div>

      <Button primary>Update</Button>
    </div>
  );
};
