import React from 'react';
import { Box, TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  underline: {
    // fontSize: (typeText) => {
    //   console.log('type Text', typeText);
    // },
    fontWeight: ({ record, name, title }) => {
      if (record === 'header') {
        return theme.typography.fontWeightBold;
      }
      if (record === 'section') {
        if (name || title) return theme.typography.fontWeightBold;
      }
    },
    color: ({ record, description, title }) => {
      return record === 'header' && title && theme.palette.grey[600];
    },
    fontSize: ({ typeText }) => typeText && theme.typography[typeText].fontSize,
    // fontSize: theme.typography['h4'].fontSize,
    '&:hover': {
      '&:before': {
        borderBottom: ({ record, title }) => {
          if (title && record === 'section')
            return `3px solid ${theme.palette.grey[900]}`;
          return ['rgba(0, 188, 212, 0.7)', '!important'];
        },
      },
    },
    '&:before': {
      borderBottom: ({ record, title }) =>
        record === 'section' && title
          ? '3px solid #000'
          : 'rgba(0, 188, 212, 0.7)',
    },

    '&:after': {
      borderBottom: ({ record, title }) => {
        if (record === 'header' || title)
          return `3px solid ${theme.palette.grey[900]}`;
        return 'rgba(0, 188, 212, 0.7)';
      },
    },
  },
  inputMultiline: {
    marginBottom: ({ record, title }) =>
      record === 'section' && title && theme.spacing(1),
    textTransform: ({ record, title }) =>
      record === 'section' && title && `uppercase`,
    fontWeight: ({ record, title }) => record === 'section' && title && `900`,
  },
}));

const InputUser = ({
  typeText,
  icon,
  defaultValue,
  name,
  description,
  record,
  title,
}) => {
  const classes = useStyles({
    typeText,
    name,
    description,
    record,
    title,
  });

  // name
  // title
  // description

  return (
    <Box display="flex" alignItems="center">
      {icon && (
        <Box
          marginRight={0.5}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {icon}
        </Box>
      )}
      <TextField
        defaultValue={defaultValue}
        multiline
        fullWidth
        InputProps={{
          classes: {
            underline: classes.underline,
            inputMultiline: classes.inputMultiline,
          },
        }}
      />
    </Box>
  );
};

export default InputUser;
