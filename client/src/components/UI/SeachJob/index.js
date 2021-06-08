/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Controller, useForm } from 'react-hook-form';
import SelectLocation from './SelectLocation';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: 600,
    },
    width: 300,
    margin: theme.spacing(2),
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
      color: theme.palette.primary.orange,
      fontWeight: 600,
    },
  },
}));

const options = [
  { value: '1111', label: 'c++' },
  { value: '2222', label: 'c#' },
  { value: '3333', label: 'javascript' },
  { value: '4444', label: 'reactjs' },
  { value: '5555', label: 'vuejs' },
  { value: '6666', label: 'nextjs' },
];

const defaultOption = [
  { value: '1111', label: 'bananas' },
  { value: '2222', label: 'apples' },
];

const defaultValues = {
  Select: 'ho-chi-minh',
};

export default function SeachJob() {
  const classes = useStyles();
  const { handleSubmit, control, setValue } = useForm({
    defaultValues,
  });

  useEffect(() => {
    setValue('food', defaultOption);
  });
  const [inputValue, setInputValue] = useState('');

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
      className="form"
    >
      <Box display="flex" alignItems="center" className={classes.seachJob}>
        <div className={classes.root}>
          <Controller
            render={(props) => (
              <Autocomplete
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
                onChange={(e, values) => setValue('food', values)} // instead here the docs said to do: onChange={e => props.onChange(e.target.checked)}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tìm việc theo vị trí và công nghệ"
                    name="food"
                    placeholder="Tech/Position"
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
            name="food"
            defaultValue={[]} // this prevents the "controlled/uncontrolled change" error
          />
        </div>
        <SelectLocation control={control} />
        <Button
          className={classes.btn}
          variant="contained"
          fullWidth
          type="submit"
          color="primary"
          style={{
            maxWidth: 160,
          }}
        >
          Tìm kiếm
        </Button>
      </Box>
    </form>
  );
}
