import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Controller } from 'react-hook-form';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    width: '100%',
    minWidth: theme.spacing(30),
    maxWidth: theme.spacing(60),
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
  inputRoot: {
    background: ['#fff', '!important'],
    '&:hover': {
      background: ['#fff', '!important'],
    },
    '&:focus': {
      background: ['#fff', '!important'],
    },
  },
  seachJob: {
    flexGrow: 1,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'end',
    },
  },
  btn: {
    marginRight: theme.spacing(1.5),
  },
  inputLabel: {
    color: theme.palette.grey[800],
    '&.focused': {
      fontWeight: 600,
    },
  },
  textField: {
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
  },
}));

// const options = [
//   { value: '1111', label: 'c++' },
//   { value: '2222', label: 'c#' },
//   { value: '3333', label: 'javascript' },
//   { value: '4444', label: 'reactjs' },
//   { value: '5555', label: 'vuejs' },
//   { value: '6666', label: 'nextjs' },
// ];

const MuiAutoComplete = ({
  nameField,
  control,
  setValue,
  label,
  placeholder,
  options,
}) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  return (
    <Box display="flex" alignItems="center" className={classes.seachJob}>
      <div className={classes.root}>
        <Controller
          render={(props) => (
            <Autocomplete
              fullWidth
              id="tech-id"
              multiple
              classes={{
                inputRoot: classes.inputRoot,
                hasPopupIcon: classes.inputRoot,
                focused: classes.inputRoot,
              }}
              options={options}
              getOptionLabel={(option) => option.label}
              getOptionSelected={(option, value) =>
                option.value === value.value
              }
              filterSelectedOptions
              value={props.value} // value is passed by render from the Controller
              onChange={(e, values) => setValue(nameField, values)} // instead here the docs said to do: onChange={e => props.onChange(e.target.checked)}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className={classes.textField}
                  label={label}
                  name={nameField}
                  placeholder={placeholder}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      focused: 'focused',
                    },
                  }}
                />
              )}
            />
          )}
          control={control}
          name={nameField}
          defaultValue={[]} // this prevents the "controlled/uncontrolled change" error
        />
      </div>
    </Box>
  );
};
export default MuiAutoComplete;
