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
        name="Select"
        render={({ field }) => (
          <Select {...field} MenuProps={{ disableScrollLock: true }} fullWidth>
            <MenuItem value={'ha-noi'}>Hà Nội</MenuItem>
            <MenuItem value={'ho-chi-minh'}>Hồ Chí Minh</MenuItem>
            <MenuItem value={'da-nang'}>Đà Nẵng</MenuItem>
            <MenuItem value={'other-'}>Khác</MenuItem>
          </Select>
        )}
        control={control}
      />
    </Box>
  );
};

export default SelectLocation;
