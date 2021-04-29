import React from 'react';
import { Box, TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  underline: {
    // fontSize: (typeText) => {
    //   console.log('type Text', typeText);
    // },
    fontSize: ({ typeText }) => {
      console.log(typeText);
      return theme.typography[typeText].fontSize;
    },
    // fontSize: theme.typography['h4'].fontSize,
    '&:hover': {
      '&:before': {
        borderBottom: ['rgba(0, 188, 212, 0.7)', '!important'],
      },
    },
    '&:before': {
      borderBottom: 'rgba(0, 188, 212, 0.7)',
    },
  },
}));

const InputUser = ({ typeText, icon, defaultValue }) => {
  const classes = useStyles({ typeText });
  console.log(typeText);

  return (
    <Box display="flex" alignItems="center">
      {icon}
      <TextField
        defaultValue={defaultValue}
        multiline
        fullWidth
        InputProps={{
          classes: {
            underline: classes.underline,
          },
        }}
      />
    </Box>
  );
};

export default InputUser;
