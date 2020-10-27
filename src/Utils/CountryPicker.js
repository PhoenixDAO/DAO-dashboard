import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { countries } from "./contentConstants";
import { makeStyles } from "@material-ui/styles";
import { TextField } from "@material-ui/core";
const countryToFlag = (isoCode) => {
  return `flag-icon flag-icon-${isoCode.toLowerCase()}`;
};
const useStyles = makeStyles((theme) => ({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
}));
export default function CountryPicker(props) {
  const classes = useStyles();
  return (
    <Autocomplete
      {...props}
      options={countries}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(option) => (
        <React.Fragment>
          <span className={countryToFlag(option.code)}></span>
          {option.label} ({option.code})
        </React.Fragment>
      )}
      renderInput={(params) => {
        // console.log(params);
        return (
          <TextField
            {...params}
            fullWidth
            size="small"
            margin="dense"
            label="Country"
            variant="outlined"
            required
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
              defaultValue: "Pakistan",
            }}
          />
        );
      }}
    />
  );
}