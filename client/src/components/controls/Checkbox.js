import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import {
  FormControlLabel,
  Checkbox as MuiCheckbox,
  FormHelperText,
} from '@material-ui/core';
const convertToDefEventPara = (name, value) => ({
  target: {
    name,
    value,
  },
});
const Checkbox = ({ label, name, onChange, value, error, ...rest }) => {
  return (
    <FormControl {...rest}>
      <FormControlLabel
        control={
          <MuiCheckbox
            name={name}
            color="primary"
            checked={value}
            onChange={(e) =>
              onChange(convertToDefEventPara(name, e.target.checked))
            }
          />
        }
        label={label}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
};

export default Checkbox;
