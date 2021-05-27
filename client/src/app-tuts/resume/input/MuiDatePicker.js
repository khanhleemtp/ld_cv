import React from 'react';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiSvgIcon-root': {
      //   fontSize: theme.typography.subtitle2,
      fontSize: '1.2rem',
    },
    '& .MuiFormControl-marginNormal': {
      marginTop: 0,
      marginBottom: 0,
    },
    '& .MuiInputBase-root': {
      width: '120px',
      display: 'flex',
      flexDirection: 'row-reverse',
    },
    '& .MuiInputAdornment-positionEnd': {
      marginLeft: -theme.spacing(1.5),
    },
    '& .MuiInputBase-input': {
      fontSize: '14px',
    },
  },
}));

const MuiDatePicker = ({ control, label, name }) => {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Controller
        name="MUIPicker"
        control={control}
        render={({ field: { ref, ...rest } }) => (
          <KeyboardDatePicker
            className={classes.root}
            InputProps={{
              disableUnderline: true,
            }}
            label={label}
            name={name}
            style={{
              marginTop: 0,
              marginBottom: 0,
            }}
            margin="normal"
            // id="date-picker-dialog"
            format="MM/YYYY"
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            {...rest}
          />
        )}
      />
    </MuiPickersUtilsProvider>
  );
};

export default MuiDatePicker;
