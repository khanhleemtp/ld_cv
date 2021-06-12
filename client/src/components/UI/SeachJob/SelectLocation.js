import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';

import { Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 160,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
      marginRight: theme.spacing(1.5),
    },
    marginRight: theme.spacing(4),
  },
}));

const SelectLocation = ({ control }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {/* <label>Chọn thành phố</label> */}
      <Controller
        name="location"
        render={({ field }) => (
          <Select {...field} MenuProps={{ disableScrollLock: true }} fullWidth>
            <MenuItem value={'Hà Nội'}>Hà Nội</MenuItem>
            <MenuItem value={'Hồ Chí Minh'}>Hồ Chí Minh</MenuItem>
            <MenuItem value={'Đà Nẵng'}>Đà Nẵng</MenuItem>
            <MenuItem value={'other'}>Khác</MenuItem>
          </Select>
        )}
        control={control}
      />
    </Box>
  );
};

export default SelectLocation;
