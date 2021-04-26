import { TextField } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
/* TODO Style */
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.header,
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.header,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.app,
    },
    '& .Mui-focused': {
      color: theme.palette.grey.A700,
    },
    '& .Mui-error': {
      color: theme.palette.error.main,
    },
  },
}));

const Input = (props) => {
  const { name, label, value, error = null, onChange, ...other } = props;
  const classes = useStyles();
  return (
    <TextField
      className={classes.root}
      {...other}
      variant="outlined"
      label={label}
      value={value}
      name={name}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
      margin="normal"
    />
  );
};

export default Input;
