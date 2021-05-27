import React from 'react';
import { Box, TextField, makeStyles } from '@material-ui/core';
import { Controller } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: ({ record, name, title }) => {
      if (record === 'header') {
        return theme.typography.fontWeightBold;
      }
      if (record === 'section') {
        if (name || title) return theme.typography.fontWeightBold;
      }
    },
    fontSize: ({ typeText }) => typeText && theme.typography[typeText].fontSize,
    color: ({ record, description, title }) => {
      return record === 'header' && title && theme.palette.grey[600];
    },
  },
  underline: {
    '&:hover:not(.Mui-disable):before': {
      borderBottom: ({ record, title }) =>
        record === 'section' && title && `3px solid ${theme.palette.grey[900]}`,
    },
    '&:before': {
      borderBottom: ({ record, title }) =>
        record === 'section' && title && '3px solid #000',
    },
    '&:after': {
      borderBottom: ({ record, title }) =>
        record === 'section' && title && `3px solid ${theme.palette.grey[400]}`,
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
const MuiTextField = ({
  typeText,
  icon,
  name,
  description,
  record,
  title,
  control,
  nameField,
  disableUnderline,
  defaultValue,
}) => {
  const classes = useStyles({
    typeText,
    name,
    description,
    record,
    title,
  });

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
      <Controller
        control={control}
        name={nameField}
        defaultValue={defaultValue}
        render={({ field }) => (
          <TextField
            {...field}
            multiline
            fullWidth
            InputProps={{
              classes: {
                underline: classes.underline,
                inputMultiline: classes.inputMultiline,
                root: classes.root,
              },
              disableUnderline: disableUnderline,
            }}
          />
        )}
      />
    </Box>
  );
};

export default MuiTextField;
